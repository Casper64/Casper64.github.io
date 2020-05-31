const container: HTMLElement = document.getElementById("grid-container")!;
const size = 40;
const start: HTMLElement = document.getElementById("start")!;
const end: HTMLElement = document.getElementById("end")!;
const c = Controller.get();
const statusEl = document.getElementById("status")!;
const pathLength = document.getElementById("path-length")!;
const nodesEl = document.getElementById("nodes")!;
let nodesVisited = 0;
let offsetY = container.offsetTop;
let offsetX: number;
let w: number, h: number;
let dragstart, dragend, fill, solidFill;
dragstart = dragend = fill, solidFill = false;

(function setup() {
  w = Math.floor(container.clientWidth / size);
  h = Math.floor(container.clientHeight / size);
  if (w % 2 == 0) w -= 1;
  if (h % 2 == 0) h -= 1;
  for (let y = 0; y < h; y++) {
    const row = document.createElement("div");
    row.classList.add("grid-row");
    container.insertAdjacentElement("beforeend", row);
    for (let x = 0; x < w; x++) {
      let node = document.createElement("div");
      node.id = `${x}:${y}`;
      node.classList.add("node");
      row.insertAdjacentElement("beforeend", node);
      node.onclick = () => c.changeState(x, y);
      node.onmousedown = () => {
        if (node.classList.contains("solid")) solidFill = false;
        else solidFill = true;
        fill = true;
      }
      map[node.id] = false;
    }
  }
  offsetX = (container.clientWidth - (w*size)) /2;

  start.style.top = `${c.start.y*size}px`;
  start.style.left = `${c.start.x*size+offsetX}px`;
  end.style.top = `${c.end.y*size}px`;
  end.style.left = `${c.end.x*size+offsetX}px`;
  start.onmousedown = () => dragstart = true;
  end.onmousedown = () => dragend = true;
  container.onmouseup = () => {
    dragstart = false;
    dragend = false;
    fill = false;
  }
  container.onmousemove = (event) => {
    let x = Math.floor((event.clientX - offsetX) / size);
    let y = Math.floor((event.clientY - offsetY) / size);
    if (x < 0 || y < 0 || x> w || y >= h) return;
    if (dragstart) {
      start.style.top = `${y*size}px`;
      start.style.left = `${x*size + offsetX}px`;
      if (x != c.start.x || y != c.start.y) {
        c.setStart(Point(x, y));
      }
    } else if (dragend) {
      end.style.top = `${y*size}px`;
      end.style.left = `${x*size + offsetX}px`;
      if (x != c.end.x || y != c.end.y) {
        c.setEnd(Point(x, y));
      }
    } else if (fill && !(x == c.start.x && y == c.start.y) && !(x == c.end.x && y == c.end.y)) {
      c.setSolid(x, y, solidFill);
    }
  }
})();

async function setAlgorithm(el: HTMLElement, index: number) {
  el.parentElement?.children[c.algorithm].classList.remove("selected");
  el.classList.add("selected");
  c.algorithm = index;
  container.classList.add("finished");

  clear();
  await sleep(200);
  c.finsished = false;
  container.classList.remove("finished");
}

function setHeuristic(el: HTMLElement, index: number) {
  el.parentElement?.children[c.heurstic].classList.remove("selected");
  el.classList.add("selected");
  if (index != c.heurstic) {
    c.heurstic = index;
    clear();
    Controller.run();
  }
}

async function setDiagonal(el: HTMLElement) {
  c.diagonal = !c.diagonal;
  if (c.diagonal) el.classList.add("selected");
  else el.classList.remove("selected");
  Controller.run();

}

async function setSmoothen(el: HTMLElement) {
  if (c.diagonalCost === 1) {
    c.diagonalCost = Math.SQRT2;
    el.classList.add("selected");
  }
  else {
    c.diagonalCost = 1;
    el.classList.remove("selected");
  }
  Controller.run();
}