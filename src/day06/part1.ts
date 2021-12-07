import * as read_input from '../utils/read_input';


let state: number[] = read_input.linesAsNumberArr(6, ",")


console.log("Initial state: "+  state.join(","));

for (let days = 1; days <= 80; days++){

    state = state.map(fish => fish > 0 ? fish - 1 : [6,8] ).flat();
    console.log(`After ${days} days: (${state.length})`);
}

