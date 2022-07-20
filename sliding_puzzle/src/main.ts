import './style.scss'

type direction = "up" | "down" | "left" | "right";

// Small Coordinate class to store the x and y coordinates
class Coord {
  public coord = "";
  public constructor(public x: number, public y: number) {
    this.coord = `(${this.x},${this.y})`;
  }
  public update() {
    this.coord = `(${this.x},${this.y})`;
  }
}

const BORDER_SIZE = 12;
const borderScales = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
let animationTime = 100;

// The dimensions of the sliding puzzle
let dim = 3;
// The empty space coordinates
let empty = new Coord(0, 0);
// If true this prevents any tile from moving
let animating = false;
// The size of the tiles
let tileSize = 0;
// Showcase & Demo
let showValids = false;


/**
 * Generate the HTML for the sliding puzzle
 */
function init(): void {
  changeLight(5, false);

  const container: HTMLElement = document.getElementById('puzzle')!;
  // Clear all the elements from the container in case the user selected a different size
  container.innerHTML = "";
  
  dim = Number(document.getElementsByTagName('select')[0].value);
  tileSize = parseFloat(getComputedStyle(container).width) / dim;
  container.style.padding = `${BORDER_SIZE * borderScales[dim-3]}px`;
  let time = Date.now().toString();
  
  // Generate the html
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      // The empty tile
      let empty = document.createElement('div');
      empty.classList.add('tile');
      empty.classList.add('empty');
      empty.setAttribute('data-x', `${j}`);
      empty.setAttribute('data-y', `${i}`);
      // Set the style of the tile
      empty.style.top = `${i * (tileSize + BORDER_SIZE)}px`;
      empty.style.left = `${j * (tileSize + BORDER_SIZE)}px`;
      empty.style.width = `${tileSize}px`;
      empty.style.height = `${tileSize}px`;
      empty.id = time;
      container.appendChild(empty);


      const tile: HTMLElement = document.createElement('div');
      tile.classList.add('tile');
      
      // Set the data attributes for the tile
      tile.setAttribute('data-x', `${j}`);
      tile.setAttribute('data-y', `${i}`);
      tile.setAttribute('data-value', `${i*dim+j+1}`);
      // Set the style of the tile
      tile.style.top = `${i * (tileSize + BORDER_SIZE)}px`;
      tile.style.left = `${j * (tileSize + BORDER_SIZE)}px`;
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
      tile.innerText = (i * dim + j + 1).toString();
      tile.id = time;


      container.appendChild(tile);
    }
  }
  // The sliding puzzle needs one free space so we remove the lastvalid
  container.lastChild?.remove();
  empty.x = dim - 1;
  empty.y = dim - 1;

  validMap = [];
  for (let i = 0; i < dim; i++) {
    let a = [];
    for (let j = 0; j < dim; j++) {
      a.push(false);
    }
    validMap.push(a);
  }
}

/**
 * Move a tile to the empty spce according to the direction
 * @param dir The direction to move the tile
 * @returns True when a tile was able to move and false otherwise
 */
function moveTile(dir: direction, animated = true) {
  if (animating)
    return false

  let tile: HTMLElement | null = null;
  // Get the tile that should move by direction
  switch(dir) {
    case "up":
      tile = checkUp();
      break;
    case "right":
      tile = checkRight();
      break;
    case "down":
      tile = checkDown();
      break;
    case "left":
      tile = checkLeft();
      break;
  }
  if (tile === null)
    return false;

  // Set the new position of the tile
  tile.style.left = `${Number(tile.dataset.x) * (tileSize + BORDER_SIZE)}px`;
  tile.style.top = `${Number(tile.dataset.y) * (tileSize + BORDER_SIZE)}px`;
  empty.update();

  // Show all the not valid positions
  if (showValids === true) {
    for (let x = 0; x < dim; x++) {
      for (let y = 0; y < dim; y++) {
        if (validMap[x][y] === true) {
          document.querySelector(`.empty[data-x="${x}"][data-y="${y}"]`)?.classList.add('show-valid');
        }
        else {
          document.querySelector(`.empty[data-x="${x}"][data-y="${y}"]`)?.classList.remove('show-valid');
        }
      }
    }
  }

  // Animate the moving tile
  if (animated === true) {
    animating = true;
    tile.style.transition = `${animationTime/1000}s`;
    // Unblock the animating loop after 100ms
    return new Promise(resolve => {
      window.setTimeout(() => {
        animating = false;
        // Do something when the puzzle is solved
        if (checkPuzzle()) {
          changeLight(4, false);
          changeLight(3, false);
          changeLight(5, true);
          console.log("YOU WIN!");
        }
        resolve(true);
      }, animationTime)
    });
  }
  

  return true
}

