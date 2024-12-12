import React from "react";
import Card from "../Card/Card";
import "./GridProductos.scss";
import Cargar from "../Cargar/Cargar";

const GridProductos = ({ productos, apiIp }) => {
  return (
    <div className="gridProductos">
      {productos.length > 0 ? (
        productos.map((producto) => (
          <Card key={producto.id} producto={producto} apiIp={apiIp} />
        ))
      ) : (
        <Cargar/>
      )}
    </div>
  );
};

export default GridProductos;
