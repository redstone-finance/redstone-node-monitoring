const redstone = require("redstone-api");
const Checker = require("./checker");

module.exports = class ArweaveTimestampDelay extends Checker {
  constructor() {
    super("ArweaveTimestampDelay");
  }

  async check() {
    const noCacheClient = new redstone.Api({ useCache: false });
    const arPrice = await noCacheClient.getPrice("AR");
    this.logger.info(`Fetched AR price from arweave: ${arPrice.value}`, arPrice);

    if (!arPrice || !arPrice.value) {
      throw new Error("AR price is invalid");
    }

    const diff = Checker.diffToNow(arPrice.timestamp);
    this.logger.info(`Arweave timestamp diff (ms): ${diff}`);
  }
};
