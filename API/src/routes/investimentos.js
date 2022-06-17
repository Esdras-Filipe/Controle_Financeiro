var express         = require('express');
var router          = express.Router();
const Investimentos = require('../class/Investimentos');

router.get('/', async function (req, res) {

});

router.post('/', function (req, res) {
    let body = { ...req.body };

    const investimentos = new Investimentos(body);

    investimentos.insert().then((response) => {
        res.status(200).send({
            status: "success"
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({
            status: "error",
            sqlMessage: error
        });
    });
});

router.put('/', function (req, res) {
    res.status(200).send({
        status: "success"
    });
});

router.delete('/', function (req, res) {
    const investimentos = new Investimentos({ id: req.query.id });

    investimentos.delete().then(() => {
        res.status(200).send({
            status: "success"
        });
    }).catch((error) => {
        res.status(500).send({
            status: "error",
            sqlMessage: error
        });
    });
});

module.exports = router;