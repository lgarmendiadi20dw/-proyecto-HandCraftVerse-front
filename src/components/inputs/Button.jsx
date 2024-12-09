import React from "react";
import "./Input.scss";

const Button = ({ type, text, onClick, id, className = "" }) => {
  return (
    <button 
      className={`${className} boton `} // Combina las clases
      id={id} 
      type={type} 
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
