"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var container = document.getElementById("grid-container");
var size = 40;
var start = document.getElementById("start");
var end = document.getElementById("end");
var c = Controller.get();
var statusEl = document.getElementById("status");
var pathLength = document.getElementById("path-length");
var nodesEl = document.getElementById("nodes");
var nodesVisited = 0;
var offsetY = container.offsetTop;
var offsetX;
var w, h;
var dragstart, dragend, fill, solidFill;
dragstart = dragend = fill, solidFill = false;
(function setup() {
    w = Math.floor(container.clientWidth / size);
    h = Math.floor(container.clientHeight / size);
    if (w % 2 == 0)
        w -= 1;
    if (h % 2 == 0)
        h -= 1;
    var _loop_1 = function (y) {
        var row = document.createElement("div");
        row.classList.add("grid-row");
        container.insertAdjacentElement("beforeend", row);
        var _loop_2 = function (x) {
            var node = document.createElement("div");
            node.id = x + ":" + y;
            node.classList.add("node");
            row.insertAdjacentElement("beforeend", node);
            node.onclick = function () { return c.changeState(x, y); };
            node.onmousedown = function () {
                if (node.classList.contains("solid"))
                    solidFill = false;
                else
                    solidFill = true;
                fill = true;
            };
            map[node.id] = false;
        };
        for (var x = 0; x < w; x++) {
            _loop_2(x);
        }
    };
    for (var y = 0; y < h; y++) {
        _loop_1(y);
    }
    offsetX = (container.clientWidth - (w * size)) / 2;
    start.style.top = c.start.y * size + "px";
    start.style.left = c.start.x * size + offsetX + "px";
    end.style.top = c.end.y * size + "px";
    end.style.left = c.end.x * size + offsetX + "px";
    start.onmousedown = function () { return dragstart = true; };
    end.onmousedown = function () { return dragend = true; };
    container.onmouseup = function () {
        dragstart = false;
        dragend = false;
        fill = false;
    };
    container.onmousemove = function (event) {
        var x = Math.floor((event.clientX - offsetX) / size);
        var y = Math.floor((event.clientY - offsetY) / size);
        if (x < 0 || y < 0 || x > w || y >= h)
            return;
        if (dragstart) {
            start.style.top = y * size + "px";
            start.style.left = x * size + offsetX + "px";
            if (x != c.start.x || y != c.start.y) {
                c.setStart(Point(x, y));
            }
        }
        else if (dragend) {
            end.style.top = y * size + "px";
            end.style.left = x * size + offsetX + "px";
            if (x != c.end.x || y != c.end.y) {
                c.setEnd(Point(x, y));
            }
        }
        else if (fill && !(x == c.start.x && y == c.start.y) && !(x == c.end.x && y == c.end.y)) {
            c.setSolid(x, y, solidFill);
        }
    };
})();
function setAlgorithm(el, index) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.children[c.algorithm].classList.remove("selected");
                    el.classList.add("selected");
                    c.algorithm = index;
                    container.classList.add("finished");
                    clear();
                    return [4 /*yield*/, sleep(200)];
                case 1:
                    _b.sent();
                    c.finsished = false;
                    container.classList.remove("finished");
                    return [2 /*return*/];
            }
        });
    });
}
function setHeuristic(el, index) {
    var _a;
    (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.children[c.heurstic].classList.remove("selected");
    el.classList.add("selected");
    if (index != c.heurstic) {
        c.heurstic = index;
        clear();
        Controller.run();
    }
}
function setDiagonal(el) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            c.diagonal = !c.diagonal;
            if (c.diagonal)
                el.classList.add("selected");
            else
                el.classList.remove("selected");
            Controller.run();
            return [2 /*return*/];
        });
    });
}
function setSmoothen(el) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (c.diagonalCost === 1) {
                c.diagonalCost = Math.SQRT2;
                el.classList.add("selected");
            }
            else {
                c.diagonalCost = 1;
                el.classList.remove("selected");
            }
            Controller.run();
            return [2 /*return*/];
        });
    });
}
