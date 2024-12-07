import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context";
import "./Perfil.scss";
import Mostrar from "./Mostrar";
import GridProductos from "../../../components/gridProductos/GridProductos";

const Perfil = ({ apiIp }) => {
  const { id } = useParams();
  const userData = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [user, setUser] = useState(null);

  let roles = [];
if (user && user.roles) {
    // Limpiamos los corchetes y las comillas, luego dividimos por comas
    roles = user.roles.replace(/[\[\]"]+/g, "").split(",").map(role => role.trim());
}



  // Cargar los datos del usuario cuando el id cambie o cuando el componente se monte
  useEffect(() => {
    if (userData.id === id) {
      setUser(userData); // Usamos userData si el id es el mismo
    } else {
      fetch(`${apiIp}member/${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Seteamos el usuario desde la API
        })
        .catch((error) => console.error("Error al cargar el usuario:", error));
    }
  }, [id, userData, apiIp]); // Solo se ejecuta si `id` o `userData` cambian

  console.log(user);
  const cargarProductos = useCallback(() => {
    if (user && user.id) {
      fetch(`${apiIp}member/seller/${user.id}/productos`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setProductos(data);
          }
        })
        .catch((error) => console.error("Error al cargar los productos:", error));
    }
  }, [apiIp, user]);

  useEffect(() => {
    cargarProductos();
  }, [userData.id, cargarProductos]);

  if (!user) {
    // Opcional: Mostrar un cargando o un estado cuando no se ha cargado el usuario
    return <div>Cargando...</div>;
  }

  return (
    <div className="container tw-mt-6 tw-flex tw-justify-center tw-items-center">
      <div className="formulario col-12">
        <div className="row">
          <Mostrar 
            img={user.imagen}
            username={user.username}
            email={user.email}
            direccion={user.direccion}
            telefono={user.telefono}
            descripcion={user.descripcion}
          />
        </div>
        {roles.includes("VENDEDOR") && (
                <div className="row mt-3">
                {productos.length > 0 && <GridProductos productos={productos} apiIp={apiIp} />}
              </div>
            )}
        
      </div>
    </div>
  );
};

export default Perfil;
