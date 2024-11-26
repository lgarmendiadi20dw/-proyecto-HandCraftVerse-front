import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Card from "../../../components/Card/Card";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./VerCategoria.scss";

const VerCategoria = ({ apiIp }) => {
  const { nombre } = useParams(); // Obtener el nombre de la categoría desde la URL.
  const [productos, setProductos] = useState([]); // Lista de productos.
  const [pagina, setPagina] = useState(0); // Página actual.
  const [hayMasProductos, setHayMasProductos] = useState(true); // Controla si quedan más productos por cargar.
  const productosPorPagina = 18; // Número de productos por página.

  // Función para cargar productos desde el API.
  const cargarProductos = useCallback(() => {
    fetch(`${apiIp}productos/categoria/${nombre}?pagina=${pagina}&limite=${productosPorPagina}`)
      .then((response) => response.json())
      .then((data) => {
        setProductos((prevProductos) => [...prevProductos, ...data]); // Agregar los nuevos productos al estado.
        setHayMasProductos(data.length === productosPorPagina); // Si la cantidad recibida es menor al límite, no hay más productos.
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, nombre, pagina]);

  // Efecto para cargar productos al cambiar de página o de categoría.
  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Efecto para reiniciar los estados al cambiar de categoría.
  useEffect(() => {
    setProductos([]);
    setPagina(0);
    setHayMasProductos(true);
  }, [nombre]);

  return (
    <div className="containerSidebar">
      <Sidebar apiIp={apiIp} />
      <div className="container pt-6 conNavLateral p-10">
        <h1 className="textoTitulo">{nombre}</h1>
        <div className="gridProductos">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <Card key={producto.id} producto={producto} apiIp={apiIp} />
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
        {hayMasProductos && (
          <div className="paginacion">
            <button className="cta" onClick={() => setPagina((prevPagina) => prevPagina + 1)}>
              Ver más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerCategoria;
