import React, { useState, useRef, useEffect } from "react";
import "./Input.scss";

const TextArea = ({ text, name, required, value, onChange }) => {
  const [height, setHeight] = useState("45px");
  const textAreaRef = useRef(null);

  const handleInput = () => {
    setHeight("auto");
    setHeight(`${textAreaRef.current.scrollHeight}px`);
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <div className="group">
      <textarea
        ref={textAreaRef}
        required={required}
        placeholder=""
        name={name}
        id={name}
        value={value}   // Valor controlado
        className="input textarea"
        style={{ height }}
        onInput={handleInput}
        onChange={onChange}  // Manejador de cambios
      />
      <span className="bar" />
      <label htmlFor={name}>
        {text} {required && <span className="obligatorio">*</span>}
      </label>
    </div>
  );
};

export default TextArea;
