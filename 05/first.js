"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var values = (0, fs_1.readFileSync)("input", "utf8");
function main() {
    var directions = values.split('\n');
    console.log(directions);
    var coordinates = directions.map(function (x) { return x.split(' -> '); });
    console.log(coordinates);
}
main();
//# sourceMappingURL=first.js.map