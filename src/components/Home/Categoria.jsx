import React, { useEffect, useState, useCallback } from "react";
import Carrusel from "./Carrusel/Carrusel";
import { Link } from "react-router-dom";

const Categoria = ({ id, nombre, apiIp }) => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = useCallback(() => {
    fetch(`${apiIp}productos/categoria/${nombre}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setProductos(data);
        }
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, nombre]);

  useEffect(() => {
    cargarProductos();
  }, [id, cargarProductos]); // Asegúrate de incluir cargarProductos en la lista de dependencias

  if (productos.length === 0) return null;

  return (
    <div className="previewCategoria">
      <h2 className="tituloEnPag col-1">
        <span>
        <Link to={`/categoria/${nombre}`} className="textoTitulo">{nombre}</Link>
          <svg
            id="arrow-horizontal"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="10"
            viewBox="0 0 46 16"
          ></svg>
        </span>
      </h2>
      <Carrusel productos={productos.map(producto => ({ ...producto, key: producto.id }))} apiIp={apiIp} className="col-12" />
    </div>
  );
};

export default Categoria;
