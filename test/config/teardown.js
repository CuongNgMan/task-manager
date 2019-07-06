module.exports = async function() {
  console.log("Teardown Mongo Connection");
  // delete global.mflixClient
  // delete global.mflixDB
  delete global.mongooseDB;
};
