import "./App.scss";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import CrearProducto from "./Paginas/Productos/CrearProducto";
import Login from "./Paginas/Login";
import Home from "./Paginas/Home";
import VerCategoria from "./Paginas/Productos/Ver/VerCategoria";


const App = () => {
  const apiIp = process.env.IP || 'https://localhost:8443/';

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home apiIp={apiIp} />} />
          <Route path="/crear-producto" element={<CrearProducto apiIp={apiIp} />} />
          <Route path="/login" element={<Login apiIp={apiIp} />} />
          <Route path="/categoria/:nombre" element={<VerCategoria apiIp={apiIp} />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
