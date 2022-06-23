import * as read_input from '../utils/read_input';

let chunks : string[][] = read_input.linesAsChunkedStringArray(14,/\r?\n\r?\n/ , "");

let rules : Map<string,Map<string,string>> = new Map()

chunks[1].forEach( l => {
    let [a, b, c] = [l.charAt(0), l.charAt(1), l.charAt(6)];

    if (!rules.has(a))
        rules.set(a, new Map<string, string>());
    (rules.get(a) as Map<string, string>).set(b, c);
});

console.log(rules)
let template : string = chunks[0][0].trim();


console.log("Template:" + template)

let counts: Map<string,number> = new Map();
function countE(e:string){
    counts.set(e,(counts.get(e) || 0) + 1)
}

for (let i = 0; i < template.length; i++){
    countE(template.charAt(i));
}

function countInRecursiveSteps(a : string, b : string, steps : number) {
    if (steps == 0)
        return;
    let newElement = rules.get(a)?.get(b) as string;
    countE(newElement);

    countInRecursiveSteps(a,  newElement, steps - 1);
    countInRecursiveSteps(newElement, b, steps - 1);
    
}

for (let i = 1; i < template.length; i++){
    let [a,b] = [template.charAt(i-1), template.charAt(i)];
    console.log("Counting between pair " + a + b);
    countInRecursiveSteps(a,b, 40);
}

let most = Math.max(...counts.values())
let least = Math.min(...counts.values())
console.log(counts)
console.log(most - least);