

async function Dijkstra() {
  let current = c.start;
  let open = [current];
  let closed: point[] = [];
  let cameFrom: map<point> = {};
  let cost: map<number> = {};
  let neighbours: [point, boolean][] = [];
  cost[c.start.coord] = 0;
  setVisited(current);
  while (open.length > 0) {
    closed.push(current);
    current = open.pop()!;
    if (current.coord === c.end.coord) {
      open.push(current);
      let path: point[] = [];
      while (current.coord != c.start.coord) {
        path.push(current);
        current = cameFrom[current.coord];
      }
      path.push(c.start);
      path.reverse();
      statusEl.innerText = "OK";
      statusEl.classList.replace("danger", "success");
      await drawPath(path);
      return [open, closed];
    }
    neighbours = neighbour(current);
    for (let i = 0; i < neighbours.length; i++) {
      let n = neighbours[i];
      let next = n[0];
      let newCost = cost[current.coord] + 1 + (n[1] ? c.diagonalCost-1 : 0);
      if (cost[next.coord] === undefined || newCost < cost[next.coord]) {
        nodesVisited++;
        cost[next.coord] = newCost;
        cameFrom[next.coord] = current;
        insertSorted<point>(next, open, (b, a) => {
          return cost[a.coord] - cost[b.coord];
        });
        setVisited(next);
        if (!c.finsished) await sleep(0);
      }
    }
  }
  statusEl.innerText = "FAILED";
  statusEl.classList.replace("success", "danger");
  return [open, closed];
}

function hvalue(node: point, end?: point): number {
  end = end || c.end;
  let result = 0;
  if (c.heurstic == 0) {
    result = Math.abs(end.x - node.x) + Math.abs(end.y - node.y);
  }
  else if (c.heurstic == 1) {
    let D = 1;
    let D2 = Math.SQRT2;
    let dx = Math.abs(node.x - end.x);
    let dy = Math.abs(node.y - end.y);
    result = D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
  }
  else if (c.heurstic == 2) {
    let D = 1;
    let dx = Math.abs(node.x - end.x);
    let dy = Math.abs(node.y - end.y);
    result = D * Math.sqrt(dx * dx + dy * dy);
  }
  else if (c.heurstic == 3) {
    let D = 1;
    let D2 = 1;
    let dx = Math.abs(node.x - end.x);
    let dy = Math.abs(node.y - end.y);
    result = D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
  }
  return result;
}

async function BFS() {
  let current = c.start;
  let frontier = [c.start];
  let closed = [c.start];
  let cameFrom: map<point> = {};

  while (frontier.length > 0) {
    closed.push(current);
    current = frontier.shift()!;
    if (current.coord === c.end.coord) {
      frontier.push(current);
      let path: point[] = [];
      while (current.coord != c.start.coord) {
        path.push(current);
        current = cameFrom[current.coord];
      }
      path.push(c.start);
      path.reverse();
      statusEl.innerText = "OK";
      statusEl.classList.replace("danger", "success");
      await drawPath(path);
      return [frontier, closed];
    }
    let neighbours = neighbour(current);
    for (let i = 0; i < neighbours.length; i++) {
      let next = neighbours[i][0];
      if (cameFrom[next.coord] == undefined) {
        nodesVisited++;
        frontier.push(next);
        cameFrom[next.coord] = current;
        setVisited(next);
        if (!c.finsished) await sleep(0);
      }
    }
  }
  statusEl.innerText = "FAILED";
  statusEl.classList.replace("success", "danger");
  return [frontier, closed];
}

