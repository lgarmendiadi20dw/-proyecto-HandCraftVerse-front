import React, { useEffect, useState, useCallback } from "react";
// import Navbar from '../Nav/Navbar';
import "./FormulariosProductos.scss";
import Button from "../../components/inputs/Button";
import Text from "../../components/inputs/Text";
import TextArea from "../../components/inputs/TextArea";

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

  useEffect(() => {
    const selectionButtonCategorias = document.getElementById("selectionButtonCategorias");
    if (selectedCategorias.length > 0) {
      selectionButtonCategorias.classList.add("has-selection");
    } else {
      selectionButtonCategorias.classList.remove("has-selection");
    }

    const selectionButtonColores = document.getElementById("selectionButtonColores");
    if (selectedColores.length > 0) {
      selectionButtonColores.classList.add("has-selection");
    } else {
      selectionButtonColores.classList.remove("has-selection");
    }
  }, [selectedCategorias, selectedColores]);

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
    <div className="container mt-6">
      <div
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2>Crear Producto</h2>
        <form onSubmit={enviarFormulario} name="nuevo" className="formNewProduct">
          <Text type="text" text="Vendedor ID" name="vendedorId" />
          <Text type="text" text="Nombre del producto" name="nombre" />
          <Text type="number" text="Precio" name="precio" />
          <Text type="number" text="Stock" name="stock" />
          <TextArea text="Descripción" name="descripcion" />
          
          <div className="custom-dropdown ">
            <label htmlFor="categorias">Categorías:</label>
            <div id="selectionButtonCategorias">
              {selectedCategorias.length > 0
                ? selectedCategorias.join(", ")
                : "Seleccionar opciones"}
                <span className="highlight" />
                <span className="bar" />
            </div>
            <div className="custom-dropdown-content" id="categorias">
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
          <br/>
          <div className="custom-dropdown">
            <label htmlFor="colores">Colores:</label>
            <div id="selectionButtonColores">
              {selectedColores.length > 0
                ? selectedColores.join(", ")
                : "Seleccionar opciones"}
            </div>
            <div className="custom-dropdown-content" id="colores">
              {colores &&
                Array.isArray(colores) &&
                colores.map((color) => (
                  <label key={color.nombre}>
                    <input
                      type="checkbox"
                      value={color.hex}
                      onChange={() => updateButtonText("colores", color.nombre)}
                    />
                    
                    {color.nombre}<span
                      style={{
                        backgroundColor: color.hex,
                      }}
                      className="colorView "
                    ></span>
                  </label>
                ))}
            </div>
          </div>
          <Button text="Crear" type="submit" />
        </form>
        <div id="mensaje" className="mt-3"></div>
      </div>
    </div>
  );
};

export default CrearProducto;
