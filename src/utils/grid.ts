import { assert } from "console";

interface Coordinate {
    row:number;
    col:number;
}

interface Grid<Type> {
    height() : number;
    width() : number; 

    get(row: number, col: number) : Type;
    get(coord: Coordinate) : Type;

    set(val: Type, row: number, col: number ) : void;
    set(val: Type, coord: Coordinate) : void;
}

class BasicGrid<Type> implements Grid<Type> {
    grid: Type[][];

    constructor(lines: string[], convertFunc : ((x:string) => Type),
                delimiter : (string | RegExp) = /\s+/) {
        this.grid = lines.map((line:string) => line.trim().split(delimiter).map(convertFunc));
        // check that rows are the same length;
        assert(this.grid.every(row => row.length === this.grid[0].length))
    }
    height(): number {
        return this.grid.length;
    }
    width(): number {
        return this.grid[0].length;
    }
    get(row: number, col: number) : Type;
    get(coord: Coordinate) : Type;
    get(rowOrCoord: number | Coordinate, col?: number): Type {
        if (col !== undefined)
            return this.grid[rowOrCoord as number][col];
        else {
            let coord = rowOrCoord as Coordinate;
            return this.grid[coord.row][coord.col];
        }
    }

    set(val: Type, row: number, col: number ) : void;
    set(val: Type, coord: Coordinate) : void;
    set(val: Type, rowOrCoord: number | Coordinate, col?: number): void {
        if (col !== undefined)
            this.grid[rowOrCoord as number][col] = val;
        else {
            let coord = rowOrCoord as Coordinate;
            this.grid[coord.row][coord.col] = val;
    }
    }

    tablePrint():void {
        console.table(this.grid);
    }
}

class BetterGrid<Type> extends BasicGrid<Type> {
    
    get_row(row: number ): Type[];
    get_row(coord: Coordinate): Type[];
    get_row(rowOrCoord: number | Coordinate): Type[]{
        let row = rowOrCoord.hasOwnProperty("row") ? (rowOrCoord as Coordinate).row : rowOrCoord  as number; 
        assert(row >= 0  && row < this.height())
        return this.grid[row];
        
    }

    get_col(col: number): Type[];
    get_col(coord: Coordinate): Type[];
    get_col(colOrCoord: number | Coordinate): Type[]{
        let col = colOrCoord.hasOwnProperty("col") ? (colOrCoord as Coordinate).col : colOrCoord  as number; 
        assert(col >= 0  && col < this.width())
        return this.grid.map(row => row[col]);
    }

    transposed(): Type[][]{
        let t : Type[][] = [];
        for (let col = 0; col < this.width(); col++){
            t.push(this.grid.map(row => row[col]));
        }
        return t;
    }
}

export {Grid, Coordinate, BasicGrid, BetterGrid}
