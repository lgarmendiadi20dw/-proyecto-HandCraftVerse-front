import React from "react";

const ProductoImagen = ({ src, alt }) => {
  return (
    <img
      className="imagenCarousel"
      src={src}
      alt={alt || "Imagen del producto"}
    />
  );
};

export default ProductoImagen;
