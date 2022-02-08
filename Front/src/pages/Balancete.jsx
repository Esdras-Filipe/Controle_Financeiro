import { React, useState, useEffect } from "react";
import * as AiIcons from 'react-icons/ai';
import { Container, Grid, Card, CardContent, Button, Typography } from '@mui/material';
import api from '../api';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    const [exibeDados, setExibeDados] = useState(false);
    const [valorBalancete, setValorBalancete] = useState((0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    useEffect(() => {
        api.get('proventos/balancete').then((response) => {
            setValorBalancete((response.data.data[0].Balancente).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    function demonstraDados() {
        setExibeDados(!exibeDados);
    }

    return (
        <>
            <Container sx={{ marginTop: 2, height: '98.1vh' }}>
                <h2>Balancente Contábil</h2>
                <Grid container direction="row" spacing={2} >
                    <Grid item xs={12} fullWidth>
                        <Card sx={{ maxHeight: 35, maxWidth: 240, marginLeft: 110}}  >
                            <Typography sx={{ fontSize: 17, color: 'red' }} gutterBottom>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item xs={7} >
                                        <Button size="small" onClick={demonstraDados}>
                                            {exibeDados ? <AiIcons.AiFillEye size={30} /> : <AiIcons.AiFillEyeInvisible size={30} />}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={5} >
                                        {exibeDados ? valorBalancete : '******'}
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}