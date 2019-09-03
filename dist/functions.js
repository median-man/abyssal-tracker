"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inventory_1 = require("./inventory");
/**
 * Sums the total estimated isk from inventory imported from the
 * clipboard.
 * @param {string} inventoryImport - Inventory import (tab sep. values)
 * @returns The sum of the est. isk field for all items.
 * @customfunction
 */
function totalIskFromInventoryImport(inventoryImport) {
    Logger.log(inventoryImport);
    var inventory = inventory_1.InventoryImp.createFromClip(inventoryImport);
    return inventory.totalIsk();
}
