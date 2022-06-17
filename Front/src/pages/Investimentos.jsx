import React, { useState } from "react";
import * as IoIcons        from "react-icons/io";
import * as GrIcons        from "react-icons/gr";
import * as FiIcons        from "react-icons/fi";
import CurrencyTextField   from "../components/CurrencyInput";
import api                 from "../api";
import TableData           from "../components/Grid/Grid";
import SearchInput         from "../components/SearchField/TextFieldSearch";
import { Container, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Fab, Alert } from "@mui/material";

export default () => {
  const dataAtual = new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, 0) + "-" + new Date().getDate().toString().padStart(2, 0);

  const [codigo, setCodigo]         = useState("");
  const [data, setData]             = useState(dataAtual);
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor]           = useState("");
  const [tipoAtivo, setTipoAtivo]   = useState(1);

  const [msg, setMsg]               = useState("");
  const [exibiMsg, setExibiMsg]     = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("success");
  const [listen, setListen]         = useState(false);
  const [recarega, setRecarrega]    = useState(false);

  function resetaForm() {
    setCodigo("");
    setData(dataAtual);
    setQuantidade("");
    setValor("");
    setTipoAtivo(1);
    resetaMsg();
    setListen(!listen);
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

    api.post("investimentos", {
      codigo: codigo,
      data: data,
      quantidade: quantidade === "" ? 0 : quantidade,
      valor: valor.replace("R$", "").replace(".", "").replace(",", "."),
      tipoAtivo: tipoAtivo,
    }).then((response) => {
      if (response.data.status === "success") {
        setExibiMsg(true);
        setMsg("Investimento Cadastrado com Sucesso!");
        setTipoAlerta("success");
        setRecarrega(!recarega);
        resetaForm();
      } else {
        setExibiMsg(true);
        setMsg("Ocorreu um erro ao Registrar o Investimento");
        setTipoAlerta("warning");
      }
    }).catch((response) => { });
  }

  function excluiRegistro() {
    let elemento = document.querySelector("#Id_Investimento");

    if (elemento.getAttribute("popula") != 'false') {
      api.delete(`investimentos?id=${elemento.value}`, {
        id: elemento.value
      }).then((response) => {
        if (response.data.status === "success") {
          setExibiMsg(true);
          setMsg("Investimento Excluido Com Sucesso!");
          setTipoAlerta("success");
          setRecarrega(!recarega);
          resetaMsg();
          resetaForm();
        } else {
          setExibiMsg(true);
          setMsg("Ocorreu um Erro ao Excluir o Investimento. Favor Conferir!");
          setTipoAlerta("warning");
          resetaMsg();
        }
      }).catch((response) => {
        setExibiMsg(true);
        setMsg("Ocorreu um Erro ao Excluir o Investimento. Favor Conferir!");
        setTipoAlerta("error");
        resetaMsg();
      });
    } else {
      setExibiMsg(true);
      setMsg("Nao Existe Investimento com esse ID para ser excluido!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }
  }

  async function populaDadosGrid(evento) {
    let elemento = document.querySelector("#Id_Investimento");
    elemento.value = evento.row.col0;
    await elemento.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector("#button-search").dispatchEvent(new Event('click', { bubbles: true }));
  }

  return (
    <>
      <Container sx={{ marginTop: 3, height: "98.1vh" }} maxWidth="xl">
        <h2>Lançamentos de Investimentos</h2>
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          <Grid item xs={4}>
            <SearchInput placeholder="Codigo" label="Codigo" table="investimentos" primarykey="Id_Investimento" id="Id_Investimento" listen={listen.toString()} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Codigo" variant="outlined" id="Codigo_Investimentos" size="small" fullWidth value={codigo} onInput={(e) => { setCodigo(e.target.value) }} />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="Data" variant="outlined" id="Data_Investimento" size="small" fullWidth value={data} onInput={(e) => { setData(e.target.value) }} />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Quantidade" variant="outlined" id="Quantidade_Investimento" size="small" fullWidthvalue={quantidade} onInput={(e) => { setQuantidade(e.target.value) }} />
          </Grid>
          <Grid item xs={4}>
            <CurrencyTextField label="Valor" variant="outlined" id="Valor_Investimento" size="small" fullWidth value={valor} onInput={(e) => { setValor(e.target.value) }} />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Categoria
              </InputLabel>
              <Select labelId="demo-simple-select-helper-label" id="Categoria" label="Tipo Ativo" size="small" fullWidth value={tipoAtivo} onChange={(e) => { setTipoAtivo(e.target.value); }} onInput={(e) => { setTipoAtivo(e.target.value) }}>
                <MenuItem value={1}>CDB</MenuItem>
                <MenuItem value={2}>FII'S</MenuItem>
                <MenuItem value={3}>LCA'S</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={2} sx={{ marginTop: 4 }}>
          <div className="botoes">
            <Fab onClick={registraDados} className="btn-add">
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
        ) : (
          false
        )}

        <div style={{ height: 500, width: "100%", marginTop: 100 }}>
          <TableData
            onCellDoubleClick={e => { populaDadosGrid(e) }}
            table="Investimentos"
            change={recarega}
            campos={`Id_Investimento, Codigo_Investimentos, Data_Investimento, IF(Quantidade_Investimento = 0, "", Quantidade_Investimento) AS Quantidade_Investimento, Valor_Investimento, CASE WHEN Categoria = 1 THEN "FII'S" ELSE 'CDB' END AS Categoria`}
            data={[
              {
                descricao: "ID",
                width: 100,
                campoBD: "Id_Investimento",
                align: "right"
              },
              {
                descricao: "Codigo Investimento",
                width: 300,
                campoBD: "Codigo_Investimentos",
                align: "left"
              },
              {
                descricao: "Data",
                width: 200,
                tipo: "dataBR",
                campoBD: "Data_Investimento",
              },
              {
                descricao: "Quantidade",
                width: 200,
                tipo: "numero",
                campoBD: "Quantidade_Investimento",
                align: "center"
              },
              {
                descricao: "Valor",
                width: 200,
                tipo: "moeda",
                campoBD: "Valor_Investimento",
                align: "right"
              },
              {
                descricao: "Categoria",
                width: 300,
                tipo: "valor",
                campoBD: "Categoria",
              },
            ]}
          />
        </div>
      </Container>
    </>
  );
};
