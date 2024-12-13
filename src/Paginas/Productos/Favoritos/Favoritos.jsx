import React, { useEffect, useState, useContext, useCallback } from "react";
import GridProductos from "../../../components/gridProductos/GridProductos";
import { AuthContext } from "../../../Context";
import Cargar from "../../../components/Cargar/Cargar";
import "./Favoritos.scss";

const Favoritos = ({ apiIp }) => {
  const userData = useContext(AuthContext); // userData de contexto
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar los productos favoritos del usuario
  const cargarFavoritos = useCallback(() => {
    if (!userData || !userData.id) {
      console.log("Usuario no autenticado.");
      return;
    }

    fetch(`${apiIp}member/${userData.id}/favoritos`, {
      method: "GET",
      credentials: "include", // Incluir cookies para la autenticación
    })
      .then((response) => response.json()) // Convertir la respuesta a JSON
      .then((data) => {
        setFavoritos(data); // Guardar los productos favoritos en el estado
        setLoading(false); // Finalizar carga
      })
      .catch((error) => {
        console.error("Error al cargar los productos favoritos:", error);
        setLoading(false);
      });
  }, [userData, apiIp]); // Añadimos `userData` y `apiIp` como dependencias

  useEffect(() => {
    cargarFavoritos(); // Llamamos la función al montar el componente o cambiar `userData`
  }, [cargarFavoritos]); // Ahora se ejecutará cuando `cargarFavoritos` cambie

  
  if (loading) {
    return <Cargar />; // Mostrar el componente de carga mientras se obtienen los datos
  }

  return (
    <div className="container">
      <h1 className="textoTitulo">Productos favoritos</h1>
      <GridProductos productos={favoritos} apiIp={apiIp} />
    </div>
  );
};

export default Favoritos;
