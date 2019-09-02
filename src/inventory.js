"use strict";
exports.__esModule = true;
var isk_1 = require("./isk");
var InventoryItemImp = /** @class */ (function () {
    function InventoryItemImp(name, units, group, volume, isk) {
        this.name = name;
        this.units = units;
        this.group = group;
        this.volume = volume;
        this.isk = isk;
    }
    InventoryItemImp.prototype.toRange = function (includeHeaders) {
        if (includeHeaders === void 0) { includeHeaders = false; }
        var result = [];
        if (includeHeaders) {
            result.push(["name", "group", "units", "volume", "isk"]);
        }
        result.push([this.name, this.group, this.units, this.volume, this.isk]);
        return result;
    };
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
    return InventoryItemImp;
}());
var InventoryImp = /** @class */ (function () {
    function InventoryImp(items) {
        this.items = items;
    }
    InventoryImp.prototype.toRange = function (includeHeaders) {
        if (includeHeaders === void 0) { includeHeaders = false; }
        var result = [];
        if (includeHeaders) {
            result.push(this.items[0].toRange(true)[0]);
        }
        this.items.map(function (item) { return item.toRange()[0]; }).forEach(result.push);
        return result;
    };
    InventoryImp.prototype.totalIsk = function () {
        return this.items.map(function (_a) {
            var isk = _a.isk;
            return isk;
        }).reduce(function (a, b) { return a + b; }, 0);
    };
    InventoryImp.createFromClip = function (clip) {
        var items = clip.split("\n").map(InventoryItemImp.createFromTsv);
        return new InventoryImp(items);
    };
    return InventoryImp;
}());
exports.InventoryImp = InventoryImp;
// function createInventoryFromInventoryClip(clip) {
//   var inventoryItems = clip.split("\n").map(InventoryItemImp.createFromTsv);
//   var inventory = {};
//   var props = {
//     items: {
//       get: function() {
//         return inventoryItems.slice();
//       }
//     },
//     toRange: {
//       value: toRange,
//       writable: false
//     },
//     totalIsk: {
//       value: totalIsk,
//       writable: false
//     }
//   };
//   Object.defineProperties(inventory, props);
//   return inventory;
//   function toRange() {
//     return inventory.items.map(function(item) {
//       return item.toRange()[0];
//     });
//   }
//   function totalIsk() {
//     return inventory.items
//       .map(function(item) {
//         return item.isk;
//       })
//       .reduce(function(a, b) {
//         return a + b;
//       }, 0);
//   }
// }
// function testCreateInventoryFromInventoryClip() {
//   var invClip =
//     "Agitated Exotic Filament	3	Abyssal Filaments			0.30 m3	186,514.32 ISK\n" +
//     "Caldari Navy Scourge Light Missile	1,588	Light Missile			23.82 m3	1,366,299.32 ISK";
//   itShouldCalculateTotalIsk();
//   function itShouldCalculateTotalIsk() {
//     var result = createInventoryFromInventoryClip(invClip).totalIsk();
//     if (Math.floor(result) !== Math.floor(1552813.64)) {
//       throw new Error("Expected " + result + " to be " + result);
//     }
//   }
// }
