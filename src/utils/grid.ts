import { assert } from "console";

interface Coordinate {
    row:number;
    col:number;
}

function toCoord(r:number, c:number): Coordinate;
function toCoord(str:string): Coordinate;
function toCoord(strOrR:string|number, c?:number): Coordinate
{   
    if (c !== undefined){
        return {row: strOrR as number, col: c}
    }
    else {
        let [r,c] = (strOrR as string).split(",");
        return {row: Number(r) as number, col: Number(c)}
    }   
}

interface Grid<Type> {
    height() : number;
    width() : number; 

    get(row: number, col: number) : Type;
    get(coord: Coordinate) : Type;

    set(val: Type, row: number, col: number ) : void;
    set(val: Type, coord: Coordinate) : void;
}


function linesToType2DArray<Type>(lines: string[], convertFunc : ((x:string) => Type),
delimiter : (string | RegExp) = /\s+/) :  Type[][] {
    let grid: Type[][] = lines.map((line:string) => line.trim().split(delimiter).map(convertFunc));
    // check that rows are the same length;
    assert(grid.every(row => row.length === grid[0].length))
    return grid;
}

class BasicGrid<Type> implements Grid<Type> {
    grid: Type[][];

    constructor(grid: Type[][]){
        this.grid = grid;
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

    getOrDefault(coord: Coordinate, defaultVal?:any){
        if (this.grid[coord.row] === undefined)
            return defaultVal;
        if (this.grid[coord.row][coord.col] == undefined)
            return defaultVal;
        return this.grid[coord.row][coord.col];
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

    asString(delimiter: string, colWidth: number): string {
        return this.grid.map(row => row.map(v => String(v).padStart(colWidth, " ")).join(delimiter)).join("\n");
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

    get_neighbors(coord: Coordinate,col_dist: number, row_dist: number): Type[]{
        let neighbors: Type[] = [];
        for (let dr =  -row_dist; dr <= row_dist; dr++){
            for (let dc = -col_dist; dc <= col_dist; dc++){
                if (dr === 0 && dc === 0)
                    continue
                let n = this.getOrDefault(toCoord(coord.row + dr,coord.col + dc), undefined);
                if (n !== undefined){
                    neighbors.push(n);
                }
            }    
        }
        return neighbors
    }

    // Awful copy and pasted code
    get_neighbor_coords(coord: Coordinate,col_dist: number, row_dist: number): Coordinate[]{
        let neighbors: Coordinate[] = [];
        for (let dr =  -row_dist; dr <= row_dist; dr++){
            for (let dc = -col_dist; dc <= col_dist; dc++){
                if (dr === 0 && dc === 0)
                    continue
                let n = this.getOrDefault(toCoord(coord.row + dr,coord.col + dc), undefined);
                if (n !== undefined){
                    neighbors.push(toCoord(coord.row + dr,coord.col + dc)); //only change
                }
            }    
        }
        return neighbors
    }

    get_neighbors_diamond(coord: Coordinate, dist: number): Type[]{
        let neighbors: Type[] = [];
        for (let dr =  -dist; dr <= dist; dr++){
            for (let dc = -dist; dc <= dist; dc++){
                if ((dr === 0 && dc === 0) ||  Math.abs(dr) + Math.abs(dc) > dist)
                    continue 
                let n = this.getOrDefault(toCoord(coord.row + dr,coord.col + dc), undefined);
                if (n !== undefined){
                    neighbors.push(n);
                }
            }    
        }
        return neighbors
    }

    get_neighbor_coords_diamond(coord: Coordinate, dist: number): Coordinate[]{
        let neighbors: Coordinate[] = [];
        for (let dr =  -dist; dr <= dist; dr++){
            for (let dc = -dist; dc <= dist; dc++){
                if ((dr === 0 && dc === 0) ||  Math.abs(dr) + Math.abs(dc) > dist)
                    continue 
                let n = this.getOrDefault(toCoord(coord.row + dr,coord.col + dc), undefined);
                if (n !== undefined){
                    neighbors.push(toCoord(coord.row + dr,coord.col + dc)); //only change
                }
            }    
        }
        return neighbors
    }

    /**
     * Performs in row major order
     * @param func 
     */
    map<fType>(func : (val:Type,row:number, col:number) => fType ): fType[][]{
        return this.grid.map(
            (row:Type[], row_index) => row.map(
                (val: Type, col_index) => func(val, row_index, col_index)
            )
        );
    }

    forEach(func : (val:Type,row:number, col:number) => any):void{
        for (let row = 0; row < this.height(); row++){
            for (let col = 0; col < this.width(); col++){
                func(this.get(row,col), row, col);
            }
        }
    }
}

class FixedInitGrid<Type> extends BetterGrid<Type> {
    constructor(height: number, width: number, val : Type) {
        super(new Array(height).fill([]).map(() => new Array(width).fill(val) ));
    }
}

class SparseGrid<Type> implements Grid<Type> {
    private grid: Map<string,Type>;
    _min_height: number;
    _max_height: number;
    _min_width: number;
    _max_width: number;
    readonly _defaultVal : Type;

    constructor(defaultVal : Type) {
        this.grid = new Map();
        this._min_height = Number.POSITIVE_INFINITY;
        this._max_height = Number.NEGATIVE_INFINITY;
        this._min_width = Number.POSITIVE_INFINITY;
        this._max_width = Number.NEGATIVE_INFINITY;
        this._defaultVal = defaultVal;
    }

    private updateRanges(rowOrCoord: number | Coordinate, col?: number){
        // Weird reversals to deal with NaN comparisons always producing falsy 
        if (col !== undefined){
            this._min_height = Math.min(this._min_height, rowOrCoord as number);
            this._max_height =Math.max(this._max_height, rowOrCoord as number);
            this._min_width = Math.min(this._min_width, col);
            this._max_width = Math.max(this._max_width, col);
        }
        else {
            let coord = rowOrCoord as Coordinate;
            this._min_height = Math.min(this._min_height, coord.row);
            this._max_height =Math.max(this._max_height, coord.row);
            this._min_width = Math.min(this._min_width, coord.col);
            this._max_width = Math.max(this._max_width, coord.col);
        }
    }

    height(): number {
        return this._max_height - this._min_height;
    }
    width(): number {
        return this._max_width - this._min_width;
    }

    private coordEncode(rowOrCoord: number | Coordinate, col?: number):  string {
        let coord : string;
        if (col !== undefined)
            coord = JSON.stringify(toCoord(rowOrCoord as number, col));
        else {
            coord = JSON.stringify(rowOrCoord as Coordinate);
        }
        return coord;
    }

    get(row: number, col: number) : Type ;
    get(coord: Coordinate) :  Type ;
    get(rowOrCoord: number | Coordinate, col?: number):  Type  {
        let coord : string = this.coordEncode(rowOrCoord, col);
        return this.grid.has(coord) ? this.grid.get(coord) as Type : this._defaultVal; 
    }

    set(val: Type, row: number, col: number ) : void;
    set(val: Type, coord: Coordinate) : void;
    set(val: Type, rowOrCoord: number | Coordinate, col?: number): void {
        this.updateRanges(rowOrCoord, col);
        let coord : string = this.coordEncode(rowOrCoord, col);
        this.grid.set(coord, val);
    }

    asArray(): Type[][]{
        let a : Type[][] = [];
        for (let r = this._min_height; r <= this._max_height; r++){
            let row : Type[] = [];
            for (let c = this._min_width; c <= this._max_width; c++){
                row.push(this.get(r, c));
            }
            a.push(row);
        }
        return a;
    }


    asString(delimiter: string): string {
        return this.asArray().map(row => row.join(delimiter)).join("\n");
    }

    toString(){
        return this.asString("");
    }

    forEach(func : (val:Type, row:number, col:number) => any):void{
        for (let row = 0; row < this.height(); row++){
            for (let col = 0; col < this.width(); col++){
                func(this.get(row,col), row, col);
            }
        }
    }

    forEachSparse(func : (val:Type, row:number, col:number) => any):void{
        for (let [coordString, val] of this.grid.entries()){
            let coord : Coordinate = JSON.parse(coordString);
            func(val, coord.row, coord.col);
        }
    }

    size():number{
        return this.grid.size;
    }
}

export {Grid, Coordinate, toCoord, linesToType2DArray, BasicGrid, BetterGrid, SparseGrid, FixedInitGrid}
