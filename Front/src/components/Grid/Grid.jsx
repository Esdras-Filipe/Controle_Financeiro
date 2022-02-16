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
        let data = [];
        let Header = [];

        for (var chave in response.data.data) {
          let linhas = "";
          let valor = "";

          linhas += "{";
          linhas += ` "id" : "${chave}"`;
          props.data.forEach((elem, index) => {
            if (chave == 0) {
              Header.push(`{"field": "col${index}",
              "headerName": "${elem.descricao}",
              "width": "${elem.width ?? 200}",
              "headerAlign": "${elem.align ?? "center"}",
              "align": "${elem.align ?? "center"}"
            }`);
            }

            valor = response.data.data[chave][elem.campoBD];

            if (elem.hasOwnProperty("tipo")) {
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

            linhas += ",";
            linhas += `"col${index}": "${valor}"`;
          });

          linhas += "}";
          data.push(linhas);
        }

        setHeader(JSON.parse("[" + Header.join(",") + "]"));
        setData(JSON.parse("[" + data.join(",") + "]"));
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
