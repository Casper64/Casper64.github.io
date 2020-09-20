import Game from './game'
import { Direction } from './move';
import { getNextGrid } from './grid';
import { move } from './move'

export default class AI {
    public currentGrid: number[] = [];
    public maxStep = 3;
    public best_move = 0;
    public nodes = 0;
    public bestMove: Direction;

    public constructor () {
    }

    public run() {
        const game = Game.get();
        const tempGrid = game.getOneDGrid();
        this.currentGrid = tempGrid.map(x => x);
        this.startSearch();
        move(this.bestMove);
    }

    private startSearch() {
        this.nodes = 0;
        this.maxStep = 3;
        let nodes: number[] = [];
        while(true) {
            this.nodes = 0;
            let t1 = performance.now();
            this.search(this.currentGrid, 0);
            nodes.push(performance.now()-t1);
            if (this.nodes >= 10000 || this.maxStep >= 8) {
                break;
            }
            this.maxStep += 1;
        }
    }

    private search(grid: number[], step: number): number {
        this.nodes++;
        if (step == this.maxStep) {
            return this.estimate(grid);
        }
        let bestScore = -1;
        for (const dir in Direction) {
            if (isNaN(Number(dir))) continue;
            const newGrid = getNextGrid(grid, Number(dir));
            const score = newGrid.reduce((acc, current) => acc += current);
            const same = newGrid.every((value, index) => value == grid[index]);
            if (same === false) {
                let temp = 0;
                let emptyCells = 0;
                for (let i = 0; i < 16; ++i) {
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
    }

    private estimate(grid: number[]): number {
        let sum = 0;
        let penalty = 0;
        let zeros = 0;
        for(let i =0; i < 16; i++) {
            if (grid[i] == 0) zeros++;
            sum += grid[i];
            if(i % 4 != 3) {
                penalty += Math.abs(grid[i] - grid[i + 1]);
            }
            if(i < 12) {
                penalty += Math.abs(grid[i] - grid[i + 4]);
            }
        }
        return (sum * 4 - penalty) * 2;
    }
}