import { InventoryImp } from "./inventory";

/**
 * Sums the total estimated isk from inventory imported from the
 * clipboard.
 * @param {string} inventoryImport - Inventory import (tab sep. values)
 * @returns The sum of the est. isk field for all items.
 * @customfunction
 */
export function totalIskFromInventoryImport(inventoryImport: string): number {
  // @TODO
  // add logic to check if inventoryImport is tsv
  // if not tsv...
  // determine separator and replace with tabs before calling createFromClip
  // end if
  Logger.log(inventoryImport);
  const inventory = InventoryImp.createFromClip(inventoryImport);
  return inventory.totalIsk();
}
