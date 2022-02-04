const DB = require("./connection/DB");

class Proventos extends DB {

    valor;
    data;
    eventoFixo
    descricao

    constructor(props) {
        super()
        this.valor = props.valor;
        this.data = props.data;
        this.eventoFixo = props.eventoFixo;
        this.descricao = props.descricao;
    }

    async insert() {
        let query =
            `INSERT INTO Proventos 
        VALUES (NULL, ${this.valor}, '${this.data}', '${this.eventoFixo}', '${this.descricao}')`;
        return new Promise((resolve, reject) => {
            this.execQuery(query).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }
}

module.exports = Proventos;