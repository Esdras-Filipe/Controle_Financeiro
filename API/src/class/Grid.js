const DB = require("./connection/DB");

class Grid extends DB {
  table;
  campos;

  constructor(props) {
    super();
    this.table = props.table;
    this.campos = props.campos;
  }

  async buscaDados() {
    return new Promise((resolve, reject) => {
      let query = `SELECT ${this.campos} FROM ${this.table}`;
      this.exceSelect(query)
        .then((rows) => {
          console.log("deu certo");
          resolve(rows);
        })
        .catch(() => {
          console.log("deu errado");
          reject();
        });
    });
  }
}

module.exports = Grid;