// Move Helper Functions
// ======================

function checkUp() {
  // Check if out of bounds
  if (empty.y + 1 >= dim) 
    return null
  // There is a tile to the right of the empty space
  const tile: HTMLElement = document.querySelector(`.tile:not(.empty)[data-x="${empty.x}"][data-y="${empty.y + 1}"]`)!;
  tile?.setAttribute('data-x', `${empty.x}`);
  tile?.setAttribute('data-y', `${empty.y}`);
  empty.y += 1;

  return tile
}

function checkRight() {
  // Check if out of bounds
  if (empty.x - 1 < 0) 
    return null
  // There is a tile to the right of the empty space
  const tile: HTMLElement = document.querySelector(`.tile:not(.empty)[data-x="${empty.x - 1}"][data-y="${empty.y}"]`)!;
  tile?.setAttribute('data-x', `${empty.x}`);
  tile?.setAttribute('data-y', `${empty.y}`);
  empty.x -= 1;

  return tile
}

function checkDown() {
  // Check if out of bounds
  if (empty.y + 1 < 0) 
    return null
  // There is a tile to the right of the empty space
  const tile: HTMLElement = document.querySelector(`.tile:not(.empty)[data-x="${empty.x}"][data-y="${empty.y - 1}"]`)!;
  tile?.setAttribute('data-x', `${empty.x}`);
  tile?.setAttribute('data-y', `${empty.y}`);
  empty.y -= 1;

  return tile
}

function checkLeft() {
  // Check if out of bounds
  if (empty.x + 1  >= dim) 
    return null
  // There is a tile to the right of the empty space
  const tile: HTMLElement = document.querySelector(`.tile:not(.empty)[data-x="${empty.x + 1}"][data-y="${empty.y}"]`)!;
  tile?.setAttribute('data-x', `${empty.x}`);
  tile?.setAttribute('data-y', `${empty.y}`);
  empty.x += 1;

  return tile
}

/**
 * Get all the possible directions according to the empty position
 * @returns 
 */
function getDirections(): direction[] {
  let dirs: direction[] = [];
  if (empty.y + 1 < dim)
    dirs.push("up");
  if (empty.x - 1 >= 0)
    dirs.push("right");
  if (empty.y - 1 >= 0)
    dirs.push("down");
  if (empty.x + 1 < dim)
    dirs.push("left");
  return dirs
}

/**
 * Shuffle the sliding puzzle
 */
function shuffle() {
  const turns = Math.pow(8*dim, 1.5);
  let prev: direction = "down";
  for (let i = 0; i < turns; i++) {
    const dirs = getDirections();
    let ind = 0;
    let directions = shuffleArray(dirs);
    let dir = directions[ind];
    while(dir === getOpposite(prev)) {
      ind++;
      dir = directions[ind];
    }
    prev = dir;
    moveTile(dir, false);
  }
}

/**
 * Returns the opposite direction of `dir`
 * @param dir 
 * @returns 
 */
