import { parseM3, sumisk } from "./isk";
import { ReadonlyRange } from "./readonly-range";

export interface InventoryItem {
  readonly name: string;
  readonly units: number;
  readonly group: string;
  readonly volume: number;
  readonly isk: number;
  toRange(includeHeaders?: boolean): ReadonlyRange;
}

export class InventoryItemImp implements InventoryItem {
  public static createFromTsv(tsv: string): InventoryItem {
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

  constructor(
    readonly name: string,
    readonly units: number,
    readonly group: string,
    readonly volume: number,
    readonly isk: number
  ) {}

  public toRange(includeHeaders = false): ReadonlyRange {
    const result: (string | number)[][] = [];
    if (includeHeaders) {
      result.push(["name", "group", "units", "volume", "isk"]);
    }
    result.push([this.name, this.group, this.units, this.volume, this.isk]);
    return result as ReadonlyRange;
  }
}
