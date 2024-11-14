import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link>Categoría 1</Link></li>
        <li><Link>Categoría 2</Link></li>
        <li><Link>Categoría 3</Link></li>
        <li><Link>Categoría 4</Link></li>
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