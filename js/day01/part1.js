"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_input = __importStar(require("../utils/read_input"));
const lines = read_input.linesAsNumberArr(1);
// Solution approach one: classic for loop
let increases = 0;
for (let i = 1; i < lines.length; i++) {
    if (lines[i] > lines[i - 1]) {
        // console.log(`${i-1}: ${lines[i-1]} -> ${i} : ${lines[i]}`)
        increases++;
    }
}
console.log(increases);
// Solution approach two: reduce
const answer = lines.slice(1).reduce((acc, curr, ind, arr) => {
    return acc + (curr > lines[ind] ? 1 : 0);
    // Note, using lines not arr (which is the sliced lines). The index "drags" behind
}, 0 // initial value is accumulation start
);
console.log(`Reduce Answer: ${answer}`);
