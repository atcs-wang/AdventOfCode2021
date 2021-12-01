import * as fs from 'fs';
import * as readline from 'readline';

// const fs = require('fs');

function dayToFilePath(day : number) : string {
    return `inputs/day${String(day).padStart(2,'0')}/input.txt`
}

/**
 * Gets the day's input as a string array.
 * @param day which day input it is.
 * @returns string array of each line
 */
function linesAsStringArray(day : number) : string[] {
    try {
        return fs.readFileSync(dayToFilePath(day), {encoding: "utf8"}).split(/\r?\n/);
    } catch (e: unknown) {
        console.log(`Input File not yet added to project! Visit:\n https://adventofcode.com/2021/day/${day}/input`);
        throw e;
    }
} 

/**
 * Gets the day's input as a number array.
 * @param day which day input it is.
 * @returns number array of each line
 */
function linesAsNumberArr(day : number) : number[] {
    return linesAsStringArray(day).map(Number);
}


// alternatively readline reads a stream
// https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js

/**
 * Gets a readline.Interface representing a stream of input.
 * Good if file is too large to be read into memory, is asynchronous (?).
 * Two common ways to work with each line of the streamed input:
 * 
 * 1) Listen for the 'line' and 'close' events
 *   rl.on('line', (line) => {
 *       console.log(`Received: ${line}`);
 *   });
 *   rl.on('close', () {
 *      console.log('Done');
 *   });
 *
 * 2) In an async function, use the for await... of syntax.
 *   for await (const line of rl) {
 *       console.log(`Line from file: ${line}`);
 *   }
 * @param day which day input it is.
 * @returns readline.Interface 
 */
function linesAsReadlineInterface(day : number) : readline.Interface {
  const fileStream = fs.createReadStream(dayToFilePath(day));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  return rl;
}

export {linesAsStringArray, linesAsNumberArr}


