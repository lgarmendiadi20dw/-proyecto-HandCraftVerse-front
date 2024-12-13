import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../../Context";
import ProductoImagen from "./ProductoImagen";
import NumericInput from "../../../components/inputs/NumericInput";
import Button from "../../../components/inputs/Button";
import Cargar from "../../../components/Cargar/Cargar";
import { ReactComponent as PrevIcon } from "../../../assets/svg/iconCarrusel/prev-icon.svg";
import { ReactComponent as NextIcon } from "../../../assets/svg/iconCarrusel/next-icon.svg";
import { ReactComponent as Disponible } from "../../../assets/svg/iconos/ok.svg";
import { ReactComponent as SinStock } from "../../../assets/svg/iconos/notOk.svg";
import { ReactComponent as Edit } from "../../../assets/svg/iconos/editar.svg";
import Carousel from "react-bootstrap/Carousel";
import "./VerProducto.scss";
import Editar from "./Editar/Editar"; // Componente para editar el producto

const VerProducto = ({ apiIp }) => {
  const userData = useContext(AuthContext);
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isFavorito, setIsFavorito] = useState(false);
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

  const toggleFavorito = () => {
    if (!userData || !userData.id) {
      console.log("Usuario no autenticado, no se puede modificar el favorito.");
      return;
    }

    if (!isFavorito) {
      fetch(`${apiIp}member/${userData.id}/addFavoritos/${id}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ productoId: id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          setIsFavorito(true);
        })
        .catch((error) => console.error("Error al agregar a favoritos:", error));
    } else {
      fetch(`${apiIp}member/${userData.id}/deleteFavoritos/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then(() => {
          setIsFavorito(false);
        })
        .catch((error) => console.error("Error al eliminar de favoritos:", error));
    }
  };

  if (!producto) return <Cargar />;

  const { multimedia, vendedorId, nombre, precio, stock, vendedorNombre } = producto;

  // Verificar si el usuario es el propietario del producto
  const isOwner = userData && Number(userData.id) === Number(vendedorId);

  return (
    <div className="container tw-mt-6">
      <div className="row verProducto">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="row">
            {multimedia.length > 1 ? (
              <Carousel
                prevIcon={<PrevIcon className="carruselIcon" />}
                nextIcon={<NextIcon className="carruselIcon" />}
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
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

        <div className="col-12 col-md-6 col-lg-8">
          {editMode ? (
            <Editar producto={producto} setProducto={setProducto} apiIp={apiIp} />
          ) : (
            <>
              <h2 className="textoTitulo">{nombre}</h2>
              <p>
                Vendido por:
                <Link to={`/perfil/${vendedorId}`}>
                  {" "}
                  {vendedorNombre}
                </Link>
              </p>
              <p className="precio">{precio}€</p>
              {stock > 0 ? (
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
            </>
          )}

          {isOwner && !editMode && (
            <Button
              onClick={() => setEditMode(!editMode)}
              className={editMode ? "danger" : ""}
              text={
                editMode ? (
                  "Cancelar"
                ) : (
                  <>
                    <span>Editar</span>
                    <Edit className="profileIcon" />
                  </>
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VerProducto;
