import React from "react";
import Button from "../../../components/inputs/Button";
import Text from "../../../components/inputs/Text";
import "./Sesion.scss";
import { Link } from "react-router-dom";

const Registrar = ({ apiIp }) => {
  function enviarFormulario(event) {
    event.preventDefault(); // Evitar comportamiento por defecto
    
    const usuario = {
        "username": document.login.username.value,
        "email": document.login.email.value,
        "emailConfirm": document.login.emailConfirm.value,
        "password": document.login.password.value,
        "passwordConfirm": document.login.passwordConfirm.value
    };

    // Aquí puedes descomentar el fetch para hacer el envío de datos:
    fetch(`${apiIp}member/registrar`, {
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
      // document.getElementById('mensaje').innerText = 'sesion iniciada exitosamente';
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
        <h2>Iniciar Sesión</h2>
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
          
          <div id="mensaje" className="mt-3"></div>

          <Button text="Registrarse" type="submit" />
        </form>
        <p>
        ¿Ya tienes una cuenta? <Link to="/iniciarSesion" className="linkSesion">Inicia sesión ahora!</Link>
      </p>
      </div>
    </div>
  );
};

export default Registrar;
