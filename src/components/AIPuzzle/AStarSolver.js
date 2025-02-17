export function aStarSolver(startState) {
  const goalState = [1, 2, 3, 4, 5, 6, 7, 8, null];

  function heuristic(state) {
    let distance = 0;
    for (let i = 0; i < state.length; i++) {
      if (state[i] !== null) {
        let goalIndex = goalState.indexOf(state[i]);
        distance += Math.abs(Math.floor(i / 3) - Math.floor(goalIndex / 3)) + 
                    Math.abs((i % 3) - (goalIndex % 3));
      }
    }
    return distance;
  }

  function getNeighbors(state) {
    const emptyIndex = state.indexOf(null);
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    const directions = [
      { dr: -1, dc: 0 }, // Up
      { dr: 1, dc: 0 }, // Down
      { dr: 0, dc: -1 }, // Left
      { dr: 0, dc: 1 } // Right
    ];
    let neighbors = [];

    for (let { dr, dc } of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
        let newState = [...state];
        let swapIndex = newRow * 3 + newCol;
        [newState[emptyIndex], newState[swapIndex]] = [newState[swapIndex], newState[emptyIndex]];
        neighbors.push(newState);
      }
    }
    return neighbors;
  }

  let openSet = [{ state: startState, path: [], heuristic: heuristic(startState) }];
  let visited = new Set();

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.heuristic - b.heuristic);
    let { state, path, heuristicValue } = openSet.shift();
    if (JSON.stringify(state) === JSON.stringify(goalState)) return path;

    let stateKey = JSON.stringify(state);
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    for (let neighbor of getNeighbors(state)) {
      openSet.push({
        state: neighbor,
        path: [...path, { state: neighbor, heuristic: heuristic(neighbor) }],
        heuristic: heuristic(neighbor)
      });
    }
  }
  return [];
}
