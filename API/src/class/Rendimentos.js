const DB = require("./connection/DB");

class Rendimentos extends DB {

    id;
    codigo;
    data;
    valor;

    constructor(params) {
        super();
        this.id     = params.id;
        this.codigo = params.codigo;
        this.data   = params.data;
        this.valor  = params.valor
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

    async delete() {
        let query = `DELETE FROM rendimentos WHERE Id_Rendimento = ${this.id}`;
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


