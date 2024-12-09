import React from "react";
import "./Input.scss";

const Button = ({ type, text, onClick, id }) => {
  return (
    <button 
      className="boton" 
      id={id} 
      type={type} 
      onClick={onClick} // Agrega el manejo del click aquí
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
