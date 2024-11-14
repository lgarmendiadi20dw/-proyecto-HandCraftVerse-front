import React from "react";
import "./Inputs.css";

const Button = ({ text, id }) => {
  return (
    <button class="full-rounded" id={id}>
      <span>{text}</span>
      <div class="border full-rounded"></div>
    </button>
  );
};

export default Button;
