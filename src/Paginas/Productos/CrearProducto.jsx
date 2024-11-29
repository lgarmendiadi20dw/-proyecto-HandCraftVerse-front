import React, { useEffect, useState, useCallback } from "react";
import "./FormulariosProductos.scss";
import Button from "../../components/inputs/Button";
import Text from "../../components/inputs/Text";
import TextArea from "../../components/inputs/TextArea";

const CrearProducto = ({ apiIp }) => {
  const [categorias, setCategorias] = useState([]);
  const [colores, setColores] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedColores, setSelectedColores] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // Control de dropdown abierto

  const fetchData = useCallback(
    async (endpoint, setter) => {
      try {
        const response = await fetch(`${apiIp}${endpoint}`);
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Error al obtener ${endpoint}:`, error);
      }
    },
    [apiIp]
  );

  useEffect(() => {
    fetchData("categorias/all", setCategorias);
    fetchData("colores/all", setColores);
  }, [fetchData]);

  const toggleSelection = (type, value) => {
    const setter = type === "categorias" ? setSelectedCategorias : setSelectedColores;
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleDropdown = (type) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  const enviarFormulario = async (event) => {
    event.preventDefault();

    const { vendedorId, nombre, precio, stock, descripcion } = event.target;

    if (!vendedorId.value || !nombre.value || !precio.value || !stock.value || !descripcion.value) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const producto = {
      vendedorId: vendedorId.value,
      nombre: nombre.value,
      precio: parseFloat(precio.value),
      stock: parseInt(stock.value, 10),
      descripcion: descripcion.value,
      categorias: selectedCategorias,
      colores: selectedColores.map(
        (color) => colores.find((col) => col.nombre === color)?.hex
      ),
    };
    try {
      const response = await fetch(`${apiIp}productos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) throw new Error("Error al crear el producto");

      const result = await response.json();
      document.getElementById("mensaje").innerText = "Producto creado exitosamente";
    } catch (error) {
      document.getElementById("mensaje").innerText = "Error al crear el producto";
      console.error("Error:", error);
    }
  };

  return (
    <div className="container newProduct ">
      <div className="  formulario ">
        <h2>Crear Producto</h2>
        <form onSubmit={enviarFormulario} className="formNewProduct">
          <Text type="text" text="Vendedor ID" name="vendedorId" />
          <Text type="text" text="Nombre del producto" name="nombre" />
          <Text type="number" text="Precio" name="precio" />
          <Text type="number" text="Stock" name="stock" />
          <TextArea text="Descripción" name="descripcion" />

          {/* Dropdown de categorías */}
          <div
            className={`custom-dropdown ${
              openDropdown === "categorias" ? "active" : "inactive"
            }`}
          >
            <label htmlFor="categorias">Categorías:</label>
            <div
              id="selectionButtonCategorias"
              className={`selection-button ${
                selectedCategorias.length > 0 ? "has-selection" : ""
              }`}
              onClick={() => toggleDropdown("categorias")}
            >
              {selectedCategorias.length > 0
                ? selectedCategorias.join(", ")
                : "Seleccionar opciones"}
            </div>
            {openDropdown === "categorias" && (
              <div className="custom-dropdown-content">
                {categorias.map((categoria) => (
                  <label key={categoria.nombre}>
                    <input
                      type="checkbox"
                      value={categoria.nombre}
                      onChange={() => toggleSelection("categorias", categoria.nombre)}
                    />
                    {categoria.nombre}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown de colores */}
          <div
            className={`custom-dropdown ${
              openDropdown === "colores" ? "active" : "inactive"
            }`}
          >
            <label htmlFor="colores">Colores:</label>
            <div
              id="selectionButtonColores"
              className={`selection-button ${
                selectedColores.length > 0 ? "has-selection" : ""
              }`}
              onClick={() => toggleDropdown("colores")}
            >
              {selectedColores.length > 0
                ? selectedColores.join(", ")
                : "Seleccionar opciones"}
            </div>
            {openDropdown === "colores" && (
              <div className="custom-dropdown-content">
                {colores.map((color) => (
                  <label key={color.nombre}>
                    <input
                      type="checkbox"
                      value={color.nombre}
                      onChange={() => toggleSelection("colores", color.nombre)}
                    />
                    {color.nombre}
                    <span
                      style={{ backgroundColor: color.hex }}
                      className="colorView"
                    ></span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <Button text="Crear" type="submit" />
        </form>
        <div id="mensaje" className="mt-3"></div>
      </div>
    </div>
  );
};

export default CrearProducto;
