export function sumisk(input) {
  var isk
  if (!input) {
    return 0
  }
  if (typeof input === "string") {
    isk = createIsk(input)
    return isk.getValue()
  }
  return input
    .map(sumisk)
    .reduce(function (a, b) { return a + b }, 0)
}

export function createIsk(input) {
  var value
  if (typeof input !== "string") {
    throw new Error("Input must be a string.")
  }
  value = parseFloat(
    input
      .replace(/ isk/i, "")
      .replace(/,/g, "")
  )
  return {
    getValue: function() {  return value },
    toString: function() { return input }
  }
}

export function parseM3(input) {
  if (typeof input !== "string") {
    throw new Error("Cell value must be text.")
  }
  return parseFloat(input.replace(/m3/ig, "").trim())
}