function getOpposite(dir: direction): direction {
  switch(dir) {
    case "up":
      return "down";
    case "right":
      return "left";
    case "down":
      return "up";
    case "left":
      return "right";
  }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/**
 * Shuffle an array
 * @param array 
 * @returns the shuffled array
 */
function shuffleArray(array: any[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * Calculates the correct direction according to the difference in x and y of `from` and `to`
 * @param from 
 * @param to 
 */
async function moveTileByCoord(from: Coord, to: Coord) {
  if (from.x-to.x === -1) {
    await moveTile("left");
  }
  else if (from.x-to.x === 1) {
    await moveTile("right");
  }
  else if (from.y-to.y === -1) {
    await moveTile("up");
  }
  else {
    await moveTile("down");
  }
}

// Solve Algoithm Functions
// =========================

/**
 * Solve the sliding puzzle with dimensions d
 * @param d The dimension of the puzzle
 */
async function solve(d: number) {
  changeLight(5, false);

  // Reset values when solving again
  if (d === dim) {
    // Fill the valid map with a 2D array of false corresponding to each tile's valid state
    validMap = [];
    for (let i = 0; i < dim; i++) {
      let a = [];
      for (let j = 0; j < dim; j++) {
        a.push(false);
      }
      validMap.push(a);
    }
  }
  changeLight(1, true);
  await solveTopRow(d);
  changeLight(1, false);
  changeLight(2, true);
  await solveLeftColumn(d);
  changeLight(2, false);
  if (d > 3) {
    changeLight(3, true);
    await solve(d-1);
  }
  else {
    changeLight(1, false);
    changeLight(4, true);
    solve4Corner();
  }
}

/* MOVE EDGE CASE
* Let's see this grid:
* 1 3 2
* 4   7
* 5 6 8
* We just moved 2 to the top right corner and now we want to move the 3 below the 2.
* As you can see the shortest path would require the 2 tile to move, but we don't want that
* 3 to two below the current 2
* This would give this grid:
* 1 2 7
* 4 6 
* 5 8 3
* Then we move the top above the 3 and we get this grid:
* 1 6 
* 4 7 2
* 5 8 3
* No we can again move the 2 to the top right and the 3 below
* 1 6 2
* 4 7 3
* 5 8 
* Now we need to make sure the 3 doesn't move.
* Because the shortest path will require the 3 to move down and we don't want to move the 3
*/

/**
 * Solve the top row according to a puzzle with dimensions `d`
 * @param d 
 */
async function solveTopRow(d: number) {
  // First solve the top left corner
  let offset = dim-d;
  let target = offset*dim + offset + 1;

  // If d > 3 then we can also solve another the tile on the right to the top left corner
  // e.g. if d=4 then the loop will run 2 times
  for (let i = 0; i < d-2; i++) {
    await move(target + i, offset+i, offset);
    validMap[offset+i][offset] = true;
  }
  // Put the second last value of the row in the top right corner
  await move(target + d-2, dim-1, offset);

  // EDGE CASE FIX
  if (findCoordByValue(target + d-1).x === dim-2) {
    await move(target + d-1, dim-1, offset+2);
    await move(target + d-2, dim-1, offset+1);
    // Again put the second last value of the row in the top right corner
    await move(target + d-2, dim-1, offset);
    
  }
  else {
    validMap[dim-1][offset] = true;
    validMap[dim-2][offset] = true;
  }
  
  // Put the last value below the top right corner
  await move(target + d-1, dim-1, offset+1);
  validMap[dim-2][offset] = false;

  // We need to freeze the 3 (in the example) else we will run into the same problem again
  validMap[offset+d-1][offset+1] = true;
  // Then put the last two tiles into position
  await move(target + d-2, dim-2, offset);
  await move(target + d-1, dim-1, offset);
  validMap[dim-2][offset] = true;
  validMap[dim-1][offset] = true;

}

/**
 * Solve the left column according to a puzzle with dimensions `d`
 * @param d 
 */
async function solveLeftColumn(d: number) {

  // Left corner should already be solved
  let offset = dim-d;
  let target = offset*dim + offset + 1;
  // If d > 3 then we can also solve another the tile on the bottom to the top left corner
  // e.g. if d=5 then the loop will run 2 times
  for (let i = 1; i < d-2; i++) {
    await move(target + i*dim, offset, offset+i);
    validMap[offset][offset+i] = true;
  }
  // Put the second last value of the column in bottom left corner
  await move(target + (d-2)*dim, offset, offset+d-1);

  // EDGE CASE FIX
  if (findCoordByValue(target + (d-1)*dim).y === dim-2) {
    await move(target + (d-1)*dim, offset+2, dim-1);
    await move(target + (d-2)*dim, offset+1, dim-1);
    // Again put the second last value of the row in the top right corner
    await move(target + (d-2)*dim, offset, dim-1);
    
  }
  else {
    validMap[offset][offset+d-1] = true;
    validMap[offset][offset+d-2] = true;
  }

  // Put the last value to the right of the bottom left corner
  await move(target + (d-1)*dim, offset+1, offset+d-1);
  validMap[offset][offset+d-2] = false;

  // We need to freeze the 3 (in the example) else we will run into the same problem again
  validMap[offset+1][offset+d-1] = true;

    // Then put the last two tiles into position
  await move(target + (d-2)*dim, offset, offset+d-2);
  await move(target + (d-1)*dim, offset, offset+d-1);
  validMap[offset][offset+d-2] = true;
}

/**
 * Solve the last 4 corners of the sliding puzzle
 * @returns 
 */
async function solve4Corner() {
  // Move each tile a maximum of 4 times until the solved state is reached
  for (let i = 0; i < 4; i++) {
    await moveTile("up");
    if (checkPuzzle()) return true
    await moveTile("left");
    if (checkPuzzle()) return true
    await moveTile("down");
    if (checkPuzzle()) return true
    await moveTile("right");
    if (checkPuzzle()) return true
  }

  return false;
}

/**
 * Move tile with value `target` to position (x,y)
 * @param target The target tile's value
 * @param x 
 * @param y 
 */
async function move(target: number, x: number, y: number) {
  // The main path for the tile to its destination
  let current = findCoordByValue(target);
  let mainPath = findPath(current, new Coord(x, y));
  // No path was found
  if (mainPath == null) return false;

  // We don't actually move the tile but we move the position of the empty space. 
  // So in order to move the tile we need to move the empty space one position ahead of the tile
  // and then switch the places of the tile and the empty space
  for (let i = 0; i < mainPath.length; i++) {
    
    let next = mainPath[i];
    // Lock the current tile so we don't move the tile out of its path and the empty space moves around it
    validMap[current.x][current.y] = true;

    let emptyPath = findPath(empty, next);
    // No path was found
    if (emptyPath == null) {
      return false;
    }
    for (let j = 0; j < emptyPath.length; j++) {
      await moveTileByCoord(empty, emptyPath[j]);
      empty = emptyPath[j];
    }
    await moveTileByCoord(empty, current);
    validMap[current.x][current.y] = false;
    current = next;
  }
  
  return true
}

/**
 * Find the coordinate of a tile by its value
 * @param value
 * @returns 
 */
function findCoordByValue(value: number): Coord {
  // Get the target tile element by filtering by class and textContent
  let tile = Array.from(document.getElementsByClassName("tile")).find(el => el.textContent == value.toString()) as HTMLElement;
  let current = new Coord(Number(tile.dataset.x), Number(tile.dataset.y));
  return current;
}

/**
 * Checks whether the puzzle is solved
 * @returns True if the puzzle is solved
 */
function checkPuzzle() {
  // Count the number of tiles processed
  let counter = 0;

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      // There is always one empty space so we don't need to check the last tile
      if (counter == dim*dim-1) break;

      const tile = document.querySelector(`.tile:not(.empty)[data-x="${j}"][data-y="${i}"]`)!;
      // The empty space is at (j, i)
      if (tile == null) continue;

      const value = Number(tile.textContent);
      // If the tiles value does not correspond to its position the puzzle is solved
      if (value !== i * dim + j + 1) return false

      counter++;
    }
  }
  // All the tiles have the correct value for their position
  return true
}

// Pathfinding Functions
// =============

// A map to store which tiles are valid so we won't accidently move them
let validMap: boolean[][] = [];

// Could have also chosen to implement a Breadth First Search algorithm, but decided to go for A* 
// because performance wise it doesn't really matter.
// Plus I wanted to use A* to challange myself

/**
 * A* algorithm to find the shortest path between start and end
 * @param start 
 * @param end 
 * @returns An array of coordinates as the path or null if the path wasn't found
 */
function findPath(start: Coord, end: Coord): Coord[] | null {
  let open: Coord[] = [start];
  let g_score: Record<string, number> = {};
  let f_score: Record<string, number> = {};
  g_score[start.coord] = 0;
  f_score[start.coord] = 0;

  let came_from: Record<string, Coord> = {};

  let counter = 0;
  while (open.length > 0 && counter < 5) {
    let current = open.pop()!;

    // Early exit if a path was found
    if (current.coord == end.coord) {
      let path: Coord[] = [];
      while(current.coord !== start.coord) {
        path.push(current);
        current = came_from[current.coord];
      }
      path.reverse();
      return path;
    }
    
    // Get all valid neighbours
    let nb = getNeighbours(current);
    for (let i = 0; i < nb.length; i++) {
      let next = nb[i];
      let newCost = g_score[current.coord] + 1;

      // A* magic
      if (g_score[next.coord] === undefined || newCost < g_score[next.coord]) {
        let h = heuristic(next, end, start);
        g_score[next.coord] = newCost;
        f_score[next.coord] = newCost + h;
        came_from[next.coord] = current;

        // Normally we insert the tile into the open list in the order of its f_score
        // But we have a very small open list (max dim*dim tiles) so we sort the list later
        open.push(next);
      }
    }
    // Sort the open list
    open.sort((a, b) => f_score[b.coord] - f_score[a.coord]);
  }

  // No path was found :(
  return null;
}

/**
 * Return the heuristic for the manhattan distance between two tiles
 * @param current 
 * @param end 
 * @returns 
 */
function heuristic(current: Coord, end: Coord, start: Coord): number {
  // Without tie breaking
  let h = Math.abs(current.x - end.x) + Math.abs(current.y - end.y);

  // With tie breaking
  // I choose to add tie breaking because this gives a diagonal path
  // and that looks cooler in my opinion
  // EDIT: Turns out that the diagonal path is faster, because the empty space needs to move less!
  let dx1 = current.x - end.x;
  let dy1 = current.y - end.y;
  let dx2 = start.x - end.x;
  let dy2 = start.y - end.y;
  let cross = Math.abs(dx1*dy2 - dx2*dy1);
  
  return h + cross*0.001;
}

/**
 * Get the valid neighbours for a tile
 * @param current 
 * @returns 
 */
function getNeighbours(current: Coord) {
  let nb: Coord[] = [];
  // Check right neighbour
  if (current.x+1 < dim && validMap[current.x+1][current.y] === false) {
    nb.push(new Coord(current.x+1, current.y));
  }
  // Check left neighbour
  if (current.x-1 >= 0 && validMap[current.x-1][current.y] === false) {
    nb.push(new Coord(current.x-1, current.y));
  }
  // Check top neighbour
  if (current.y-1 >= 0 && validMap[current.x][current.y-1] === false) {
    nb.push(new Coord(current.x, current.y-1));
  }
  // Check bottom neighbour
  if (current.y+1 < dim && validMap[current.x][current.y+1] === false) {
    nb.push(new Coord(current.x, current.y+1));
  }
  return nb;
}

// Algorithm Explain Functions
// ===========================

/**
 * Change the light color of the algorithm explanation step
 * @param step 
 */
function changeLight(step: number, value: boolean) {
  if (value === true) document.getElementById(`light-${step}`)!.classList.add("on");
  else document.getElementById(`light-${step}`)!.classList.remove("on");
}

async function showShortestPath() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  validMap = [];
  for (let i = 0; i < dim; i++) {
    let a = [];
    for (let j = 0; j < dim; j++) {
      a.push(false);
    }
    validMap.push(a);
  }

  const sleep = (ms: number) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    })
  }

  let path = findPath(findCoordByValue(8), new Coord(0, 0))!;
  path.splice(0, 0, findCoordByValue(8));
  for (let i = 0; i < path.length; i++) {
    let tile = document.querySelector(`.empty[data-x="${path[i].x}"][data-y="${path[i].y}"]`)!;
    tile.classList.add("path-showcase");
    await sleep(500);
  }
}

