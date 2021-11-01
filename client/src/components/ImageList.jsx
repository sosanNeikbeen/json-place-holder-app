import React from "react";
import { Link } from "react-router-dom";
import "./ImageList.css";
import { useImage } from "../context/ImageContext";
import Image from "./Image";

const ImageList = () => {
  const { images } = useImage();
  return (
    <>
      <Link to="/video-upload">
        <button className="button">Upload Video Form</button>
      </Link>

      <section className="container">
        {images.map((image, i) => (
          <div data-testid={`image-item-${i}`} key={image.id}>
            <Link to={`/images/${i}`}>
              <Image alt={image.title} image={image.url} />
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default ImageList;
