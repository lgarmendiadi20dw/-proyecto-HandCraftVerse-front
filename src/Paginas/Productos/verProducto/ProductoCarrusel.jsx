import React from "react";

const ProductoCarrusel = ({ multimedia }) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores */}
      <ol className="carousel-indicators">
        {multimedia.map((item, index) => (
          <li
            key={index}
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></li>
        ))}
      </ol>

      {/* Items del Carrusel */}
      <div className="carousel-inner">
        {multimedia.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              className="d-block w-100"
              src={`/img/${item.nombreArchivo}`}
              alt={item.alt || `Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ProductoCarrusel;
