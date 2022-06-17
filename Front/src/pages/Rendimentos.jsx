import React, { useState } from "react";
import * as IoIcons        from "react-icons/io";
import * as GrIcons        from "react-icons/gr";
import * as FiIcons        from "react-icons/fi";
import CurrencyTextField   from "../components/CurrencyInput";
import api                 from "../api";
import TableData           from "../components/Grid/Grid";
import SearchInput         from "../components/SearchField/TextFieldSearch";
import { Container, Grid, TextField, Fab, Alert } from "@mui/material";

export default () => {
    async function resetaMsg() { setTimeout(() => { setExibiMsg(false); }, 7000); }

    const dataAtual = new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, 0) + "-" + new Date().getDate().toString().padStart(2, 0);

    const [codigo, setCodigo]         = useState("");
    const [data, setData]             = useState(dataAtual);
    const [valor, setValor]           = useState("");
    const [recarega, setRecarrega]    = useState(false);

    const [msg, setMsg]               = useState("");
    const [exibiMsg, setExibiMsg]     = useState(false);
    const [tipoAlerta, setTipoAlerta] = useState("success");
    const [listen, setListen]         = useState(false);

    function resetaForm() {
        setCodigo("");
        setData(dataAtual);
        setValor("");
        setListen(!listen);
    }

    async function populaDadosGrid(evento) {
        let elemento = document.querySelector("#Id_Rendimento");
        elemento.value = evento.row.col0;
        await elemento.dispatchEvent(new Event('input', { bubbles: true }));
        document.querySelector("#button-search").dispatchEvent(new Event('click', { bubbles: true }));
    }

    function registraRendimentos() {
        if (codigo == "") {
            setMsg("Necessario Informar o Codigo!");
            setTipoAlerta("warning");
            setExibiMsg(true);
            return false;
        }

        if (valor == "") {
            setMsg("Necessario Informar o Valor!");
            setTipoAlerta("warning");
            setExibiMsg(true);
            return false;
        }

        api.post("rendimentos", {
            codigo: codigo,
            data: data,
            valor: valor.replace("R$", "").replace(".", "").replace(",", ".")
        }).then(() => {
            setMsg("Rendimento Cadastrado com Sucesso!");
            setRecarrega(!recarega);
            setTipoAlerta("success");
            setExibiMsg(true);
            resetaForm();
            resetaMsg();
        }).catch((error) => {
            setMsg("Ocorreu um Erro ao Salvar Registro!");
            setTipoAlerta("error");
            setExibiMsg(true);
            resetaMsg();
        })
    }

    function excluiRegistro() {
        let elemento = document.querySelector("#Id_Rendimento");

        if (elemento.getAttribute("popula") != 'false') {
            api.delete(`rendimentos?id=${elemento.value}`, {
                id: elemento.value
            }).then((response) => {
                if (response.data.status === "success") {
                    setExibiMsg(true);
                    setMsg("Rendimento Excluido Com Sucesso!");
                    setRecarrega(!recarega);
                    setTipoAlerta("success");
                    resetaMsg();
                    resetaForm();
                } else {
                    setExibiMsg(true);
                    setMsg("Ocorreu um Erro ao Excluir o Rendimento. Favor Conferir!");
                    setTipoAlerta("warning");
                    resetaMsg();
                }
            }).catch(() => {
                setExibiMsg(true);
                setMsg("Ocorreu um Erro ao Excluir o Rendimento. Favor Conferir!");
                setTipoAlerta("error");
                resetaMsg();
            });
        } else {
            setExibiMsg(true);
            setMsg("Não Existe Rendimento com esse ID para ser excluido!");
            setTipoAlerta("warning");
            resetaMsg();
            return false;
        }
    }

    return (
        <>
            <Container maxWidth="xl" sx={{ marginTop: 2 }}>
                <h2>Lançamento de Rendimentos</h2>
                <Grid container sx={{ marginTop: 7 }} spacing={2}>
                    <Grid item xs={4}>
                        <SearchInput placeholder="Codigo" label="Codigo" table="rendimentos" primarykey="Id_Rendimento" id="Id_Rendimento" listen={listen.toString()} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField size="small" label="Codigo" id="Codigo_Rendimento" variant="outlined" fullWidth value={codigo} onInput={e => { setCodigo(e.target.value); }} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Data" id="Data_Rendimento" variant="outlined" size="small" type="date" fullWidth value={data} onInput={(e) => { setData(e.target.value); }} />
                    </Grid>
                    <Grid item xs={3}>
                        <CurrencyTextField size="small" id="Valor_Rendimento" label="Valor" variant="outlined" fullWidth value={valor} onInput={(e) => { setValor(e.target.value); }} />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2} sx={{ marginTop: 4 }}>
                    <div className="botoes">
                        <Fab onClick={registraRendimentos} className="btn-add">
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

                {exibiMsg ? <Alert severity={tipoAlerta} sx={{ marginTop: 10 }} >{msg}</Alert> : false}
                <div style={{ height: 500, width: "100%", marginTop: 100 }}>
                    <TableData
                        onCellDoubleClick={e => { populaDadosGrid(e) }}
                        table="Rendimentos"
                        change={recarega}
                        campos="Id_Rendimento, Codigo_Rendimento, Data_Rendimento, Valor_Rendimento"
                        data={[
                            {
                                descricao: "ID",
                                width: 100,
                                campoBD: "Id_Rendimento",
                                align: "right"
                            },
                            {
                                descricao: "Codigo",
                                width: 400,
                                campoBD: "Codigo_Rendimento",
                                align: "left"
                            },
                            {
                                descricao: "Data",
                                width: 300,
                                tipo: "dataBR",
                                campoBD: "Data_Rendimento",
                            },
                            {
                                descricao: "Valor",
                                width: 300,
                                tipo: "moeda",
                                campoBD: "Valor_Rendimento",
                                align: "right"
                            },
                        ]}
                    />
                </div>
            </Container>
        </>
    );
}