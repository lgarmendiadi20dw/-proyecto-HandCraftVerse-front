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
  const [darkMode, setDarkMode] = useState(false);

  // Cambiar tema basado en el estado
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <BrowserRouter>
      <div>
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode}/>
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
