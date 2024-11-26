import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Usar el hook de contexto
import './Navbar.scss';

const Navbar = ({ apiIp }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { userData, setUserData } = useAuth(); // Usamos los datos del usuario desde el contexto
    const [menuOpen, setMenuOpen] = useState(false); // Controla el estado del menú desplegable

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    };

    const handleMouseEnter = () => setMenuOpen(true); // Mostrar menú al pasar el mouse
    const handleMouseLeave = () => setMenuOpen(false); // Ocultar menú al salir del área

    const defaultImage = "/img/default-avatar.png"; // Imagen predeterminada
    const userImage = userData?.imagen ? `/img/${userData.imagen}` : defaultImage;

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
                    <div
                        className="user-menu"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={userImage} alt="Avatar" className="userIcon" />
                        {menuOpen && (
                            <ul className="menu-options">
                                <li><Link to="/perfil">Ver Perfil</Link></li>
                                <li><Link to="/ajustes">Ajustes</Link></li>
                                <li><Link to="/logout">Cerrar Sesión</Link></li>
                            </ul>
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
