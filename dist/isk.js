"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sumisk(input) {
    var isk;
    if (!input) {
        return 0;
    }
    if (typeof input === "string") {
        isk = createIsk(input);
        return isk.getValue();
    }
    return input.map(sumisk).reduce(function (a, b) { return a + b; }, 0);
}
exports.sumisk = sumisk;
function createIsk(input) {
    var value = parseFloat(input.replace(/ isk/i, "").replace(/,/g, ""));
    return {
        getValue: function () { return value; },
        toString: function () { return input; }
    };
}
exports.createIsk = createIsk;
function parseM3(input) {
    return parseFloat(input.replace(/m3/gi, "").trim());
}
exports.parseM3 = parseM3;
