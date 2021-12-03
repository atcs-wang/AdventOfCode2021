import * as read_input from '../utils/read_input';
const lines : string[] = read_input.linesAsStringArray(3);

let bit_sums : number[] = Array(lines[0].length).fill(0);

for (let line of lines) {
    for (let i : number = 0; i < bit_sums.length; i++){
        bit_sums[i] += Number(line.charAt(i));
    } 
}
console.log(bit_sums);
let threshold = lines.length / 2;

let most_common_bits : number[] = bit_sums.map(bs => bs > threshold ? 1 : 0) 
console.log(most_common_bits);
let epsilon : number = parseInt(most_common_bits.join(""), 2);

let gamma = epsilon ^ (Math.pow(2, bit_sums.length) - 1);

console.log(`epsilon ${epsilon}; gamma ${gamma}; multi ${epsilon * gamma}`)