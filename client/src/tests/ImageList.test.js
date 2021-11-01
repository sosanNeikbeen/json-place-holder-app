import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ImageList from "../components/ImageList";
import { ImageProvider } from "../context/ImageContext";

const MockImageList = () => {
  return (
    <BrowserRouter>
      <ImageProvider>
        <ImageList />
      </ImageProvider>
    </BrowserRouter>
  );
};

describe("Image list component", () => {
  it("should fetch and render Images", async () => {
    render(<MockImageList />);
    const imageDivElement = await screen.findAllByTestId(/image-item/i);
    expect(imageDivElement.length).toBe(100);
  });
});
