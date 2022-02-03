import React from "react";
import SideBar from "./components/Menu/SideBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Despesas from './pages/Despesas';
import Proventos from './pages/Proventos';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeDark = createTheme({
  palette: {
    mode: 'dark',
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
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/Despesas" element={<Despesas />} />
                <Route path="/Proventos" element={<Proventos />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
};
