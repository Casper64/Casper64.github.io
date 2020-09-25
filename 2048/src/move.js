import { Vec2 } from './util';
import Game from './game';
export var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
export function bindKeyEvents() {
    window.addEventListener("keyup", function (event) {
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
    });
}
export function move(direction) {
    var game = Game.get();
    var board = game.boardCopy();
    var tiles = game.tiles;
    var sv; // Sorting vector
    var md; // Move Direction
    var vertical;
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
    var so = []; // Sorting order of each square
    for (var i = 0; i < 4; i++) {
        for (var j_1 = 0; j_1 < 4; j_1++) {
            var temp = sv.clone();
            if (vertical) {
                temp.x += j_1;
            }
            else {
                temp.y += j_1;
            }
            so.push(temp);
        }
        sv.x -= md.x;
        sv.y -= md.y;
    }
    // Determines if any tile has actually moved
    var moved = false;
    for (var j = 0; j < so.length; j++) {
        var _loop_1 = function (i) {
            var tile = tiles[i];
            // If the current tile's position is equal to the sorting order vector
            if (tile.position.equals(so[j])) {
                var prev = tile.position.clone();
                board[tile.x][tile.y] = null;
                // Next position if the tile is moved 1 step into the move direction
                var moveTo_1 = Vec2.add(tile.position, md);
                var nextValue = 0;
                if (moveTo_1.x < 0 || moveTo_1.x > 3 || moveTo_1.y < 0 || moveTo_1.y > 3) {
                    moveTo_1 = tile.position.clone();
                }
                else {
                    var next = board[moveTo_1.x][moveTo_1.y];
                    nextValue = next ? next.value : 0;
                    while (nextValue == 0) {
                        tile.position = moveTo_1.clone();
                        moveTo_1 = Vec2.add(tile.position, md);
                        if (moveTo_1.x < 0 || moveTo_1.x > 3 || moveTo_1.y < 0 || moveTo_1.y > 3) {
                            moveTo_1 = tile.position.clone();
                            break;
                        }
                        next = board[moveTo_1.x][moveTo_1.y];
                        nextValue = next ? next.value : 0;
                    }
                }
                if (nextValue == tile.value) {
                    /*
                    *   tile is being removed
                    *   next is the tiles later in the sorting order with the same value
                    */
                    var next = tiles[tiles.findIndex(function (t) { return t.position.equals(moveTo_1) && t.id != tile.id; })];
                    next.value += 1;
                    // Add score
                    tile.position = moveTo_1;
                    board[next.x][next.y] = next;
                    // Move tile
                    tile.update(true);
                    tiles.splice(i, 1);
                    if (!tile.position.equals(prev)) {
                        moved = true;
                    }
                    return "continue";
                }
                board[tile.x][tile.y] = tile;
                if (!tile.position.equals(prev)) {
                    moved = true;
                }
            }
        };
        for (var i = 0; i < tiles.length; i++) {
            _loop_1(i);
        }
    }
    tiles.forEach(function (tile) {
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
//# sourceMappingURL=move.js.map