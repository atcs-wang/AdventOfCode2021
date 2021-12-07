import {BetterGrid, Coordinate, linesToType2DArray} from '../utils/grid';

//undefined is "marked"
class BingoBoard extends BetterGrid< number | undefined> {
    
    constructor(lines: string[]){
        super(linesToType2DArray(lines, Number));
    }

    mark(num: number) : Coordinate | null {
        for (let r = 0; r < this.height(); r++){
            for (let c= 0; c < this.width(); c++){
                if (this.get(r,c) == num){
                    this.set(undefined, r,c );
                    return {row:r, col:c};
                }
            }
        }
        return null;
    }

    justWonAt(coord: Coordinate ) : boolean {
        return (this.get_row(coord).every(num => num === undefined) 
                || this.get_col(coord).every(num => num === undefined))
    }

    sumRemaining() : number {
        // return this.grid.reduce((sum,row) => sum + (row.reduce((s,c) => (s as number) + (c || 0), 0) as number), 0)
        let sum = 0;
        for (let r = 0; r < this.height(); r++){
            for (let c= 0; c < this.width(); c++){
                sum += this.get(r,c) || 0;
            }
        }
        return sum;
    }

}

export {BingoBoard}