import "./App.scss";
import React, { useState, useEffect, lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import CrearProducto from "./Paginas/Productos/CrearProducto";
import Login from "./Paginas/usuario/sesion/Login";
import Registrar from "./Paginas/usuario/sesion/Registrar";
import Home from "./Paginas/Home";
import VerCategoria from "./Paginas/Productos/Ver/VerCategoria";
import Sidebar from "./components/sidebar/Sidebar";
import VerProducto from "./Paginas/Productos/verProducto/VerProducto";
import Footer from "./components/Footer/Footer";


import { AuthContext } from "./Context";

const Perfil = lazy(() => import("./Paginas/usuario/perfil/Perfil"));

const App = () => {
  const apiIp = "https://172.30.100.138:8443/";
  // const apiIp = process.env.REACT_API_IP || "https://localhost:8443/";
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch(`${apiIp}member/me3`, {
      method: "GET",
      credentials: "include", // Incluye las cookies de sesión
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los datos del usuario");
      })
      .then((data) => setCurrentUser(data)) // Establecer los datos del usuario en el estado
      .catch((error) => setCurrentUser(null)); // Borrar los datos del usuario si hay un error
  }, [apiIp]);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={currentUser}>
        <div>
          <Navbar apiIp={apiIp} setDarkMode={setDarkMode} darkMode={darkMode} />
          <Routes>

            <Route path="/" element={<Home apiIp={apiIp} />} />

            {/* productos */}

            <Route path="/crear-producto" element={<CrearProducto apiIp={apiIp} />}/>
            <Route path="/categoria/:nombre" element={<VerCategoria apiIp={apiIp} />}/>
            <Route path="/producto/:id" element={<VerProducto apiIp={apiIp} />} />

            {/* usuarios */}

            <Route path="/iniciarSesion" element={<Login apiIp={apiIp} />} />
            <Route path="/registrarse" element={<Registrar apiIp={apiIp} />} />
            <Route
              path="/perfil/:id"
              element={
                <Suspense fallback={<div>Cargando perfil...</div>}>
                  <Perfil apiIp={apiIp} />
                </Suspense>
              }
            />

            <Route element={<Sidebar apiIp={apiIp} />} />
          </Routes>
          <Footer/>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
