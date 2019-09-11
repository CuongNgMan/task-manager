const path = require("path");

// const development = require("./env/development");
// const production = require("./env/production");

import { development } from "./env/development";
import { production } from "./env/production";

const defaults = {
  root: path.join(__dirname, "..")
};

// const CONFIGURATION = {
//   development: Object.assign({}, development, defaults),
//   production: Object.assign({}, production, defaults)
// }[process.env.NODE_ENV || "development"];

// export default CONFIGURATION;
// export default {
//   development: Object.assign({}, development, defaults),
//   production: Object.assign({}, production, defaults)
// }[process.env.NODE_ENV || "development"];

export const CONFIGURATION = {
  development: Object.assign({}, development, defaults),
  production: Object.assign({}, production, defaults)
}[process.env.NODE_ENV || "development"];
