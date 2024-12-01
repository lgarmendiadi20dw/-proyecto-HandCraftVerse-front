import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import { AuthContext } from "../../Context";

import { ReactComponent as UserIcon } from "../../assets/svg/nav/user1.svg";
import { ReactComponent as UserIconHover } from "../../assets/svg/nav/user1.svg";

const Navbar = ({ apiIp }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isHoveringLogin, setIsHoveringLogin] = useState(false); // Estado para manejar el hover
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para abrir/cerrar el dropdown

    const userData = useContext(AuthContext);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.documentElement.setAttribute(
            "data-theme",
            newTheme ? "dark" : "light"
        );
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const defaultImage = "/img/default-avatar.png"; // Imagen predeterminada
    const userImage = userData?.imagen ? `/img/${userData.imagen}` : defaultImage;

    const cerrarSesion = () => {
        fetch(`${apiIp}member/logout`, {
            method: "POST",
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "/iniciarSesion";
                } else {
                    console.error("Error al cerrar sesión");
                }
            })
            .catch((error) => {
                console.error("Error de red:", error);
            });
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-brand">
                <Link to="/">HandCraftVerse</Link>
            </h1>

            <h1 className="navbar-brand">
                <Link to="/crear-producto">Producto</Link>
            </h1>

            <div className="search-contenedor">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="search-input"
                />
                <button className="search-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </button>
            </div>

            <div className="navbar-icons">
                <svg
                    onClick={toggleTheme}
                    xmlns="http://www.w3.org/2000/svg"
                    className="modoColores"
                    viewBox="0 0 384 512"
                >
                    <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                </svg>

                {userData ? (
                    <div className="custom-dropdown">
                        <div id="perfilButton" onClick={toggleDropdown}>
                            <img
                                src={userImage}
                                alt="Avatar"
                                className="userIcon"
                            />
                        </div>

                        {isDropdownOpen && (
                            <div className="custom-dropdown-content">
                                <NavLink
                                    to="/perfil"
                                    className="custom-dropdown-element"
                                >
                                    Perfil
                                </NavLink>

                                <Link
                                    to="/configuracion"
                                    className="custom-dropdown-element"
                                >
                                    Configuración
                                </Link>

                                <p
                                    className="custom-dropdown-element danger"
                                    onClick={cerrarSesion}
                                >
                                    Cerrar sesión
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/iniciarSesion"
                        onMouseEnter={() => setIsHoveringLogin(true)}
                        onMouseLeave={() => setIsHoveringLogin(false)}
                    >
                        {isHoveringLogin ? (
                            <UserIcon className="svg-icon" />
                        ) : (
                            <UserIcon className="svg-icon" />
                        )}
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
