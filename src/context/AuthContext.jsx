import React, { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Lógica para obtener los datos del usuario al iniciar sesión
  useEffect(() => {
    // Aquí puedes obtener los datos del usuario
    // Puede ser una solicitud que recupere los datos de un endpoint similar al que ya usabas
    fetch(`${process.env.IP || 'https://localhost:8443/'}member/me3`, {
      method: 'GET',
      credentials: 'include', // Incluye las cookies de sesión
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Error al obtener los datos del usuario');
      })
      .then((data) => setUserData(data)) // Establecer los datos del usuario en el estado
      .catch((error) => console.error('Error al obtener los datos del usuario:', error));
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
