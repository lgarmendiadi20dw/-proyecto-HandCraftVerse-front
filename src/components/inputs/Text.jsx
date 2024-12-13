import React, { useState } from "react";
import { ReactComponent as OjoIcon } from "../../assets/svg/iconos/ojo.svg";
import { ReactComponent as OjosCruzadosIcon } from "../../assets/svg/iconos/ojos-cruzados.svg";
import "./Input.scss";

const Text = ({ type, text, name, step, required, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="group">
      <input
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        id={name}
        step={step}
        className="input"
        required={required}
        placeholder=""
        value={value}   // El valor controlado
        onChange={onChange}  // Maneja el cambio
      />
      <span className="bar" />
      <label htmlFor={name}>
        {text} {required && <span className="obligatorio">*</span>}
      </label>

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
