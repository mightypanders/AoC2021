"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var process_1 = require("process");
var values = fs_1["default"].readFileSync("input", "utf8");
function main() {
    var directions = values.split('\n');
    var coordinates = directions.map(function (x) { return x.split(' -> '); }).map(function (y) { return y.map(function (z) { return z.split(','); }); });
    var ventLoc = makeVentLoc(coordinates);
    diagonalVentLines(ventLoc);
}
function diagonalVentLines(ventLoc) {
    var diagnoalLines = ventLoc.map(expandLines);
}
function straightVentLines(ventLoc) {
    var straightVents = ventLoc.filter(filterVentLocForStraightLines);
    var straightLines = straightVents.map(expandLines);
    buildOceanFloorForStraighLines(straightLines);
}
function makeVentLoc(coordinates) {
    var vl = [];
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var coord = coordinates_1[_i];
        if (coord.length == 1)
            continue;
        var startx = Math.min(parseInt(coord[0][0]), parseInt(coord[1][0]));
        var endx = Math.max(parseInt(coord[0][0]), parseInt(coord[1][0]));
        var starty = Math.min(parseInt(coord[0][1]), parseInt(coord[1][1]));
        var endy = Math.max(parseInt(coord[0][1]), parseInt(coord[1][1]));
        var startLoc = {
            x: startx,
            y: starty
        };
        var endLoc = {
            x: endx,
            y: endy
        };
        vl.push({ start: startLoc, end: endLoc, body: [startLoc, endLoc] });
    }
    return vl;
}
function filterVentLocForStraightLines(v) {
    return (v.start.x == v.end.x || v.start.y == v.end.y);
}
function setKeyToMap(key, oceanFloor) {
    if (oceanFloor.has(key)) {
        var cellValue = oceanFloor.get(key);
        if (cellValue) {
            oceanFloor.set(key, cellValue += 1);
        }
    }
    else {
        oceanFloor.set(key, 1);
    }
}
function buildOceanFloorForStraighLines(straighLines) {
    var oceanFloor = new Map();
    for (var _i = 0, straighLines_1 = straighLines; _i < straighLines_1.length; _i++) {
        var vent = straighLines_1[_i];
        if (vent.body) {
            for (var _a = 0, _b = vent.body; _a < _b.length; _a++) {
                var location_1 = _b[_a];
                setKeyToMap("".concat(location_1.x, ",").concat(location_1.y), oceanFloor);
            }
        }
    }
    console.log(oceanFloor);
    console.log("Number of crossings: ".concat(getCrossings(oceanFloor)));
}
function getCrossings(oceanFlorr) {
    var valid = 0;
    oceanFlorr.forEach(function (v, k, m) {
        if (v >= 2)
            valid++;
    });
    return valid;
}
function expandLines(t) {
    var _a, _b;
    console.log("Expanding: ".concat(JSON.stringify(t)));
    if (t.start.x == t.end.x) {
        for (var i = t.start.y + 1; i < t.end.y; i++) {
            var newSection = { x: t.start.x, y: i };
            (_a = t.body) === null || _a === void 0 ? void 0 : _a.splice(t.body.length - 1, 0, newSection);
        }
        console.log("Done Expanding: ".concat(JSON.stringify(t)));
    }
    else if (t.start.y == t.end.y) {
        for (var i = t.start.x + 1; i < t.end.x; i++) {
            var newSection = { x: i, y: t.start.y };
            (_b = t.body) === null || _b === void 0 ? void 0 : _b.splice(t.body.length - 1, 0, newSection);
        }
        console.log("Done Expanding: ".concat(JSON.stringify(t)));
    }
    else {
        console.log(JSON.stringify(t, null, 2));
        (0, process_1.exit)();
    }
    return t;
}
var difference = function (a, b) { return Math.abs(a - b); };
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9maXJzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBDQUFtQjtBQUNuQixtQ0FBOEI7QUFDOUIsSUFBTSxNQUFNLEdBQUcsZUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDL0MsU0FBUyxJQUFJO0lBQ1osSUFBSSxVQUFVLEdBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBWixDQUFZLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFBO0lBQ3pGLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUV0QyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUMzQixDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxPQUFzQjtJQUNoRCxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBRTdDLENBQUM7QUFDRCxTQUFTLGlCQUFpQixDQUFDLE9BQXNCO0lBQ2hELElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtJQUNqRSxJQUFJLGFBQWEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2xELDhCQUE4QixDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQzlDLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FB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