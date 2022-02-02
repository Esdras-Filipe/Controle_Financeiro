const DB = require("./connection/DB");

class Lancamentos extends DB {

    valor;
    categoria;
    tipoPagamento;
    data;
    descricao;

    constructor(props) {
        super();
        this.valor = props.valor;
        this.categoria = props.categoria;
        this.tipoPagamento = props.tipoPagamento;
        this.data = props.data;
        this.descricao = props.descricao;
    }

    async insert() {
        let query =
            `INSERT INTO Despesas 
            VALUES (NULL, ${this.valor}, ${this.categoria}, '${this.descricao}', ${this.tipoPagamento}, '${this.data}')`;
        return new Promise((resolve, reject) => {
            this.execQuery(query).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

    async delete() {

    }

    async update() {

    }
}

module.exports = Lancamentos;