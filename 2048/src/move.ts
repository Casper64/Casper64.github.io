import { Vec2 } from './util'
import Game from './game'
import { Tile } from './tile'

export enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

export function bindKeyEvents() {
    window.addEventListener("keyup", event => {
        /* Key up */
        if (event.which == 38) {
            move(Direction.Up);
        }

        /* Key down */
        else if (event.which == 40) {
            move(Direction.Down);
        }

        /* Key left */
        else if (event.which == 37) {
            move(Direction.Left);
        }

        /* Key right */
        else if (event.which == 39) {
            move(Direction.Right);
        }
        document.getElementById("score")!.innerText = `Score: ${Game.get().score}`;
    });
}

export function move(direction: Direction) {
    const game = Game.get();
    let board = game.boardCopy();
    let tiles = game.tiles;
    let sv: Vec2; // Sorting vector
    let md: Vec2; // Move Direction
    let vertical: boolean; 

    // Assign the right direction for each movement (x, y)
    if (direction == Direction.Up) {
        sv = new Vec2(0, 0);
        md = new Vec2(0, -1);
        vertical = true;
    }
    else if (direction == Direction.Down) {
        sv = new Vec2(0, 3);
        md = new Vec2(0, 1);
        vertical = true;
    }
    else if (direction == Direction.Left) {
        sv = new Vec2(0, 0);
        md = new Vec2(-1, 0);
        vertical = false;
    }
    else { // if (direction == Direction.Right)
        sv = new Vec2(3, 0);
        md = new Vec2(1, 0);
        vertical = false;
    }

    let so: Vec2[] = []; // Sorting order of each square

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let temp = sv.clone();
            if (vertical) {
                temp.x += j;
            }
            else {
                temp.y += j;
            }
            so.push(temp);
        }
        sv.x -= md.x;
        sv.y -= md.y;
    }
    
    // Determines if any tile has actually moved
    let moved = false;

    for (var j = 0; j < so.length; j++) {
        for (let i = 0; i < tiles.length; i++) {
            let tile = tiles[i];
            // If the current tile's position is equal to the sorting order vector
            if (tile.position.equals(so[j])) {
                let prev = tile.position.clone();
                board[tile.x][tile.y] = null;
                // Next position if the tile is moved 1 step into the move direction
                let moveTo = Vec2.add(tile.position, md);

                let nextValue = 0;
                if (moveTo.x < 0 || moveTo.x > 3 || moveTo.y < 0 || moveTo.y > 3) {
                    moveTo = tile.position.clone();
                }
                else {
                    let next = board[moveTo.x][moveTo.y];
                    nextValue =  next ? next.value : 0;
                    while(nextValue == 0) {
                        tile.position = moveTo.clone();
                        moveTo = Vec2.add(tile.position, md);

                        if (moveTo.x < 0 || moveTo.x > 3 || moveTo.y < 0 || moveTo.y > 3) {
                            moveTo = tile.position.clone();
                            break;
                        }

                        next = board[moveTo.x][moveTo.y];
                        nextValue =  next ? next.value : 0;
                    }
                }
                if (nextValue == tile.value) {
                    /*
                    *   tile is being removed
                    *   next is the tiles later in the sorting order with the same value
                    */
                    let next = tiles[tiles.findIndex(t => t.position.equals(moveTo) && t.id != tile.id)];
                    next.value += 1;
                    game.score += Math.pow(2, next.value);
                    tile.position = moveTo;
                    board[next.x][next.y] = next;
                    // Move tile
                    tile.update(true);
                    tiles.splice(i, 1);

                    if (!tile.position.equals(prev)) {
                        moved = true;
                    }
                    continue;
                }
                board[tile.x][tile.y] = tile;

                if (!tile.position.equals(prev)) {
                    moved = true;
                }
            }
        }
    }
    tiles.forEach(tile => {
        tile.update();
    });

    if (moved) {
        game.board = board;
        game.nextMove();
    }
    else {
        game.stop = true;
    }
}

