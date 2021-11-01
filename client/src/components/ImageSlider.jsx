import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ImageSlider.css";
import { useImage } from "../context/ImageContext";
import Image from "./Image";

const ImageSlider = () => {
  const { images } = useImage();
  const history = useHistory();

  const url = window.location.pathname;
  const index = parseInt(url.substring(url.lastIndexOf("/") + 1));
  const [current, setCurrent] = useState(index);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const backToHome = () => {
    history.push("/");
  };

  if (!Array.isArray(images) && images.length <= 0) {
    return null;
  }
  if (current !== 0) {
    window.history.pushState({}, index, current);
  }

  return (
    <section className="slider">
      <button onClick={backToHome} className="back-arrow">
        {"< Home"}
      </button>
      <button className="left-arrow" onClick={prevSlide}>
        {"<"}
      </button>
      <button className="right-arrow" onClick={nextSlide}>
        {">"}
      </button>
      {images.map((image, index) => {
        return (
          <div key={index}>
            {index === current && (
              <Image className="image" image={image.url} alt={image.title} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
