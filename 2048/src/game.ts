import { Tile } from './tile'
import { Vec2 } from './util';
import AI from './ai'

export default class Game {
    /* SingleTon setup */
    // +++++++++++++++++++++++++
    private static instance: Game;
    private constructor() {
        
    }
    public static get() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    
    // Static Methods
    public static newGame() {
        const game = this.instance;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let tile = game.board[i][j];
                if (tile) {
                    game.board[i][j] = null;
                    tile.remove();
                }
            }
        }
        let random1 = Vec2.random();
        let random2 = Vec2.random();
        // Make sure the random positions aren't the same
        while(random1.equals(random2)) {
            random2 = Vec2.random();
        }

        let tile1 = Tile.from(random1).draw();
        let tile2 = Tile.from(random2).draw();

        // Insert the tiles into the game board
        game.board[tile1.x][tile1.y] = tile1;
        game.board[tile2.x][tile2.y] = tile2;
    }
    // +++++++++++++++++++++++++
    public ai: AI = new AI();
    public stop: boolean = false;
    public fast: boolean = false;
    public score: number = 0;

    // Instance methods
    public board: (Tile | null)[][] = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
    public boardCopy(): (Tile | null)[][] {
        let arr: (Tile | null)[][] = [];
        for (let i = 0; i < 4; i++) {
            let inside = this.board[i].map(x => x);
            arr.push(inside);
        }    
        return arr;
    }

    // Logs the game board like the way it appears on screen
    public logBoard(b?: (Tile | null)[][]) {
        let from = b || this.board;
        let boardString = "";
        for (let i = 0; i < 4; i++) {
            let string: number[] = [];
            for (let j = 0; j < 4; j++) {
                let tile = from[j][i];
                if (tile) {
                    string.push(Math.pow(2, tile.value));
                }
                else string.push(0);
            }
            let str = string.join("\t");
            boardString += str;
            boardString += "\n";
        }
        console.log(boardString);
    }

    // Returns a list of all the on the board
    public get tiles (): Tile[] {
        let list: Tile[] = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let tile = this.board[i][j];
                if (tile) {
                    list.push(tile);
                }
            }
        }
        return list;
    }
    
    public nextMove(time = 100) {
        let pos = Vec2.random();
        while(this.tiles.some(tile => tile.position.equals(pos))) {
            pos = Vec2.random();
        }
        const tile = Tile.from(pos).draw();
        this.board[tile.x][tile.y] = tile;
        
    }

    public getOneDGrid(): number[] {
        let grid: number[] = [];
        for (let x = 0; x < 4; x++) {
            for(let y = 0; y < 4; y++) {
                const tile = this.board[y][x];
                if (tile) {
                    grid.push(Math.pow(2, tile.value));
                }
                else {
                    grid.push(0);
                }
            }
        }
        return grid;
    }

    public prevTime: number = 0;

    public startAI() {
        let t0 = performance.now();
        this.ai.run();
        let t1 = performance.now(); 
        if (this.stop) {
            this.stop = false;
            return;
        }
        document.getElementById("score")!.innerText = `Score: ${this.score}`;
        const time = 100 - (t1 - t0);
        
        if (!this.fast) {
            setTimeout(() => {
                if (this.stop) {
                    this.stop = false;
                    return;
                }
                this.startAI();
            }, time < 0 ? 0 : time);
        }
        else {
            requestAnimationFrame(() => {
                this.startAI();
            });
        }
    }

    public newGame() {
        this.tiles.forEach(tile => {
            tile.remove();
        });

        for (let x  = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                this.board[x][y] = null;
            }
        }

        let random1 = Vec2.random();
        let random2 = Vec2.random();
        // Make sure the random positions aren't the same
        while(random1.equals(random2)) {
            random2 = Vec2.random();
        }

        let tile1 = Tile.from(random1).draw();
        let tile2 = Tile.from(random2).draw();
        
        // let tile1 = new Tile(3, 1).draw();
        // let tile2 = new Tile(0, 3).draw();

        // Insert the tiles into the game board
        this.board[tile1.x][tile1.y] = tile1;
        this.board[tile2.x][tile2.y] = tile2;

        this.score = 0;
        document.getElementById("score")!.innerHTML = "Score: 0";
        this.stop = true;
    }
    
}