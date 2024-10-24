const apiUrl = 'https://fakeapi.com/data';
const reliantDataUrl = 'https://fakeapi.com/reliantData';

const getData = () => {
    fetch(apiUrl)
        .then((response) => response.json())
}

const getReliantData = () => {
    fetch(reliantDataUrl)
        .then((response) => response.json())
}

function dataThatReliesOnData() {
    let variable1 = {};
    let reliantVariable = {};
    getData()
        .then((data) => variable1 = data)
        .then(() => getReliantData())
        .then((reliantData) => reliantVariable = reliantData)
}

const theData = {
    dataObject: "Some information",
    reliantId: theReliantData.id
}

const theReliantData = {
    id: 1,
    data: "Some reliant information"
}

dataThatReliesOnData(); // This will possible return undefined because you are trying to access the data before it is returned from the API


//Instead we can asynchronize the requests so that we wait for the data to be returned before we try to access it

const asyncGetData = async () => {
    const response = await fetch(apiUrl);
    return response.json();
}

const asyncGetReliantData = async () => {
    const response = await fetch(reliantDataUrl);
    return response.json();
}

async function asyncDataThatReliesOnData() {
    let variable1 = {};
    let reliantVariable = {};
    variable1 = await asyncGetData();
    reliantVariable = await asyncGetReliantData();
}

asyncDataThatReliesOnData(); // We use asynchronous operations so that we are getting all the information in the correct order and we don't return any undefeined values

// Promise.all() is a method that takes an array of promises and returns a single promise. This promise will resolve when all of the promises in the array have resolved.

// When you want write a function that forces a group of promises to wait until all of them have resolved, you can use Promise.all() to do so.

const empty = [];

function aLotOfResponses(data1, data2, data3, data4, empty) {  
    empty.push(data1)
    empty.push(data2)
    empty.push(data3)
    empty.push(data4)
    return empty;
}

// The function above could run into errors if the data is not returned in the correct order. We can use Promise.all() to make sure that the data is returned in the correct order.

function promisingAllForALotOfResponses(data1, data2, data3, data4, empty) {
    return Promise.all([data1, data2, data3, data4])
        .then((values) => {
            empty.push(values[0])
            empty.push(values[1])
            empty.push(values[2])
            empty.push(values[3])
            return empty;
        })
}

// The function above will make sure that the data is returned in the correct order and we don't run into any errors.