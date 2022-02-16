import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../../../api';

export default function GraphDespesas() {
    const [componente, setComponente] = useState(<div className='container-charts skeleton'></div>);

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    var valores = [];
    var labels = [];

    useEffect(() => {
        api.get('graphs/despesas').then((response) => {
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
                            labels: {
                                color: "rgba(169, 169, 169, 0.6)"
                            },
                        },
                        title: {
                            display: true,
                            text: 'Despesas nos Ultimos 6 Meses',
                            color: 'rgba(169, 169, 169, 0.6)',
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
                            label: 'Despesas',
                            data: valores,
                            backgroundColor: 'rgba(255, 80, 100, 1)',
                        }
                    ],
                };
                setComponente(
                    <div className='container-charts'>
                        <Bar options={options} data={data} height="120" />
                    </div>
                )
            }
        }).catch(erro => {
            console.log(erro)
        })
    }, [])

    return componente
};