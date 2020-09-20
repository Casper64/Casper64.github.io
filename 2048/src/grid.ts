import { Direction } from "./move";


export function getNextGrid(grid: number[], move: Direction): number[] {
    const temp =  [0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,];

    if (move == Direction.Up) {
        for(var i = 0; i < 4; i++) {
            var row: number[] = [];
            for(var j = 0; j < 4; j++) {
                row.push(grid[i + 4*j]);
            }
            row = swipeRow(row);
            for(var j = 0; j < 4; j++) {
                temp[i + 4*j] = row[j];
            }
        }
    }
    else if (move == Direction.Left) {
        for(var i = 0; i < 4; i++) {
            var row: number[] = [];
            for(var j = 0; j < 4; j++) {
                row.push(grid[4*i + j]);
            }
            row = swipeRow(row);
            for(var j = 0; j < 4; j++) {
                temp[4*i + j] = row[j];
            }
        }
    }
    else if (move == Direction.Down) {
        for(var i = 0; i < 4; i++) {
            var row: number[] = [];
            for(var j = 0; j < 4; j++) {
                row.push(grid[i + 4*(3-j)]);
            }
            row = swipeRow(row);
            for(var j = 0; j < 4; j++) {
                temp[i + 4*(3-j)] = row[j];
            }
        }
    }
    else if (move == Direction.Right) {
        for(var i = 0; i < 4; i++) {
            var row: number[] = [];
            for(var j = 0; j < 4; j++) {
                row.push(grid[4*i + (3-j)]);
            }
            row = swipeRow(row);
            for(var j = 0; j < 4; j++) {
                temp[4*i + (3-j)] = row[j];
            }
        }
    }

    return temp;
}


export function swipeRow(row: number[]): number[] {
    let prev = -1;
    let i = 0;
    let temp = [0, 0, 0, 0];
    row.forEach(val => {
        if (val != 0) {
            if (prev == 1) {
                prev = val;
                temp[i] = val;
                i++;
            }
            else if (prev == val) {
                temp[i - 1] = 2 * prev;
                prev = -1;
            }
            else {
                prev = val;
                temp[i] = val;
                i++;
            }
        }
    });
    return temp;
}

