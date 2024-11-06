import React from 'react';
import './Card.scss';

const Card = ({nombre, precio, imagen }) => {
    return (
        <div className="card">
            <img alt={nombre} src={imagen || "img/unnamed.png"} />
            <div className="texto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio}€</p>
            </div>
        </div>
    );
}

export default Card;