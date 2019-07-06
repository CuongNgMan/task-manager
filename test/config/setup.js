require("dotenv").config({ path: ".env.test" });

module.exports = async function() {
  console.log("Setup Mongo Connection for testing");
};
