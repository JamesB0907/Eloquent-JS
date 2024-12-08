// Directory Creation

// import { mkdir } from 'fs/promises';

// function makeDirectory (directoryName) {
//     return mkdir(directoryName);
// }

// const directoryName = process.argv[2];
// makeDirectory(directoryName)

// This is apparently the chapter solution:

import {mkdir} from "node:fs/promises";

methods.MKCOL = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    await mkdir(path);
    return {status: 204};
  }
  if (stats.isDirectory()) return {status: 204};
  else return {status: 400, body: "Not a directory"};
};

// The chapter wants me to use a server and add the mkdir method