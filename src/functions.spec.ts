import { totalIskFromInventoryImport } from "./functions";
import { InventoryItemImp } from "./inventory-item";

function testTotalIskFromInventoryImport() {
  const causesError = SpreadsheetApp.getActive()
    .getSheetByName("Form Responses 1")
    .getRange("J3");

  totalIskFromInventoryImport(causesError.getValue() as string);
}

function testNonTsvInventoryItem() {
  // string was copied from eve in compact inventory view
  const notTsvInput = `Agitated Dark Filament        1        Abyssal Filaments                        0.10 m3        70,865.08 ISK`;
  try {
    InventoryItemImp.createFromTsv(notTsvInput);
  } catch (error) {
    // @TODO
    // check for expected error to be thrown
  }
}
