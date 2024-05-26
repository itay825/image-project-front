import React from 'react';
import '../css/Filescss.css';
import { IoMdDownload } from "react-icons/io";

const downloadCanvasImage = () => {
  const canvas = document.getElementById('canvas2');
  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'canvas_image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      // Proceed with image processing
      // For example, display the image or upload it
      console.log('Image file detected:', file.name);
    } else {
      // Display error message or prevent further action
      console.error('Invalid file type. Please select an image file.');
    }
  }
};

const Paint = () => {
  return (
    <div className="file-upload-container">
      <label className="file-upload-label" htmlFor="fileInput">Choose File:</label>
      <input className="file-upload-input" type="file" id="fileInput" onChange={handleFileChange} accept="image/*" />
      <button className="download-button" onClick={downloadCanvasImage}>
        <IoMdDownload /> Download
      </button>
    </div>
  );
};

export default Paint;
