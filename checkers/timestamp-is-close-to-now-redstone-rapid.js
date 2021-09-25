const redstone = require("redstone-api");
const Checker = require("./checker");

// This checker will fetch prices for the most important tokens
// And check if their timestamps are close to now

// Tresholds in ms
const treshholds = {
  fatal: 60000,
  error: 25000,
  warning: 20000,
};

module.exports = class TimestampIsCloseToNowRedstoneRapid extends Checker {
  constructor() {
    super("TimestampIsCloseToNowRedstoneRapid");
  }

  async check() {
    const symbol = "ETH";

    const price = await redstone.getPrice(symbol, {
      verifySignature: true,
      provider: "redstone-rapid",
    });

    const diff = Checker.diffToNow(price.timestamp);

    if (process.env.MODE === "PROD") {
      if (diff > treshholds.fatal) {
        this.logger.error(
          `!!! NODE PROBABLY SHUT DOWN - RAPID !!! Time diff is greater than ${treshholds.fatal}ms for symbol "${symbol}": ${diff}ms`,
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
