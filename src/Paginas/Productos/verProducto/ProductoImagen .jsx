import React from "react";

const ProductoImagen = ({ src, alt }) => {
  return (
    <img
      className="d-block w-100"
      src={src}
      alt={alt || "Imagen del producto"}
    />
  );
};

export default ProductoImagen;
