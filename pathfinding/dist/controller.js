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
var map = {};
var o = [];
var cl = [];
function coord(x, y) {
    return x + ":" + y;
}
var Controller = /** @class */ (function () {
    function Controller() {
        this.algorithm = 2;
        this.heurstic = 0;
        this.start = Point(8, 7);
        this.end = Point(20, 7);
        this.diagonal = false;
        this.diagonalCost = 1;
        this.finsished = false;
    }
    Controller.get = function () {
        if (!this.inst) {
            this.inst = new Controller();
        }
        return this.inst;
    };
    Controller.prototype.changeState = function (x, y) {
        var node = document.getElementById(x + ":" + y);
        if (node.classList.contains("solid")) {
            node.classList.remove("solid");
            map[coord(x, y)] = false;
        }
        else {
            node.classList.add("solid");
            node.classList.remove("visited");
            node.classList.remove("path");
            map[coord(x, y)] = true;
        }
    };
    Controller.prototype.setSolid = function (x, y, solid) {
        if (solid === void 0) { solid = false; }
        var node = document.getElementById(x + ":" + y);
        if (solid) {
            node.classList.add("solid");
            node.classList.remove("visited");
            node.classList.remove("path");
        }
        else {
            node.classList.remove("solid");
        }
        map[coord(x, y)] = solid;
    };
    Controller.run = function (slow) {
        if (slow === void 0) { slow = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodesVisited = 0;
                        clear();
                        result = [];
                        if (!(c.algorithm == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Dijkstra()];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(c.algorithm == 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, BFS()];
                    case 3:
                        result = _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(c.algorithm == 2)) return [3 /*break*/, 6];
                        return [4 /*yield*/, Astar()];
                    case 5:
                        result = _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(c.algorithm == 3)) return [3 /*break*/, 8];
                        return [4 /*yield*/, BiAstar()];
                    case 7:
                        result = _a.sent();
                        _a.label = 8;
                    case 8:
                        o = result[0];
                        cl = result[1];
                        c.finsished = true;
                        nodesEl.innerText = nodesVisited.toString();
                        return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.setStart = function (p) {
        this.start = p;
        if (this.finsished && !map[p.coord]) {
            Controller.run();
        }
    };
    Controller.prototype.setEnd = function (p) {
        this.end = p;
        if (this.finsished && !map[p.coord]) {
            Controller.run();
        }
    };
    Controller.random = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, nodes, y, node, random;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c.finsished = false;
                        container.classList.add("finished", "random");
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < w)) return [3 /*break*/, 4];
                        nodes = [];
                        for (y = 0; y < h; y++) {
                            node = document.getElementById(x + ":" + y);
                            node.classList.remove("solid", "visited", "path");
                            if ((x == c.start.x && y == c.start.y) || (x == c.end.x && y == c.end.y))
                                continue;
                            random = Math.random();
                            if (random > 0.8) {
                                nodes.push(node);
                                map[x + ":" + y] = true;
                            }
                            else {
                                map[x + ":" + y] = false;
                            }
                        }
                        nodes.forEach(function (n) { return n.classList.add("solid"); });
                        return [4 /*yield*/, sleep(50)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        x++;
                        return [3 /*break*/, 1];
                    case 4:
                        container.classList.remove("finished", "random");
                        return [2 /*return*/];
                }
            });
        });
    };
    Controller.maze = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, nodes, y, node, x, y, mazeNeighbour, current, visited, closed, path, counter, neighbours, next, d, i, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c.finsished = false;
                        container.classList.add("finished", "random");
                        x = w - 1;
                        _a.label = 1;
                    case 1:
                        if (!(x >= 0)) return [3 /*break*/, 4];
                        nodes = [];
                        for (y = 0; y < h; y++) {
                            node = document.getElementById(x + ":" + y);
                            node.classList.remove("visited", "path");
                            nodes.push(node);
                            map[x + ":" + y] = true;
                        }
                        nodes.forEach(function (n) { return n.classList.add("solid"); });
                        return [4 /*yield*/, sleep(50)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        x--;
                        return [3 /*break*/, 1];
                    case 4:
                        //create outline
                        for (x = 0; x < w; x++) {
                            map[x + ":0"] = true;
                            map[x + ":" + (h - 1)] = true;
                        }
                        for (y = 0; y < h; y++) {
                            map["0:" + y] = true;
                            map[w - 1 + ":" + y] = true;
                        }
                        mazeNeighbour = function (node) {
                            var nodes = [];
                            var dir = [[0, 2], [2, 0], [0, -2], [-2, 0]];
                            var _loop_1 = function (i) {
                                var p = Point(node.x + dir[i][0], node.y + dir[i][1]);
                                if (p.x <= 0 || p.x >= w - 1 || p.y <= 0 || p.y >= h - 1)
                                    return "continue";
                                if (closed.findIndex(function (n) { return n.x == p.x && n.y == p.y; }) != -1)
                                    return "continue";
                                nodes.push([p, i]);
                            };
                            for (var i = 0; i < 4; i++) {
                                _loop_1(i);
                            }
                            return nodes;
                        };
                        current = Point(1, 1);
                        map[current.coord] = false;
                        visited = [current];
                        closed = [current];
                        path = [current];
                        counter = 0;
                        while (visited.length > 0) {
                            counter++;
                            neighbours = mazeNeighbour(current);
                            if (neighbours.length == 0) {
                                current = visited.pop();
                                path.push(current);
                                continue;
                            }
                            next = neighbours[Math.floor(Math.random() * neighbours.length)];
                            d = next[1];
                            map[coord(current.x + (d == 1 ? 1 : d == 3 ? -1 : 0), current.y + (d == 0 ? 1 : d == 2 ? -1 : 0))] = false;
                            path.push(Point(current.x + (d == 1 ? 1 : d == 3 ? -1 : 0), current.y + (d == 0 ? 1 : d == 2 ? -1 : 0)));
                            current = next[0];
                            map[current.coord] = false;
                            closed.push(current);
                            path.push(current);
                            visited.push(current);
                        }
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < path.length)) return [3 /*break*/, 8];
                        node = document.getElementById(path[i].coord);
                        node.classList.remove("solid");
                        node.classList.add("path");
                        return [4 /*yield*/, sleep(10)];
                    case 6:
                        _a.sent();
                        node.classList.remove("path");
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Controller;
}());
function neighbour(node) {
    var controller = Controller.get();
    var dir = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]];
    var nodes = [];
    for (var i = 0; i < (controller.diagonal ? 8 : 4); i++) {
        var p = Point(node.x + dir[i][0], node.y + dir[i][1]);
        if (i > 3 && map[coord(node.x + dir[i][0], node.y)] && map[coord(node.x, node.y + dir[i][1])])
            continue;
        var n = map[p.coord];
        if (n === undefined || n === true)
            continue;
        else
            nodes.push([p, i > 3]);
    }
    return nodes;
}
function drawPath(path) {
    return __awaiter(this, void 0, void 0, function () {
        var i, node;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < path.length)) return [3 /*break*/, 4];
                    node = document.getElementById(path[i].coord);
                    node.classList.remove("visited");
                    node.classList.add("path");
                    if (!!c.finsished) return [3 /*break*/, 3];
                    return [4 /*yield*/, sleep(50)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    pathLength.innerText = (path.length - 1).toString();
                    return [2 /*return*/];
            }
        });
    });
}
function setVisited(node) {
    document.getElementById(node.coord).classList.add("visited");
}
function clear(finish) {
    if (finish === void 0) { finish = false; }
    container.classList.add("finished");
    o.forEach(function (o) {
        var node = document.getElementById(o.coord);
        node.classList.remove("visited", "path");
    });
    cl.forEach(function (cl) {
        var node = document.getElementById(cl.coord);
        node.classList.remove("visited", "path");
    });
    o.length = 0;
    cl.length = 0;
    if (!c.finsished)
        container.classList.remove("finished");
    if (finish)
        c.finsished = false;
}
function clearGrid() {
    return __awaiter(this, void 0, void 0, function () {
        var y, nodes, x, coord_1, node;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    c.finsished = false;
                    container.classList.add("finished");
                    y = 0;
                    _a.label = 1;
                case 1:
                    if (!(y < h)) return [3 /*break*/, 4];
                    nodes = [];
                    for (x = 0; x < w; x++) {
                        coord_1 = x + ":" + y;
                        node = document.getElementById(coord_1);
                        map[coord_1] = false;
                        nodes.push(node);
                    }
                    nodes.forEach(function (n) { return n.classList.remove("solid", "path", "visited"); });
                    return [4 /*yield*/, sleep(50)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    y++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
