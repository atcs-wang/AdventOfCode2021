import * as read_input from '../utils/read_input';
import {Coordinate, Grid, BetterGrid, linesToType2DArray, toCoord} from "../utils/grid"


let grid : BetterGrid<number> = new BetterGrid<number>(linesToType2DArray(read_input.linesAsStringArray(9),Number, ""));

// return undefined for non-low points, and low point's coords if low point
function getLowPointRisk(val : number, row : number, col :number) : Coordinate | undefined{
    if (grid.get_neighbors_diamond(toCoord(row,col), 1).every((n:number) => n > val))
        return toCoord(row,col);
    return undefined;
}

// Get all low point coordinates
let low_points : Coordinate[] = grid.map(getLowPointRisk).flat().filter(val => val !== undefined) as Coordinate[];

console.log(low_points);

let basin_sizes : number[] = low_points.map( (low_point:Coordinate) =>
{
    //perform a DFS/BFS search for basin area from low point
    let basin : Set<string>= new Set()    
    let frontier : Coordinate[] = [low_point];
    while (frontier.length > 0){
        let next : Coordinate = frontier.pop() as Coordinate;
        let level : number = grid.get(next); 
        if (level < 9 && !basin.has(JSON.stringify(next))){
            //add to basin. If it is a repeat, the Set will ignore it.
            basin.add(JSON.stringify(next));
            //add any neighbors that are equal or higher level to frontier
            frontier.push(...grid.get_neighbor_coords_diamond(next,1).filter(n_level => grid.get(n_level) >= level));
        }
    }
    console.log(basin.size);
    return basin.size;
})

basin_sizes.sort((a, b) => a - b);
console.log(basin_sizes);
console.log(basin_sizes.slice(-3).reduce((a,b) => a *b));

