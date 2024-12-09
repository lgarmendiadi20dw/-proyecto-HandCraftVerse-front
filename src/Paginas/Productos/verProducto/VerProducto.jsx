import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import ProductoImagen from "./ProductoImagen";

import { ReactComponent as PrevIcon } from "../../../assets/svg/iconCarrusel/prev-icon.svg";
import { ReactComponent as NextIcon } from "../../../assets/svg/iconCarrusel/next-icon.svg";
import { ReactComponent as Disponible } from "../../../assets/svg/iconos/ok.svg";
import { ReactComponent as SinStock } from "../../../assets/svg/iconos/notOk.svg";

import Carousel from "react-bootstrap/Carousel";
import "./VerProducto.scss";

const VerProducto = ({ apiIp }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const cargarProducto = useCallback(() => {
    fetch(`${apiIp}productos/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProducto(data);
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, id]);

  useEffect(() => {
    cargarProducto();
  }, [id, cargarProducto]);

  if (!producto) return <p>Cargando producto...</p>;
  const { multimedia } = producto;
  return (
    <div className="container tw-mt-6">
    <div className="row verProducto">
      {/* Columna de imágenes */}
      <div className="col-12 col-md-6 col-lg-4">
        {multimedia.length > 1 ? (
          <Carousel
            prevIcon={<PrevIcon className="carruselIcon" />}
            nextIcon={<NextIcon className="carruselIcon" />}
            activeIndex={index}
            onSelect={handleSelect}
            interval={null} // Desactiva el cambio automático
          >
            {multimedia.map((item, idx) => (
              <Carousel.Item key={idx}>
                <ProductoImagen
                  src={`/img/${item.nombreArchivo}`}
                  alt={item.alt || `Imagen ${idx + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <ProductoImagen
            src={`/img/${multimedia[0].nombreArchivo}`}
            alt={multimedia[0].alt || "Imagen del producto"}
          />
        )}
      </div>
  
      {/* Columna del título y detalles */}
      <div className="col-12 col-md-6 col-lg-8">
        <h2 className="textoTitulo">{producto.nombre}</h2>
        <p>Vendido por:<Link to={`/perfil/${producto.vendedorId}`}> {producto.vendedorNombre}</Link></p>
        <p className="precio">{producto.precio}€</p>
        {producto.stock > 0 ? (
          <p id="disponible">
            <Disponible className="iconoDisponibilidad" />
            Disponible
          </p>
        ) : (
          <p id="sinStock">
            <SinStock className="iconoDisponibilidad" />
            Fuera de stock
          </p>
        )}
        {/* Descripción (alinea debajo del texto de disponibilidad en pantallas grandes) */}
        <div className="col-12 mt-3">
          <p className="descripcion">{producto.descripcion}</p>
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default VerProducto;
