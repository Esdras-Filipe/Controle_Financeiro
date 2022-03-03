import React from "react";
import SideBar from "./components/Menu/SideBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Despesas from './pages/Despesas';
import Proventos from './pages/Proventos';
import Header from './components/Header/Header';
import Investimentos from './pages/Investimentos';
import Balancete from "./pages/Balancete";
import Rendimentos from "./pages/Rendimentos";



import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeDark = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#fff"
    },
    shape: {
      borderRadius: 10
    }
  }
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={themeDark}>
        <div className="container">
          <BrowserRouter>
            <div className="side-bar left">
              <SideBar />
            </div>
            <div className="side-bar rigth">
              <Header />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/Despesas" element={<Despesas />} />
                <Route path="/Balancete" element={<Balancete />} />
                <Route path="/Proventos" element={<Proventos />} />
                <Route path="/Investimentos" element={<Investimentos />} />
                <Route path="/Rendimentos" element={<Rendimentos />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
};
