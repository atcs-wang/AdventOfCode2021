import * as read_input from '../utils/read_input';

type OpeningBracket = "{" | "[" | "(" | "<"
type ClosingBracket = "}" | "]" | ")" | ">"

let lines : string[] = read_input.linesAsStringArray(10,false);

let closingOf = new Map<OpeningBracket, ClosingBracket>([ ["{","}"],
                                                          ["[","]"],
                                                          ["(",")"],
                                                          ["<",">"]
                                                        ]);

let syntaxErrorScore = new Map<ClosingBracket, number>([[")", 3 ],
                                                        ["]", 57 ],
                                                        ["}", 1197 ],
                                                        [">", 25137 ]
                                                       ]);

let scores = lines.map((line:string) => {
    let stack : OpeningBracket[] = [];
    for (let i = 0; i < line.length; i++){
        let c : string = line.charAt(i)
        if (closingOf.has(c as OpeningBracket)){
            stack.push(c as OpeningBracket);
        } else {
            let expected : ClosingBracket = closingOf.get(stack.pop() as OpeningBracket) as ClosingBracket; 
            if (expected !== (c as ClosingBracket)){
                return syntaxErrorScore.get(c as ClosingBracket) as number;
            } 
        }
    }
    return undefined;
});

console.log(scores);
console.log((scores.filter(a => a !== undefined) as number[]).reduce((a,b) => a + b));

