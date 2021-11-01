import { render, screen, fireEvent } from "@testing-library/react";
import VideoUpload from "../components/VideoUpload";

describe("Video uploader component", () => {
  it("should be able to select file", () => {
    render(<VideoUpload />);
    const inputElement = screen.getByLabelText(/file-input/i);
    fireEvent.change(inputElement, {
      target: { files: [0] },
    });
    expect(inputElement.files).toStrictEqual([0]);
  });
});
