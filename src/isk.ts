export function sumisk(input: string | string[]): number {
  let isk;
  if (!input) {
    return 0;
  }
  if (typeof input === "string") {
    isk = createIsk(input);
    return isk.getValue();
  }
  return input.map(sumisk).reduce((a, b) => a + b, 0);
}

interface Isk {
  getValue(): number;
  toString(): string;
}

export function createIsk(input: string): Isk {
  const value = parseFloat(input.replace(/ isk/i, "").replace(/,/g, ""));
  return {
    getValue: () => value,
    toString: () => input
  };
}

export function parseM3(input: string): number {
  return parseFloat(input.replace(/m3/gi, "").trim());
}
