import React, { useEffect, useState, useCallback, useContext } from "react";
import { AuthContext } from "../../Context";
import "./FormulariosProductos.scss";
import Button from "../../components/inputs/Button";
import Text from "../../components/inputs/Text";
import TextArea from "../../components/inputs/TextArea";

const CrearProducto = ({ apiIp }) => {
  const userData = useContext(AuthContext);

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

    const {  nombre, precio, stock, descripcion } = event.target;

    if ( !nombre.value || !precio.value || !stock.value || !descripcion.value) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    const producto = {
      vendedorId: userData.id,
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

      // const result = await response.json();
      document.getElementById("mensaje").innerText = "Producto creado exitosamente";
    } catch (error) {
      document.getElementById("mensaje").innerText = "Error al crear el producto";
      console.error("Error:", error);
    }
  };

  return (
    <div className="container  tw-mt-6 tw-flex tw-justify-center tw-items-center">
      <div className="row col-12">
        <div className="  formulario ">
          <h1 className="textoTitulo">Nuevo Producto</h1>

          <form onSubmit={enviarFormulario} className="formNewProduct">
          <label className="custum-file-upload" htmlFor="file">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path fill d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
          </div>
          <div className="text">
            <span>Click to upload image</span>
          </div>
          <input type="file" id="file" />
        </label>
            {/* <Text type="text" text="Vendedor ID" name="vendedorId" required={true} /> */}
            <Text type="text" text="Nombre del producto" name="nombre" required={true} />
            <Text type="number" text="Precio" name="precio" step="0.01" required={true} />
            <Text type="number" text="Stock" name="stock" required={true} />
            <TextArea text="Descripción" name="descripcion" required={true} />

            {/* Dropdown de categorías */}
            <div
              className={`custom-dropdown ${
                openDropdown === "categorias" ? "active" : "inactive"
              }`}
            >
              <label htmlFor="categorias">Categorías <span className="obligatorio">*</span></label>
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
              <label htmlFor="colores">Colores <span className="obligatorio">*</span></label>
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
    </div>
  );
};

export default CrearProducto;
