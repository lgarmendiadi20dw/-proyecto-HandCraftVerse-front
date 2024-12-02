import React from "react";
import "./Carrusel.scss";
import Card from "../../Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Carrusel = ({ apiIp, productos }) => {
  return (
    <div id="carruselProductos" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores opcionales */}
      <div className="carousel-indicators">
        {productos.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carruselProductos"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Contenido del carrusel */}
      <div className="carousel-inner">
        {productos.map((producto, index) => (
          <div
            key={producto.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <Card producto={producto} apiIp={apiIp} />
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carruselProductos"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carruselProductos"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carrusel;
