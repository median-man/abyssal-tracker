"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isk_1 = require("./isk");
var InventoryItemImp = /** @class */ (function () {
    function InventoryItemImp(name, units, group, volume, isk) {
        this.name = name;
        this.units = units;
        this.group = group;
        this.volume = volume;
        this.isk = isk;
    }
    InventoryItemImp.createFromTsv = function (tsv) {
        var values = tsv
            .trim()
            .split("\t")
            .map(function (s) {
            return s.trim();
        });
        var name = values[0];
        var units = parseInt(values[1]);
        var group = values[2];
        var volume = isk_1.parseM3(values[5]);
        var isk = isk_1.sumisk(values[6]);
        var inventoryItem = new InventoryItemImp(name, units, group, volume, isk);
        return inventoryItem;
    };
    InventoryItemImp.prototype.toRange = function (includeHeaders) {
        if (includeHeaders === void 0) { includeHeaders = false; }
        var result = [];
        if (includeHeaders) {
            result.push(["name", "group", "units", "volume", "isk"]);
        }
        result.push([this.name, this.group, this.units, this.volume, this.isk]);
        return result;
    };
    return InventoryItemImp;
}());
exports.InventoryItemImp = InventoryItemImp;
