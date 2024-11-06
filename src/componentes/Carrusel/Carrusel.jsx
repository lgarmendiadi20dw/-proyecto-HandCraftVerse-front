import React, { useEffect, useState } from "react";
import "./Carrusel.scss";
import Card from "../Card/Card";

const Carrusel = () => {
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos

    const cargarProductos = () => {
        fetch('https://localhost:8443/productos/all')
            .then(response => response.json())
            .then(data => {
                setProductos(data); // Actualiza el estado con los productos
            })
            .catch(error => console.error("Error al cargar los productos:", error));
    };

    useEffect(() => {
        cargarProductos(); // Llama a cargarProductos al montar el componente

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
        <div className="previewCartegoria">
            <h2 className="tituloEnPag">
                <span>
                    <a href="verCategoria.html" className="textoTitulo">Categoria</a>
                    <svg
                        id="arrow-horizontal"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="10"
                        viewBox="0 0 46 16"
                    ></svg>
                </span>
            </h2>

            <div className="carousel-container">
                <button
                    className="carousel-button left"
                    aria-label="Desplazar a la izquierda"
                >
                    &#10094;
                </button>
                <div className="imgFlex">
                    {productos.map(producto => (
                        <Card key={producto.id} {...producto} /> // Crea un Card para cada producto
                    ))}
                </div>
                <button
                    className="carousel-button right"
                    aria-label="Desplazar a la derecha"
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
}

export default Carrusel;
