import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ apiIp }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(`${apiIp}categorias/all`)
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, [apiIp]);

  return (
    <aside className="sidebar">
      <ul>
        {categorias.map((categoria, index) => (
          <li key={index}><Link to={`/categoria/${categoria.nombre}`}>{categoria.nombre}</Link></li>
        ))}
      </ul>
      <div className="filtroPrecio">
        <div className="field">
          <label>Min</label>
          <span><input type="text" value="0"/>€</span>
        </div>
        <div className="field">
          <label>Max</label>
          <span><input type="text" value="10000"/>€</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;