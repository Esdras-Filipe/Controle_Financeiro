var express = require('express');
var router = express.Router();

const routerLancamentos = require("./routes/lancamentos");
const routerGraphs = require('./routes/graphs');
const proventos = require('./routes/proventos');
const investimentos = require('./routes/investimentos');

router.use("/lancamentos", routerLancamentos)
router.use("/graphs", routerGraphs)
router.use("/proventos", proventos)
router.use("/investimentos", investimentos)

module.exports = router;