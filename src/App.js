import "./App.scss";
import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import CrearProducto from "./Paginas/Productos/CrearProducto";
import Login from "./Paginas/Login";
import Registrar from "./Paginas/Registrar";
import Home from "./Paginas/Home";
import VerCategoria from "./Paginas/Productos/Ver/VerCategoria";
import Sidebar from "./components/sidebar/Sidebar";


const App = () => {
  const apiIp = process.env.IP || 'https://localhost:8443/';
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Navbar apiIp={apiIp} setDarkMode={setDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Home apiIp={apiIp} />} />
          <Route path="/crear-producto" element={<CrearProducto apiIp={apiIp} />} />
          <Route path="/iniciarSesion" element={<Login apiIp={apiIp} />} />
          <Route path="/registrarse" element={<Registrar apiIp={apiIp} />} />
          <Route path="/categoria/:nombre" element={<VerCategoria apiIp={apiIp} />} />
          <Route  element={<Sidebar apiIp={apiIp} />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
