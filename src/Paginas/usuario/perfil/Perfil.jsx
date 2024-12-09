import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context";
import "./Perfil.scss";
import Mostrar from "./Mostrar";
import Editar from "./Editar";
import GridProductos from "../../../components/gridProductos/GridProductos";
import Button from "../../../components/inputs/Button";

const Perfil = ({ apiIp }) => {
  const { id } = useParams();
  const userData = useContext(AuthContext); // userData de contexto
  const [productos, setProductos] = useState([]);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false); // Estado para controlar el modo de edición

  let roles = [];
  if (user && user.roles) {
    roles = user.roles.replace(/[\[\]"]+/g, "").split(",").map(role => role.trim());
  }

  // Cargar los datos del usuario cuando el id cambie o cuando el componente se monte
  useEffect(() => {
    if (!userData) return; // Esperar hasta que userData esté disponible

    if (userData && userData.id === id) {
      setUser(userData);
    } else if (id) {
      fetch(`${apiIp}member/${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar el usuario");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error al cargar el usuario:", error);
          setUser(null);
        });
    }
  }, [id, userData, apiIp]);

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

  // Ejecutamos la carga de productos solo si se ha encontrado un usuario válido
  useEffect(() => {
    if (user) {
      cargarProductos();
    }
  }, [user, cargarProductos]);

  if (!user) {
    return <div>Cargando perfil...</div>; // Indicador mientras se carga el perfil
  }

  return (
    <div className="container tw-flex tw-justify-center tw-items-center">
      <div className="formulario col-12">
        <div className="row">
          
    <div className="col-10">
          {editMode ? (
            <Editar 
            className="col-10"
              apiIp={apiIp}
              user={user} // Pasamos el usuario al componente Editar
              setUser={setUser}  // Pasamos la función para actualizar el usuario una vez editado
            />
          ) : (
            <Mostrar 
            className="col-10"
              img={user.imagen}
              username={user.username}
              email={user.email}
              direccion={user.direccion}
              telefono={user.telefono}
              descripcion={user.descripcion}
            />
          )}
          </div>
          <div className="col-2">
          {userData && userData.id == id && (
            <Button 
              onClick={() => setEditMode(!editMode)} // Alterna el valor de editMode
              text={editMode ? "Cancelar" : "Editar"} // Muestra el texto adecuado
            />
          )}
          </div>
        </div>
        
       {/* Mostrar productos si el usuario tiene el rol de vendedor */}
{editMode ? (
  <div /> // Si estamos en modo edición, no mostramos nada
) : (
  roles.includes("VENDEDOR") && productos.length > 0 && (
    <div className="row mt-3">
      <GridProductos productos={productos} apiIp={apiIp} />
    </div>
  )
)}

      </div>
    </div>
  );
};

export default Perfil;