async function Astar() {
  let current = c.start;
  let open = [current];
  let closed: point[] = [];
  let cameFrom: map<point> = {};
  let gScore: map<number> = {};
  let fScore: map<number> = {};
  let neighbours: [point, boolean][] = [];
  gScore[c.start.coord] = 0;
  fScore[c.start.coord] = 0;
  setVisited(current);
  while (open.length > 0) {
    closed.push(current);
    current = open.pop()!;
    if (current.coord === c.end.coord) {
      open.push(current);
      let path: point[] = [];
      while (current.coord != c.start.coord) {
        path.push(current);
        current = cameFrom[current.coord];
      }
      path.push(c.start);
      path.reverse();
      statusEl.innerText = "OK";
      statusEl.classList.replace("danger", "success");
      await drawPath(path);
      return [open, closed];
    }
    neighbours = neighbour(current);
    for (let i = 0; i < neighbours.length; i++) {
      let n = neighbours[i];
      let next = n[0];
      let newCost = gScore[current.coord] + 1 + (n[1] ? c.diagonalCost-1 : 0);
      if (gScore[next.coord] === undefined || newCost < gScore[next.coord]) {
        nodesVisited++;
        gScore[next.coord] = newCost;
        fScore[next.coord] = newCost + hvalue(next);
        cameFrom[next.coord] = current;
        insertSorted<point>(next, open, (b, a) => {
          return fScore[a.coord] - fScore[b.coord];
        });
        setVisited(next);
        if (!c.finsished) await sleep(0);
      }
    }
  }
  statusEl.innerText = "FAILED";
  statusEl.classList.replace("success", "danger");
  return [open, closed];
}

async function BiAstar() {
  let current = [c.start, c.end];
  let open = [[c.start], [c.end]];
  let closed: point[] = [];
  let gScore: map<number>[] = [{}, {}];
  let fScore: map<number>[] = [{}, {}];
  let cameFrom: map<point>[] = [{}, {}]
  gScore[0][c.start.coord] = 0;
  gScore[1][c.end.coord] = 0;
  fScore[0][c.start.coord] = 0;
  fScore[1][c.end.coord] = 0;
  while (open[0].length > 0 && open[1].length > 0) {
    closed.push(...current);
    current = [open[0].pop()!, open[1].pop()!];

    if (cameFrom[0][current[1].coord] !== undefined || cameFrom[1][current[0].coord] !== undefined) {
      let d = Number(cameFrom[0][current[1].coord] !== undefined);
      let path: point[] = [];
      let path2: point[] = [];
      let connecting = Point(current[d].x, current[d].y);
      while (current[d]) {
        path.push(Point(current[d].x, current[d].y));
        current[d] = cameFrom[1-d][current[d].coord];
      }
      current[1-d] = Point(connecting.x, connecting.y);
      while (current[1-d]) {
        path2.push(Point(current[1-d].x, current[1-d].y));
        current[1-d] = cameFrom[d][current[1-d].coord];
      }
      path.reverse();
      path.pop();
      path.push(...path2);
      
      let newOpen: point[] = [];
      newOpen.push(...open[0]);
      newOpen.push(...open[1]);
      statusEl.innerText = "OK";
      statusEl.classList.replace("danger", "success");
      await drawPath(path);
      return [newOpen, closed];
    }

    let neighbours = [neighbour(current[0]), neighbour(current[1])];
    for (let i = 0; i < neighbours.length; i++) {
      let direction = neighbours[i];
      for (let j = 0; j < direction.length; j++) {
        let next = direction[j][0];
        let newCost = gScore[i][current[i].coord] + 1 + (direction[j][1] ? c.diagonalCost-1 : 0);
        if (gScore[i][next.coord] === undefined || newCost < gScore[i][next.coord]) {
          nodesVisited++;
          gScore[i][next.coord] = newCost;
          fScore[i][next.coord] = newCost + hvalue(next, current[i-1]) + gScore[1-i][current[1-i].coord];
          cameFrom[i][next.coord] = current[i];
          insertSorted<point>(next, open[i], (b, a) => {
            return fScore[i][a.coord] - fScore[i][b.coord];
          });
          setVisited(next);
          closed.push(next);
          if (!c.finsished) await sleep(0);
        }
      }
    }
  }
  let newOpen: point[] = [];
  newOpen.push(...open[0]);
  newOpen.push(...open[1]);
  statusEl.innerText = "FAILED";
  statusEl.classList.replace("success", "danger");
  return [newOpen, closed];
}