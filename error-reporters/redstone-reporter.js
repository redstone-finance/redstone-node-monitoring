const axios = require("axios");

async function reportError(args) {
  const URL = "https://api.redstone.finance/errors";
  try {
    console.log(`Reporting an error`, args);
    await axios.post(URL, args);
    console.log("Error reported");
  } catch (e) {
    console.error("Error occured during error reporting", e.stack);
  }
}

class RedstoneErrorReporter {
  constructor() {}

  log(logObj) {
    const levels = {
      0: "ERROR",
      1: "WARNING",
    };

    const level = logObj.level;

    if (level <= 1) {
      reportError({
        error: JSON.stringify(logObj.args),
        errorTitle: `${levels[level]}-${logObj.tag}`,
      });
    }
  }
};

module.exports = RedstoneErrorReporter;
