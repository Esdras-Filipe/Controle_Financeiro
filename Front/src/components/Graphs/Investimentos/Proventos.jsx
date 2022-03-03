import React, { useState } from "react";
import { useEffect } from "react";
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from "../../../api";

export default props => {
    const [componente, setComponente] = useState(<div className='container-charts3 skeleton'></div>);

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    function completaArray(array, length) {
        while (array.length < length) {
            array.unshift(0);
        }
        return array;
    }

    function descobreMaiorArray(arrays) {
        let maiorArray = 0;
        Object.keys(arrays).forEach((elem, index) => {
            arrays[elem] = (arrays[elem]).replace(",undefined", "");
            if (arrays[elem].split(",").length > maiorArray) {
                maiorArray = arrays[elem].split(",").length;
            }
        });

        return maiorArray;
    }

    useEffect(() => {

        let cor = ["rgb(53, 162, 235)", "rgb(244,164,96)", "rgb(0,255,127)", "rgb(53, 20, 30)", "",];

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: "rgba(169, 169, 169, 0.6)",
                        font: {
                            size: 15
                        }
                    },
                },
                title: {
                    display: true,
                    text: "Últimos 12 Rendimentos de Ações/FII's",
                    font: {
                        size: 17
                    }
                },
            },
        };

        api.get("graphs/rendimentos").then((response) => {
            let labels = [];
            let data = {};
            let codigo;
            let valor;

            let linhas = []

            let dados = response.data.data;
            for (var chave in dados) {
                codigo = dados[chave].Codigo_Rendimento;
                valor = dados[chave].Valor_Rendimento;

                if (!labels.includes(dados[chave].Mes)) {
                    labels.push(dados[chave].Mes)
                }

                data[codigo] = valor.toString() + "," + data[codigo];
            }

            let maiorArray = descobreMaiorArray(data);

            Object.keys(data).forEach((elem, index) => {
                data[elem] = (data[elem]).replace(",undefined", "");
                linhas.push(
                    `{
                        "label":"${elem}",
                        "data": [${completaArray(data[elem].split(",").reverse(), maiorArray)}],
                        "borderColor": "${cor[index]}",
                        "backgroundColor":  "${cor[index]}" }`
                )
            })

            data = {
                labels,
                datasets: JSON.parse("[" + linhas.join(",") + "]"),
            };

            setComponente(<div className='container-charts3'><Line options={options} data={data} height="110" /></div>);
        }).catch((error) => {
        })
    }, []);


    return componente
};