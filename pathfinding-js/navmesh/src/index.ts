import * as pf from "@cetfox24/pathfinding-js"


let paper = Raphael("grid-container", window.innerWidth-250, window.innerHeight);
let mapVertices = [new pf.Point(50, 50), new pf.Point(window.innerWidth - 300, 50), new pf.Point(window.innerWidth-300, window.innerHeight-50), new pf.Point(50, window.innerHeight-50)];
let map = new pf.Shapes.Polygon(mapVertices);
let path = paper.path(map.toPath());
path.attr({fill: '#d8d8c8', stroke: '#938181', "stroke-width": 3});

let finder = new pf.AStar();
let start = new pf.Point(100, 100);
let startCircle: RaphaelElement = paper.circle(100, 100, 8).attr({fill: 'green', stroke: 'black'});
let end = new pf.Point(500, 500)
let endCircle: RaphaelElement = paper.circle(500, 500, 8).attr({fill: 'red', stroke: 'black'});
let astarPath: RaphaelPath;


let objects: pf.Shapes.Polygon[] = [];

type modes = "add shape" | "set start" | "none";
let mode: modes = "none";
let newShapeVertices: pf.Point[] = [];
let newShapeOutline: RaphaelPath | undefined;
// let objects: pf.Shapes.Polygon[] = [];
let objectPaths: RaphaelPath[] = [];
let grid: pf.MeshGrid;
let triangles: RaphaelPath[] = [];
let points: RaphaelElement[] = [];

let addShapeButton: HTMLElement = document.getElementById("addShape")!;
let generateMapButton: HTMLElement = document.getElementById("generateMap")!;
let clearMapButton: HTMLElement = document.getElementById("clearMap")!;
addShapeButton.onclick = (event) => {
  mode = "add shape";
  newShapeVertices.length = 0;
}
generateMapButton.onclick = (event) => {
  mode = "set start";
  grid = new pf.MeshGrid(objects, map.vertices);
  let result = grid.generateMap();
  triangles.forEach(triangle => triangle.remove());
  triangles.length = 0;
  result.triangulation.forEach(triangle => {
    let path = paper.path(triangle.toPath());
    path.attr({stroke: 'blue'});
    triangles.push(path);
  });
  points.forEach(point => point.remove());
  points.length = 0;
  result.points.forEach(point => {
    let circle = paper.circle(point.x, point.y, 3);
    circle.attr({fill: 'red', stroke: 'black'});
    points.push(circle);
  });
}
clearMapButton.onclick = (event) => {
  mode ="none";
  triangles.forEach(triangle => triangle.remove());
  points.forEach(point => point.remove());
  if (astarPath) astarPath.remove();
  objectPaths.forEach(outline => outline.remove());
  objectPaths.length = 0;
  objects.length = 0;
}

paper.canvas.onclick = (event) => {
  if (mode == "add shape") {
    newShapeVertices.push(new pf.Point(event.x, event.y));
  } else if (mode == "set start") {
    setStart(event.x, event.y);
  }
}

paper.canvas.oncontextmenu = (event) => {
  event.preventDefault();
  if (mode == "set start") {
    setEnd(event.x, event.y);
  }
}

paper.canvas.onmousemove = (event) => {
  if (mode == "add shape" && newShapeVertices.length != 0) {
    if (newShapeOutline !== undefined) newShapeOutline.remove();
    let pathString = `M${newShapeVertices[0].x},${newShapeVertices[0].y}`
    for (let i = 1; i < newShapeVertices.length; i++) {
      pathString += `L${newShapeVertices[i].x},${newShapeVertices[i].y}`;
    }
    pathString += `L${event.x},${event.y}`;
    newShapeOutline = paper.path(pathString);
  }
}

window.addEventListener("keyup", event => {
  if (event.which === 13) { // enter
    if (newShapeVertices.length < 3) return;
    mode = "none";
    newShapeOutline!.remove();
    let polygon = new pf.Shapes.Polygon([...newShapeVertices]);
    objects.push(polygon);
    let path = drawPolygon(polygon);
    objectPaths.push(path);
  }
});

function drawPolygon (polygon: pf.Shapes.Polygon): RaphaelPath {
  let path = paper.path(polygon.toPath());
  path.attr({fill: 'white', stroke: '#938181', "stroke-width": 3});
  return path;
}

function setStart (x: number, y: number): void {
  if (astarPath) astarPath.remove();
  startCircle.remove();
  start.x = x;
  start.y = y;
  let result = finder.findPathMesh(start, end, grid);
  let pathString = "M";
  result.path.forEach(point => {
    pathString += point.x+' '+point.y+'L';
  });
  startCircle = paper.circle(start.x, start.y, 8).attr({fill: 'green', stroke: 'black'});
  astarPath = paper.path(pathString);
  astarPath.attr({stroke: "purple", "stroke-width": 3});
}

function setEnd (x: number, y: number): void {
  if (astarPath) astarPath.remove();
  endCircle.remove();
  end.x = x;
  end.y = y;
  let result = finder.findPathMesh(start, end, grid);
  let pathString = "M";
  result.path.forEach(point => {
    pathString += point.x+' '+point.y+'L';
  });
  endCircle = paper.circle(end.x, end.y, 8).attr({fill: 'red', stroke: 'black'});
  astarPath = paper.path(pathString);
  astarPath.attr({stroke: "purple", "stroke-width": 3});
}