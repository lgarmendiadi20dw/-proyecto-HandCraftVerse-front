import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import GridProductos from "../../../components/gridProductos/GridProductos"; // Importar el nuevo componente
import "./VerCategoria.scss";

const VerCategoria = ({ apiIp }) => {
  const { nombre } = useParams(); // Obtener el nombre de la categoría desde la URL.
  const [productos, setProductos] = useState([]); // Lista de productos.
  const productosPorPagina = 18; // Número de productos por página.

  // Función para cargar productos desde el API.
  const cargarProductos = useCallback(() => {
    fetch(`${apiIp}productos/categoria/${nombre}?limite=${productosPorPagina}`)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data); // Establecer los productos en el estado.
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, nombre]);

  // Efecto para cargar productos al cambiar de categoría.
  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Efecto para reiniciar los estados al cambiar de categoría.
  useEffect(() => {
    setProductos([]);
  }, [nombre]);

  return (
    <div className="containerSidebar">
      <Sidebar apiIp={apiIp} />
      <div className=" tw-pt-6 conNavLateral tw-p-10">
        <h1 className="textoTitulo">{nombre}</h1>
        <GridProductos productos={productos} apiIp={apiIp} /> {/* Usar el nuevo componente */}
      </div>
    </div>
  );
};

export default VerCategoria;
