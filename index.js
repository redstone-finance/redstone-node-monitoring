const consola = require("consola");
const checkers = require("./checkers");
const redstone = require("redstone-api");
const RedstoneErrorReporter = require("./error-reporters/redstone-reporter");
const LocalErrorReporter = require("./error-reporters/local-reporter");

if (isProd()) {
  consola.setReporters([
    new consola.JSONReporter(),
    new RedstoneErrorReporter(),
  ]);
} else {
  consola.setReporters([
    new LocalErrorReporter(),
  ]);
}

const localCheckers = [
  "ArPriceReturned",
  "TimestampIsCloseToNow",
  "ArweaveTimestampDelay",
  "HistoricalPricesReturned",
  "ArPriceReturnedRedstoneRapid",
  "TimestampIsCloseToNowRedstoneRapid",
  "StockPricesReturnedRedstoneStocks",
];
const prodCheckers = [
  "ArPriceReturned",
  "TimestampIsCloseToNow",
  "ArweaveTimestampDelay",
  "HistoricalPricesReturned",
  "ArPriceReturnedRedstoneRapid",
  "TimestampIsCloseToNowRedstoneRapid",
  "StockPricesReturnedRedstoneStocks",
];

function isProd() {
  return process.env.MODE === "PROD";
}

async function runApiCheck() {
  if (process.env.MODE === "LOCAL") {
    redstone.setCacheApiUrl("http://localhost:9000/prices");
  }
  const checkersToRun = isProd() ? prodCheckers : localCheckers;

  for (const checkerName of checkersToRun) {
    const checker = new checkers[checkerName]();
    await checker.run();
  }
}

exports.handler = async function(_event, _context) {
  try {
    await runApiCheck();
  } catch (e) {
    consola.error(e.stack, { tag: "index" });
  }
};
