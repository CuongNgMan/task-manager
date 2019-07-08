//custom testing environment
const NodeEnvironment = require("jest-environment-node");
const m = require("mongoose");

const DB_URI = process.env.__URI__;

const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE
};

module.exports = class TestEnvironment extends NodeEnvironment {
  async setup() {
    if (!this.global.mongooseDB) {
      this.global.mongooseDB = m.createConnection();
    }
    await super.setup();
  }

  async teardown() {
    if (this.global.mongooseDB) {
      this.global.mongooseDB.close();
    }
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
