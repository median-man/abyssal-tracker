inventoryValueTestSuite()

function inventoryValueTestSuite() {
  console.log("-------------------------------")
  console.log("inventoryValue(inventoryClip)\n")

  let testDescription = "returns the isk value"
  try {
    itShouldReturnTheIskValue()
    console.log(`PASSED: ${testDescription}`)
  } catch (error) {
    console.log(`FAILED: ${testDescription}`)
    console.log(error)
  }

  function itShouldReturnTheIskValue() {

  }
}