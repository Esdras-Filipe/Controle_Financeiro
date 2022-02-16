import React, { useEffect, useState } from 'react';
import { TableCell, TableRow, Paper, Table, TableHead, TableContainer, TableBody } from '@mui/material';

import api from '../../../api';

export default props => {
    const [componente, setComponente] = useState(<div className='container-charts2 skeleton'></div>);
    var linhas = [];

    function formataValores(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        var teste = 0;
        api.get('graphs/investimentos').then((response) => {
            var dados = response.data.data;
            console.log(dados)
            if (response.data.status === 'success') {
                for (var obj in dados) {
                    teste += dados[obj].Valor_Investimentos;
                    linhas.push(
                        <TableRow key={obj}>
                            <TableCell align="left" sx={{ color: '#ccc' }}>{dados[obj].Codigo_Investimentos}</TableCell>
                            <TableCell align="right" sx={{ color: '#ccc' }}>{dados[obj].Qtde_Ativos === "0" ? "" : dados[obj].Qtde_Ativos}</TableCell>
                            <TableCell align="right" sx={{ color: '#ccc' }}>{formataValores(dados[obj].Valor_Investimentos)}</TableCell>
                            <TableCell align="center" sx={{ color: '#ccc' }}>{dados[obj].Tipo_Investimento}</TableCell>
                        </TableRow>
                    );
                }

                setComponente(
                    <div className='container-charts2'>
                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableCell align="left" sx={{ color: '#ccc' }} >Código</TableCell>
                                    <TableCell align="right" sx={{ color: '#ccc' }}>Quantidade</TableCell>
                                    <TableCell align="right" sx={{ color: '#ccc' }}>Valor</TableCell>
                                    <TableCell align="center" sx={{ color: '#ccc' }}>Tipo</TableCell>
                                </TableHead>
                                <TableBody>
                                    {linhas.map((elem) => {
                                        return elem;
                                    })}
                                    <TableRow key="Teste">
                                        <TableCell colSpan={2} sx={{ color: '#ccc' }}>Total</TableCell>
                                        <TableCell align="right" sx={{ color: '#ccc' }}>{formataValores(teste)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                );
            }
        }).catch(erro => {
            console.log(erro)
        })
    }, []);

    return componente;
}