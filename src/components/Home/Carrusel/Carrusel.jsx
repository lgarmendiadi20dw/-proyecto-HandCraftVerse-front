import React, { useEffect } from "react";
import "./Carrusel.scss";
import Card from "../../Card/Card";

const Carrusel = ({ apiIp, productos }) => {
  useEffect(() => {
    const carousels = document.querySelectorAll(".carousel-contenedor");

    carousels.forEach((carousel) => {
      const leftButton = carousel.querySelector(".boton-carrusel.left");
      const rightButton = carousel.querySelector(".boton-carrusel.right");
      const imgFlex = carousel.querySelector(".imgFlex");

      leftButton.addEventListener("click", () => {
        imgFlex.scrollBy({
          left: -imgFlex.clientWidth,
          behavior: "smooth",
        });
      });

      rightButton.addEventListener("click", () => {
        imgFlex.scrollBy({
          left: imgFlex.clientWidth,
          behavior: "smooth",
        });
      });
    });

    return () => {
      carousels.forEach((carousel) => {
        const leftButton = carousel.querySelector(".boton-carrusel.left");
        const rightButton = carousel.querySelector(".boton-carrusel.right");
        leftButton.removeEventListener("click", null);
        rightButton.removeEventListener("click", null);
      });
    };
  }, []);

  return (
    <div className="carousel-contenedor">
      <button
        className="boton-carrusel left"
        aria-label="Desplazar a la izquierda"
      >
        &#10094;
      </button>
      <div className="imgFlex">
        {productos.map((producto) => (
          <Card key={producto.id} producto={producto} apiIp={apiIp} />
        ))}
      </div>
      <button
        className="boton-carrusel right"
        aria-label="Desplazar a la derecha"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carrusel;
