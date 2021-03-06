var express     = require('express');
var router      = express.Router();
const Proventos = require('../class/Proventos');

router.get('/', async function (req, res) {

});

router.get('/balancete', async function (req, res) {
    const proventos = new Proventos();

    proventos.balancete().then(response => {
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

router.post('/', function (req, res) {
    let body = { ...req.body };

    const proventos = new Proventos(body);

    proventos.insert().then((response) => {
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
    const proventos = new Proventos({ id: req.query.id });

    proventos.delete().then((response) => {
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