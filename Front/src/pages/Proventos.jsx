import React, { useState } from "react";
import * as IoIcons        from "react-icons/io";
import * as GrIcons        from "react-icons/gr";
import * as FiIcons        from "react-icons/fi";
import CurrencyTextField   from "../components/CurrencyInput";
import api                 from "../api";
import TableData           from "../components/Grid/Grid";
import SearchInput         from "../components/SearchField/TextFieldSearch";
import { Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Fab, Alert } from "@mui/material";

export default () => {
  const dataAtual = new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, 0) + "-" + new Date().getDate().toString().padStart(2, 0);

  const [valor, setValor]           = useState("");
  const [data, setData]             = useState(dataAtual);
  const [eventoFixo, setEvenFixo]   = useState("S");
  const [descricao, setDescricao]   = useState("");
  const [recarega, setRecarrega]    = useState(false);

  const [msg, setMsg]               = useState("");
  const [exibiMsg, setExibiMsg]     = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("success");
  const [listen, setListen]         = useState(false);

  function resetaForm() {
    setValor("");
    setData(dataAtual);
    setEvenFixo("S");
    setDescricao("");
    setListen(!listen);
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

    api.post("proventos ", {
      valor: valor.replace("R$", "").replace(".", "").replace(",", "."),
      data: data,
      eventoFixo: eventoFixo,
      descricao: descricao,
    }).then((response) => {
      setExibiMsg(true);
      setMsg("Provento Cadastrado Com Sucesso!");
      setTipoAlerta("success");
      setRecarrega(!recarega);
      resetaMsg();
      resetaForm();
    }).catch((response) => {
      setExibiMsg(true);
      setMsg("Ocorreu um Erro ao Cadastrar o Provento. Favor Conferir!");
      setTipoAlerta("error");
      resetaMsg();
    });
  }

  function excluiRegistro() {
    let elemento = document.querySelector("#Id_Provento");

    if (elemento.getAttribute("popula") != 'false') {
      api.delete(`proventos?id=${elemento.value}`, {
        id: elemento.value
      }).then((response) => {
        if (response.data.status === "success") {
          setExibiMsg(true);
          setMsg("Provento Excluido Com Sucesso!");
          setRecarrega(!recarega);
          setTipoAlerta("success");
          resetaMsg();
          resetaForm();
        } else {
          setExibiMsg(true);
          setMsg("Ocorreu um Erro ao Excluir o Provento. Favor Conferir!");
          setTipoAlerta("warning");
          resetaMsg();
        }
      }).catch((response) => {
        setExibiMsg(true);
        setMsg("Ocorreu um Erro ao Excluir o Provento. Favor Conferir!");
        setTipoAlerta("error");
        resetaMsg();
      });
    } else {
      setExibiMsg(true);
      setMsg("Nao Existe Provento com esse ID para ser excluido!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }
  }

  async function populaDadosGrid(evento) {
    let elemento = document.querySelector("#Id_Provento");
    elemento.value = evento.row.col0;
    await elemento.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector("#button-search").dispatchEvent(new Event('click', { bubbles: true }));
  }

  async function resetaMsg() {
    setTimeout(() => {
      setExibiMsg(false);
    }, 7000);
  }

  return (
    <Container maxWidth="xl" spacing={24} sx={{ marginTop: 2, height: "98.1vh" }}>
      <h2>Lançamento de Proventos</h2>
      <Grid container direction="row" spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={4}>
          <SearchInput placeholder="Codigo" label="Codigo" table="proventos" primarykey="Id_Provento" id="Id_Provento" listen={listen.toString()} />
        </Grid>
        <Grid item xs={4}>
          <CurrencyTextField label="Valor Pago" value={valor} id="Valor_Provento" onInput={(e) => { setValor(e.target.value) }} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Data" variant="outlined" size="small" id="Data_Provento" type="date" value={data} onInput={(e) => { setData(e.target.value) }} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Evento Fixo
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" label="Evento Fixo" id="Evento_Fixo" size="small" value={eventoFixo} onInput={(e) => { setEvenFixo(e.target.value) }} onChange={(e) => { setEvenFixo(e.target.value); }} fullWidth>
              <MenuItem value="N">Nao</MenuItem>
              <MenuItem value="S">Sim</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField label="Descriçao" variant="outlined" size="small" id="Descricao_Provento" fullWidth value={descricao} onInput={(e) => { setDescricao(e.target.value) }} />
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={2} sx={{ marginTop: 4 }}>
        <div className="botoes">
          <Fab onClick={adicionaProvento} className="btn-add">
            <IoIcons.IoIosAdd size={30} />
            <div className="btn-msg">Atualizar ou Gravar Despesa</div>
          </Fab>
          <Fab onClick={resetaForm} className="btn-clear">
            <GrIcons.GrPowerReset size={20} />
            <div className="btn-msg">Limpar Campos</div>
          </Fab>
          <Fab onClick={excluiRegistro} className="btn-remove">
            <FiIcons.FiTrash2 size={20} />
            <div className="btn-msg">Excluir Despesa</div>
          </Fab>
        </div>
      </Grid>

      {exibiMsg ? (
        <Alert severity={tipoAlerta} sx={{ marginTop: 10 }}>
          {msg}
        </Alert>
      ) : (false)
      }

      <div style={{ height: 500, width: "100%", marginTop: 100 }}>
        <TableData
          onCellDoubleClick={e => { populaDadosGrid(e) }}
          table="proventos"
          change={recarega}
          campos="Id_Provento, Descricao_Provento, Data_Provento, Valor_Provento, CASE WHEN Evento_Fixo = 'S' THEN  'SIM' ELSE 'Nao' END AS Evento_Fixo"
          data={[
            {
              descricao: "Codigo",
              width: 100,
              campoBD: "Id_Provento",
              align: "right"
            },
            {
              descricao: "Descricao",
              width: 300,
              campoBD: "Descricao_Provento",
              align: "left"
            },
            {
              descricao: "Data",
              width: 200,
              tipo: "dataBR",
              campoBD: "Data_Provento",
            },
            {
              descricao: "Valor",
              width: 200,
              tipo: "moeda",
              campoBD: "Valor_Provento",
              align: "right"
            },
            {
              descricao: "Evento Fixo",
              width: 300,
              tipo: "moeda",
              campoBD: "Evento_Fixo",
            },
          ]}
          header="Descricao, Data, Valor"
        />
      </div>
    </Container>
  );
};
