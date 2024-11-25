import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({apiIp}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(`${apiIp}member/me3`, {
            method: 'GET',
            credentials: 'include', // Incluye cookies de sesión
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los datos del usuario');
                }
            })
            .then((data) => {
                console.log('Datos del usuario:', data);
                setUserData(data); // Guardar datos del usuario en el estado
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, [apiIp]);

    
    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="heart">
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='carrito'>
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
                {userData ? (
                    <span className="username">{userData.username}</span>
                ) : (
                <Link to="/iniciarSesion"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='user'>
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg></Link>

                    
                )}
            </div>
        </nav>
    );
}

export default Navbar;
