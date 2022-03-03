const DB = require("./connection/DB");

class Rendimentos extends DB {

    codigo;
    data;
    valor;

    constructor(params) {
        super();
        this.codigo = params.codigo;
        this.data = params.data;
        this.valor = params.valor
    }

    async insert() {
        let query =
            `INSERT INTO Rendimentos VALUES (NULL, '${this.codigo}', '${this.data}', '${this.valor}')`;
        return new Promise((resolve, reject) => {
            this.execQuery(query).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }
}

module.exports = Rendimentos;


