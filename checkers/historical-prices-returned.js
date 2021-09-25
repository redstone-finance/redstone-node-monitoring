const redstone = require("redstone-api");
const Checker = require("./checker");

const HISTORICAL_PRICES_MIN_COUNT = 9;
const DIFF_ERROR_TRESHOLD = 65000; // ms

module.exports = class HistoricalPricesReturned extends Checker {
  constructor() {
    super("HistoricalPricesReturned");
  }

  async check() {
    const startTimestamp = Date.now() - 10 * 60 * 1000; // timestamp 10 mins ago
    const endTimestamp = Date.now() - 30 * 1000; // timestamp 30 seconds ago
    const interval = 1; // 1s, because we want to fetch all prices in the time range

    const prices = await redstone.getHistoricalPrice("BTC", {
      startDate: new Date(startTimestamp),
      endDate: new Date(endTimestamp),
      interval,
    });

    const timestamps = prices.map(p => p.timestamp);

    if (timestamps.length < HISTORICAL_PRICES_MIN_COUNT) {
      this.logger.warn(`Too few prices returned: ${timestamps.length}`, timestamps);
    }

    const diffs = [];
    let isOk = true;
    let prevTimestamp = timestamps[0];
    for (let i = 1; i < timestamps.length; i++) {
      const timestamp = timestamps[i];
      const diff = timestamp - prevTimestamp;
      diffs.push(diff);
      prevTimestamp = timestamp;

      if (diff > DIFF_ERROR_TRESHOLD) {
        isOk = false;
      }
    }

    if (isOk) {
      // this.logger.info("Got historical prices", {
      //   timestamps,
      //   diffs,
      // });
    } else {
      this.logger.warn("Please review historical prices", {
        startTimestamp,
        endTimestamp,
        interval,
        timestampsForFetchedPrices: timestamps,
        diffs,
      });
    }
  }
};
