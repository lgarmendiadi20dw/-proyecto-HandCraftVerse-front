import React from "react";
import "./Input.scss";

const TextArea = ({ text, name }) => {
  return (
    <div className="group">
      <textarea required name={name} id={name} className="input" />
      <span className="highlight" />
      <span className="bar" />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};

export default TextArea;
