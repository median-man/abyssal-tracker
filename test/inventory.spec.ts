import { InventoryImp } from "../src/inventory";

inventoryTestSuite();

function inventoryTestSuite() {
  try {
    itCalculatesTotalIsk();
    console.log("It calculates total isk: PASSED")
  } catch (error) {
    console.log("It calculates total isk: FAILED")
    console.log(error)
  }

  function itCalculatesTotalIsk() {
    const invClip =
      "Agitated Exotic Filament	3	Abyssal Filaments			0.30 m3	186,000.00 ISK\n" +
      "Caldari Navy Scourge Light Missile	1,588	Light Missile			23.82 m3	1,000,000.00 ISK";

    const inventory = InventoryImp.createFromClip(invClip);

    if (inventory.totalIsk() !== 1186000) {
      throw new Error("Expected inventory.totalIsk() to return 1186000")
    }
  }
}
