var express       = require('express');
var router        = express.Router();
const Rendimentos = require('../class/Rendimentos');

router.get('/', async function (req, res) {

});

router.post('/', async function (req, res) {
    let body = { ...req.body }
    const rendimentos = new Rendimentos(body);

    rendimentos.insert().then(response => {
        res.status(200).send({
            status: "success",
            data: {
                ...response
            }
        })
    }).catch(error => {
        console.log(error)
        res.status(500)
    });
});

router.put('/', function (req, res) {
    res.status(200).send({
        status: "success"
    });
});

router.delete('/', function (req, res) {
    const rendimentos = new Rendimentos({ id: req.query.id });

    rendimentos.delete().then((response) => {
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