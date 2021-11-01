import React, { createContext, useContext, useState, useEffect } from "react";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await jsonPlaceholder.get("/photos?_limit=100");
      setImages(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const value = {
    images,
    fetchImages,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};

// hook that allows us to pull info from the data layer
export const useImage = () => useContext(ImageContext);
