import * as read_input from '../utils/read_input';
import {Graph,Path,AdjacencyListGraph} from '../utils/graph';
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


let frontier : Path<string>[] = [new Path<string>("start")];
let completePaths : Path<string>[] = []
while (frontier.length > 0){
    let expansionPath : Path<string> = frontier.pop() as Path<string>;
    if (expansionPath.end.vertex == "end")
        completePaths.push(expansionPath);
    else {
        frontier.push(...expansionPath.explore(
                graph.getAdjacent(expansionPath.end.vertex)
                .filter((v : string ) => {
                    //only explore capital (big) caves and not yet visited caves
                    return (v.toUpperCase() === v || !expansionPath.contains(v))
                })
                )
                );
    }
}
console.log(completePaths.map(p => p.toString()));
console.log(completePaths.length);
// console.log(graph.toString());




