// Imports at the Top as is the convention:

// import {readFile} from 'node:fs';
import { create } from "node:domain";
import { writeFile } from "node:fs";
import { readFile } from "node:fs/promises";

import { createServer } from "node:http";
import { resolve, sep } from "node:path";

import { createReadStream } from "node:fs";
import { stat, readdir } from "node:fs/promises";
import { lookup } from "mime-types";

import {rmdir, unlink} from 'node:fs/promises';

import {createWriteSystem} from 'node:fs';

// The Filesystem Module:

readFile("file.txt", "utf8", (error, text) => {
    if (error) throw error;
    console.log("The file contains:", text);
});

writeFile("graffiti.txt", "Node was here", (error) => {
    if (error) console.log("Failed to write file:", error);
    else console.log("File written.");
});

readFile("file.txt", "utf8").then((text) => {
    console.log("The file contains:", text);
});

//The HTTP Module:

// let server = createServer((request, response) => {
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(`
//         <h1>Hello!</h1>
//         <p>You asked for <code>${request.url}</code></p>
//     `);
//     response.end();
// });
// server.listen(8000);
// console.log("Listening! (port 8000)");

// Streams:

createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    request.on("data", (chunk) =>
        response.write(chunk.toString().toUpperCase())
    );
    request.on("end", () => response.end());
}).listen(8000);

fetch("http://localhost:8000/", {
    method: "POST",
    body: "Hello server",
})
    .then((resp) => resp.text())
    .then(console.log);
// → HELLO SERVER

// A File Server:

const methods = Object.create(null);

createServer((request, response) => {
    let handler = methods[request.method] || notAllowed;
    handler(request)
        .catch((error) => {
            if (error.status != null) return error;
            return { body: String(error), status: 500 };
        })
        .then(({ body, status = 200, type = "text/plain" }) => {
            response.writeHead(status, { "Content-Type": type });
            if (body && body.pipe) body.pipe(response);
            else response.end(body);
        });
}).listen(8000);

async function notAllowed(request) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed.`,
    };
}

const baseDirectory = process.cwd();

function urlPath(url) {
    let { pathname } = new URL(url, "http://localhost");
    let path = resolve(decodeURIComponent(pathname).slice(1));
    if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
        throw { status: 403, body: "Forbidden" };
    }
    return path;
}

methods.GET = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENOENT") throw error;
        else return { status: 404, body: "File not found" };
    }
    if (stats.isDirectory()) {
        return { body: (await readdir(path)).join("\n") };
    } else {
        return { body: createReadStream(path), type: lookup(path) };
    }
};

methods.DELETE = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENOENT") throw error;
        else return { status: 204 };
    }
    if (stats.isDirectory()) await rmdir(path);
    else await unlink(path);
    return { status: 204 };
};

function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}

methods.PUT = async function (request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteSystem(path));
    return { status: 204 };
}

