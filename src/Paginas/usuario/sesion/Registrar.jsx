import React, { useState } from "react";
import Button from "../../../components/inputs/Button";
import Text from "../../../components/inputs/Text";
import "./Sesion.scss";
import { Link } from "react-router-dom";

const Registrar = ({ apiIp }) => {
  const [isSeller, setIsSeller] = useState(false);

  function enviarFormulario(event) {
    event.preventDefault(); // Evitar comportamiento por defecto
    
    const usuario = {
        "username": document.login.username.value,
        "email": document.login.email.value,
        "emailConfirm": document.login.emailConfirm.value,
        "password": document.login.password.value,
        "passwordConfirm": document.login.passwordConfirm.value
    };

    const url = isSeller ? `${apiIp}member/seller/registrar` : `${apiIp}member/registrar`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(usuario),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = "/";
    })
    .catch((error) => {
        document.getElementById('mensaje').innerText = 'Error al iniciar sesiocn';
        console.error('Error:', error);
    });
  }

  return (
    <div className="container tw-mt-6 tw-flex tw-justify-center tw-items-center min-h-screen">
      <div className="formulario">
        <h2>Registrarse</h2>
        <form onSubmit={enviarFormulario} className="formSesion" name="login">
          <Text
            type="text"
            text="Nombre de Usuario"
            name="username"
            required={true}
          />
           <Text
            type="text"
            text="Email"
            name="email"
            required={true}
          />
          <Text
            type="text"
            text="Confirmar email"
            name="emailConfirm"
            required={true}
          />
          <Text
            type="password"
            text="Contraseña"
            name="password"
            required={true}
          />
          <Text
            type="password"
            text="Confirmar contraseña"
            name="passwordConfirm"
            required={true}
          />
          <div className="tw-mt-4">
           
            <div className="checkbox-wrapper-46">
            <label htmlFor="sellerCheckbox">¿Quieres vender tus productos?</label><br/>
        <input type="checkbox" id="cbx-46" className="inp-cbx" onChange={(e) => setIsSeller(e.target.checked)}/>
        <label htmlFor="cbx-46" className="cbx"><span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1" /></svg></span><span>Marca la casilla para registrarte como vendedor</span>
        </label>
      </div>
          </div>
          <div id="mensaje" className="mt-3"></div>

          <div className="row">
  <p className="col-7">
        ¿Ya tienes una cuenta? <Link to="/iniciarSesion" className="linkSesion">Inicia sesión ahora!</Link>
      </p>
      <div className="col-5">
      <Button text="Registrarse" type="submit" />

      </div>

</div>

          
        </form>
        
      </div>
    </div>
  );
};

export default Registrar;
