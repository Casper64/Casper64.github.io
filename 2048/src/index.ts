import { setup } from './setup'
import Game from './game'
import { swipeRow } from './grid'

//@ts-ignore
window.Game = Game;


(() => {
    setup();
})();