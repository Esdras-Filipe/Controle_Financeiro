import {
    TextField, IconButton, InputBase
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as AiIcons from "react-icons/ai";
import "./TextFieldSearch.css"
import api from "../../api";

export default props => {
    const table = props.table
    const primaryKey = props.primarykey;
    const id = props.id;

    const [value, setValue] = useState("");

    useEffect(() => {
        api.post("grid", {
            table: table,
            campos: `MAX(${primaryKey}) AS ID`
        }).then((response) => {
            document.querySelector("#" + id).setAttribute("popula", false);
            setValue(parseInt(response.data.data[0].ID) + 1)
        }).catch((error) => {
        })
    }, [props.listen]);

    function buscaDados() {
        if (value != "") {
            let elemento = undefined;

            api.post("grid", {
                table: table,
                campos: `*`,
                where: `${primaryKey} = ${value}`
            }).then((response) => {
                let dados = response.data.data;
                if (dados.length === 0) {
                    document.querySelector("#" + id).setAttribute("popula", false);
                    return false;
                }

                document.querySelector("#" + id).setAttribute("popula", true);

                for (var chave in dados) {
                    Object.keys(dados[chave]).forEach((elem, index) => {
                        elemento = document.querySelector(`#${elem}`);
                        if (elemento.type === "date") {
                            dados[chave][elem] = new Date(dados[chave][elem]);
                            dados[chave][elem] = dados[chave][elem].getFullYear() + "-" + (dados[chave][elem].getMonth() + 1).toString().padStart(2, 0) + "-" + dados[chave][elem].getDay().toString().padStart(2, 0)
                        }
                        elemento.value = dados[chave][elem];
                        elemento.dispatchEvent(new Event('input', { bubbles: true }))
                    })
                }
            }).catch((error) => {
            })
        }
    }

    return (
        <div className="search-div">
            <InputBase
                label="Teste"
                {...props}
                sx={{ ml: 1, width: '89%', }}
                onBlur={buscaDados}
                value={value}
                onChange={e => { setValue(e.target.value) }}
                onInput={e => { setValue(e.target.value) }}
            />
            <IconButton onClick={buscaDados} id="button-search">
                <AiIcons.AiOutlineSearch size={25} />
            </IconButton>
        </div>
    )
};