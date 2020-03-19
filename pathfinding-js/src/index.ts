import * as pf from "@cetfox24/pathfinding-js"

let solidColor = "gray";
let emptyColor = "beige";

class Game {
  public grid: pf.Grid;
  public paper: RaphaelPaper;
  public blockSize: number = 30;
  public drawmode: number = -1; // -1 = standby, 0 = erease, 1 = fill
  public start: pf.Graph;
  public end: pf.Graph;

  private rectangles: RaphaelElement[][] = [];
  private pathSVG: RaphaelPath;

  constructor (grid: pf.Grid, start: pf.point, end: pf.point) {
    this.grid = grid;
    this.start = this.grid.get(start.x, start.y);
    this.end = this.grid.get(end.x, end.y);
    this.paper = Raphael("grid-container", grid.width*this.blockSize, grid.height*this.blockSize);
    this.initSVG();
  }

  /* Usage of Pathfind-js */
  public findPath (): void {
    this.clear(true);

    let finder = new pf.AStar({
      diagonal: true,
      heuristic: 'octile',
      smoothenPath: true
    });
    let result = finder.findPath({x: this.start.x, y: this.start.y}, {x: this.end.x, y:  this.end.y}, this.grid);
    console.log(result);
    
    let pathString = 'M';
    result.path.forEach(point => {
      let x = point.x * this.blockSize + this.blockSize / 2;
      let y = point.y * this.blockSize + this.blockSize / 2;
      pathString += x+' '+y+'L';
    });
    if (this.pathSVG) this.pathSVG.remove();
    this.pathSVG = this.paper.path(pathString);
    this.pathSVG.attr({"stroke-width": 2, "stroke": 'purple'});
    result.open.forEach(node => {
      if (node.coord === this.start.coord || node.coord === this.end.coord) return;
      this.rectangles[node.y][node.x].attr('fill', 'orange');
    });
    result.closed.forEach(node => {
      if (node.coord === this.start.coord || node.coord === this.end.coord) return;
      this.rectangles[node.y][node.x].attr('fill', '#ccbfb3');
    });
  }
  
  public initSVG (): void {
    this.grid.matrix.forEach((row, y) => {
      let temp: RaphaelElement[] = [];
      row.forEach((solid, x) => {
        let rect = this.paper.rect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize); // Create a svg rectangle
        let coord = `${x}:${y}`;
        let fillColor = solid ? solidColor : emptyColor;
        if (coord == this.start.coord) fillColor = "green";
        else if (coord === this.end.coord) fillColor = "red";
        rect.attr({stroke: "white", strokeWidth: 1, fill: fillColor}); // Bind attributes to the svg rectangle
        //@ts-ignore
        rect.data({x: x, y: y, coord: coord}); // Bind the data to the svg rectangle for Raphael js
        // Bind events to the svg rectangles
        //#region bind events
        rect.mousemove(() => {
          if (coord === this.start.coord || coord === game.end.coord) return;
          if (this.drawmode == 0 && rect.attr('fill') === solidColor) {
            rect.attr('fill', emptyColor);
            this.grid.setSolid(x, y, false);
          } else if (this.drawmode == 1) {
            rect.attr('fill', solidColor);
            this.grid.setSolid(x, y, true);
          }
        });
        rect.mousedown((event: MouseEvent) => {
          if (event.button == 2) return;
          if (rect.attr('fill') !== solidColor) this.drawmode = 1;
          else this.drawmode = 0;
        });
        rect.click((event: MouseEvent) => {
          if (event.button == 2) return;
          if (coord === this.start.coord || coord === game.end.coord) return;
          if (rect.attr('fill') !== solidColor) {
            rect.attr('fill', solidColor);
            this.grid.setSolid(x, y, true);
          } else {
            rect.attr('fill', emptyColor);
            this.grid.setSolid(x, y, false);
          }
          this.drawmode = -1;
        });
        rect.mouseup(() => {
          this.drawmode = -1;
        })
        //#endregion
        temp.push(rect);
      });
      this.rectangles.push(temp);
    });
  }

  public clear (dont_remove_solids = false): void {
    if (this.pathSVG) this.pathSVG.remove();
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        if ((x == this.start.x && y == this.start.y) || (x == this.end.x && y == this.end.y)) continue;
        if (dont_remove_solids && grid.get(x, y).solid) continue;
        this.grid.setSolid(x, y, false);
        this.rectangles[y][x].attr('fill', emptyColor);
      }
    }
  }

  public random (): void {
    if (this.pathSVG) this.pathSVG.remove();
    this.rectangles.forEach((row, y) => {
      row.forEach((rect, x) => {
        if ((x == this.start.x && y == this.start.y) || (x == this.end.x && y == this.end.y)) return;
        if (Math.random() > 0.75) { // 0.75 means that about there is a 25% chance of getting a solid block.
          this.grid.setSolid(x, y, true);
          rect.attr('fill', solidColor);
        } else {
          this.grid.setSolid(x, y, false);
          rect.attr('fill', emptyColor);
        }
      })
    })
  }
}

let grid = new pf.Grid(40, 15);
let game = new Game(grid, {x: 1, y: 1}, {x: 38, y: 13});

let startbutton: HTMLElement = document.getElementById("start")!;
let randombutton: HTMLElement = document.getElementById("random")!;
let clearbutton: HTMLElement = document.getElementById("clear")!;
startbutton.onclick = () => game.findPath();
randombutton.onclick = () => game.random();
clearbutton.onclick = () => game.clear();