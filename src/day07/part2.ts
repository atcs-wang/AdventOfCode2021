import * as read_input from '../utils/read_input';


let crabs: number[] = read_input.linesAsStringArray(7)[0].split(",").map(Number);

let max = Math.max(...crabs);
let min = Math.min(...crabs);

function triangle_num(n:number):number {
    return n * (n + 1) / 2;
}

let best = 0;
let lowest_dist = Number.POSITIVE_INFINITY;
for(let align = min; align <=max; align++ ){
    let dist = crabs.map(crab => triangle_num(Math.abs(align - crab))).reduce((a,b) => a + b);
    if (dist < lowest_dist){
        best = align;
        lowest_dist = dist; 
    }
}

console.log(lowest_dist)
console.log(best)