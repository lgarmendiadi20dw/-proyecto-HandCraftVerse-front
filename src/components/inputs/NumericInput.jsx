import React, { useState } from "react";
import "./NumericInput.scss";

const NumericInput = ({ stock }) => {
  const [value, setValue] = useState(stock > 0 ? 1 : 0);

  const handleChange = (e) => {
    let inputValue = parseInt(e.target.value, 10);

    if (isNaN(inputValue)) {
      inputValue = 1; // Si el usuario borra el valor, se resetea a 1
    }

    if (inputValue > stock) {
      setValue(stock); // Si excede el stock, se ajusta al máximo
    } else if (inputValue < 1) {
      setValue(1); // Evita números menores a 1
    } else {
      setValue(inputValue); // Actualiza al valor ingresado
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const increment = () => {
    if (value < stock) {
      setValue(value + 1);
    }
  };

  return (
    <div className="numeric-input">
      <button
        onClick={decrement}
        disabled={stock === 0 || value <= 1}
        className="numeric-input__button decrement"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange} // Permite entrada manual
        disabled={stock === 0}
        className="numeric-input__field"
      />
      <button
        onClick={increment}
        disabled={stock === 0 || value >= stock}
        className="numeric-input__button increment"
      >
        +
      </button>
    </div>
  );
};

export default NumericInput;
