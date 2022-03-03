const DB = require("./connection/DB");

class Lancamentos extends DB {

    id;
    valor;
    categoria;
    tipoPagamento;
    data;
    descricao;

    constructor(params) {
        super();
        this.id = params.id ?? null
        this.valor = params.valor;
        this.categoria = params.categoria;
        this.tipoPagamento = params.tipoPagamento;
        this.data = params.data;
        this.descricao = params.descricao;
    }

    async insert() {
        let query = `INSERT INTO Despesas VALUES (NULL, ${this.valor}, ${this.categoria}, '${this.descricao}', ${this.tipoPagamento}, '${this.data}')`;
        return new Promise((resolve, reject) => {
            this.execQuery(query).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

    async delete() {
        let query = `DELETE FROM Despesas WHERE Id_Despesa = ${this.id}`;
        return new Promise((resolve, reject) => {
            this.execQuery(query).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

    async update() {

    }
}

module.exports = Lancamentos;