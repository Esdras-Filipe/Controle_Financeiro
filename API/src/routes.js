var express = require('express');
var router = express.Router();

const routerLancamentos = require("./routes/lancamentos");
const routerGraphs = require('./routes/graphs');

router.use("/lancamentos", routerLancamentos)
router.use("/graphs", routerGraphs)

module.exports = router;