const DB = require("./connection/DB");

class Investimentos extends DB {

    id;
    codigo;
    data;
    quantidade;
    valor;
    categoria;

    constructor(props) {
        super();
        this.id         = props.id;
        this.codigo     = props.codigo;
        this.data       = props.data;
        this.quantidade = props.quantidade;
        this.valor      = props.valor;
        this.categoria  = props.tipoAtivo;
    }

    async insert() {
        let query =
            `INSERT INTO Investimentos 
                VALUES (NULL, '${this.codigo}', '${this.data}', '${this.quantidade}', ${this.valor}, '${this.categoria}')`;
        console.log(query)
        return new Promise((resolve, reject) => {
            this.execQuery(query).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

    async delete() {
        let query = `DELETE FROM investimentos WHERE Id_Investimento = ${this.id}`;
        return new Promise((resolve, reject) => {
            this.execQuery(query).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }
}

module.exports = Investimentos;