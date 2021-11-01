import React, { useState, useRef } from "react";
import axios from "axios";
import "./VideoUpload.css";
import fileUploadApi from "../apis/fileUploadApi";
import ProgressBar from "./ProgressBar";
import { bytesToMB } from "../utils/helpers";

const VideoUpload = () => {
  const [selectedVideoFile, setSelectedVideoFile] = useState("");
  const [error, setError] = useState({ isError: false, message: "" });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const fileRef = useRef();

  const validateFile = (file) => {
    const { size, type } = file;
    const fileSizeInMb = parseInt(bytesToMB(size));

    if (type !== "video/mp4") {
      throw new Error("Please select a video file");
    }

    if (fileSizeInMb > 50) {
      throw new Error(
        "The file size is bigger than 50mb. Please select another file."
      );
    }
    return file;
  };

  const handleChange = (event) => {
    if (error.isError) {
      setError({ isError: false, message: "" });
    }
    const file = event.target.files[0];

    try {
      const validatedFile = validateFile(file);
      setSelectedVideoFile(validatedFile);
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  };

  const uploadFile = async () => {
    const { data } = await fileUploadApi.get("/s3_url");
    const s3SecureUrl = data.url;

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        setUploadPercentage(percent);
      },
    };

    try {
      await axios.put(s3SecureUrl, selectedVideoFile, options);
      if (fileRef) {
        fileRef.current.value = "";
      }
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  };

  return (
    <div className="form-container">
      <div className="box">
        <h2 className="header">Upload Video</h2>
        {error.isError && <h3 className="">{error.message}</h3>}

        {uploadPercentage !== 0 && uploadPercentage !== 100 && (
          <ProgressBar completed={uploadPercentage} bgcolor="black" />
        )}
        <input
          aria-label="file-input"
          type="file"
          ref={fileRef}
          name="file"
          onChange={handleChange}
        />
        <button
          className="button"
          onClick={uploadFile}
          type="submit"
          disabled={error.isError}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
