const redstone = require("redstone-api");
const Checker = require("./checker");

module.exports = class ArPriceReturned extends Checker {
  constructor() {
    super("ArPriceReturned");
  }

  async check() {
    const arPrice = await redstone.getPrice("AR", {
      verifySignature: true,
    });
    this.logger.info(`Fetched AR price: ${arPrice.value}`, arPrice);
    if (!arPrice || !arPrice.value) {
      throw new Error("AR price is invalid");
    }
  }
};
