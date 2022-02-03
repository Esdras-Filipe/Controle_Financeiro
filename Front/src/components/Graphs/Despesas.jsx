import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../../api';

export default function GraphDespesas() {
    const [componente, setComponente] = useState(<></>);

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
                        },
                        title: {
                            display: true,
                            text: 'Despesas nos Ultimos 6 Meses',
                        },
                    }
                };

                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Despesas',
                            data: valores,
                            backgroundColor: 'rgba(255, 20, 20, 0.9)',
                        }
                    ],
                };
                setComponente(<Bar options={options} data={data} />)
            }
        }).catch(erro => {
            console.log(erro)
        })
    }, [])

    return componente
};