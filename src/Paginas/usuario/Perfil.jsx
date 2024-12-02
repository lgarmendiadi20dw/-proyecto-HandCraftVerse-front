import React, { useContext } from "react";
import { AuthContext } from "../../Context";
import "./Perfil.scss";
const Perfil = () => {
  const userData = useContext(AuthContext);
  return (
    <div className="container newProduct mt-6 flex justify-center items-center">
      <div className="  formulario ">
        <div>
          <img src={`/img/${userData.imagen}`} alt="Avatar" className="userImagePerfil"/>
          <div className="userInfo">
            <h2>{userData.username}</h2>
            <p>Nombre: {userData.username}</p>
            <p>Correo: {userData.email}</p>
            <p>Telefono: {userData.telefono}</p>
            <p>Dirección: {userData.direccion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Perfil;
