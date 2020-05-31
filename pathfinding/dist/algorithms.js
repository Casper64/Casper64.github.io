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
function Dijkstra() {
    return __awaiter(this, void 0, void 0, function () {
        var current, open, closed, cameFrom, cost, neighbours, path, i, n, next, newCost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    current = c.start;
                    open = [current];
                    closed = [];
                    cameFrom = {};
                    cost = {};
                    neighbours = [];
                    cost[c.start.coord] = 0;
                    setVisited(current);
                    _a.label = 1;
                case 1:
                    if (!(open.length > 0)) return [3 /*break*/, 8];
                    closed.push(current);
                    current = open.pop();
                    if (!(current.coord === c.end.coord)) return [3 /*break*/, 3];
                    open.push(current);
                    path = [];
                    while (current.coord != c.start.coord) {
                        path.push(current);
                        current = cameFrom[current.coord];
                    }
                    path.push(c.start);
                    path.reverse();
                    statusEl.innerText = "OK";
                    statusEl.classList.replace("danger", "success");
                    return [4 /*yield*/, drawPath(path)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, [open, closed]];
                case 3:
                    neighbours = neighbour(current);
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < neighbours.length)) return [3 /*break*/, 7];
                    n = neighbours[i];
                    next = n[0];
                    newCost = cost[current.coord] + 1 + (n[1] ? c.diagonalCost - 1 : 0);
                    if (!(cost[next.coord] === undefined || newCost < cost[next.coord])) return [3 /*break*/, 6];
                    nodesVisited++;
                    cost[next.coord] = newCost;
                    cameFrom[next.coord] = current;
                    insertSorted(next, open, function (b, a) {
                        return cost[a.coord] - cost[b.coord];
                    });
                    setVisited(next);
                    if (!!c.finsished) return [3 /*break*/, 6];
                    return [4 /*yield*/, sleep(0)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 1];
                case 8:
                    statusEl.innerText = "FAILED";
                    statusEl.classList.replace("success", "danger");
                    return [2 /*return*/, [open, closed]];
            }
        });
    });
}
function hvalue(node, end) {
    end = end || c.end;
    var result = 0;
    if (c.heurstic == 0) {
        result = Math.abs(end.x - node.x) + Math.abs(end.y - node.y);
    }
    else if (c.heurstic == 1) {
        var D = 1;
        var D2 = Math.SQRT2;
        var dx = Math.abs(node.x - end.x);
        var dy = Math.abs(node.y - end.y);
        result = D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
    }
    else if (c.heurstic == 2) {
        var D = 1;
        var dx = Math.abs(node.x - end.x);
        var dy = Math.abs(node.y - end.y);
        result = D * Math.sqrt(dx * dx + dy * dy);
    }
    else if (c.heurstic == 3) {
        var D = 1;
        var D2 = 1;
        var dx = Math.abs(node.x - end.x);
        var dy = Math.abs(node.y - end.y);
        result = D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
    }
    return result;
}
function BFS() {
    return __awaiter(this, void 0, void 0, function () {
        var current, frontier, closed, cameFrom, path, neighbours, i, next;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    current = c.start;
                    frontier = [c.start];
                    closed = [c.start];
                    cameFrom = {};
                    _a.label = 1;
                case 1:
                    if (!(frontier.length > 0)) return [3 /*break*/, 8];
                    closed.push(current);
                    current = frontier.shift();
                    if (!(current.coord === c.end.coord)) return [3 /*break*/, 3];
                    frontier.push(current);
                    path = [];
                    while (current.coord != c.start.coord) {
                        path.push(current);
                        current = cameFrom[current.coord];
                    }
                    path.push(c.start);
                    path.reverse();
                    statusEl.innerText = "OK";
                    statusEl.classList.replace("danger", "success");
                    return [4 /*yield*/, drawPath(path)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, [frontier, closed]];
                case 3:
                    neighbours = neighbour(current);
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < neighbours.length)) return [3 /*break*/, 7];
                    next = neighbours[i][0];
                    if (!(cameFrom[next.coord] == undefined)) return [3 /*break*/, 6];
                    nodesVisited++;
                    frontier.push(next);
                    cameFrom[next.coord] = current;
                    setVisited(next);
                    if (!!c.finsished) return [3 /*break*/, 6];
                    return [4 /*yield*/, sleep(0)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 1];
                case 8:
                    statusEl.innerText = "FAILED";
                    statusEl.classList.replace("success", "danger");
                    return [2 /*return*/, [frontier, closed]];
            }
        });
    });
}
function Astar() {
    return __awaiter(this, void 0, void 0, function () {
        var current, open, closed, cameFrom, gScore, fScore, neighbours, path, i, n, next, newCost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    current = c.start;
                    open = [current];
                    closed = [];
                    cameFrom = {};
                    gScore = {};
                    fScore = {};
                    neighbours = [];
                    gScore[c.start.coord] = 0;
                    fScore[c.start.coord] = 0;
                    setVisited(current);
                    _a.label = 1;
                case 1:
                    if (!(open.length > 0)) return [3 /*break*/, 8];
                    closed.push(current);
                    current = open.pop();
                    if (!(current.coord === c.end.coord)) return [3 /*break*/, 3];
                    open.push(current);
                    path = [];
                    while (current.coord != c.start.coord) {
                        path.push(current);
                        current = cameFrom[current.coord];
                    }
                    path.push(c.start);
                    path.reverse();
                    statusEl.innerText = "OK";
                    statusEl.classList.replace("danger", "success");
                    return [4 /*yield*/, drawPath(path)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, [open, closed]];
                case 3:
                    neighbours = neighbour(current);
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < neighbours.length)) return [3 /*break*/, 7];
                    n = neighbours[i];
                    next = n[0];
                    newCost = gScore[current.coord] + 1 + (n[1] ? c.diagonalCost - 1 : 0);
                    if (!(gScore[next.coord] === undefined || newCost < gScore[next.coord])) return [3 /*break*/, 6];
                    nodesVisited++;
                    gScore[next.coord] = newCost;
                    fScore[next.coord] = newCost + hvalue(next);
                    cameFrom[next.coord] = current;
                    insertSorted(next, open, function (b, a) {
                        return fScore[a.coord] - fScore[b.coord];
                    });
                    setVisited(next);
                    if (!!c.finsished) return [3 /*break*/, 6];
                    return [4 /*yield*/, sleep(0)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 1];
                case 8:
                    statusEl.innerText = "FAILED";
                    statusEl.classList.replace("success", "danger");
                    return [2 /*return*/, [open, closed]];
            }
        });
    });
}
function BiAstar() {
    return __awaiter(this, void 0, void 0, function () {
        var current, open, closed, gScore, fScore, cameFrom, d, path, path2, connecting, newOpen_1, neighbours, _loop_1, i, newOpen;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    current = [c.start, c.end];
                    open = [[c.start], [c.end]];
                    closed = [];
                    gScore = [{}, {}];
                    fScore = [{}, {}];
                    cameFrom = [{}, {}];
                    gScore[0][c.start.coord] = 0;
                    gScore[1][c.end.coord] = 0;
                    fScore[0][c.start.coord] = 0;
                    fScore[1][c.end.coord] = 0;
                    _a.label = 1;
                case 1:
                    if (!(open[0].length > 0 && open[1].length > 0)) return [3 /*break*/, 8];
                    closed.push.apply(closed, current);
                    current = [open[0].pop(), open[1].pop()];
                    if (!(cameFrom[0][current[1].coord] !== undefined || cameFrom[1][current[0].coord] !== undefined)) return [3 /*break*/, 3];
                    d = Number(cameFrom[0][current[1].coord] !== undefined);
                    path = [];
                    path2 = [];
                    connecting = Point(current[d].x, current[d].y);
                    while (current[d]) {
                        path.push(Point(current[d].x, current[d].y));
                        current[d] = cameFrom[1 - d][current[d].coord];
                    }
                    current[1 - d] = Point(connecting.x, connecting.y);
                    while (current[1 - d]) {
                        path2.push(Point(current[1 - d].x, current[1 - d].y));
                        current[1 - d] = cameFrom[d][current[1 - d].coord];
                    }
                    path.reverse();
                    path.pop();
                    path.push.apply(path, path2);
                    newOpen_1 = [];
                    newOpen_1.push.apply(newOpen_1, open[0]);
                    newOpen_1.push.apply(newOpen_1, open[1]);
                    statusEl.innerText = "OK";
                    statusEl.classList.replace("danger", "success");
                    return [4 /*yield*/, drawPath(path)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, [newOpen_1, closed]];
                case 3:
                    neighbours = [neighbour(current[0]), neighbour(current[1])];
                    _loop_1 = function (i) {
                        var direction, j, next, newCost;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    direction = neighbours[i];
                                    j = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(j < direction.length)) return [3 /*break*/, 4];
                                    next = direction[j][0];
                                    newCost = gScore[i][current[i].coord] + 1 + (direction[j][1] ? c.diagonalCost - 1 : 0);
                                    if (!(gScore[i][next.coord] === undefined || newCost < gScore[i][next.coord])) return [3 /*break*/, 3];
                                    nodesVisited++;
                                    gScore[i][next.coord] = newCost;
                                    fScore[i][next.coord] = newCost + hvalue(next, current[i - 1]) + gScore[1 - i][current[1 - i].coord];
                                    cameFrom[i][next.coord] = current[i];
                                    insertSorted(next, open[i], function (b, a) {
                                        return fScore[i][a.coord] - fScore[i][b.coord];
                                    });
                                    setVisited(next);
                                    closed.push(next);
                                    if (!!c.finsished) return [3 /*break*/, 3];
                                    return [4 /*yield*/, sleep(0)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    j++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < neighbours.length)) return [3 /*break*/, 7];
                    return [5 /*yield**/, _loop_1(i)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 1];
                case 8:
                    newOpen = [];
                    newOpen.push.apply(newOpen, open[0]);
                    newOpen.push.apply(newOpen, open[1]);
                    statusEl.innerText = "FAILED";
                    statusEl.classList.replace("success", "danger");
                    return [2 /*return*/, [newOpen, closed]];
            }
        });
    });
}
