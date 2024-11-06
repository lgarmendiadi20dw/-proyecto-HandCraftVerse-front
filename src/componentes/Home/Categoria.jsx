import React, { useEffect, useState } from "react";
import Carrusel from "./Carrusel/Carrusel";

const Categoria = ({ id, nombre }) => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = () => {
    fetch(`https://localhost:8443/productos/categoria/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setProductos(data);
        }
      })
      .catch(error => console.error("Error al cargar los productos:", error));
  };

  useEffect(() => {
    cargarProductos();
  }, [id]);

  if (productos.length === 0) return null;

  return (
    <div className="previewCategoria">
      <h2 className="tituloEnPag">
        <span>
          <a href="verCategoria.html" className="textoTitulo">{nombre}</a>
          <svg
            id="arrow-horizontal"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="10"
            viewBox="0 0 46 16"
          ></svg>
        </span>
      </h2>
      <Carrusel productos={productos} />
    </div>
  );
}

export default Categoria;
