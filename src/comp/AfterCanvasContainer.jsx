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
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      };

      // const applyMask = () => {
      //   // Your masking logic here
      //   // For example, you can create a new canvas for the mask and apply it to the original canvas
      //   const maskCanvas = document.createElement('canvas');
      //   maskCanvas.width = canvas.width;
      //   maskCanvas.height = canvas.height;
      //   const maskCtx = maskCanvas.getContext('2d');
      //   maskCtx.fillStyle = 'yellow';
      //   maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      
      //   ctx.globalCompositeOperation = 'destination-in';
      //   ctx.drawImage(maskCanvas, 0, 0);
      
      //   // Convert the masked canvas to a data URL
      //   const maskedDataURL = canvas.toDataURL();
        
      //   // Reset composite operation
      //   ctx.globalCompositeOperation = 'source-over';
      
      //   // Log the masked data URL to the console
      //   console.log('Masked Canvas Data URL:', maskedDataURL);
      // };

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
      {/* <button onClick={applyMask}>Apply Mask</button> */}
    </div>
  );
};

export default AfterCanvasContainer;
