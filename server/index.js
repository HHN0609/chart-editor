const express = require("express");
const config = require("./config");
const app = express();
const dp = require("./db");

const port = config.express.port;
const secretkey = config.express.secretkey;

app.get("/api/user", (request, response) => {
  console.log(request);
  response.json({
    name: "hehaonan",
  });
});

app.route("/api/user/info")
  .get((req, res) => {

  })
  .post((req, res) => {

  })
  .put((req, res) => {

  });

app.listen(port, () => {
  console.log("Listening on port " + port);
});
