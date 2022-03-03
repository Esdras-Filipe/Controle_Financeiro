import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import * as GrIcons from "react-icons/gr";
import {
    Container,
    Grid,
    TextField,
    Fab,
    Alert,
} from "@mui/material";
import CurrencyTextField from "../components/CurrencyInput";
import api from "../api";
import TableData from "../components/Grid/Grid";

export default props => {

    async function resetaMsg() {
        setTimeout(() => {
            setExibiMsg(false);
        }, 7000);
    }
    function registraRendimentos() {
        if (codigo == "") {
            setMsg("Necessario Informar o Codigo!");
            setVariant("warning");
            setExibiMsg(true);
            return false;
        }

        if (valor == "") {
            setMsg("Necessario Informar o Valor!");
            setVariant("warning");
            setExibiMsg(true);
            return false;
        }

        api.post("rendimentos", {
            codigo: codigo,
            data: data,
            valor: valor.replace("R$", "").replace(".", "").replace(",", ".")
        }).then((response) => {
            setMsg("Rendimento Cadastrado com Sucesso!");
            setVariant("success");
            setExibiMsg(true);
            limpaInputs();
            resetaMsg();
        }).catch((error) => {
            setMsg("Ocorreu um Erro ao Salvar Registro!");
            setVariant("error");
            setExibiMsg(true);
            resetaMsg();
        })
    }

    const dataAtual =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        new Date().getDate().toString().padStart(2, 0);

    const [codigo, setCodigo] = useState("");
    const [data, setData] = useState(dataAtual);
    const [valor, setValor] = useState("");

    const [exibiMsg, setExibiMsg] = useState(false);
    const [variant, setVariant] = useState("warning");
    const [msg, setMsg] = useState("");

    function limpaInputs() {
        setCodigo("");
        setData(dataAtual)
        setValor("")
    }

    return (
        <>
            <Container maxWidth="xl" sx={{ marginTop: 2 }}>
                <h2>Lançamento de Rendimentos</h2>
                <Grid container sx={{ marginTop: 7 }} spacing={2}>
                    <Grid item xs={3}>
                        <TextField size="small" label="Codigo" variant="outlined" fullWidth value={codigo} onChange={e => { setCodigo(e.target.value); }} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label="Data" variant="outlined" size="small" type="date" fullWidth value={data} onChange={(e) => { setData(e.target.value); }} />
                    </Grid>
                    <Grid item xs={3}>
                        <CurrencyTextField size="small" label="Valor" variant="outlined" fullWidth value={valor} onChange={(e) => { setValor(e.target.value); }} />
                    </Grid>
                </Grid>

                <Grid container sx={{ marginTop: 4 }}>
                    <div className="botoes">
                        <Fab color="primary" aria-label="add" onClick={registraRendimentos}  >
                            <IoIcons.IoIosAdd size={30} />
                        </Fab>
                        <Fab color="secondary" aria-label="add" onClick={limpaInputs}>
                            <GrIcons.GrPowerReset size={20} />
                        </Fab>
                    </div>
                </Grid>

                {exibiMsg ? <Alert severity={variant} sx={{ marginTop: 10 }} >{msg}</Alert> : false}
                <div style={{ height: 500, width: "100%", marginTop: 100 }}>
                    <TableData
                        table="Rendimentos"
                        campos="Codigo_Rendimento, Data_Rendimento, Valor_Rendimento"
                        data={[
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