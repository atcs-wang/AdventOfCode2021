import * as read_input from '../utils/read_input';

interface Display {
    patterns :string[];
    outputs: string[];
}

const lines : Display[] = read_input.linesAsStringArray(8).map(line=> {
    let a = line.split(/\s+/g); 
    return {patterns: a.slice(0,10), outputs: a.slice(11)}
});

console.log(lines.length)
let valids = [2,3,4,7];
let count: number = 0;
for (let display of lines){
    for (let output of display.outputs){
        count += (valids.includes(output.length)) ? 1 : 0;
    }
}
console.log(count);