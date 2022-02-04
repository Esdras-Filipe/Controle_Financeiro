import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../../../api';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    const [componente, setComponente] = useState(<div className='container-charts skeleton'></div>);

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    var valores = [];
    var labels = [];

    useEffect(() => {
        api.get('graphs/proventos').then((response) => {
            var dados = response.data.data;
            if (response.data.status === 'success') {
                for (var chave in dados) {
                    valores.push(dados[chave].Valor)
                    labels.push(dados[chave].Mes)
                }

                const options = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Proventos nos Ultimos 6 Meses',
                            color: 'rgba(169, 169, 169, 0.6)',
                            fullSize: true,
                            font: {
                                size: 14
                            }
                        },
                    }
                };

                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Proventos',
                            data: valores,
                            backgroundColor: 'rgb(16, 185, 129)',
                        }
                    ],
                };
                setComponente(
                    <div className='container-charts'>
                        <Bar options={options} data={data} />
                    </div>
                )
            }
        }).catch(erro => {
            console.log(erro)
        })
    }, []);

    return componente;
};