var express = require('express');
var router = express.Router();
const Graphs = require('../class/Graphs');

router.get('/despesas', async function (req, res) {
    let graph = new Graphs();

    graph.getDespesas().then(response => {
        res.status(200).send({
            status: "success",
            data: {
                ...response
            }
        })
    }).catch(error => {
        res.status(500)
    });
});

module.exports = router;