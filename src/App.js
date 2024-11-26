import "./App.scss";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Nav/Navbar";
import CrearProducto from "./paginas/Productos/CrearProducto";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import Home from "./paginas/Home";
import VerCategoria from "./paginas/Productos/Ver/VerCategoria";
import Sidebar from "./components/sidebar/Sidebar";

// Importar el contexto
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const apiIp = process.env.IP || "https://localhost:8443/";
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>  {/* Envolvemos la aplicación en el AuthProvider */}
      <BrowserRouter>
        <div>
          <Navbar apiIp={apiIp} setDarkMode={setDarkMode} darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<Home apiIp={apiIp} />} />
            <Route path="/crear-producto" element={<CrearProducto apiIp={apiIp} />} />
            <Route path="/iniciarSesion" element={<Login apiIp={apiIp} />} />
            <Route path="/registrarse" element={<Registrar apiIp={apiIp} />} />
            <Route path="/categoria/:nombre" element={<VerCategoria apiIp={apiIp} />} />
            <Route element={<Sidebar apiIp={apiIp} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
