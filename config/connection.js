const { connect, connection } = require("mongoose");

connect("mongodb://localhost/Social-Network-Api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = connection;
