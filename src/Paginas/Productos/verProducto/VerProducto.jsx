import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import ProductoImagen from "./ProductoImagen";
import NumericInput from "../../../components/inputs/NumericInput";
import Button from "../../../components/inputs/Button";
import Cargar from "../../../components/Cargar/Cargar";
import { AuthContext } from "../../../Context";

import { ReactComponent as PrevIcon } from "../../../assets/svg/iconCarrusel/prev-icon.svg";
import { ReactComponent as NextIcon } from "../../../assets/svg/iconCarrusel/next-icon.svg";
import { ReactComponent as Disponible } from "../../../assets/svg/iconos/ok.svg";
import { ReactComponent as SinStock } from "../../../assets/svg/iconos/notOk.svg";

import Carousel from "react-bootstrap/Carousel";
import "./VerProducto.scss";

const VerProducto = ({ apiIp }) => {
  const userData = useContext(AuthContext); // userData de contexto
  const { id } = useParams();
  const [producto, setProducto] = useState();
  const [isFavorito, setIsFavorito] = useState(false); // Estado para el checkbox de favorito
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

  // Función para verificar si el producto está en favoritos del usuario
  const verificarFavorito = useCallback(() => {
    if (!userData || !userData.id) {
      setIsFavorito(false); // Si no hay usuario autenticado, el producto no puede ser favorito
      return;
    }

    fetch(`${apiIp}member/${userData.id}/isFavorito/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsFavorito(data); // Establecer el estado del checkbox
      })
      .catch((error) =>
        console.error("Error verificando el producto favorito:", error)
      );
  }, [apiIp, id, userData]);

  useEffect(() => {
    if (!userData || !userData.id) {
      // Si el usuario no está autenticado, evitamos la verificación y seteamos el estado a false
      setIsFavorito(false);
      cargarProducto();
      return;
    }
    cargarProducto();
  }, [id, cargarProducto, userData]);

  useEffect(() => {
    if (producto) {
      verificarFavorito(); // Verificar si el producto está en favoritos cuando el producto esté cargado
    }
  }, [producto, verificarFavorito]);

  if (!producto) return <Cargar />;

  const { multimedia } = producto;

  // Función para manejar el cambio de estado del checkbox (agregar/eliminar favorito)
  const toggleFavorito = () => {
    if (!userData || !userData.id) {
      console.log("Usuario no autenticado, no se puede modificar el favorito.");
      return;
    }

    // Si el checkbox está marcado, agregamos el producto a favoritos
    if (!isFavorito) {
      fetch(`${apiIp}member/${userData.id}/addFavoritos/${id}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ productoId: id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.headers.get("content-type")?.includes("application/json")) {
            return response.json();
          }
          return response.text(); // Para manejar texto plano
        })
        .then((data) => {
          console.log("Respuesta al agregar a favoritos:", data);
          setIsFavorito(true); // Actualizamos el estado local
        })
        .catch((error) =>
          console.error("Error al agregar producto a favoritos:", error)
        );
    } else {
      // Si el checkbox está desmarcado, eliminamos el producto de favoritos
      fetch(`${apiIp}member/${userData.id}/deleteFavoritos/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (response.headers.get("content-type")?.includes("application/json")) {
            return response.json();
          }
          return response.text(); // Para manejar texto plano
        })
        .then((data) => {
          console.log("Respuesta al eliminar de favoritos:", data);
          setIsFavorito(false); // Actualizamos el estado local
        })
        .catch((error) =>
          console.error("Error al eliminar producto de favoritos:", error)
        );
    }
  };

  return (
    <div className="container tw-mt-6">
      <div className="row verProducto">
        {/* Columna de imágenes */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="row">
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
          <div className="row botonesCompraFav">
            <div className="col-12">
              {/* Nuevo diseño de checkbox de like */}
              <div className="con-like">
                <label className="checkboxLabel">
                  <input
                    className="like"
                    type="checkbox"
                    checked={isFavorito}
                    onChange={toggleFavorito}
                    title="like"
                  />
                  Favorito
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <NumericInput stock={producto.stock} />
            </div>

            <div className="col-12 col-md-6">
              <Button text="Añadir al carrito" />
            </div>
          </div>
        </div>

        {/* Columna del título y detalles */}
        <div className="col-12 col-md-6 col-lg-8">
          <h2 className="textoTitulo">{producto.nombre}</h2>
          <p>
            Vendido por:
            <Link to={`/perfil/${producto.vendedorId}`}>
              {" "}
              {producto.vendedorNombre}
            </Link>
          </p>
          <p className="precio">{producto.precio}€</p>
          {producto.stock > 0 ? (
            <div id="disponible">
              <Disponible className="iconoDisponibilidad" />
              <span>Disponible</span>
            </div>
          ) : (
            <div id="sinStock">
              <SinStock className="iconoDisponibilidad" />
              <span>Sin Stock</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerProducto;
