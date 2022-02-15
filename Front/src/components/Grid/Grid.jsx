import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default (props) => {
  const [Data, setData] = useState([]);
  const [Header, setHeader] = useState([]);

  useEffect(() => {
    api
      .post("grid", {
        table: props.table,
        campos: props.campos,
      })
      .then((response) => {
        let dados = response.data.data;
        let linhas = "";
        let arrayDados = [];

        let segundoDados = [];

        console.log(props.data);

        props.data.forEach((elem, index) => {
          for (var chave in response.data.data) {
            let valor = dados[chave][elem.campoBD];

            linhas += `
            {"id": ${chave}`;

            if (elem.hasOwnProperty("tipo")) {
              //Significa que eu tenho que formatar o valor, se nao e apenas uma string
              if (elem.tipo == "moeda") {
                valor = valor.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                });
              } else if (elem.tipo == "dataBR") {
                valor = new Date(valor);
                valor =
                  valor.getDay().toString().padStart(2, "0") +
                  "/" +
                  (valor.getMonth() + 1).toString().padStart(2, "0") +
                  "/" +
                  valor.getFullYear();
              }
            }
          }
          segundoDados.push(
            `{
            "field": "col${index}",
            "headerName": "${elem.descricao}",
            "width": ${elem.width ?? 150}
          }`
          );
        });

        console.log(linhas);

        setHeader(JSON.parse("[" + segundoDados.join(",") + "]"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div style={{ height: 500, width: "100%", marginTop: 100 }}>
        <DataGrid rows={Data} columns={Header} />
      </div>
    </>
  );
};
