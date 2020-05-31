
interface point {
  x: number;
  y: number;
  coord: string;
}

interface map<T> {
  [key: string]: T;
}

function Point(x = 0, y = 0): point {
  return {x, y, coord: `${x}:${y}`};
}

async function sleep(ms: number): Promise<null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

function insertSorted<T>(v: T, a: Array<T>, f: (a: T, b: T) => number): void {
  if (a.length < 1 || f(v, a[a.length-1]) >= 0) {
    a.push(v);
    return
  }
  for (let i = a.length-2; i >= 0; i--) {
    if (f(v, a[i]) >= 0) {
      a.splice(i+1, 0, v);
      return
    }
  }
  a.splice(0, 0, v);
}