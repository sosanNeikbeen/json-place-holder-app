import React from "react";

const Image = ({ image, alt, className }) => {
  return <img alt={alt} src={image} className={className} />;
};

export default Image;
