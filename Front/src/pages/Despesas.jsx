import { React, useState } from 'react';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Fab } from '@mui/material/';
import Modal from '../components/modal/Modal'
import api from '../api';
import CurrencyTextField from '../components/CurrencyInput';

function Lancamentos() {
    const dataAtual = (new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, 0)
        + '-' + new Date().getDate().toString().padStart(2, 0))

    const [categoria, setCategoria] = useState(1);
    const [valor, setValor] = useState('');
    const [carteira, setCarteira] = useState(1);
    const [dataPagamento, setDataPagamento] = useState(dataAtual);
    const [descricao, setDescricao] = useState('');
    const [modal, setModal] = useState(false);

    function resetaForm() {
        setCategoria(1);
        setDataPagamento(dataAtual);
        setCarteira(1);
        setValor('');
        setDescricao('');
    }

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    function registraDados() {
        api.post('Lancamentos', {
            valor: valor.replace("R$", "").replace(".", "").replace(",", "."),
            categoria: categoria,
            tipoPagamento: carteira,
            data: dataPagamento,
            descricao: descricao
        }).then((response) => {
            if (response.data.status === "success") {
                openModal();
                resetaForm();
            } else {
                console.log("deu erro");
            }
        }).catch((response) => {
        });
    }

    return (
        <Container spacing={24} sx={{ marginTop: 2, height: '98.1vh' }}>
            <Modal abrir={modal} onClose={closeModal} width={500}>
                <p>Despesa Cadastrada com Sucesso!</p>
                <IconContext.Provider value={{ color: 'rgba(0, 255, 0, 0.7)' }}>
                    <AiIcons.AiOutlineCheckCircle size={200} />
                </IconContext.Provider>
            </Modal>
            <h2>Lançamentos de Despesas</h2>
            <Grid container direction="row" spacing={2} sx={{ marginTop: 5 }}>
                <Grid item xs={3}>
                    <CurrencyTextField label="Valor Pago    " value={valor} onChange={(e) => { setValor(e.target.value) }} />
                </Grid>
                <Grid item xs={4}>
                    <TextField label="Descrição" variant="outlined" size="small" fullWidth value={descricao} onChange={(e) => { setDescricao(e.target.value); }} />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Categoria"
                            size="small"
                            value={categoria}
                            onChange={(e) => { setCategoria(e.target.value) }}
                            fullWidth
                        >
                            <MenuItem value={1}>Outros</MenuItem>
                            <MenuItem value={2}>Alimentacao</MenuItem>
                            <MenuItem value={3}>Assinatura e Servicos</MenuItem>
                            <MenuItem value={4}>Bares e Restaurante</MenuItem>
                            <MenuItem value={5}>Casa</MenuItem>
                            <MenuItem value={6}>Compras</MenuItem>
                            <MenuItem value={7}>Cuidados Pessoais</MenuItem>
                            <MenuItem value={8}>Dividas e emprestimos</MenuItem>
                            <MenuItem value={9}>Educacao</MenuItem>
                            <MenuItem value={10}>Familia e filhos</MenuItem>
                            <MenuItem value={11}>Impostos e Taxas</MenuItem>
                            <MenuItem value={12}>Investimentos</MenuItem>
                            <MenuItem value={13}>Lazer e hobbies</MenuItem>
                            <MenuItem value={14}>Cuidados Pessoais</MenuItem>
                            <MenuItem value={15}>Mercado</MenuItem>
                            <MenuItem value={17}>Pets</MenuItem>
                            <MenuItem value={18}>Presentes e doacoes</MenuItem>
                            <MenuItem value={19}>Roupas</MenuItem>
                            <MenuItem value={20}>Saude</MenuItem>
                            <MenuItem value={21}>Trabalho</MenuItem>
                            <MenuItem value={22}>Transporte</MenuItem>
                            <MenuItem value={23}>Viagem</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label2">Pagar Com</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label2"
                            id="demo-simple-select-helper"
                            label="Pagar Com"
                            size="small"
                            value={carteira}
                            onChange={(e) => { setCarteira(e.target.value) }}
                            fullWidth
                        >
                            <MenuItem value={1}>Carteira</MenuItem>
                            <MenuItem value={2}>Conta Reserva</MenuItem>
                            <MenuItem value={3}>Cartoes</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="Data" type="date" variant="outlined" fullWidth
                        size="small" value={dataPagamento} onChange={(e) => { setDataPagamento(e.target.value) }} />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <Grid sx={{ marginTop: 3 }} item xs={1}>
                    <Fab color="primary" aria-label="add" onClick={registraDados} >
                        <IoIcons.IoIosAdd size={30} />
                    </Fab>
                </Grid>
                <Grid sx={{ marginTop: 3 }} item xs={1}>
                    <Fab color="secondary" aria-label="add" onClick={resetaForm} >
                        <IconContext.Provider value={{ color: '#fff' }}>
                            <GrIcons.GrPowerReset size={20} />
                        </IconContext.Provider>
                    </Fab>
                </Grid>
            </Grid>

        </Container>
    );
}

export default Lancamentos;
