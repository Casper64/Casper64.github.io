import * as pf from "@cetfox24/pathfinding-js"
import { Point, Mesh } from "@cetfox24/pathfinding-js";

/* IMPLEMENT THE NEIGHBOURS FUNCTION WITH THE EDGES OF THE TRIANGLES INSTEAD OF THE POINTS */


let paper = Raphael("grid-container", window.innerWidth*2, window.innerHeight*2);
let points = [new Point(50, 100), new Point(700, 50), new Point(1100, 700), new Point(100, 800)];
let map = new pf.Mesh(points);
let path = paper.path(map.toPath());
path.attr({fill: '#d8d8c8', stroke: '#938181', "stroke-width": 3});


let objects: pf.Mesh[] = [];

for (let i = 0; i < 9; i++) {
  let rectPoints = [new Point(150, 150), new Point(250, 150), new Point(250, 250), new Point(150, 250)];
  if (i == 1) {
    rectPoints = [new Point(200, 150), new Point(250, 150), new Point(250, 250), new Point(200, 250)];
  } else if (i == 4) {
    rectPoints = [new Point(100, 150), new Point(200, 200), new Point(300, 150), new Point(250, 250), new Point(150, 250)];
    // rectPoints = [new Point(150, 200), new Point(250, 200), new Point(250, 250), new Point(150, 250)];
  } else if (i == 7) {
    rectPoints = [new Point(150, 150), new Point(200, 150), new Point(200, 250), new Point(150, 250)];
  }
  let xtra = (i % 3) * 200;
  let ytra = Math.floor(i / 3) * 200;
  rectPoints.forEach(p => {
    p.x += xtra;
    p.y += ytra;
  });
  if (i == 4) {
    // rectPoints.splice(1, 0, (new Point(500, 325)));
  }
  let mesh = new Mesh(rectPoints);
  objects.push(mesh);
  let meshPath = paper.path(mesh.toPath());
  meshPath.attr({fill: 'white', stroke: '#938181', "stroke-width": 3});
}
let t0 = performance.now();
let meshGrid = new pf.MeshGrid(objects, points);
// let smt = meshGrid.smallestTriangle;
// let smtPath = paper.path(smt.toPath());
// console.log(smt.vertices)
// paper.circle(smt.circumcircle.center.x, smt.circumcircle.center.y, smt.circumcircle.radius);
let result = meshGrid.generateMap();
let t1 = performance.now();
console.log(`Generating the map too ${t1-t0}ms`);
result.triangulation.forEach((t, ind) => {
  paper.path(t.toPath()).attr({stroke: 'blue', "stroke-width": 1})
});



result.points.forEach(p => paper.circle(p.x, p.y, 3).attr({fill: 'red', stroke: 'black'}))
// result.triangulation.forEach((t, index) => {
//   let cc = t.circumcircle;
//   paper.circle(cc.center.x, cc.center.y, cc.radius)
// });
// console.log(result.triangulation);
let finder = new pf.AStar();
let start = new Point(100, 300);
let end = new Point(740, 490)

let r = finder.findPathMesh(start, end, meshGrid);
// r.open.forEach(p => paper.circle(p.x, p.y, 5).attr({fill: 'orange', stroke: 'black'}))
// r.closed.forEach(p => paper.circle(p.x, p.y, 5).attr({fill: 'gray', stroke: 'black'}))
let pathString = 'M';
r.path.forEach(point => {
  pathString += point.x+' '+point.y+'L';
});


// console.log(r);   
let startCircle = paper.circle(start.x, start.y, 8).attr({fill: 'green', stroke: 'black'});
let endCircle = paper.circle(end.x, end.y, 8).attr({fill: 'red', stroke: 'black'});
let p = paper.path(pathString).attr({stroke: "purple", "stroke-width": 3});
window.addEventListener("click", (ev) => {
  p.remove();
  if (ev.button == 0) {
    startCircle.remove();
    start = new Point(ev.pageX, ev.pageY);
    let r = finder.findPathMesh(start, end, meshGrid);
    let pathString = 'M';
    r.path.forEach(point => {
      pathString += point.x+' '+point.y+'L';
    });
    startCircle = paper.circle(start.x, start.y, 8).attr({fill: 'green', stroke: 'black'});
    p = paper.path(pathString).attr({stroke: "purple", "stroke-width": 3});
  }  
})
document.addEventListener("contextmenu", e => {
  p.remove();
  e.preventDefault();
  endCircle.remove();
  end = new Point(e.pageX, e.pageY);
  let r = finder.findPathMesh(start, end, meshGrid);
  let pathString = 'M';
  r.path.forEach(point => {
    pathString += point.x+' '+point.y+'L';
  });
  endCircle = paper.circle(end.x, end.y, 8).attr({fill: 'red', stroke: 'black'});
  p = paper.path(pathString).attr({stroke: "purple", "stroke-width": 3});
})