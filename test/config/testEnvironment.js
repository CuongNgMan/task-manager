//custom testing environment
const NodeEnvironment = require("jest-environment-node");
const m = require("mongoose");

const DB_NAME = process.env.__DB_NAME__;
const DB_PORT = process.env.__DB_PORT__ || "27017";
const SERV_PORT = process.env.__SRV_PORT__ || "3000";

const DB_URI = process.env.__URI__ || `mongodb://127.0.0.1:${DB_PORT}`;

const CONNECTION_STRING = `${DB_URI}/${DB_NAME}`;
const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE
};

module.exports = class TestEnvironment extends NodeEnvironment {
  async setup() {
    this.global.taskmanagerDBO = m.connect();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
