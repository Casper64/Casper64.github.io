/* 2D Vector self explanatory */
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.equals = function (b) {
        return b.x == this.x && b.y == this.y;
    };
    Vec2.prototype.matches = function (x, y) {
        return x == this.x && y == this.y;
    };
    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };
    Vec2.prototype.add = function (b) {
        this.x += b.x;
        this.y += b.y;
    };
    Vec2.zero = function () {
        return new Vec2(0, 0);
    };
    Vec2.random = function () {
        return new Vec2(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4));
    };
    Vec2.add = function (a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    };
    return Vec2;
}());
export { Vec2 };
//# sourceMappingURL=util.js.map