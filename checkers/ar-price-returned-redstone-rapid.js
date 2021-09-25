const redstone = require("redstone-api");
const Checker = require("./checker");

module.exports = class ArPriceReturnedRedstoneRapid extends Checker {
  constructor() {
    super("ArPriceReturnedRedstoneRapid");
  }

  async check() {
    const arPrice = await redstone.getPrice("AR", {
      verifySignature: true,
      provider: "redstone-rapid",
    });
    this.logger.info(`Fetched AR price: ${arPrice.value}`, arPrice);
    if (!arPrice || !arPrice.value) {
      throw new Error("AR price is invalid");
    }
  }
};
