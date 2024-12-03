import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./VerProducto.scss";
// import { AuthContext } from "../../../Context";


const VerProducto = ({ apiIp }) => {
  const { id } = useParams();
  // const userData = useContext(AuthContext);
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
  console.log(producto);

  return (
    <div className="container">
      {/* Renderiza los detalles del producto aquí */}
    </div>
  );
};

export default VerProducto;
