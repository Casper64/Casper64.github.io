/* 2D Vector self explanatory */

export class Vec2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equals(b: Vec2): boolean {
        return b.x == this.x && b.y == this.y;
    }

    public matches(x: number, y: number): boolean {
        return x == this.x && y == this.y;
    }
    public clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }
    public add(b: Vec2) {
        this.x += b.x;
        this.y += b.y;
    }

    static zero (): Vec2 {
        return new Vec2(0, 0);
    }
    static random(): Vec2 {
        return new Vec2(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4))
    }
    static add(a: Vec2, b: Vec2): Vec2 {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    
}
