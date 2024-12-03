import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductoImagen from "./ProductoImagen";
import ProductoCarrusel from "./ProductoCarrusel";
import "./VerProducto.scss";

const VerProducto = ({ apiIp }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState();

  const cargarProducto = useCallback(() => {
    fetch(`${apiIp}productos/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProducto(data);
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, id]);

  useEffect(() => {
    cargarProducto();
  }, [id, cargarProducto]);

  if (!producto) return <p>Cargando producto...</p>;

  const { multimedia } = producto;

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          {multimedia.length === 1 ? (
            <ProductoImagen
              src={`/img/${multimedia[0].nombreArchivo}`}
              alt={multimedia[0].alt}
            />
          ) : (
            <ProductoCarrusel multimedia={multimedia} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VerProducto;
