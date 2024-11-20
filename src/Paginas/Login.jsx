import React, { useState } from "react";
import Button from "../components/inputs/Button";
import Text from "../components/inputs/Text";

const Login = ({ apiIp }) => {
  const [error, setError] = useState("");

  // Función que maneja el envío del formulario
//   const enviarFormulario = async (event) => {
//     event.preventDefault();
//     let username = event.target.username.value;
//     let password = event.target.password.value;
//     console.log(username, password);

//     if (!username || !password) {
//       setError("Por favor, complete todos los campos.");
//       return;
//     }

//     const loginDto = {
//       username,
//       password,
//     };

//     try {
//       const response = await fetch(`${apiIp}member/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginDto),
//         // credentials: "include", // Para manejar las cookies (JWT)
//       });

//       if (!response.ok) {
//         throw new Error("Credenciales incorrectas");
//       }
// console.log(response);
//       const result = await response.json();
//       console.log(result); // Aquí podrías redirigir al usuario o manejar la sesión

//       setError(""); // Limpiar el mensaje de error si el login es exitoso
//     } catch (error) {
//       setError("Nombre de usuario o contraseña incorrectos");
//       console.error("Error:", error);
//     }
//   };

  function enviarFormulario(event) {
    event.preventDefault(); // Evitar comportamiento por defecto
    
    const usuario = {
        "username": document.login.username.value,
        "password": document.login.password.value
    };

    console.log(usuario);
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
        console.log(parsedData);
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
      <div className="formularioLogin">
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
          
          {/* Mensaje de error */}
          {error && <div className="error-message">{error}</div>}
          <div id="mensaje" className="mt-3"></div>

          <Button text="Iniciar Sesión" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