async function animateSlow() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  let path = findPath(findCoordByValue(8), new Coord(0, 0))!;
  path.splice(0, 0, findCoordByValue(8));


  animationTime = 500;
  await move(8, 0, 0);
  animationTime = 100;
  for (let i = 0; i < path.length; i++) {
    let tile = document.querySelector(`.empty[data-x="${path[i].x}"][data-y="${path[i].y}"]`)!;
    tile.classList.remove("path-showcase");
  }
}

// Swipe Detection
// ===============

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

let gesuredZone = document.getElementById('puzzle')!;

gesuredZone.addEventListener('touchstart', function(event) {
    touchstartX = event.touches[0].clientX;
    touchstartY = event.touches[0].clientY;
    event.preventDefault();
    event.stopPropagation();
}, false);

gesuredZone.addEventListener('touchend', function(event) {
    if(open && window.innerWidth < 896) {
      event.preventDefault();
      event.stopPropagation();
    }

    touchendX = event.changedTouches[0].clientX;
    touchendY = event.changedTouches[0].clientY;
    handleGesure();
}, false); 

function handleGesure() {
    let horizontal = Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY);

    if (horizontal && touchendX < touchstartX) {
      moveTile("left");
    }
    else if (horizontal && touchendX > touchstartX) {
      moveTile("right");
    }
    else if (touchendY < touchstartY) {
      moveTile("up");
    }
    else if (touchendY > touchstartY) {
      moveTile("down");
    }
}

