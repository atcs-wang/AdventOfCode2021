import * as read_input from '../utils/read_input';


let state: number[] = read_input.linesAsStringArray(6)[0].split(",").map(Number);

let counter : number[] = new Array(9).fill(0);
for (let fish of state){
    counter[fish] += 1;    
}

console.log("Initial state: "+  counter.join(","));


for (let days = 1; days <= 256; days++){
    let gen = counter[0]
    counter = counter.slice(1) ;
    counter.push(gen);
    counter[6] += gen;
    console.log(`After ${days} days: (${counter.reduce((a,b) => (a+b))}) ${ counter.join(",")}`);
}

