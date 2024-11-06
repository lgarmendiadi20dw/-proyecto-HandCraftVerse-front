import React, { useEffect } from "react";
import "./Carrusel.scss";
import Card from "../../Card/Card";

const Carrusel = ({ productos }) => {
  useEffect(() => {
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((carousel) => {
      const leftButton = carousel.querySelector(".carousel-button.left");
      const rightButton = carousel.querySelector(".carousel-button.right");
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
        const leftButton = carousel.querySelector(".carousel-button.left");
        const rightButton = carousel.querySelector(".carousel-button.right");
        leftButton.removeEventListener("click", null);
        rightButton.removeEventListener("click", null);
      });
    };
  }, []);

  return (
    <div className="carousel-container">
      <button
        className="carousel-button left"
        aria-label="Desplazar a la izquierda"
      >
        &#10094;
      </button>
      <div className="imgFlex">
        {productos.map(producto => (
          <Card key={producto.id} {...producto} />
        ))}
      </div>
      <button
        className="carousel-button right"
        aria-label="Desplazar a la derecha"
      >
        &#10095;
      </button>
    </div>
  );
}

export default Carrusel;