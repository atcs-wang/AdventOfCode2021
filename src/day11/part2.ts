import * as read_input from '../utils/read_input';
import {Coordinate, Grid, BetterGrid, linesToType2DArray, toCoord} from "../utils/grid"


let octopuses : BetterGrid<number> = new BetterGrid<number>(linesToType2DArray(read_input.linesAsStringArray(11,false),Number, ""));

function printGrid(grid :BetterGrid<number>) {
    console.log(grid.asString("",1));
}

//In place?
function doStep(grid : BetterGrid<number>) : [BetterGrid<number>, number] {
    grid = new BetterGrid(grid.map((val, row, col) => val + 1));
    // console.log("Increment:")
    // printGrid(grid)
    let flashed = new Set<string>();
    let num_flashes = 0;
    // let fp = 1;
    do {
        num_flashes = flashed.size;
        grid.forEach((val, row, col) => {
            let coord = toCoord(row,col);
            let coordRecord = JSON.stringify(coord);
            //check for new flash
            if (val > 9 && !flashed.has(coordRecord)){
                //increment adjacent 
                grid.get_neighbor_coords(coord,1,1).forEach(nc => {
                    grid.set(grid.get(nc) + 1,nc)
                });
                
                flashed.add(coordRecord);    
            }
        });
        // console.log("Flash pass:" + fp++);
        // printGrid(grid)
    }while (flashed.size > num_flashes);

    //reset flashed
    grid.forEach((val, row, col) => {
        if (val > 9){
            grid.set(0, row, col)
        }
    });

    return [grid, num_flashes];
}


console.log("Before any steps:")
printGrid(octopuses);
let total_flashes = 0;
let all_flashed_steps : number[] = []
let step = 0; 
let octoCount = octopuses.width() * octopuses.height();
let num_flashes;
while(num_flashes !== octoCount){
    step++;
    [octopuses, num_flashes] = doStep(octopuses); 
    total_flashes += num_flashes;
    console.log(`After step ${step}:`)
    printGrid(octopuses);
    console.log(`${num_flashes} flashes; total : ${total_flashes}`)
}
console.log(step)