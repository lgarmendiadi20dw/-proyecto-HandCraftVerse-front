import React from "react";
import Card from "../Card/Card";
import "./GridProductos.scss";

const GridProductos = ({ productos, apiIp }) => {
  return (
    <div className="gridProductos">
      {productos.length > 0 ? (
        productos.map((producto) => (
          <Card key={producto.id} producto={producto} apiIp={apiIp} />
        ))
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
};

export default GridProductos;
