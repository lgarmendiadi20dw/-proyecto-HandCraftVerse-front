import React from "react";
import "./Input.scss";

const Button = ({ type, text, id }) => {
  return (
    
    <button className="boton" id={id} typt={type}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
