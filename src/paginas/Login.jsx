import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/inputs/Button";
import Text from "../components/inputs/Text";

const Login = ({ apiIp }) => {
  const { setUsuario } = useAuth(); // Usa solo lo que necesitas del contexto
  const [mensaje, setMensaje] = useState("");

  function enviarFormulario(event) {
    event.preventDefault();

    const usuario = {
      username: document.login.username.value,
      password: document.login.password.value,
    };

    // Aquí es donde se está utilizando correctamente la variable 'usuario'
    fetch(`${apiIp}member/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario), // Usamos 'usuario' correctamente aquí
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error al iniciar sesión");
      })
      .then((data) => {
        setUsuario(data); // Guardar el usuario en el contexto
        setMensaje("Sesión iniciada exitosamente");
      })
      .catch((error) => {
        setMensaje("Error al iniciar sesión");
        console.error("Error:", error);
      });
  }

  return (
    <div className="container mt-6 flex justify-center items-center min-h-screen">
      <div className="formulario">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={enviarFormulario} className="formLogin" name="login">
          <Text type="text" text="Nombre de Usuario" name="username" />
          <Text type="password" text="Contraseña" name="password" />

          <div id="mensaje" className="mt-3 text-red-500">
            {mensaje}
          </div>

          <Button text="Iniciar Sesión" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;