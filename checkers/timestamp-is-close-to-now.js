const redstone = require("redstone-api");
const Checker = require("./checker");

// This checker will fetch prices for the most important tokens
// And check if their timestamps are close to now

// Tresholds in ms
const treshholds = {
  fatal: 180000,
  error: 130000,
  warning: 110000,
};

module.exports = class TimestampIsCloseToNow extends Checker {
  constructor() {
    super("TimestampIsCloseToNow");
  }

  async check() {
    const symbol = "WBTC";

    const price = await redstone.getPrice(symbol, {
      verifySignature: true,
    });

    const diff = Checker.diffToNow(price.timestamp);

    if (process.env.MODE === "PROD") {
      if (diff > treshholds.fatal) {
        this.logger.error(
          `!!! NODE PROBABLY SHUT DOWN - MAIN !!! Time diff is greater than ${treshholds.fatal}ms for symbol "${symbol}": ${diff}ms`,
          price);
      } else if (diff > treshholds.error) {
        this.logger.error(
          `Time diff is greater than ${treshholds.error}ms for symbol "${symbol}": ${diff}ms`,
          price);
      } else if (diff > treshholds.warning) {
        this.logger.warn(
          `Time diff is greater than ${treshholds.warning}ms for symbol "${symbol}": ${diff}ms`,
          price);
      } else {
        this.logger.info(
          `Time diff for symbol "${symbol}": ${diff}ms`,
          price);
      }
    } else {
      this.logger.info(`Diff: ${diff / 1000}s`);
    }
  }
};
