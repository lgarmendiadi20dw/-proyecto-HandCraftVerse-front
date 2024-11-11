import React, { useEffect, useState, useCallback } from "react";
import Card from "../../../componentes/Card/Card";

const VerCategoria = ({ apiIp }) => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = useCallback(() => {
    fetch(`${apiIp}productos/categoria/${nombre}`)
      .then((response) => {
        console.log("Raw response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Parsed JSON:", data);
        if (data.length > 0) {
          setProductos(data);
        }
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, nombre]);

  useEffect(() => {
    cargarProductos();
  }, [id, cargarProductos]); 

  return (
    <div className="container">
      {productos.map(producto => (
        <Card key={producto.id} {...producto} />
      ))}
    </div>
  );
};

export default VerCategoria;