// Bind Events
// ===========
document.getElementById("speed")?.addEventListener("input", (e) => {
  //@ts-ignore
  let p = 100-Number(e.target.value);
  animationTime = (p*9)+100;
  document.getElementById("speed-value")!.innerText = `${100-p}%`;
})
document.getElementById("reset")?.addEventListener("click", init);
document.getElementById("shuffle")?.addEventListener("click", shuffle);
document.getElementById("solve")?.addEventListener("click", () => solve(dim));
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    moveTile("up");
  }
  if (e.key === "ArrowRight") {
    moveTile("right");
  }
  if (e.key === "ArrowDown") {
    moveTile("down");
  }
  if (e.key === "ArrowLeft") {
    moveTile("left");
  }
})
document.getElementById("selector")?.addEventListener("change", init);

let open = false;
document.getElementById("collapser")?.addEventListener("click", () => {
  open = !open;
  document.body.classList.toggle("open");
  
  
  let more = document.getElementById("more")!;
  if(window.innerWidth > 896) {
    more.style.animation = 'none';
    // trigger reflow
    more.offsetHeight;
    // reset animation
    more.style.animation = "";
    let arrow = document.getElementById("collapse-arrow")!;
    arrow.style.animation = 'none';
    // trigger reflow
    arrow.offsetHeight;
    // reset animation
    arrow.style.animation = "";
  }
  else {
    window.setTimeout(() => {
      if (open) {
        document.body.style.position = "relative";
      }
      else {
        document.body.style.position = "fixed";
      }
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      })
    }, 250)
  }
});
document.getElementById("move-1")?.addEventListener("click", showShortestPath);
document.getElementById("move-2")?.addEventListener("click", animateSlow);
document.getElementById("show-3")?.addEventListener("click", () => {
  if (showValids === true) {
    showValids = false;
    document.getElementById("show-3")!.innerText = "Show";
    Array.from(document.getElementsByClassName("empty")).forEach(e => {
      e.classList.remove("show-valid");
    });
  }
  else {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    showValids = true;
    document.getElementById("show-3")!.innerText = "Hide";
    
    init();
    shuffle();
    solve(dim);
  }
});

// Generate the html on page load
init();