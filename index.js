require("@babel/register")({
  extends: "./.babelrc",
  ignore: [/node_modules/]
});
require("dotenv").config();

exports = module.exports = require("./src");
