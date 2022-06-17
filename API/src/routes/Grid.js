var express = require("express");
var router  = express.Router();
const Grid  = require("../class/Grid");

router.post("/", async function (req, res) {
  let body = { ...req.body };
  let grid = new Grid(body);
  grid
    .buscaDados()
    .then((response) => {
      res.status(200).send({
        status: "success",
        data: {
          ...response,
        },
      });
    })
    .catch((error) => {
      res.status(500);
    });
});

module.exports = router;
