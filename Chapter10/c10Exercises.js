// Eloquent JavaScript Chapter 10 Exercises

// A Modular Robot:

// As a simple summary, I would have kept the graph function and the data inside a main module and split off the individual different robot functions into their own modules. This would allow for a more organized and modular program. Additionally, I would used exports to instantiate the robot functions in the main module.

// Roads Module:

const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
]
//#region 'graph.js'
const buildGraph = (edges) => {
    let graph = Object.create(null);
    const addEdge = (from, to) => {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}
export default buildGraph(roads);
//#endregion

//import {buildGraph} from './graph.js'

// Circular Dependencies:

// A circular dependency is when two or more modules depend on each other. This can cause problems because the modules cannot be loaded in the correct order. To avoid circular dependencies, you can refactor your code so that the modules do not depend on each other. You can also use a module loader that can handle circular dependencies.