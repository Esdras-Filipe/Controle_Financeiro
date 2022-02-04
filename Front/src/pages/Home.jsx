import { React, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import '../css/Home.css';
import GraphDespesas from '../components/Graphs/Despesas/Despesas';
import GraphProventos from '../components/Graphs/Proventos/Proventos';
import GraphInveProve from '../components/Graphs/Investimentos/Proventos';

export default function Home() {
    const [Mensagem, setMensagem] = useState('');
    //////////////////////////////////////////////////////////////////////
    // Mensagem de Bom Dia
    //////////////////////////////////////////////////////////////////////
    useEffect(() => {
        let HoraAtual = new Date().getHours();

        if (HoraAtual > 0 && HoraAtual < 12) {
            setMensagem("Bom Dia, Esdras");
        } else if (HoraAtual >= 12 && HoraAtual < 18) {
            setMensagem("Boa Tarde, Esdras");
        } else {
            setMensagem("Boa Noite, Esdras");
        }
    })

    return (
        <>
            <div className='page'>
                <h2>{Mensagem}</h2>
                <Grid container spacing={5}>
                    <Grid item xs={6} >
                        <GraphDespesas />
                    </Grid>
                    <Grid item xs={6} >
                        <GraphProventos />
                    </Grid>
                    <Grid item xs={24} >
                        <h3>Investimentos</h3>
                    </Grid>
                    <Grid item xs={6} >
                        <div className='container-charts2'>
                            <div style={{ display: 'flex', height: '19rem' }}>
                                <div style={{ flexGrow: 1 }}>

                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} >
                        <GraphInveProve />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

