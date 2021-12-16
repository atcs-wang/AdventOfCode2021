import * as read_input from '../utils/read_input';
import {Graph,Path, PathNode, AdjacencyListGraph} from '../utils/graph';
import { start } from 'repl';
interface Connection {
    a: string;
    b: string;
}

let input : Connection[] = read_input.linesAsStringArray(12, "")
            .map(x => x.trim().split("-"))
            .map(arr => ({a:arr[0],
                        b:arr[1]}
                        )
                        );
// console.log(input)
let graph : AdjacencyListGraph<string> = new AdjacencyListGraph<string>();
for (let c of input){
    // console.log(c)
    graph.biconnect(c.a,c.b);
}

class SpecialPath extends Path<string> {
    readonly smallCaveRevisited : boolean;
    constructor(start_end:string | PathNode<string>, smallCaveRevisited:boolean = false){
        super(start_end);
        this.smallCaveRevisited = smallCaveRevisited;
    }
    
    extendSafe(next:string) : SpecialPath | undefined {
        if (next.toLowerCase() === next && this.contains(next))
        {
            if (this.smallCaveRevisited)
                return undefined;
            else 
                return new SpecialPath(new PathNode(next, this.end), true);
        }
        else
            return new SpecialPath(new PathNode(next, this.end), this.smallCaveRevisited);

    }

    exploreSafe(next:Iterable<string>) : SpecialPath[] {
        let paths : SpecialPath[] = [];
        for (let n of next){
            let x = this.extendSafe(n);
            if (x !== undefined)
                paths.push(x);
        }
        return paths;
    }
}

let frontier : SpecialPath[] = [new SpecialPath("start")];
let completePaths : SpecialPath[] = []

while (frontier.length > 0){
    let expansionPath : SpecialPath = frontier.pop() as SpecialPath;
    if (expansionPath.end.vertex == "end")
        completePaths.push(expansionPath);
    else {
        frontier.push(...expansionPath.exploreSafe(
            graph.getAdjacent(expansionPath.end.vertex).filter(x => x !== "start")
            ));
    }
}
console.log(completePaths.map(p => p.toString()));
console.log(completePaths.length);
// console.log(graph.toString());




