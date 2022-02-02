import React from "react";
import SideBar from "./components/Menu/SideBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Lancamentos from './pages/Lancamentos';
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
                <Route path="/Lancamento" element={<Lancamentos />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
};
