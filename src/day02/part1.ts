import * as read_input from '../utils/read_input';
const commands : [string, number][] = read_input.linesAsStringArray(2)
                            .map( (line :string) => line.split(" "))
                            .map((line : string[]) => [line[0], Number(line[1])] );

let depth = 0;
let  horz = 0;
for (let [com, num] of commands) {
    switch(com){
        case 'forward':
            horz += num;
        break;
        case 'down':
            depth += num;
        break;
        case 'up':
            depth -= num;
        break;
        case '': //last line
        break;
        default:
            // throw new Error("Invalid Command");
    }
}

console.log(`Depth ${depth}, Horz ${horz}: Mult ${depth * horz}`)


