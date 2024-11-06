import React, { useEffect, useState } from "react";
import Categoria from "../componentes/Home/Categoria";

const Home = () => {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = () => {
    fetch('https://localhost:8443/categorias/all')
      .then(response => response.json())
      .then(data => {
        setCategorias(data);
      })
      .catch(error => console.error("Error al cargar las categorías:", error));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div className="container">
      {categorias.map(categoria => (
        <Categoria key={categoria.id} {...categoria} />
      ))}
    </div>
  );
};

export default Home;