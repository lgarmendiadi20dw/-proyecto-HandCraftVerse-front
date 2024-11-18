import React, { useEffect, useState, useCallback } from "react";
import Categoria from "../components/Home/Categoria";

const Home = ({ apiIp }) => {
  const [categorias, setCategorias] = useState([]);
  const cargarCategorias = useCallback(() => {
    fetch(`${apiIp}categorias/all`)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Network response was not ok: ${response.status} - ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        setCategorias(data);
      })
      .catch(error => console.error("Error al cargar las categorías:", error));
  }, [apiIp]);

  useEffect(() => {
    cargarCategorias();
  }, [cargarCategorias]);

  return (
    <div className="container mt-6 ">
      {categorias.map(categoria => (
        <Categoria key={categoria.id} {...categoria} apiIp={apiIp} />
      ))}
    </div>
  );
};

export default Home;