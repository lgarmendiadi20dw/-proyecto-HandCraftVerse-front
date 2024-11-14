import React from 'react';
import './Card.scss';

const unnamedImage = process.env.PUBLIC_URL + '/img/unnamed.png';

const Card = ({nombre, precio, imagen }) => {
    return (
        <div className="card">
            <img alt={nombre} src={imagen || unnamedImage} />
            <div className="texto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio}€</p>
            </div>
        </div>
    );
}

export default Card;