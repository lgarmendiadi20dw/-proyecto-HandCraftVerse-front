import React, { useState, useRef, useEffect } from "react";
import "./Input.scss";

const TextArea = ({ text, name }) => {
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
        required
        name={name}
        id={name}
        className="input textarea"
        style={{ height }}
        onInput={handleInput}
      />
      <span className="highlight" />
      <span className="bar" />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};

export default TextArea;
