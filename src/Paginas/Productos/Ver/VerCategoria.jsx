import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Card from "../../../components/Card/Card";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./VerCategoria.scss";

const VerCategoria = ({ apiIp }) => {
  const { nombre } = useParams();
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(0);
  const productosPorPagina = 18;

  const cargarProductos = useCallback(() => {
    fetch(`${apiIp}productos/categoria/${nombre}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setProductos(data);
        }
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, nombre]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const productosPaginados = productos.slice(
    pagina * productosPorPagina,
    (pagina + 1) * productosPorPagina
  );

  return (
    <div className="containerSidebar">
      <Sidebar apiIp={apiIp} />
      <div className="contenedor conNavLateral">
        <h1>{nombre}</h1>
        <div className="gridProductos">
          {productosPaginados.map((producto) => (
            <Card key={producto.id} {...producto} />
          ))}
        </div>
        <div className="paginacion">
          {pagina > 0 && (
            <button className="cta" onClick={() => setPagina(pagina - 1)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17"   stroke-linejoin="round"></path> </g></svg>
            </button>
          )}
          <span className="pagina-actual">{pagina + 1}</span>
          {productos.length > (pagina + 1) * productosPorPagina && (
            <button className="cta" onClick={() => setPagina(pagina + 1)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17"   stroke-linejoin="round"></path> </g></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerCategoria;
