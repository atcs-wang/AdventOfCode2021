import * as read_input from '../utils/read_input';

interface Display {
    patterns :string[];
    outputs: string[];
}

const lines : Display[] = read_input.linesAsStringArray(8).map(line=> {
    let a = line.split(/\s+/g); 
    return {patterns: a.slice(0,10), outputs: a.slice(11)}
});

const ORIGINAL_PATTERNS = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg","abdefg","acf", "abcdefg","abcdfg"]
const SEGMENTS = "abcdefg"
function countSegments(patterns : string[]) : Map<string, number>{
    let counts = new Map<string,number>();
    for (let c of SEGMENTS){
        counts.set(c,0);
    }
    for (let code of patterns){
        for (let c of code){
            counts.set(c, counts.get(c) as number + 1); 
        }
    }
    return counts;
}

const correct_counts = countSegments(ORIGINAL_PATTERNS)

console.log();
//   {
//     'a' => 8,
//     'b' => 6,*
//     'c' => 8,
//     'd' => 7,
//     'e' => 4,*
//     'f' => 9,*
//     'g' => 7
//   }

// 'a' vs 'c' - only 'c' shows up in the unique "1" ( 2 segments ) 
// 'd' vs 'g' - only 'd' shows up in the unique "4" ( 4 segments )

function patternsToSegmentMapping(patterns : string[]) : Map<string,string>{
    let counts = countSegments(patterns);
    let pattern1 :string = patterns.find(p => p.length == 2) as string;
    let pattern4 :string= patterns.find(p => p.length == 4) as string; 
    let segment_map = new Map<string,string>();
    counts.forEach((val, key) => {
        let to:string;
        switch(val){
            case 4:
                to = 'e';
                break;
            case 6:
                to = 'b';
                break;
            case 9:
                to = 'f';
                break;
            case 8:
                to = pattern1.includes(key) ? 'c' : 'a';  
                break;
            case 7: 
                to = pattern4.includes(key) ? 'd' : 'g';
                break;
            default:
                throw new Error("This shouldn't happen")
        }
        segment_map.set(key, to);
    });

    return segment_map;
}

function outputToOriginalPattern(output: string, segment_map: Map<string,string>): string{
    let pattern: string = ""
    for (let segment of output){
        pattern += segment_map.get(segment);
    }
    return pattern.split('').sort().join('');
}

function originalPatternToDigit(pattern: string) : number {
    return ORIGINAL_PATTERNS.indexOf(pattern);
}


function digitsToValue(digits: number[]){
    return digits.reduce((val : number, digit : number) => {
        return val * 10 + digit;
    }, 0);
}

interface Display {
    patterns :string[];
    outputs: string[];
}

function displayToValue(display :Display): number {
    let segment_map = patternsToSegmentMapping(display.patterns);
    return digitsToValue(display.outputs.map(output => outputToOriginalPattern(output, segment_map)).map(originalPatternToDigit))
} 


let sum: number = 0;
for (let display of lines){
    sum += displayToValue(display);
}
console.log(sum);