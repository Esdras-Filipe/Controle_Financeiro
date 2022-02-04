import React, { useState } from 'react';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';
import { Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Fab } from '@mui/material';
import CurrencyTextField from '../components/CurrencyInput';
import api from '../api';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const dataAtual = (new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, 0)
        + '-' + new Date().getDate().toString().padStart(2, 0))

    const [valor, setValor] = useState('');
    const [data, setData] = useState(dataAtual);
    const [eventoFixo, setEvenFixo] = useState('S');
    const [descricao, setDescricao] = useState('');

    function limpaCampos() {
        setValor('');
        setData(dataAtual);
        setEvenFixo('S');
        setDescricao('');
    }

    function adicionaProvento() {
        api.post('proventos ', {
            valor: valor.replace("R$", "").replace(".", "").replace(",", "."),
            data: data,
            eventoFixo: eventoFixo,
            descricao: descricao,
        }).then((response) => {
            alert('Cadastrado')
            limpaCampos();
        }).catch((response) => {
        });
    }

    return (<>
        <Container spacing={24} sx={{ marginTop: 2, height: '98.1vh' }}>
            <h2>Lançamento de Proventos</h2>
            <Grid container direction="row" spacing={2} sx={{ marginTop: 5 }}>
                <Grid item xs={4}>
                    <CurrencyTextField label="Valor Pago" value={valor} onChange={(e) => { setValor(e.target.value) }} />
                </Grid>
                <Grid item xs={4}>
                    <TextField label="Data" variant="outlined" size="small" type="date" value={data} onChange={(e) => { setData(e.target.value) }} fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Evento Fixo</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Evento Fixo"
                            size="small"
                            value={eventoFixo}
                            onChange={e => { setEvenFixo(e.target.value) }}
                            fullWidth
                        >
                            <MenuItem value="N">Nao</MenuItem>
                            <MenuItem value="S">Sim</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Descriçao" variant="outlined" size="small" fullWidth value={descricao}
                        onChange={e => { setDescricao(e.target.value) }} />
                </Grid>
            </Grid>

            <Grid container sx={{ marginTop: 4 }}>
                <Grid item xs={1}>
                    <Fab color="primary" aria-label="add" onClick={adicionaProvento}>
                        <IoIcons.IoIosAdd size={30} />
                    </Fab>
                </Grid>
                <Grid item xs={1} >
                    <Fab color="secondary" aria-label="add" onClick={limpaCampos}>
                        <GrIcons.GrPowerReset size={20} />
                    </Fab>
                </Grid>
            </Grid>

        </Container>
    </>);
}