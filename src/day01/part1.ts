import * as read_input from '../utils/read_input';
const lines : number[] = read_input.linesAsNumberArr(1);

// Solution approach one: classic for loop
let increases = 0;
for (let i = 1; i < lines.length; i++){
    if (lines[i] > lines[i-1]){
        // console.log(`${i-1}: ${lines[i-1]} -> ${i} : ${lines[i]}`)
        increases++; 
    }
}
console.log(increases);

// Solution approach two: reduce

const answer = lines.slice(1).reduce((acc: number,curr:number,ind: number,arr: number[]) => {
    return acc + (curr > lines[ind] ? 1:0 );
    // Note, using lines not arr (which is the sliced lines). The index "drags" behind
}, 
0 // initial value is accumulation start
);
console.log(`Reduce Answer: ${answer}`)



