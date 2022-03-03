import { React, useState, useEffect } from "react";
import * as AiIcons from 'react-icons/ai';
import { Container, Grid, Card, CardContent, Button, Typography } from '@mui/material';
import api from '../api';
import "../css/Balancete.css";

export default props => {
    const [exibeDados, setExibeDados] = useState(false);
    const [statusBalanco, setStatus] = useState("positivo");
    const [valorBalancete, setValorBalancete] = useState((0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    useEffect(() => {
        api.get('proventos/balancete').then((response) => {
            if (response.data.data != undefined) {

                if (response.data.data[0].Balancente < 0) {
                    setStatus("negativo")
                } else {
                    setStatus("positivo")
                }
                setValorBalancete((response.data.data[0].Balancente).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    function demonstraDados() {
        setExibeDados(!exibeDados);
    }

    return (
        <>
            <Container maxWidth="xl">
                <div className="row" >
                    <div className="tittle">
                        <h2>Balancente Contábil</h2>
                    </div>
                    <div className="card">
                        <div className={"value-card " + statusBalanco}>
                            {exibeDados ? valorBalancete : '******'}
                            <Button onClick={demonstraDados} >{exibeDados ? <AiIcons.AiFillEye size={30} /> : <AiIcons.AiFillEyeInvisible size={30} />}</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}