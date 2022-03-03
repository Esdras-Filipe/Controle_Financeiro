var express = require('express');
var router = express.Router();
const Lancamentos = require('../class/Lancamentos');

router.get('/', async function (req, res) {

});

router.post('/', function (req, res) {
    let body = { ...req.body };

    const lancamentos = new Lancamentos(body);

    lancamentos.insert().then((response) => {
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
    const lancamentos = new Lancamentos({ id: req.query.id });

    lancamentos.delete().then((response) => {
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