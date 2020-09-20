import { Tile } from './tile';
import { Vec2 } from './util';
import AI from './ai';
var Game = /** @class */ (function () {
    function Game() {
        // +++++++++++++++++++++++++
        this.ai = new AI();
        this.stop = false;
        // Instance methods
        this.board = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
        this.prevTime = 0;
    }
    Game.get = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    // Static Methods
    Game.newGame = function () {
        var game = this.instance;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var tile = game.board[i][j];
                if (tile) {
                    game.board[i][j] = null;
                    tile.remove();
                }
            }
        }
        var random1 = Vec2.random();
        var random2 = Vec2.random();
        // Make sure the random positions aren't the same
        while (random1.equals(random2)) {
            random2 = Vec2.random();
        }
        var tile1 = Tile.from(random1).draw();
        var tile2 = Tile.from(random2).draw();
        // Insert the tiles into the game board
        game.board[tile1.x][tile1.y] = tile1;
        game.board[tile2.x][tile2.y] = tile2;
    };
    Game.prototype.boardCopy = function () {
        var arr = [];
        for (var i = 0; i < 4; i++) {
            var inside = this.board[i].map(function (x) { return x; });
            arr.push(inside);
        }
        return arr;
    };
    // Logs the game board like the way it appears on screen
    Game.prototype.logBoard = function (b) {
        var from = b || this.board;
        var boardString = "";
        for (var i = 0; i < 4; i++) {
            var string = [];
            for (var j = 0; j < 4; j++) {
                var tile = from[j][i];
                if (tile) {
                    string.push(Math.pow(2, tile.value));
                }
                else
                    string.push(0);
            }
            var str = string.join("\t");
            boardString += str;
            boardString += "\n";
        }
        console.log(boardString);
    };
    Object.defineProperty(Game.prototype, "tiles", {
        // Returns a list of all the on the board
        get: function () {
            var list = [];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    var tile = this.board[i][j];
                    if (tile) {
                        list.push(tile);
                    }
                }
            }
            return list;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.nextMove = function (time) {
        if (time === void 0) { time = 100; }
        var pos = Vec2.random();
        while (this.tiles.some(function (tile) { return tile.position.equals(pos); })) {
            pos = Vec2.random();
        }
        var tile = Tile.from(pos).draw();
        this.board[tile.x][tile.y] = tile;
    };
    Game.prototype.getOneDGrid = function () {
        var grid = [];
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                var tile = this.board[y][x];
                if (tile) {
                    grid.push(Math.pow(2, tile.value));
                }
                else {
                    grid.push(0);
                }
            }
        }
        return grid;
    };
    Game.prototype.startAI = function () {
        var _this = this;
        var t0 = performance.now();
        this.ai.run();
        var t1 = performance.now();
        if (this.stop)
            return;
        var time = 100 - (t1 - t0);
        setTimeout(function () {
            _this.startAI();
        }, time < 0 ? 0 : time);
        // requestAnimationFrame(() => {
        //     this.startAI();
        // });
    };
    return Game;
}());
export default Game;
//# sourceMappingURL=game.js.map