import * as read_input from '../utils/read_input';
const lines : number[] = read_input.linesAsNumberArr(1);

function sum(arr:number[]) : number {
    return arr.reduce((a,b) => a + b)
}

// // Solution approach one: classic for loop
let increases = 0;
for (let i = 1; i < lines.length - 3; i++){
    if (sum(lines.slice(i, i + 3)) > sum(lines.slice(i-1, i + 2))){
        // console.log(`${i-1}: ${lines[i-1]} -> ${i} : ${lines[i]}`)
        increases++; 
    }
}
console.log(increases);


// Solution approach two: reduce

const answer = lines.slice(1).reduce((acc: number,curr:number,ind: number,arr: number[]) => {
    //quick fix
    if (ind > arr.length - 3)
        return acc;

    return acc + (
                sum(arr.slice(ind, ind + 3)) > sum (lines.slice(ind, ind + 3))// this window > previous window
                 ? 1:0 
                );
    // Note, using lines not arr (which is the sliced lines). The index "drags" behind
}, 
0 // initial value is accumulation start
);

//This somehow got the right answer, but there's a bit of an issue- we are doing slices less than size 3 towards the end.

console.log(`Reduce Answer: ${answer}`)



