
const map: map<boolean> = {};
let o: point[] = [];
let cl: point[] = [];

function coord(x: number, y: number): string {
  return `${x}:${y}`;
}

class Controller {
  private static inst: Controller;

  public algorithm = 2;
  public heurstic = 0;
  public start = Point(8, 7);
  public end = Point(20, 7);
  public diagonal = false;
  public diagonalCost = 1;
  public finsished = false;
  private constructor () {}

  static get(): Controller {
    if (!this.inst) {
      this.inst = new Controller();
    }
    return this.inst;
  }

  public changeState(x: number, y: number): void {
    let node = document.getElementById(`${x}:${y}`)!;
    if (node.classList.contains("solid")) {
      node.classList.remove("solid");
      map[coord(x, y)] = false;
    }
    else {
      node.classList.add("solid");
      node.classList.remove("visited");
      node.classList.remove("path");
      map[coord(x, y)] = true;
    }
  }

  public setSolid(x: number, y: number, solid = false): void {
    let node = document.getElementById(`${x}:${y}`)!;
    if (solid) {
      node.classList.add("solid");
      node.classList.remove("visited");
      node.classList.remove("path");
    } else {
      node.classList.remove("solid");
    }
    map[coord(x, y)] = solid;
  }

  public static async run(slow = false) {
    nodesVisited = 0;
    clear();
    let result: point[][] = [];
    if (c.algorithm == 0) {
      result = await Dijkstra();
    }
    else if (c.algorithm == 1) {
      result = await BFS(); 
    }
    else if (c.algorithm == 2) {
      result = await Astar();
    }
    else if (c.algorithm == 3) {
      result = await BiAstar();
    }
    o = result[0];
    cl = result[1];
    c.finsished = true;
    nodesEl.innerText = nodesVisited.toString();
  }

  public setStart(p: point) {
    this.start = p;
    if (this.finsished && !map[p.coord]) {
      Controller.run();
    }
  }

  public setEnd(p: point) {
    this.end = p;
    if (this.finsished && !map[p.coord]) {
      Controller.run();
    }
  }

  public static async random() {
    c.finsished = false;
    container.classList.add("finished", "random");
    for (let x = 0; x < w; x++) {
      let nodes: HTMLElement[] = [];
      for (let y = 0; y < h; y++) {
        let node = document.getElementById(`${x}:${y}`)!;
        node.classList.remove("solid", "visited", "path");
        if ((x == c.start.x && y == c.start.y) || (x == c.end.x && y == c.end.y)) continue;
        let random = Math.random();
        if (random > 0.8) {
          nodes.push(node);
          map[`${x}:${y}`] = true;
        }
        else {
          map[`${x}:${y}`] = false;
        }
      }
      nodes.forEach(n => n.classList.add("solid"));
      await sleep(50);
    }
    container.classList.remove("finished", "random");
  }

  public static async maze() {
    c.finsished = false;
    container.classList.add("finished", "random");
    for (let x = w-1; x >= 0; x--) {
      let nodes: HTMLElement[] = [];
      for (let y = 0; y < h; y++) {
        let node = document.getElementById(`${x}:${y}`)!;
        node.classList.remove("visited", "path");
        nodes.push(node);
        map[`${x}:${y}`] = true;
      }
      nodes.forEach(n => n.classList.add("solid"));
      await sleep(50);
    }

    //create outline
    for (let x = 0; x < w; x++) {
      map[`${x}:0`] = true;
      map[`${x}:${h-1}`] = true;
    }
    for (let y = 0; y < h; y++) {
      map[`0:${y}`] = true;
      map[`${w-1}:${y}`] = true;
    }

    const mazeNeighbour = (node: point) => {
      let nodes: any[] = [];
      let dir = [[0, 2],[2, 0],[0,-2],[-2,0]];
      for (let i = 0; i < 4; i++) {
        let p = Point(node.x+dir[i][0],node.y+dir[i][1]);
        if (p.x <= 0 || p.x >= w-1 || p.y <= 0 || p.y >= h-1) continue;
        if (closed.findIndex(n => n.x == p.x && n.y == p.y) != -1) continue;
        nodes.push([p, i]);
      }
      return nodes;
    }
    let current = Point(1,1);
    map[current.coord] = false;
    let visited: point[] = [current];
    let closed = [current];
    let path: point[] = [current];
    let counter = 0;
    while (visited.length > 0) {
      counter++;
      let neighbours = mazeNeighbour(current);
      if (neighbours.length == 0) {
        current = visited.pop()!;
        path.push(current);
        continue;
      }
      let next = neighbours[Math.floor(Math.random()*neighbours.length)];
      let d = next[1];
      map[coord(current.x + (d == 1 ? 1 : d == 3 ? -1 : 0), current.y + (d == 0 ? 1 : d == 2 ? -1 : 0))] = false;
      path.push(Point(current.x + (d == 1 ? 1 : d == 3 ? -1 : 0), current.y + (d == 0 ? 1 : d == 2 ? -1 : 0)))
      current = next[0];
      map[current.coord] = false;
      closed.push(current);
      path.push(current);
      visited.push(current);
    }

    for (let i = 0; i < path.length; i++) {
      let node = document.getElementById(path[i].coord)!;
      node.classList.remove("solid");
      node.classList.add("path");
      await sleep(10);
      node.classList.remove("path");
    }
  }  
}

function neighbour(node: point) {
  let controller = Controller.get();
  let dir = [[0, 1],[1, 0],[0,-1],[-1,0],[1, 1],[-1,1],[1,-1],[-1,-1]];
  let nodes: [point, boolean][] = [];
  for (let i = 0; i < (controller.diagonal ? 8 : 4); i++) {
    let p = Point(node.x+dir[i][0],node.y+dir[i][1]);
    if (i > 3 && map[coord(node.x +dir[i][0], node.y)] && map[coord(node.x, node.y+dir[i][1])]) continue;
    let n = map[p.coord];
    if (n === undefined || n === true) continue;
    else nodes.push([p, i>3]);
  }
  return nodes;
}

async function drawPath(path: point[]) {
  for (let i = 0; i < path.length; i++) {
    let node = document.getElementById(path[i].coord)!;
    node.classList.remove("visited");
    node.classList.add("path");
    if (!c.finsished) await sleep(50);
  }
  pathLength.innerText = (path.length - 1).toString();
}

function setVisited(node: point): void {
  document.getElementById(node.coord)!.classList.add("visited");
}

function clear(finish = false): void {
  container.classList.add("finished");
  o.forEach(o => {
    let node = document.getElementById(o.coord)!;
    node.classList.remove("visited", "path");
  });
  cl.forEach(cl => {
    let node = document.getElementById(cl.coord)!;
    node.classList.remove("visited", "path");
  });
  o.length = 0;
  cl.length = 0;
  if (!c.finsished) container.classList.remove("finished");
  if (finish) c.finsished = false;

}

async function clearGrid() {
  c.finsished = false;
  container.classList.add("finished");
  for (let y = 0; y < h; y++) {
    let nodes: HTMLElement[] = [];
    for (let x = 0; x < w; x++) {
      let coord = x+":"+y;
      let node = document.getElementById(coord)!;
      map[coord] = false;
      nodes.push(node);
    }
    nodes.forEach(n => n.classList.remove("solid", "path", "visited"));
    await sleep(50);
  }
}