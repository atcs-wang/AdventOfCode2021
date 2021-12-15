import * as read_input from '../utils/read_input';

type OpeningBracket = "{" | "[" | "(" | "<"
type ClosingBracket = "}" | "]" | ")" | ">"

let lines : string[] = read_input.linesAsStringArray(10,false).map(s => s.trim());
let closingOf = new Map<OpeningBracket, ClosingBracket>([ ["{","}"],
                                                          ["[","]"],
                                                          ["(",")"],
                                                          ["<",">"]
                                                        ]);

let autocompletePoints = new Map<ClosingBracket, number>([[")", 1 ],
                                                        ["]", 2 ],
                                                        ["}", 3 ],
                                                        [">", 4 ]
                                                       ]);

function autocompleteScore(autocomplete : ClosingBracket[]) : number {
   return autocomplete.reduce((acc, next) => 5 * acc + (autocompletePoints.get(next) as number) , 0)
}

let autocompletes : (ClosingBracket[] | undefined)[] = lines.map((line:string) => {
    let stack : OpeningBracket[] = [];
    for (let i = 0; i < line.length; i++){
        let c : string = line.charAt(i)
        if (closingOf.has(c as OpeningBracket)){
            stack.push(c as OpeningBracket);
        } else {
            let expected : ClosingBracket = closingOf.get(stack.pop() as OpeningBracket) as ClosingBracket; 
            if (expected !== (c as ClosingBracket)){
                return undefined;
            } 
        }
    }
    stack.reverse()
    console.log(stack);
    return stack.map(s=> closingOf.get(s)) as ClosingBracket[];
});
let valid_autocompletes =  (autocompletes.filter(a => a !== undefined) as ClosingBracket[][])
console.log(valid_autocompletes);
let autocompleteScores = valid_autocompletes.map(autocompleteScore); 
autocompleteScores.sort((a,b) => a - b);
console.log(autocompleteScores[Math.floor(autocompleteScores.length / 2) ]);

