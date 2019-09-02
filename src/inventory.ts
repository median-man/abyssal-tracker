import { parseM3, sumisk } from "./isk";

type ReadonlyRange = ReadonlyArray<ReadonlyArray<string | number>>;

interface InventoryItem {
  readonly name: string;
  readonly units: number;
  readonly group: string;
  readonly volume: number;
  readonly isk: number;
  toRange(includeHeaders?: boolean): ReadonlyRange;
}

class InventoryItemImp implements InventoryItem {
  constructor(
    readonly name: string,
    readonly units: number,
    readonly group: string,
    readonly volume: number,
    readonly isk: number
  ) {}

  toRange(includeHeaders = false): ReadonlyRange {
    const result: (string | number)[][] = [];
    if (includeHeaders) {
      result.push(["name", "group", "units", "volume", "isk"]);
    }
    result.push([this.name, this.group, this.units, this.volume, this.isk]);
    return result as ReadonlyRange;
  }

  static createFromTsv(tsv: string): InventoryItem {
    const values = tsv
      .trim()
      .split("\t")
      .map(function(s) {
        return s.trim();
      });

    const name = values[0];
    const units = parseInt(values[1]);
    const group = values[2];
    const volume = parseM3(values[5]);
    const isk = sumisk(values[6]);
    const inventoryItem = new InventoryItemImp(name, units, group, volume, isk);

    return inventoryItem;
  }
}

interface Inventory {
  readonly items: InventoryItem[];
  totalIsk(): number;
  toRange(includeHeaders: boolean): ReadonlyRange;
}

export class InventoryImp implements Inventory {
  constructor(readonly items: InventoryItem[]) {}

  toRange(includeHeaders = false): ReadonlyRange {
    const result = [];
    if (includeHeaders) {
      result.push(this.items[0].toRange(true)[0]);
    }
    this.items.map(item => item.toRange()[0]).forEach(result.push);
    return result as ReadonlyRange;
  }

  totalIsk(): number {
    return this.items.map(({ isk }) => isk).reduce((a, b) => a + b, 0);
  }

  static createFromClip(clip): Inventory {
    const items = clip.split("\n").map(InventoryItemImp.createFromTsv);
    return new InventoryImp(items);
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
