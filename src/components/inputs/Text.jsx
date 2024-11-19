import React from "react";
import "./Input.scss";

const Text = ({ type, text, name }) => {
  return (
    <div className="group">
      <input required type={type} name={name} id={name} className="input" />
      <span className="bar" />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};

export default Text;
