const LOG_LEVEL = 1;

function reportError(args) {
  console.log(args);
}

class LocalErrorReporter {
  constructor() {}

  log(logObj) {
    const levels = {
      0: "ERROR",
      1: "WARNING",
    };

    const level = logObj.level;

    if (level <= LOG_LEVEL) {
      reportError({
        error: JSON.stringify(logObj.args),
        errorTitle: `${levels[level]}-${logObj.tag}`,
      });
    }
  }
};

module.exports = LocalErrorReporter;
