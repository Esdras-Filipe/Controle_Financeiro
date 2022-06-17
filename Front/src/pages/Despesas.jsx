import { React, useState } from "react";
import * as IoIcons        from "react-icons/io";
import * as GrIcons        from "react-icons/gr";
import * as FiIcons        from "react-icons/fi";
import api                 from "../api";
import CurrencyTextField   from "../components/CurrencyInput";
import TableData           from "../components/Grid/Grid";
import SearchInput         from "../components/SearchField/TextFieldSearch";
import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Fab, Alert } from "@mui/material/";

function Lancamentos() {
  const dataAtual = new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, 0) + "-" + new Date().getDate().toString().padStart(2, 0);

  const [categoria, setCategoria]         = useState(1);
  const [valor, setValor]                 = useState("");
  const [carteira, setCarteira]           = useState(1);
  const [dataPagamento, setDataPagamento] = useState(dataAtual);
  const [descricao, setDescricao]         = useState("");

  const [msg, setMsg]                     = useState("");
  const [exibiMsg, setExibiMsg]           = useState(false);
  const [tipoAlerta, setTipoAlerta]       = useState("success");
  const [recarega, setRecarrega]          = useState(false);
  const [listen, setListen]               = useState(false);

  function resetaForm() {
    setCategoria(1);
    setDataPagamento(dataAtual);
    setCarteira(1);
    setValor("");
    setDescricao("");
    setListen(!listen);
  }

  async function populaDadosGrid(evento) {
    let elemento   = document.querySelector("#Id_Despesa");
    elemento.value = evento.row.col0;
    await elemento.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector("#button-search").dispatchEvent(new Event('click', { bubbles: true }));
  }

  function excluiRegistro() {
    let elemento = document.querySelector("#Id_Despesa");

    if (elemento.getAttribute("popula") != 'false') {
      api.delete(`Lancamentos?id=${elemento.value}`, {
        id: elemento.value
      }).then((response) => {
        if (response.data.status === "success") {
          setExibiMsg(true);
          setMsg("Despesa Excluida Com Sucesso!");
          setRecarrega(!recarega);
          setTipoAlerta("success");
          resetaMsg();
          resetaForm();
        } else {
          setExibiMsg(true);
          setMsg("Ocorreu um Erro ao Excluir a Despesa. Favor Conferir!");
          setTipoAlerta("warning");
          resetaMsg();
        }
      }).catch((response) => {
        setExibiMsg(true);
        setMsg("Ocorreu um Erro ao Excluir a Despesa. Favor Conferir!");
        setTipoAlerta("error");
        resetaMsg();
      });
    } else {
      setExibiMsg(true);
      setMsg("Nao Existe Despesa com esse ID para ser excluida!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }
  }

  function registraDados() {
    if (valor == "") {
      setExibiMsg(true);
      setMsg("Necessário Informar o Valor da Despesa!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }

    if (descricao == "") {
      setExibiMsg(true);
      setMsg("Necessário Informar uma Descrição para a Despesa!");
      setTipoAlerta("warning");
      resetaMsg();
      return false;
    }

    api.post("Lancamentos", {
      valor: valor.replace("R$", "").replace(".", "").replace(",", "."),
      categoria: categoria,
      tipoPagamento: carteira,
      data: dataPagamento,
      descricao: descricao,
    }).then((response) => {
      if (response.data.status === "success") {
        setExibiMsg(true);
        setMsg("Despesa Cadastrada Com Sucesso!");
        setTipoAlerta("success");
        setRecarrega(!recarega);
        resetaMsg();
        resetaForm();
      } else {
        setExibiMsg(true);
        setMsg("Ocorreu um Erro ao Cadastrar a Despesa. Favor Conferir!");
        setTipoAlerta("warning");
        resetaMsg();
      }
    }).catch((response) => {
      setExibiMsg(true);
      setMsg("Ocorreu um Erro ao Cadastrar a Despesa. Favor Conferir!");
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
    <Container maxWidth="xl" spacing={24} sx={{ marginTop: 2, height: "98.1vh" }}>
      <h2>Lançamentos de Despesas</h2>
      <Grid container direction="row" spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={4}>
          <SearchInput placeholder="Codigo" label="Codigo" table="Despesas" primarykey="Id_Despesa" id="Id_Despesa" listen={listen.toString()} />
        </Grid>
        <Grid item xs={4}>
          <TextField id="Descricao_Despesa" label="Descrição" size="small" fullWidth value={descricao} onInput={e => { setDescricao(e.target.value) }} />
        </Grid>
        <Grid item xs={3}>
          <CurrencyTextField id="Valor_Despesa" label="Valor Pago" value={valor} onInput={(e) => { setValor(e.target.value) }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label2">
              Pagar Com
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label2" id="Id_Metodo_Pagamento" label="Pagar Com" size="small" value={carteira} onInput={(e) => { setCarteira(e.target.value); }} onChange={(e) => { setCarteira(e.target.value); }} fullWidth
            >
              <MenuItem value={1}>Carteira</MenuItem>
              <MenuItem value={2}>Conta Reserva</MenuItem>
              <MenuItem value={3}>Cartoes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Categoria
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" id="Id_Categoria_Despesa" label="Categoria" size="small" value={categoria} onInput={(e) => { setCategoria(e.target.value); }} onChange={(e) => { setCategoria(e.target.value); }} fullWidth>
              <MenuItem value={1}>Outros</MenuItem>
              <MenuItem value={2}>Alimentacao</MenuItem>
              <MenuItem value={3}>Assinatura e Servicos</MenuItem>
              <MenuItem value={4}>Bares e Restaurante</MenuItem>
              <MenuItem value={5}>Casa</MenuItem>
              <MenuItem value={6}>Compras</MenuItem>
              <MenuItem value={7}>Cuidados Pessoais</MenuItem>
              <MenuItem value={8}>Dividas e emprestimos</MenuItem>
              <MenuItem value={9}>Educacao</MenuItem>
              <MenuItem value={10}>Familia e filhos</MenuItem>
              <MenuItem value={11}>Impostos e Taxas</MenuItem>
              <MenuItem value={12}>Investimentos</MenuItem>
              <MenuItem value={13}>Lazer e hobbies</MenuItem>
              <MenuItem value={14}>Cuidados Pessoais</MenuItem>
              <MenuItem value={15}>Mercado</MenuItem>
              <MenuItem value={17}>Pets</MenuItem>
              <MenuItem value={18}>Presentes e doacoes</MenuItem>
              <MenuItem value={19}>Roupas</MenuItem>
              <MenuItem value={20}>Saude</MenuItem>
              <MenuItem value={21}>Trabalho</MenuItem>
              <MenuItem value={22}>Transporte</MenuItem>
              <MenuItem value={23}>Viagem</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField id="Data_Despesa" label="Data" type="date" fullWidth size="small" value={dataPagamento} onInput={(e) => { setDataPagamento(e.target.value); }} />
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

      {exibiMsg ? (<Alert severity={tipoAlerta} sx={{ marginTop: 10 }}> {msg} </Alert>) : (false)}

      <div style={{ height: '56%', width: "100%", marginTop: 100 }}>
        <TableData
          onCellDoubleClick={e => { populaDadosGrid(e) }}
          change={recarega}
          table="Despesas LEFT JOIN Metodo_Pagamento ON Id_Metodo = Id_Metodo_Pagamento LEFT JOIN Categoria ON Id_Categoria = Id_Categoria_Despesa"
          campos="Id_Despesa, Descricao_Despesa, Data_Despesa, Valor_Despesa, Nome_Metodo, Nome_Categoria"
          data={[
            {
              descricao: "Codigo",
              width: 80,
              campoBD: "Id_Despesa",
              align: "right"
            },
            {
              descricao: "Descricao",
              width: 300,
              campoBD: "Descricao_Despesa",
              align: "left"
            },
            {
              descricao: "Data",
              width: 200,
              tipo: "dataBR",
              campoBD: "Data_Despesa",
            },
            {
              descricao: "Valor",
              width: 200,
              tipo: "moeda",
              campoBD: "Valor_Despesa",
              align: "right"
            },
            {
              descricao: "Metodo Pagamento",
              width: 300,
              campoBD: "Nome_Metodo",
            },
            {
              descricao: "Categoria",
              width: 250,
              campoBD: "Nome_Categoria",
            },
          ]}
        />
      </div>
    </Container >
  );
}

export default Lancamentos;
