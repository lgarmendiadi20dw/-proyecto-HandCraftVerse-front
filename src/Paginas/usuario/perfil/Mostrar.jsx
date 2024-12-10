import React from 'react';

import { ReactComponent as Telf } from "../../../assets/svg/iconos/telf.svg";
import { ReactComponent as Email } from "../../../assets/svg/iconos/email.svg";
import {ReactComponent as Ubicacion } from "../../../assets/svg/iconos/ubicacion.svg";
const Mostrar = ({user}) => {
  console.log(user);  
    return (
        
        <div className="row">
          <img src={`/img/${user.imagen}`} alt="Avatar" className="userImagePerfil col-4"/>
          <div className="userInfo col-8">
            <h2 className="textoTitulo">{user.username}</h2>
            <p >Nombre: {user.username}</p>
            <p><Email className="profileIcon"/> {user.email}</p>
            {user.telefono === 0 ? "" : <p><Telf className="profileIcon"/> {user.telefono}</p>}
            {user.direccion===null?"":<p><Ubicacion className="profileIcon"/> {user.direccion}</p>}
            {/* <p><Ubicacion className="profileIcon"/> {user.direccion}</p> */}
            <p className="descripcion">{user.descripcion}</p>
          </div>
        </div>
        
        
    );
}
export default Mostrar;