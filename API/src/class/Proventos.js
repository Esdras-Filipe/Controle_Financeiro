const DB = require("./connection/DB");

class Proventos extends DB {

    valor;
    data;
    eventoFixo
    descricao

    constructor(props) {
        super()
        if (props != undefined) {
            this.valor = props.valor;
            this.data = props.data;
            this.eventoFixo = props.eventoFixo;
            this.descricao = props.descricao;
        }
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

    async balancete() {
        return new Promise((resolve, reject) => {
            let query =
                `SELECT 
                    Provento - Despesa AS Balancente
                FROM
                    (
                        SELECT 
                            SUM(Valor_Despesa)  AS Despesa
                        FROM Despesas 
                        WHERE 
                            IF(EXTRACT(DAY FROM NOW()) >= 7, EXTRACT(YEAR_MONTH FROM Data_Despesa) = EXTRACT(YEAR_MONTH FROM NOW()), EXTRACT(YEAR_MONTH FROM Data_Despesa) = EXTRACT(YEAR_MONTH FROM (DATE_SUB(NOW(), INTERVAL 1 MONTH))))
                        GROUP BY EXTRACT(MONTH FROM Data_Despesa)
                    ) Despesas,
                    (
                        SELECT 
                            SUM(Valor_Provento)  AS Provento
                        FROM Proventos 
                        WHERE 
                            IF(EXTRACT(DAY FROM NOW()) >= 7, EXTRACT(YEAR_MONTH FROM Data_Provento) = EXTRACT(YEAR_MONTH FROM NOW()), EXTRACT(YEAR_MONTH FROM Data_Provento) = EXTRACT(YEAR_MONTH FROM (DATE_SUB(NOW(), INTERVAL 1 MONTH))))
                        GROUP BY EXTRACT(MONTH FROM Data_Provento)
                    ) Proventos`;
            this.exceSelect(query).then((rows) => {
                resolve(rows)
            }).catch(() => {
                reject();
            })
        })
    }

}

module.exports = Proventos;