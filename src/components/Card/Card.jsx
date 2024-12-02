import React, { useEffect, useState } from 'react';
import './Card.scss';

const unnamedImage = '/img/unnamed.png';

const Card = ({ apiIp, producto }) => {
    const { id, nombre, precio } = producto;
    const [imagen, setImagen] = useState(unnamedImage);

    useEffect(() => {
        const fetchImagen = async () => {
            try {
                const response = await fetch(`${apiIp}productos/${id}/multimedia`);
                const data = await response.json();
                if (response.ok && data.length > 0) {
                    setImagen('/img/'+data[0].nombreArchivo); // Asumiendo que el objeto Multimedia tiene una propiedad 'url'
                } else {
                    setImagen(unnamedImage);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setImagen(unnamedImage);
            }
        };

        fetchImagen();
    }, [id, apiIp]);

    return (
        <div className="custom-card">
            <img alt={nombre} src={imagen} />
            <div className="texto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio}€</p>
            </div>
        </div>
    );
}

export default Card;