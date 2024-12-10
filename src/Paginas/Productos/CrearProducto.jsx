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
  const [openDropdown, setOpenDropdown] = useState(null);

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

    const { nombre, precio, stock, descripcion, file } = event.target;

    if (!nombre.value || !precio.value || !stock.value || !descripcion.value || !file.files[0]) {
      alert("Por favor, complete todos los campos y seleccione un archivo.");
      return;
    }

    try {
      // Subir el archivo
      const formData = new FormData();
      formData.append("file", file.files[0]);

      const uploadResponse = await fetch(`${apiIp}dibujo/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Error al subir el archivo");

      const uploadedFilePath = await uploadResponse.text();

      // Crear los datos del producto
      const productoData = {
        vendedorId: userData.id,
        nombre: nombre.value,
        precio: parseFloat(precio.value),
        stock: parseInt(stock.value, 10),
        descripcion: descripcion.value,
        categorias: selectedCategorias,
        colores: selectedColores.map(
          (color) => colores.find((col) => col.nombre === color)?.hex
        )
      };

      const productoResponse = await fetch(`${apiIp}productos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        // body: JSON.stringify(productoData),
      });
console.log(productoData);
      if (!productoResponse.ok) throw new Error("Error al crear el producto");

      document.getElementById("mensaje").innerText = "Producto creado exitosamente";
    } catch (error) {
      document.getElementById("mensaje").innerText = "Error al crear el producto";
      console.error("Error:", error);
    }
  };

  return (
    <div className="container tw-mt-6 tw-flex tw-justify-center tw-items-center">
      <div className="row col-12">
        <div className="formulario">
          <h1 className="textoTitulo">Nuevo Producto</h1>
          <form onSubmit={enviarFormulario} className="formNewProduct">
            <label className="custum-file-upload" htmlFor="file">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24">
                  <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                  <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
                  <g id="SVGRepo_iconCarrier">
                    <path fill d="... (SVG Path) ..." />
                  </g>
                </svg>
              </div>
              <div className="text">
                <span>Click to upload image</span>
              </div>
              <input type="file" id="file" name="file" required />
            </label>

            <Text type="text" text="Nombre del producto" name="nombre" required />
            <Text type="number" text="Precio" name="precio" step="0.01" required />
            <Text type="number" text="Stock" name="stock" required />
            <TextArea text="Descripción" name="descripcion" required />

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
