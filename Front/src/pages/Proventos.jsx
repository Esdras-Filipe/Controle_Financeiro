import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import * as GrIcons from "react-icons/gr";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Alert,
} from "@mui/material";
import CurrencyTextField from "../components/CurrencyInput";
import api from "../api";
import TableData from "../components/Grid/Grid";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dataAtual =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    new Date().getDate().toString().padStart(2, 0);

  const [valor, setValor] = useState("");
  const [data, setData] = useState(dataAtual);
  const [eventoFixo, setEvenFixo] = useState("S");
  const [descricao, setDescricao] = useState("");

  const [msg, setMsg] = useState("");
  const [exibiMsg, setExibiMsg] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("success");

  function resetaForm() {
    setValor("");
    setData(dataAtual);
    setEvenFixo("S");
    setDescricao("");
  }

  function adicionaProvento() {
    if (valor == "") {
      setExibiMsg(true);
      setMsg("Necessário Informar o Valor do Provento!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }

    if (descricao == "") {
      setExibiMsg(true);
      setMsg("Necessário Informar uma Descrição para o Provento!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }

    api
      .post("proventos ", {
        valor: valor.replace("R$", "").replace(".", "").replace(",", "."),
        data: data,
        eventoFixo: eventoFixo,
        descricao: descricao,
      })
      .then((response) => {
        setExibiMsg(true);
        setMsg("Provento Cadastrado Com Sucesso!");
        setTipoAlerta("success");
        resetaMsg();
        resetaForm();
      })
      .catch((response) => {
        setExibiMsg(true);
        setMsg("Ocorreu um Erro ao Cadastrar o Provento. Favor Conferir!");
        setTipoAlerta("error");
        resetaMsg();
      });
  }

  async function resetaMsg() {
    setTimeout(() => {
      setExibiMsg(false);
    }, 7000);
  }

  return (
    <Container
      maxWidth="xl"
      spacing={24}
      sx={{ marginTop: 2, height: "98.1vh" }}
    >
      <h2>Lançamento de Proventos</h2>
      <Grid container direction="row" spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={4}>
          <CurrencyTextField
            label="Valor Pago"
            value={valor}
            onChange={(e) => {
              setValor(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Data"
            variant="outlined"
            size="small"
            type="date"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Evento Fixo
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Evento Fixo"
              size="small"
              value={eventoFixo}
              onChange={(e) => {
                setEvenFixo(e.target.value);
              }}
              fullWidth
            >
              <MenuItem value="N">Nao</MenuItem>
              <MenuItem value="S">Sim</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Descriçao"
            variant="outlined"
            size="small"
            fullWidth
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
          />
        </Grid>
      </Grid>

      <Grid container sx={{ marginTop: 4 }}>
        <Grid item xs={1}>
          <Fab color="primary" aria-label="add" onClick={adicionaProvento}>
            <IoIcons.IoIosAdd size={30} />
          </Fab>
        </Grid>
        <Grid item xs={1}>
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
        table="proventos"
        campos="Descricao_Provento, Data_Provento, Valor_Provento"
        data={[
          {
            descricao: "Descricao",
            width: 300,
            campoBD: "Descricao_Provento",
          },
          {
            descricao: "Data",
            width: 300,
            tipo: "dataBR",
            campoBD: "Data_Provento",
          },
          {
            descricao: "Valor",
            width: 300,
            tipo: "moeda",
            campoBD: "Valor_Provento",
          },
        ]}
        header="Descricao, Data, Valor"
      ></TableData>
    </Container>
  );
};
