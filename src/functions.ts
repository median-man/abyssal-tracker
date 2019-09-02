import { InventoryImp } from "./inventory";

/**
 * Sums the total extimated isk from inventory imported from the
 * clipboard.
 * @param {string} inventoryImport - Inventory import (tab sep. values)
 * @returns The sum of the est. isk field for all items.
 * @customfunction
 */
function totalIskFromInventoryImport(inventoryImport: string): number {
  const inventory = InventoryImp.createFromClip(inventoryImport);
  return inventory.totalIsk();
}
