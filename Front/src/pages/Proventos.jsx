import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';
import { Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Fab } from '@mui/material';
import CurrencyTextField from '../components/CurrencyInput';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (<>
        <Container spacing={24} sx={{ marginTop: 2, height: '98.1vh' }}>
            <h2>Lancamentos de Proventos</h2>
            <Grid container direction="row" spacing={2} sx={{ marginTop: 5 }}>
                <Grid item xs={4}>
                    <CurrencyTextField label="Valor Pago" />
                </Grid>
                <Grid item xs={4}>
                    <TextField label="Data" variant="outlined" size="small" type="date" value="2022-02-02" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Evento Fixo</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Evento Fixo"
                            size="small"
                            value={0}
                            fullWidth
                        >
                            <MenuItem value={0}>Nao</MenuItem>
                            <MenuItem value={1}>Sim</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Descricao" variant="outlined" size="small" fullWidth />
                </Grid>
            </Grid>

            <Grid container sx={{ marginTop: 4 }}>
                <Grid item xs={1}>
                    <Fab color="primary" aria-label="add">
                        <IoIcons.IoIosAdd size={30} />
                    </Fab>
                </Grid>
                <Grid item xs={1} >
                    <Fab color="secondary" aria-label="add">
                        <GrIcons.GrPowerReset size={20} />
                    </Fab>
                </Grid>
            </Grid>

        </Container>
    </>);
}