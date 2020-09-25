import { Vec2 } from './util';
var positions = [0, 112, 224, 336];
var Tile = /** @class */ (function () {
    function Tile(x, y) {
        this.id = Math.random();
        this.position = new Vec2(x, y);
        this.value = (Math.random() >= 0.9 ? 2 : 1);
        // this.value = Math.ceil(Math.random() * 10) + 1; // For testing css classes
    }
    Object.defineProperty(Tile.prototype, "x", {
        get: function () {
            return this.position.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "y", {
        get: function () {
            return this.position.y;
        },
        enumerable: false,
        configurable: true
    });
    // Inserts the Element into the DOM
    Tile.prototype.draw = function () {
        var root = document.getElementById("root");
        var element = document.createElement("div");
        element.classList.add("tile");
        element.classList.add("tile-" + this.value);
        element.innerText = Math.pow(2, this.value).toString();
        element.style.left = positions[this.position.x] + "px";
        element.style.top = positions[this.position.y] + "px";
        root.insertAdjacentElement("beforeend", element);
        this.element = element;
        return this;
    };
    // Updates the text and class of the HTMLElement
    Tile.prototype.update = function (remove) {
        var _this = this;
        if (remove === void 0) { remove = false; }
        // The time it takes to move the tile in ms
        var animationTime = 100;
        this.element.style.left = positions[this.position.x] + "px";
        this.element.style.top = positions[this.position.y] + "px";
        setTimeout(function () {
            _this.element.className = "tile tile-" + _this.value;
            _this.element.innerText = Math.pow(2, _this.value).toString();
            if (remove) {
                _this.remove();
            }
        }, animationTime);
        return this;
    };
    // Removes the HTMLElement from the DOM
    Tile.prototype.remove = function () {
        this.element.remove();
    };
    // Creates a new Tile from a Vec2
    Tile.from = function (position) {
        return new Tile(position.x, position.y);
    };
    return Tile;
}());
export { Tile };
//# sourceMappingURL=tile.js.map