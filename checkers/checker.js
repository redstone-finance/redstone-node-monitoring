const consola = require("consola");

class Checker {
  name;
  logger;

  constructor(name) {
    this.name = name;
    this.logger = consola.withTag(name);
  }

  async run() {
    this.logger.info("Checker started");
    try {
      await this.check();
      this.logger.info("Checker completed");
    } catch (e) {
      this.logger.error("Checker failed", e.stack);
    }
  }

  async check() {
    throw new Error("Check method must be overriden");
  }

  static diffToNow(dateOrTimestamp) {
    return Date.now() - new Date(dateOrTimestamp).getTime();
  }

};

module.exports = Checker;
