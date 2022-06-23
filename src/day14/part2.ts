import * as read_input from '../utils/read_input';

let chunks : string[][] = read_input.linesAsChunkedStringArray(14,/\r?\n\r?\n/ , "");

let rules : Map<string,string> = new Map<string,string>(chunks[1].map(l => l.split(" -> ") as [string, string]))
console.log(rules)
let template : string = chunks[0][0].trim();

let polymerPairCounts: Map<string,number> = new Map();
for (let i = 1; i < template.length; i++){
    let pair = template.slice(i-1,i+1);
    polymerPairCounts.set(pair,(polymerPairCounts.get(pair) || 0) + 1)
}



function applyStep(polymerPairCounts : Map<string,number>): Map<string,number> {
    let newPolymerPairCounts: Map<string,number> = new Map();

    for (let [pair, count] of polymerPairCounts.entries()){
        let newElement = rules.get(pair);
        let left = pair.charAt(0) + newElement;
        let right =  newElement + pair.charAt(1);

        newPolymerPairCounts.set(left,(newPolymerPairCounts.get(left) || 0) + count);
        newPolymerPairCounts.set(right,(newPolymerPairCounts.get(right) || 0) + count);
    }
    return newPolymerPairCounts;
}
console.log("Template:" + template)

for (let i = 1; i <= 40; i++){
    polymerPairCounts = applyStep(polymerPairCounts)
    let size = Array.from(polymerPairCounts.values()).reduce((a,b) => a + b) + 1;
    console.log(`Finished step ${i}: (${size})`);
}

//final count of elements
 
let elementCounts: Map<string,number> = new Map();
//Count the first element, which is undercounted in the pairs
elementCounts.set(template.charAt(0), 1)

for (let [pair, count] of polymerPairCounts.entries()){
    let right = pair.charAt(1);
    elementCounts.set(right,(elementCounts.get(right) || 0) + count);
}

let most = Math.max(...elementCounts.values())
let least = Math.min(...elementCounts.values())
console.log(elementCounts)
console.log(most - least);