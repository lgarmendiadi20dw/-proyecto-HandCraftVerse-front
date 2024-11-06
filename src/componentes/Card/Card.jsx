import React from 'react';
import './Card.scss'; // Asegúrate de crear un archivo CSS para los estilos

const Card = ({ id, nombre, precio, imagen }) => { // Recibe las props
    return (
        <div className="card" key={id}> {/* Añade key si es necesario (no en el Card, sino en la lista de Cards) */}
            <img alt={nombre} src={imagen || "img/unnamed.png"} /> {/* Usa imagen recibida, con valor por defecto */}
            <div className="texto">
                <p className="nombre">{nombre}</p> {/* Muestra el nombre del producto */}
                <p className="precio">{precio}€</p> {/* Muestra el precio del producto */}
            </div>
        </div>
    );
}

export default Card;
