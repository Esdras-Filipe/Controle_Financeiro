const DB = require("./connection/DB");

class Graphs extends DB {

    constructor() {
        super();
    }

    getDespesas() {
        return new Promise((resolve, reject) => {
            let query =
                `SELECT 
                    SUM(Valor_Despesa) AS Valor 
                    ,CASE 
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 1 THEN 'Janeiro'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 2 THEN 'Fevereiro'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 3 THEN 'Marco'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 4 THEN 'Abril'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 5 THEN 'Maio'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 6 THEN 'Junho'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 7 THEN 'Julho'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 8 THEN 'Agosto'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 9 THEN 'Setembro'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 10 THEN 'Outubro'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 11 THEN 'Novembro'
                        WHEN EXTRACT(MONTH FROM Data_Despesa) = 12 THEN 'Dezembro'
                    END AS Mes
                FROM Despesas 
                WHERE 
                    Data_Despesa >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
                GROUP BY EXTRACT(MONTH FROM Data_Despesa)
                ORDER BY Data_Despesa ASC`;
            this.exceSelect(query).then((rows) => {
                resolve(rows)
            }).catch(() => {
                reject();
            })
        })
    }

    getProventos() {
        return new Promise((resolve, reject) => {
            let query =
                `SELECT 
                    SUM(Valor_Provento) AS Valor 
                    ,CASE 
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 1 THEN 'Janeiro'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 2 THEN 'Fevereiro'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 3 THEN 'Marco'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 4 THEN 'Abril'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 5 THEN 'Maio'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 6 THEN 'Junho'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 7 THEN 'Julho'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 8 THEN 'Agosto'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 9 THEN 'Setembro'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 10 THEN 'Outubro'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 11 THEN 'Novembro'
                        WHEN EXTRACT(MONTH FROM Data_Provento) = 12 THEN 'Dezembro'
                    END AS Mes
                FROM Proventos 
                WHERE 
                    Data_Provento >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
                GROUP BY EXTRACT(MONTH FROM Data_Provento)
                ORDER BY Data_Provento ASC`;
            this.exceSelect(query).then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err);
            })
        })
    }

}

module.exports = Graphs;