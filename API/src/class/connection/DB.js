const { response } = require("express");
const mysql = require("mysql2/promise");

class DB {

    constructor() { }

    getConnection() {
        // create the connection to database
        return new Promise((resolve, reject) => {
            mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: "E215487369s",
                database: 'controlefinanceiro'
            }).then((connection) => {
                resolve(connection);
            }).catch((error) => {
                reject(error.sqlMessage);
            });
        })
    }

    async execQuery(query) {
        return new Promise((resolve, reject) => {
            this.getConnection().then((connection) => {
                connection.query(query).then(response => {
                    connection.end();
                    resolve("Success");
                }).catch(erro => {
                    connection.end();
                    reject(erro);
                });
            }).catch((error) => {
                reject(error);
            });
        })
    }

    async exceSelect(query) {
        return new Promise((resolve, reject) => {
            this.getConnection().then((connection) => {
                connection.query(query).then(([rows]) => {
                    connection.end();
                    resolve(rows)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error);
            })
        })
    }
}

module.exports = DB;