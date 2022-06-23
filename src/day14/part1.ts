import * as read_input from '../utils/read_input';

let chunks : string[][] = read_input.linesAsChunkedStringArray(14,/\r?\n\r?\n/ , "");

let rules : Map<string,string> = new Map<string,string>(chunks[1].map(l => l.split(" -> ") as [string, string]))
console.log(rules)
let template : string = chunks[0][0].trim();

function applyStep(polymer : string): string {
    let newPolymer = polymer.charAt(0);
    for (let i = 1; i < polymer.length; i++){
        let pair = polymer.slice(i-1,i+1);
        let newElement = rules.get(pair);
        newPolymer += newElement + polymer.charAt(i)
    }
    return newPolymer;
}
console.log("Template:" + template)
let polymer = template;
for (let i = 1; i <= 10; i++){
    polymer = applyStep(polymer)
    console.log(`After step ${i}: (${polymer.length})`)
}

let counts: Map<string,number> = new Map();

for (let i = 0; i < polymer.length; i++){
    let e = polymer.charAt(i);
    counts.set(e,(counts.get(e) || 0) + 1)
}

let most = Math.max(...counts.values())
let least = Math.min(...counts.values())
console.log(counts)
console.log(most - least);