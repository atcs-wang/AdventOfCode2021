

interface Graph<VType> {
    add(vertex : VType) : boolean;
    connect(from: VType, to:VType) : void;
    getVertices(): IterableIterator<VType>;
    getAdjacent(vertex: VType):VType[];
    numVertices() : number;
}

class AdjacencyListGraph<VType> implements Graph<VType> {
    connections : Map<VType,Set<VType>>;
    constructor(){
        this.connections = new Map();
    }
    
    add(vertex : VType) : boolean {
        if (this.connections.has(vertex))
            return false;
        this.connections.set(vertex, new Set<VType>());
        return true;
    }
    connect(from: VType, to:VType) : void {
        this.add(from);
        this.add(to);
        (this.connections.get(from) as Set<VType>).add(to);
    }

    biconnect(a: VType, b:VType) : void {
        this.add(a);
        this.add(b);
        (this.connections.get(a) as Set<VType>).add(b);
        (this.connections.get(b) as Set<VType>).add(a);
    }

    getVertices(): IterableIterator<VType>{
        return this.connections.keys();
    }

    getAdjacent(vertex: VType): VType[]{
        return Array.from(this.getAdjacentSet(vertex));
    }


    getAdjacentSet(vertex: VType): Set<VType>{
        return this.connections.get(vertex) || new Set<VType>();
    }

    numVertices() : number {
        return this.connections.size;
    };

    toString() : string {
        let s : string = "";
        for (let v of this.getVertices()){
            let line = v + " -> [";
            line += this.getAdjacent(v).join(' , ');
            s += line + "]\n"
        }
        return s;
    }
}

class PathNode<VType> {
    readonly vertex: VType;
    readonly from: PathNode<VType> | undefined;
    constructor(vertex: VType, from?:PathNode<VType>){
        this.vertex = vertex;
        this.from = from;
    }
}

class Path<VType>{
    readonly end: PathNode<VType>;

    constructor(start:VType);
    constructor(end:PathNode<VType>);
    constructor(start_end:VType | PathNode<VType>);
    constructor(start_end:VType | PathNode<VType>){
        this.end = (start_end instanceof PathNode) ? start_end : new PathNode(start_end) 
 
    }

    contains(vertex: VType) : boolean {
        let current : PathNode<VType> | undefined = this.end;
        while (current !== undefined) {
            if (current.vertex === vertex){
                return true;            
            }
            current = current.from;
        }
        return false;
    }

    count(vertex: VType) : number {
        let count : number = 0;
        let current : PathNode<VType> | undefined = this.end;
        while (current !== undefined) {
            if (current.vertex === vertex){
                count++;            
            }
            current = current.from;
        }
        return count;
    }

    extendAll(...next:VType[]) : Path<VType> {
        let current : PathNode<VType> = this.end;
        for (let n of next){
            current = new PathNode(n, current);
        }
        return new Path<VType>(current);
    }

    extend(next:VType) : Path<VType> {

        return new Path<VType>( new PathNode(next, this.end));
    }

    explore(next:Iterable<VType>) : Path<VType>[] {
        let paths : Path<VType>[] = [];
        for (let n of next){
            paths.push(this.extend(n));
        }
        return paths;
    }

    clone():Path<VType>{
        return new Path<VType>(this.end);
    }

    getPathList():VType[]{
        let list : VType[] = [];
        let current : PathNode<VType> | undefined = this.end;
        while (current !== undefined) {
            list.push(current.vertex);
            current = current.from;
        }
        list.reverse();
        return list;
    }

    toString(){
        return this.getPathList().join(",");
    }
}

export {AdjacencyListGraph, Graph, Path, PathNode}
