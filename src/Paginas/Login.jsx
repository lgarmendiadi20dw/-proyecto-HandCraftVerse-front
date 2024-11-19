import React, { useState } from "react";
import Button from "../components/inputs/Button";
import Text from "../components/inputs/Text";

const Login = ({ apiIp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Función que maneja el envío del formulario
  const enviarFormulario = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const loginDto = {
      username,
      password,
    };

    try {
      const response = await fetch(`${apiIp}/member/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
        credentials: "include", // Para manejar las cookies (JWT)
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const result = await response.json();
      console.log(result); // Aquí podrías redirigir al usuario o manejar la sesión

      setError(""); // Limpiar el mensaje de error si el login es exitoso
    } catch (error) {
      setError("Nombre de usuario o contraseña incorrectos");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-6 flex justify-center items-center min-h-screen">
      <div className="formularioLogin">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={enviarFormulario} className="formLogin">
          <Text
            type="text"
            text="Nombre de Usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Text
            type="password"
            text="Contraseña"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* Mensaje de error */}
          {error && <div className="error-message">{error}</div>}

          <Button text="Iniciar Sesión" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
