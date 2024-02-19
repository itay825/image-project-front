import React, { useEffect, useRef } from "react";

const AfterCanvasContainer = ({ handleClick }) => {
  const canvasRef2 = useRef(null);

  useEffect(() => {
    const canvas = canvasRef2.current;
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
    <div className="canvas-container" >
      <label className="title">After</label>
      <canvas id="canvas2" ref={canvasRef2} width={500} height={500}></canvas>
    </div>
  );
};

export default AfterCanvasContainer;