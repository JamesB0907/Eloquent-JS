import { createServer } from "node:http";
import serveStatic from "serve-static";

function notFound(request, response) {
    response.writeHead(404, "Not found");
    response.end("<h1>Not found</h1>");
}

class SkillShareServer {
    constructor(talks) {
        this.talks = talks;
        this.version = 0;
        this.waiting = [];

        let fileServer = serveStatic("./public");
        this.server = createServer((request, response) => {
            serveFromRouter(this, request, response, () => {
                fileServer(request, response, () =>
                    notFound(request, response)
                );
            });
        });
    }
    start(port) {
        this.server.listen(port);
    }
    stop() {
        this.server.close();
    }
}

import { Router } from "./router.mjs";

const router = new Router();
const defaultHeaders = { "Content-Type": "text/plain" };

async function serveFromRouter(server, request, response, next) {
    let resolved = await router.resolve(request, server).catch((error) => {
        if (error.status != null) return error;
        return { body: String(err), status: 500 };
    });
    if (!resolved) return next();
    let { body, status = 200, headers = defaultHeaders } = await resolved;
    response.writeHead(status, headers);
    response.end(body);
}

const talkPath = /^\/talks\/([^\/]+)$/;

router.add("GET", talkPath, async (server, title) => {
    if (Object.hasOwn(server.talks, title)) {
        return {
            body: JSON.stringify(server.talks[title]),
            headers: { "Content-Type": "application/json" },
        };
    } else {
        return { status: 404, body: `No talk '${title}' found` };
    }
});

router.add("DELETE", talkPath, async (server, title) => {
    if (Object.hasOwn(server.talks, title)) {
        delete server.talks[title];
        server.updated();
    }
    return { status: 204 };
});

import { json as readJSON } from "node:stream/consumers";

router.add("PUT", talkPath, async (server, title, request) => {
    let talk = await readJSON(request);
    if (
        !talk ||
        typeof talk.presenter != "string" ||
        typeof talk.summary != "string"
    ) {
        return { status: 400, body: "Bad talk data" };
    }
    server.talks[title] = {
        title,
        presenter: talk.presenter,
        summary: talk.summary,
        comments: [],
    };
    server.updated();
    return { status: 204 };
});

router.add(
    "POST",
    /^\/talks\/([^\/]+)\/comments$/,
    async (server, title, request) => {
        let comment = await readJSON(request);
        if (
            !comment ||
            typeof comment.author != "string" ||
            typeof comment.message != "string"
        ) {
            return { status: 400, body: "Bad comment data" };
        } else if (Object.hasOwn(server.talks, title)) {
            server.talks[title].comments.push(comment);
            server.updated();
            return { status: 204 };
        } else {
            return { status: 404, body: `No talk '${title}' found` };
        }
    }
);

SkillShareServer.prototype.talkResponse = function () {
    let talks = Object.keys(this.talks).map((title) => this.talks[title]);
    return {
        body: JSON.stringify(talks),
        headers: {
            "Content-Type": "application/json",
            ETag: `"${this.version}"`,
            "Cache-Control": "no-store",
        },
    };
};

router.add("GET", /^\/talks$/, async (server, request) => {
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
    if (!tag || tag[1] != server.version) {
        return server.talkResponse();
    } else if (!wait) {
        return { status: 304 };
    } else {
        return server.waitForChanges(Number(wait[1]));
    }
});

SkillShareServer.prototype.waitForChanges = function (time) {
    return new Promise((resolve) => {
        this.waiting.push(resolve);
        setTimeout(() => {
            if (!this.waiting.includes(resolve)) return;
            this.waiting = this.waiting.filter((r) => r != resolve);
            resolve({ status: 304 });
        }, time * 1000);
    });
};

import { readFileSync, writeFile } from "node:fs";

const fileName = "./talks.json";

SkillShareServer.prototype.updated = function () {
    this.version++;
    let response = this.talkResponse();
    this.waiting.forEach((resolve) => resolve(response));
    this.waiting = [];

    writeFile(fileName, JSON.stringify(this.talks), (error) => {
        if (error) console.error("Failed to write:", error);
    });
};

function loadTalks() {
    try {
        return JSON.parse(readFileSync(fileName, "utf8"));
    } catch (error) {
        console.log("No talks found, starting with empty database");
        return {};
    }
}

class Talk {
    constructor(talk, dispatch) {
        this.comments = elt("div");
        this.dom = elt(
            "section",
            { className: "talk" },
            elt(
                "h2",
                null,
                talk.title,
                " ",
                elt(
                    "button",
                    {
                        type: "button",
                        onclick: () =>
                            dispatch({ type: "deleteTalk", talk: talk.title }),
                    },
                    "Delete"
                )
            ),
            elt("div", null, "by ", elt("strong", null, talk.presenter)),
            elt("p", null, talk.summary),
            this.comments,
            elt(
                "form",
                {
                    onsubmit(event) {
                        event.preventDefault();
                        let form = event.target;
                        dispatch({
                            type: "newComment",
                            talk: talk.title,
                            message: form.elements.comment.value,
                        });
                        form.reset();
                    },
                },
                elt("input", { type: "text", name: "comment" }),
                " ",
                elt("button", { type: "submit" }, "Add comment")
            )
        );
        this.syncState(talk);
    }

    syncState(talk) {
        this.talk = talk;
        this.comments.textContent = "";
        for (let comment of talk.comments) {
            this.comments.appendChild(renderComment(comment));
        }
    }
}

class SkillShareApp {
    constructor(state, dispatch) {
        this.dispatch = dispatch;
        this.talkDOM = elt("div", { className: "talks" });
        this.talkMap = Object.create(null);
        this.dom = elt(
            "div",
            null,
            renderUserField(state.user, dispatch),
            this.talkDOM,
            renderTalkForm(dispatch)
        );
        this.syncState(state);
    }

    syncState(state) {
        if (state.talks == this.talks) return;
        this.talks = state.talks;

        for (let talk of state.talks) {
            let found = this.talkMap[talk.title];
            if (
                found &&
                found.talk.presenter == talk.presenter &&
                found.talk.summary == talk.summary
            ) {
                found.syncState(talk);
            } else {
                if (found) found.dom.remove();
                found = new Talk(talk, this.dispatch);
                this.talkMap[talk.title] = found;
                this.talkDOM.appendChild(found.dom);
            }
        }
        for (let title of Object.keys(this.talkMap)) {
            if (!state.talks.some((talk) => talk.title == title)) {
                this.talkMap[title].dom.remove();
                delete this.talkMap[title];
            }
        }
    }
}

new SkillShareServer(loadTalks()).start(8000);
