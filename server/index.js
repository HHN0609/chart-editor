const express = require("express");
const app = express();
const port = 9000;

app.get("/api/user", (request, response) => {
  response.json({
    name: "hehaonan",
  });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
