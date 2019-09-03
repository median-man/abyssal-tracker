import { InventoryItem, InventoryItemImp } from "./inventory-item";
import { ReadonlyRange } from "./readonly-range";

interface Inventory {
  readonly items: InventoryItem[];
  totalIsk(): number;
  toRange(includeHeaders: boolean): ReadonlyRange;
}

export class InventoryImp implements Inventory {
  public static createFromClip(clip: string): Inventory {
    const items = clip.split("\n").map(InventoryItemImp.createFromTsv);
    Logger.log(JSON.stringify(items));
    return new InventoryImp(items);
  }

  constructor(readonly items: InventoryItem[]) {}

  public toRange(includeHeaders = false): ReadonlyRange {
    const result = [];
    if (includeHeaders) {
      result.push(this.items[0].toRange(true)[0]);
    }
    this.items.map((item) => item.toRange()[0]).forEach(result.push);
    return result as ReadonlyRange;
  }

  public totalIsk(): number {
    return this.items.map(({ isk }) => isk).reduce((a, b) => a + b, 0);
  }
}
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
