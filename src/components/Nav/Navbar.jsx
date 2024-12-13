import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { AuthContext } from "../../Context";
import Cookies from 'js-cookie'; // Import the js-cookie library

import { ReactComponent as UserIcon } from "../../assets/svg/nav/user.svg";
import { ReactComponent as Luna } from "../../assets/svg/nav/luna.svg";
import { ReactComponent as Sol } from "../../assets/svg/nav/sol.svg";
import { ReactComponent as Corazon } from "../../assets/svg/nav/corazon.svg";

const Navbar = ({ apiIp }) => {
    const [isDarkMode, setIsDarkMode] = useState(Cookies.get('isDarkMode') === 'true'); // Initialize state from cookie
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");  // Estado para el término de búsqueda
    const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de búsqueda

    const userData = useContext(AuthContext);

    // Procesar roles
    let roles = [];
    if (userData && userData.roles) {
        roles = userData.roles.replace(/[\[\]"]+/g, "").split(",").map(role => role.trim());
    }

    // Función para alternar el modo oscuro/claro
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            Cookies.set('isDarkMode', newMode, { expires: 7 }); // Set cookie expiration to 7 days
            document.body.classList.toggle("dark", newMode);
            return newMode;
        });
    };

    // Configuración inicial para aplicar la clase según el estado inicial
    useEffect(() => {
        document.body.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    // Función para alternar el dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Función para cerrar sesión
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

    const defaultImage = "/img/default-avatar.png";
    const userImage = userData?.imagen ? `/img/${userData.imagen}` : defaultImage;

    // Manejar el cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Función para manejar la búsqueda en la API
    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            setSearchResults([]); // Limpiar los resultados si no hay término de búsqueda
            return;
        }

        try {
            const response = await fetch(`${apiIp}/productos/buscar?campo=nombre&query=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data); // Guardar los resultados en el estado
            } else {
                console.error("Error al buscar productos");
            }
        } catch (error) {
            console.error("Error en la solicitud de búsqueda:", error);
        }
    };

    // Opcional: Puedes manejar el evento de "Enter" para ejecutar la búsqueda
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isDropdownOpen &&
                !event.target.closest('#perfilButton') &&
                !event.target.closest('.custom-dropdown-content')
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav className="custom-navbar">
            <h1 className="custom-navbar-brand">
                <Link to="/">HandCraftVerse</Link>
            </h1>

            {roles.includes("VENDEDOR") && (
                <h1 className="custom-navbar-brand">
                    <Link to="/crear-producto">+ Vender</Link>
                </h1>
            )}

            <div className="search-contenedor">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="search-input" 
                    value={searchTerm} // Vincular con el estado
                    onChange={handleSearchChange} // Cambiar el término de búsqueda
                    onKeyPress={handleKeyPress} // Manejar la tecla "Enter"
                />
                <button className="search-button" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </button>
            </div>

            {/* Mostrar resultados de búsqueda */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    <ul>
                        {searchResults.map((item, index) => (
                            <li key={index}>
                                <Link to={`/producto/${item.id}`}>{item.nombre}</Link> {/* Ajusta según la estructura de tus productos */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="custom-navbar-icons">
               <Link to={"/productos/favoritos"}> <Corazon className="svg-icon" /></Link>
                {isDarkMode ? (
                    <Sol onClick={toggleTheme} className="svg-icon" />
                ) : (
                    <Luna onClick={toggleTheme} className="svg-icon" />
                )}
                {userData ? (
                    <div className="custom-dropdown">
                        <div id="perfilButton" onClick={toggleDropdown}>
                            <img src={userImage} alt="Avatar" className="userIcon" />
                        </div>
                        {isDropdownOpen && (
                            <div className={`custom-dropdown-content ${isDropdownOpen ? 'opened' : ''}`}>
                                <Link to={`/perfil/${userData.id}`} className="custom-dropdown-element">
                                    Perfil
                                </Link>
                                <Link to="/configuracion" className="custom-dropdown-element">
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
                    <Link to="/iniciarSesion">
                        <UserIcon className="svg-icon" />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
