import React, { useEffect, useState, useCallback } from "react";
// import Navbar from '../Nav/Navbar';
import "./FormulariosProductos.scss";
import Button from "../../components/inputs/Button";

const CrearProducto = ({ apiIp }) => {
  const [categorias, setCategorias] = useState([]);
  const [colores, setColores] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedColores, setSelectedColores] = useState([]);

  const fetchCategorias = useCallback(() => {
    fetch(`${apiIp}categorias/all`)
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      });
  }, [apiIp]);

  const fetchColores = useCallback(() => {
    fetch(`${apiIp}colores/all`)
      .then((response) => response.json())
      .then((data) => {
        setColores(data);
      });
  }, [apiIp]);

  useEffect(() => {
    fetchCategorias();
    fetchColores();
  }, [fetchCategorias, fetchColores]);

  const updateButtonText = (type, value) => {
    if (type === "categorias") {
      setSelectedCategorias((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else {
      setSelectedColores((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const enviarFormulario = (event) => {
    event.preventDefault();

    const producto = {
      vendedorId: event.target.vendedorId.value,
      nombre: event.target.nombre.value,
      precio: parseFloat(event.target.precio.value),
      stock: parseInt(event.target.stock.value),
      descripcion: event.target.descripcion.value,
      categorias: selectedCategorias.map(
        (categoria) => categorias.find((cat) => cat.nombre === categoria).nombre
      ),
      colores: selectedColores.map(
        (color) => colores.find((col) => col.nombre === color).hex
      ),
    };

    console.log(
      selectedColores.map(
        (color) => colores.find((col) => col.nombre === color).hex
      )
    );

    fetch(`${apiIp}productos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("mensaje").innerText =
          "Producto creado exitosamente";
      })
      .catch((error) => {
        document.getElementById("mensaje").innerText =
          "Error al crear el producto";
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <a
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2>Crear Producto</h2>
        <form onSubmit={enviarFormulario} name="nuevo">
          <div className="form-group">
            <label htmlFor="vendedorId">ID del Vendedor:</label>
            <input
              type="number"
              className="form-control"
              name="vendedorId"
              id="vendedorId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Producto:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              id="nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              id="precio"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              id="stock"
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              className="form-control"
              id="descripcion"
              name="descripcion"
              rows="3"
            ></textarea>
          </div>
          <div className="dropdown">
            <label htmlFor="categorias">Categorías:</label>
            <div id="selectionButtonCategorias">
              {selectedCategorias.length > 0
                ? selectedCategorias.join(", ")
                : "Seleccionar opciones"}
            </div>
            <div className="dropdown-content" id="categorias">
              {categorias &&
                Array.isArray(categorias) &&
                categorias.map((categoria) => (
                  <label key={categoria.nombre}>
                    <input
                      type="checkbox"
                      value={categoria.nombre}
                      onChange={() =>
                        updateButtonText("categorias", categoria.nombre)
                      }
                    />
                    {categoria.nombre}
                  </label>
                ))}
            </div>
          </div>
          <div className="dropdown">
            <label htmlFor="colores">Colores:</label>
            <div id="selectionButtonColores">
              {selectedColores.length > 0
                ? selectedColores.join(", ")
                : "Seleccionar opciones"}
            </div>
            <div className="dropdown-content" id="colores">
              {colores &&
                Array.isArray(colores) &&
                colores.map((color) => (
                  <label key={color.nombre}>
                    <input
                      type="checkbox"
                      value={color.hex}
                      onChange={() => updateButtonText("colores", color.nombre)}
                    />
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        backgroundColor: color.hex,
                        marginRight: "5px",
                      }}
                    ></span>
                    {color.nombre}
                  </label>
                ))}
            </div>
          </div>
          <Button text="Crear" type="submit" />
        </form>
        <div id="mensaje" className="mt-3"></div>
      </a>
    </div>
  );
};

export default CrearProducto;
