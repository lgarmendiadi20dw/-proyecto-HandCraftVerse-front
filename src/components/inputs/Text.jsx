import React, { useState } from "react";
import { ReactComponent as OjoIcon } from "../../assets/svg/ojo.svg";
import { ReactComponent as OjosCruzadosIcon } from "../../assets/svg/ojos-cruzados.svg";
import "./Input.scss";

const Text = ({ type, text, name, step }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="group">
      {/* Cambia el tipo de input dinámicamente si es un password */}
      <input
        required
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        id={name}
        step={step}
        className="input"
      />
      <span className="bar" />
      <label htmlFor={name}>{text}</label>

      {/* Renderiza el botón solo si el tipo es password */}
      {type === "password" && (
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <OjoIcon className="svg-icon" />
          ) : (
            <OjosCruzadosIcon className="svg-icon" />
          )}
        </button>
      )}
    </div>
  );
};

export default Text;
