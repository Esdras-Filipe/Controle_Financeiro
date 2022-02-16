import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import * as GrIcons from "react-icons/gr";
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  Alert,
} from "@mui/material";
import CurrencyTextField from "../components/CurrencyInput";
import api from "../api";
import TableData from "../components/Grid/Grid";

export default (props) => {
  const dataAtual =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    new Date().getDate().toString().padStart(2, 0);

  const [codigo, setCodigo] = useState("");
  const [data, setData] = useState(dataAtual);
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [tipoAtivo, setTipoAtivo] = useState(1);

  const [msg, setMsg] = useState("");
  const [exibiMsg, setExibiMsg] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("success");

  function resetaForm() {
    setCodigo("");
    setData(dataAtual);
    setQuantidade("");
    setValor("");
    setTipoAtivo(1);
    resetaMsg();
  }

  async function resetaMsg() {
    setTimeout(() => {
      setExibiMsg(false);
    }, 5000);
  }

  function registraDados() {
    if (valor == "") {
      setExibiMsg(true);
      setMsg("Necessário Informar o Valor do Investimento!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }

    if (codigo == "") {
      setExibiMsg(true);
      setMsg("Necessário Informar um Codigo para o Investimento!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }

    api
      .post("investimentos", {
        codigo: codigo,
        data: data,
        quantidade: quantidade === "" ? 0 : quantidade,
        valor: valor.replace("R$", "").replace(".", "").replace(",", "."),
        tipoAtivo: tipoAtivo,
      })
      .then((response) => {
        if (response.data.status === "success") {
          setExibiMsg(true);
          setMsg("Investimento Cadastrado com Sucesso!");
          setTipoAlerta("success");
          resetaForm();
        } else {
          setExibiMsg(true);
          setMsg("Ocorreu um erro ao Registrar o Investimento");
          setTipoAlerta("warning");
        }
      })
      .catch((response) => {});
  }

  return (
    <>
      <Container sx={{ marginTop: 3, height: "98.1vh" }} maxWidth="xl">
        <h2>Lançamentos de Investimentos</h2>
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          <Grid item xs={3}>
            <TextField
              label="Codigo"
              variant="outlined"
              size="small"
              fullWidth
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="date"
              label="Data"
              variant="outlined"
              size="small"
              fullWidth
              value={data}
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Quantidade"
              variant="outlined"
              size="small"
              fullWidth
              value={quantidade}
              onChange={(e) => {
                setQuantidade(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <CurrencyTextField
              label="Valor"
              variant="outlined"
              size="small"
              fullWidth
              value={valor}
              onChange={(e) => {
                setValor(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Categoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Tipo Ativo"
                size="small"
                fullWidth
                value={tipoAtivo}
                onChange={(e) => {
                  setTipoAtivo(e.target.value);
                }}
              >
                <MenuItem value={1}>CDB</MenuItem>
                <MenuItem value={2}>FII'S</MenuItem>
                <MenuItem value={3}>LCA'S</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Grid sx={{ marginTop: 3 }} item xs={1}>
            <Fab color="primary" aria-label="add" onClick={registraDados}>
              <IoIcons.IoIosAdd size={30} />
            </Fab>
          </Grid>
          <Grid sx={{ marginTop: 3 }} item xs={1}>
            <Fab color="secondary" aria-label="add" onClick={resetaForm}>
              <GrIcons.GrPowerReset size={20} />
            </Fab>
          </Grid>
        </Grid>

        {exibiMsg ? (
          <Alert severity={tipoAlerta} sx={{ marginTop: 10 }}>
            {msg}
          </Alert>
        ) : (
          false
        )}

        <TableData
          table="Investimentos"
          campos="Codigo_Investimentos, Data_Investimento, Quantidade_Investimento, Valor_Investimento"
          data={[
            {
              descricao: "Codigo",
              width: 300,
              campoBD: "Codigo_Investimentos",
            },
            {
              descricao: "Data",
              width: 300,
              tipo: "dataBR",
              campoBD: "Data_Investimento",
            },
            {
              descricao: "Quantidade",
              width: 300,
              tipo: "numero",
              campoBD: "Quantidade_Investimento",
            },
            {
              descricao: "Valor",
              width: 300,
              tipo: "moeda",
              campoBD: "Valor_Investimento",
            },
          ]}
        ></TableData>
      </Container>
    </>
  );
};
