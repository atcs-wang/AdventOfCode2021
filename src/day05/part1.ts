import * as read_input from '../utils/read_input';
import {Coordinate, toCoord, Grid, FixedInitGrid} from "../utils/grid"

let lines : [Coordinate, Coordinate ][] = read_input.linesAsStringArray(5).map(s => {
    let [a,b] = s.split(" -> ");
    return [toCoord(a), toCoord(b)];
} );

// Important - ignore nonhorizontal lines
lines = lines.filter(([a,b]) => a.row == b.row || a.col == b.col )

let grid : FixedInitGrid<number> = new FixedInitGrid(1000,1000,0);

for (let [a,b] of lines){
    console.log(a,b)
    // go in line between a and b
    let low :Coordinate = toCoord(Math.min(a.row, b.row), Math.min(a.col, b.col))
    let high :Coordinate = toCoord(Math.max(a.row, b.row), Math.max(a.col, b.col))
    for (let row = low.row; row <= high.row; row++ ){
        for(let col = low.col; col <= high.col; col++) {
            grid.set(grid.get(row,col) + 1, row, col);
        }
    }

}


let gridString = grid.asString("", 4).replace(/0/g,".");
console.log(gridString);
console.log(grid.grid.flat().filter(val => val > 1).length)