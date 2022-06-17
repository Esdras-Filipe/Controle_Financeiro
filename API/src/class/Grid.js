const DB = require("./connection/DB");

class Grid extends DB {
  table;
  campos;
  where;

  constructor(params) {
    super();
    this.table  = params.table;
    this.campos = params.campos;
    this.where  = params.where ?? undefined;
  }

  async buscaDados() {
    return new Promise((resolve, reject) => {
      let query = `SELECT ${this.campos} FROM ${this.table} ` + (this.where != undefined ? ` WHERE ${this.where}` : "");
      this.exceSelect(query)
        .then((rows) => {
          resolve(rows);
        })
        .catch(() => {
          reject();
        });
    });
  }
}

module.exports = Grid;
