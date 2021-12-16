import * as read_input from '../utils/read_input';
import {Coordinate, Grid, BetterGrid, linesToType2DArray, toCoord} from "../utils/grid"


let grid : BetterGrid<number> = new BetterGrid<number>(linesToType2DArray(read_input.linesAsStringArray(9),Number, ""));

// return undefined for non-low points, and low point risk if low point
function getLowPointRisk(val : number, row : number, col :number) : number | undefined{
    if (grid.get_neighbors_diamond(toCoord(row,col), 1).every((n:number) => n > val))
        return val + 1
    return undefined;
}

// Get all low point values
let risks : number[] = grid.map(getLowPointRisk).flat().filter(val => val !== undefined) as number[];

console.log(risks);
console.log(risks.reduce((a :number,b:number) => a + b))
