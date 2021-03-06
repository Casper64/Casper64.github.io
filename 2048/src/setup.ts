import { Tile } from './tile'
import { Vec2 } from './util'
import { bindKeyEvents } from './move'
import Game from './game';

// Adds two random tiles to the game board and into the DOM
export function setup() {
    const root: HTMLElement = document.getElementById("root")!;
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
    const game = Game.get();
    game.board[tile1.x][tile1.y] = tile1;
    game.board[tile2.x][tile2.y] = tile2;

    bindKeyEvents();
}