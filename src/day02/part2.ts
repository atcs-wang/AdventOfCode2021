import * as read_input from '../utils/read_input';
const commands : [string, number][] = read_input.linesAsStringArray(2)
                            .map( (line :string) => line.split(" "))
                            .map((line : string[]) => [line[0], Number(line[1])] );

let aim = 0;
let depth = 0;
let  horz = 0;
for (let [com, num] of commands) {
    switch(com){
        case 'forward':
            horz += num;
            depth += aim * num;
        break;
        case 'down':
            aim += num;
        break;
        case 'up':
            aim -= num;
        break;
        case '': //last line
        break;
        default:
            throw new Error("Invalid Command");
    }
}

console.log(`depth ${depth}, Horz ${horz}: Mult ${depth * horz}`)


