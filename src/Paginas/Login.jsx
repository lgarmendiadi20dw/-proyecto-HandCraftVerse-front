import React from "react";
import Button from "../components/inputs/Button";
import Text from "../components/inputs/Text";

const Login = ({ apiIp }) => {
 

  function enviarFormulario(event) {
    event.preventDefault(); // Evitar comportamiento por defecto
    
    const usuario = {
        "username": document.login.username.value,
        "password": document.login.password.value
    };

    // Aquí puedes descomentar el fetch para hacer el envío de datos:
    fetch(`${apiIp}member/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
        
    })
    
    .then(response => response.json())
    .then(data => {
      try {
        const parsedData = JSON.parse(JSON.stringify(data));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      document.getElementById('mensaje').innerText = 'sesion iniciada exitosamente';
    })
    .catch((error) => {
        document.getElementById('mensaje').innerText = 'Error al iniciar sesion';
        console.error('Error:', error);
    });
}
  return (
    
    <div className="container mt-6 flex justify-center items-center min-h-screen">
      <div className="formulario">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={enviarFormulario} className="formLogin" name="login">
          <Text
            type="text"
            text="Nombre de Usuario"
            name="username"
          />
          <Text
            type="password"
            text="Contraseña"
            name="password"
          />
          
          <div id="mensaje" className="mt-3"></div>

          <Button text="Iniciar Sesión" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
