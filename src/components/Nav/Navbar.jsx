import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.scss';

const Navbar = ({ apiIp }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [userData, setUserData] = useState(null);


    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    };

    
        const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para abrir/cerrar el dropdown
      
        const toggleDropdown = () => {
          setIsDropdownOpen((prev) => !prev);
        };

    const defaultImage = "/img/default-avatar.png"; // Imagen predeterminada
    const userImage = userData?.imagen ? `/img/${userData.imagen}` : defaultImage;


  // Lógica para obtener los datos del usuario al iniciar sesión
  useEffect(() => {
    fetch(`${apiIp || 'https://localhost:8443/'}member/me3`, {
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
      .catch((error) => setUserData(null)); // Borrar los datos del usuario si hay un error
  }, [apiIp]);

    function cerrarSesion() {
        fetch(`${apiIp}member/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                // Redirigir al usuario a la página de inicio de sesión
                window.location.href = '/iniciarSesion';
            } else {
                console.error('Error al cerrar sesión');
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
    }

    return (
        <nav className="navbar">
            <h1 className="navbar-brand">
                <Link to="/">HandCraftVerse</Link>
            </h1>

            <h1 className="navbar-brand">
                <Link to="/crear-producto">Producto</Link>
            </h1>

            <div className="search-contenedor">
                <input type="text" placeholder="Buscar..." className="search-input" />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </button>
            </div>

            <div className="navbar-icons">
                <svg onClick={toggleTheme} xmlns="http://www.w3.org/2000/svg" className="modoColores" viewBox="0 0 384 512">
                    <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                </svg>

                {userData ? (
                   <div className="custom-dropdown">
                   {/* Botón del dropdown */}
                   <div id="perfilButton" onClick={toggleDropdown}>
                     <img src={userImage} alt="Avatar" className="userIcon" />
                   </div>
             
                   {/* Contenido del dropdown */}
                   {isDropdownOpen && (
                     <div className="custom-dropdown-content">
                       
                         <Link to="/perfil" className="custom-dropdown-element">Perfil</Link>
                       
                         <Link to="/configuracion" className="custom-dropdown-element">Configuración</Link>
                       
                       <p className="custom-dropdown-element danger" onClick={cerrarSesion}>
                         Cerrar sesión
                       </p>
                     </div>
                   )}
                 </div>
                ) : (
                    <Link to="/iniciarSesion">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="user">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                        </svg>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
