import React, { useEffect, useRef, useState } from "react";

const AfterCanvasContainer = ({ paintMode }) => {
  const canvasRef2 = useRef(null);

  useEffect(() => {
    console.log("Paint mode is:", paintMode);

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

    // Check if paint mode is active before enabling painting
    if (paintMode) {
      console.log("Paint mode is ON");

      let painting = false;

      const startPaint = (event) => {
        painting = true;
        paint(event);
      };

      const endPaint = () => {
        painting = false;
        ctx.beginPath();
      };

      const paint = (event) => {
        if (!painting) return;

        ctx.lineWidth = 30;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';

        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      };

      canvas.addEventListener('mousedown', startPaint);
      canvas.addEventListener('mouseup', endPaint);
      canvas.addEventListener('mousemove', paint);

      return () => {
        // Cleanup event listeners when the component unmounts
        canvas.removeEventListener('mousedown', startPaint);
        canvas.removeEventListener('mouseup', endPaint);
        canvas.removeEventListener('mousemove', paint);
      };
    } else {
      console.log("Paint mode is OFF");
    }
  }, [paintMode]);

  return (
    <div className="canvas-container">
      <label className="title">After</label>
      <canvas id="canvas2" ref={canvasRef2} width={500} height={500}></canvas>
    </div>
  );
};

export default AfterCanvasContainer;
