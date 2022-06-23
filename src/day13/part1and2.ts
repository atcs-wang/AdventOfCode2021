import * as read_input from '../utils/read_input';
import {Coordinate, SparseGrid} from "../utils/grid"

let chunks : string[][] = read_input.linesAsChunkedStringArray(13,/\r?\n\r?\n/ , "");
const def = ".";
const mark = "#";

class DotGrid extends SparseGrid<string> {
    constructor(){
        super(def);
    }
}



let grid = new DotGrid();
chunks[0].map(x => x.split(",")).forEach(coord => grid.set(mark,Number(coord[1]),Number(coord[0])));

let folds : ["x" | "y", number][] = chunks[1].map(line => line.substring(10).trim().split("=")).map(arr => [arr[0] as ("x" | "y"), Number(arr[1])]);

// console.log(grid.toString());

function fold(grid : DotGrid, axis : "x" | "y", line : number): DotGrid{
    let newgrid = new DotGrid();
    if (axis === "y"){
        grid.forEachSparse((val: string, row: number, col: number) => {
            newgrid.set(mark, row < line ? row : line - (row - line), col)
        });
    } else {
        grid.forEachSparse((val: string, row: number, col: number) => {
            newgrid.set(mark, row, col < line ? col : line - (col - line))
        });
    }
    return newgrid;
}

console.log(grid.size());

for (let f of folds){
    grid = fold(grid, ...f);
    // console.log(grid.toString());
    console.log(f)
    console.log(grid.size());
}
console.log(grid.toString())
