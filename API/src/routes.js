var express = require('express');
var router = express.Router();

const routerLancamentos = require("./routes/lancamentos");
const routerGraphs = require('./routes/graphs');
const proventos = require('./routes/proventos');

router.use("/lancamentos", routerLancamentos)
router.use("/graphs", routerGraphs)
router.use("/proventos", proventos)

module.exports = router;