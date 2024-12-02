import React, { useContext } from "react";
import { AuthContext } from "../../Context";
import "./Perfil.scss";
import { ReactComponent as Telf } from "../../assets/svg/iconos/telf.svg";
import { ReactComponent as Email } from "../../assets/svg/iconos/email.svg";

const Perfil = () => {
  const userData = useContext(AuthContext);
  return (
    <div className="container newProduct tw-mt-6 tw-flex tw-justify-center tw-items-center">
      <div className="  formulario ">
        <div>
          <img src={`/img/${userData.imagen}`} alt="Avatar" className="userImagePerfil"/>
          <div className="userInfo">
            <h2 className="textoTitulo">{userData.username}</h2>
            <p >Nombre: {userData.username}</p>
            <p><Email className="profileIcon"/>Correo: {userData.email}</p>
            <p><Telf className="profileIcon"/> {userData.telefono}</p>
            <p>Dirección: {userData.direccion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Perfil;
