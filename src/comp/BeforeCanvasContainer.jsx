import React, { useEffect, useRef } from "react";

const BeforeCanvasContainer = ({ handleClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    document.getElementById('fileInput').addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    });

  }, []);

  return (
    <div className="canvas-container">
      <label className="title">Before</label>
      <canvas id="canvas" ref={canvasRef} width={500} height={500}></canvas>
    </div>
  );
};

export default BeforeCanvasContainer;