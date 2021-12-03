import * as read_input from '../utils/read_input';
const lines : string[] = read_input.linesAsStringArray(3);

function filter_by_most_common(){
    let filtered_lines = lines;
    let bits : number = lines[0].length;
    for (let i = 0; filtered_lines.length > 1 && i < bits; i++) {
        let bit_sum : number = 0;
        for (let line of filtered_lines) {
            bit_sum += Number(line.charAt(i));
        }
        let threshold = filtered_lines.length / 2;
        let most_common_bit: string = bit_sum >= threshold ? '1' : '0';
        filtered_lines = filtered_lines.filter((line:string) => line.charAt(i) == most_common_bit);
    }
    return filtered_lines[0];
}


function filter_by_least_common(){
    let filtered_lines = lines;
    let bits : number = lines[0].length;
    for (let i = 0; filtered_lines.length > 1 && i < bits; i++) {
        let bit_sum : number = 0;
        for (let line of filtered_lines) {
            bit_sum += Number(line.charAt(i));
        }
        let threshold = filtered_lines.length / 2;
        let least_common_bit: string = bit_sum >= threshold ? '0' : '1';
        filtered_lines = filtered_lines.filter((line:string) => line.charAt(i) == least_common_bit);
    }
    return filtered_lines[0];
}

let oxy = filter_by_most_common();
let c02 = filter_by_least_common();

console.log(`oxy ${oxy} (${parseInt(oxy, 2)})`);
console.log(`c02 ${c02} (${parseInt(c02, 2)})`);
console.log(`oxy * c02 : ${parseInt(c02, 2) * parseInt(oxy, 2)}`);