import * as read_input from '../utils/read_input';
import {Coordinate} from "../utils/grid"
import {BingoBoard} from "./bingo";

let chunks : string[][] = read_input.linesAsChunkedStringArray(4);

let nums = chunks[0][0].split(",").map(Number);

let boards : BingoBoard[] = chunks.slice(1).map(chunk => new BingoBoard(chunk));

outerloop:
for (let num of nums){
    for (let [index, board] of boards.entries()){
        
        let marked : Coordinate | null  = board.mark(num);
        if (marked !== null && board.justWonAt(marked)){
            console.log(`Player ${index} won on ${num}; Score: ${num * board.sumRemaining()}`);
            board.tablePrint();
            break outerloop;
        }

    }

}


// boards.forEach((b, i) => { 
//     console.log(`Player ${i}:`);
//     b.tablePrint()
// })
