import Game from './game';
import { Direction } from './move';
import { getNextGrid } from './grid';
import { move } from './move';
var AI = /** @class */ (function () {
    function AI() {
        this.currentGrid = [];
        this.maxStep = 3;
        this.best_move = 0;
        this.nodes = 0;
    }
    AI.prototype.run = function () {
        var game = Game.get();
        var tempGrid = game.getOneDGrid();
        this.currentGrid = tempGrid.map(function (x) { return x; });
        this.startSearch();
        move(this.bestMove);
    };
    AI.prototype.startSearch = function () {
        this.nodes = 0;
        this.maxStep = 3;
        var nodes = [];
        while (true) {
            this.nodes = 0;
            var t1 = performance.now();
            this.search(this.currentGrid, 0);
            nodes.push(performance.now() - t1);
            if (this.nodes >= 10000 || this.maxStep >= 8) {
                break;
            }
            this.maxStep += 1;
        }
    };
    AI.prototype.search = function (grid, step) {
        this.nodes++;
        if (step == this.maxStep) {
            return this.estimate(grid);
        }
        var bestScore = -1;
        for (var dir in Direction) {
            if (isNaN(Number(dir)))
                continue;
            var newGrid = getNextGrid(grid, Number(dir));
            var score = newGrid.reduce(function (acc, current) { return acc += current; });
            var same = newGrid.every(function (value, index) { return value == grid[index]; });
            if (same === false) {
                var temp = 0;
                var emptyCells = 0;
                for (var i = 0; i < 16; ++i) {
                    if (newGrid[i] === 0) {
                        newGrid[i] = 2;
                        ++emptyCells;
                        temp += this.search(newGrid, step + 1) * 0.9;
                        newGrid[i] = 4;
                        temp += this.search(newGrid, step + 1) * 0.1;
                        newGrid[i] = 0;
                    }
                }
                if (emptyCells != 0) {
                    temp /= emptyCells;
                }
                else {
                    temp = -1e+20;
                }
                if (score + temp > bestScore) {
                    bestScore = score + temp;
                    if (step == 0) {
                        this.bestMove = Number(dir);
                    }
                }
            }
        }
        return bestScore;
    };
    AI.prototype.estimate = function (grid) {
        var sum = 0;
        var penalty = 0;
        var zeros = 0;
        for (var i = 0; i < 16; i++) {
            if (grid[i] == 0)
                zeros++;
            sum += grid[i];
            if (i % 4 != 3) {
                penalty += Math.abs(grid[i] - grid[i + 1]);
            }
            if (i < 12) {
                penalty += Math.abs(grid[i] - grid[i + 4]);
            }
        }
        return (sum * 4 - penalty) * 2;
    };
    return AI;
}());
export default AI;
//# sourceMappingURL=ai.js.map