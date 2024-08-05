const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

// buildGraph takes in an array as it's argument
function buildGraph(edges) {
    // An empty object is created
  let graph = Object.create(null);
  // We create a function that takes in two arguments
  function addEdge(from, to) {
    // If the
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
/* 
    The returned graph will look like this:
    graph = {
        "Alice's House": ["Bob's House", "Cabin", "Post Office"],
        "Bob's House": ["Alice's House", "Town Hall"],
        "Cabin": ["Alice's House"],
        "Post Office": ["Alice's House", "Marketplace"],
        "Town Hall": ["Bob's House", "Daria's House", "Marketplace", "Shop"],
        "Daria's House": ["Ernie's House", "Town Hall"],
        "Ernie's House": ["Daria's House", "Grete's House"],
        "Grete's House": ["Ernie's House", "Farm", "Shop"],
        "Farm": ["Grete's House", "Marketplace"],
        "Shop": ["Grete's House", "Marketplace", "Town Hall"],
        "Marketplace": ["Farm", "Post Office", "Shop", "Town Hall"],
    }
*/

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        // Check if there is a road going from the current place to the destination
        if (!roadGraph[this.place].includes(destination)) {
            // If not, return the old state
            return this;
            // If there is, create a new state. The parcels that are being delivered to the current place will be moved to the destination
        } else {
            /*
                The map method is used to create a new array of parcels. If the parcel is not at the current place, it will be left as is. If it is at the current place, it will be moved to the destination
            */
            let parcels = this.parcels.map(p => {
                if (p.place !== this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place !== p.address);
            return new VillageState(destination, parcels);
        }
    }
}

// Since the state of the village is changing, we need to create a new state every time the robot moves

// So here we create a new state where the robot is at the Post Office and the parcels are at Alice's House
let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

/*
console.log(next.place); // -> Alice's House
console.log(next.parcels); // -> []
console.log(first.place); // -> Post Office
*/

// Object.freeze() is used to make sure that the state is not changed by accident
/*
    NOTE: Object.freeze() is not 100% secure. It only makes the first level of the object immutable. If the object has nested objects, they can still be changed. Also, if the object has a property that is an object, that property can be changed
 */
// Example: 

/*
let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value); // -> 5
*/
// Memory is used to store the results of the robot's previous actions. It is most often left empty and values are added with each move. The memory is then used to determine the next move
function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

// Possible solutions for the robot
// Randomization:


function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}


// Creating the randomized state:


VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};


// runRobot(VillageState.random(), randomRobot);

// Second solution:
// The mail truck route


const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House", "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}


// Finding the shortest route

// The parameters are the graph, the starting place, and the destination
function findRoute(graph, from, to) {
    // Work is set to an array with one object. The object has the starting place and an empty route
    let work = [{at: from, route: []}];
    // The for loop will run until the work array is empty
    for (let i = 0; i < work.length; i++) {
        // Here we set the first and second properties to the second object in the work array
        let {at, route} = work[i];
        // We iterate over the places in the the nested array of the graph object
        for (let place of graph[at]) {
            // We use a conditional to check if some of the places in the work array are equal to the current place
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                // If not, we create a new object and push it to the work array
                work.push({at: place, route: route.concat(place)})
            }
        }
    }
}

/*
    This complex syntax allows traversal of the graph using nested arrays similar to a binary tree. The function will return the first route that reaches the destination
*/

/*
    A visualization of the steps:
    First Line: [{at: "Alice's House", route: []}]
    Second Line: [{at: "Alice's House", route: []}, {at: "Bob's House", route: ["Bob's House"]}]
    Third Line: [{at: "Alice's House", route: []}, {at: "Bob's House", route: ["Bob's House"]}, {at: "Town Hall", route: ["Bob's House", "Town Hall"]}]
    Fourth Line: [{at: "Alice's House", route: []}, {at: "Bob's House", route: ["Bob's House"]}, {at: "Town Hall", route: ["Bob's House", "Town Hall"]}, {at: "Daria's House", route: ["Bob's House", "Daria's House"]}]
    Etc...
*/

// The function takes the graph and the village state as arguments
function goalOrientedRobot({place, parcels}, route) {
    // If the route is empty, the robot will find a new route
    if (route.length == 0) {
        // If there are parcels, the robot will find a route to the first parcel. If not, it will find a route to the first
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    // The robot will return the first element of the route array and the rest of the array as the memory
    return {direction: route[0], memory: route.slice(1)};
}

/*
    Measuring a robot
*/

function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0
    let total2 = 0
    for (let i = 0; i < 101; i++) {
        let state = VillageState.random();
        total1 += runRobot(state, robot1, memory1);
        total2 += runRobot(state, robot2, memory2);
    }
    return [total1 / 100, total2 / 100];
}
/*
console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));
console.log(compareRobots(routeRobot, [], randomRobot, []));
console.log(compareRobots(goalOrientedRobot, [], randomRobot, []));
*/
// The goalOrientedRobot is faster than the routeRobot AND the randomRobot

/*
    Robot Efficiency
*/

console.log(runRobot(VillageState.random(), goalOrientedRobot, []));

function betterGoalOrientedRobot() {

}