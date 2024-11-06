import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Nav/Navbar";
import CrearProducto from "./Paginas/Productos/CrearProducto";
import Home from "./Paginas/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/categorias" element={<div>Categorías</div>} />
          <Route path="/colores" element={<div>Colores</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
