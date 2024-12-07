import React from 'react';

import { ReactComponent as Telf } from "../../../assets/svg/iconos/telf.svg";
import { ReactComponent as Email } from "../../../assets/svg/iconos/email.svg";
const Mostrar = ({img, username, email, direccion, telefono , descripcion}) => {
    return (
        
        <div className="row">
          <img src={`/img/${img}`} alt="Avatar" className="userImagePerfil col-4"/>
          <div className="userInfo col-8">
            <h2 className="textoTitulo">{username}</h2>
            <p >Nombre: {username}</p>
            <p><Email className="profileIcon"/>Correo: {email}</p>
            <p><Telf className="profileIcon"/> {telefono}</p>
            <p>Dirección: {direccion}</p>
            <p className="descripcion">{descripcion}</p>
          </div>
        </div>
        
        
    );
}
export default Mostrar;