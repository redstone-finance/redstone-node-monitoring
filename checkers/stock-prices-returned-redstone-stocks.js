const redstone = require("redstone-api");
const Checker = require("./checker");

const FATAL_TRESHOLD = 180000;
const TIMESTAMP_TRESHOLD = 90000;

module.exports = class StockPricesReturnedRedstoneStocks extends Checker {
  constructor() {
    super("StockPricesReturnedRedstoneStocks");
  }

  async check() {
    const stockSymbols = ["TSLA", "AAPL", "AMZN"];
    const stocks = await redstone.getPrice(stockSymbols, {
      provider: "redstone-stocks",
    });
    for (const symbol of stockSymbols) {
      const { value, timestamp } = stocks[symbol];
      const diff = Date.now() - timestamp;
      if (value === undefined || value === 0) {
        this.logger.warn(
          `Price is incorrect for stock "${symbol}". Value: "${value}"`);
      }
      if (diff > FATAL_TRESHOLD) {
        this.logger.error(
          `!!! NODE PROBABLY SHUT DOWN - STOCKS !!! Timestamp diff is too big: "${diff / 1000} s". Stock symbol: ${symbol}`);
      }
      if (diff > TIMESTAMP_TRESHOLD) {
        this.logger.error(
          `Timestamp diff is too big: "${diff / 1000} s". Stock symbol: ${symbol}`);
      }
    }
  }
};
