import React, { useEffect, useRef } from "react";

const AfterCanvasContainer = ({ handleClick}) => {
  const canvasRef2 = useRef(null);
  const isDrawing = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });
  const endPosition = useRef({ x: 0, y: 0 });
  const rectangles = useRef([]); 

  useEffect(() => {
    const canvas = canvasRef2.current;
    const ctx = canvas.getContext('2d');

    // Function to draw all rectangles
    const drawRectangles = () => {
      rectangles.current.forEach(rect => {
        ctx.fillStyle = 'black';
        ctx.fillRect(rect.startX, rect.startY, rect.width, rect.height);
      });
    };

    document.getElementById('fileInput').addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawRectangles(); 
        };
        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    });

    const startDrawing = (event) => {
      isDrawing.current = true;
      startPosition.current = { x: event.clientX - canvas.getBoundingClientRect().left, y: event.clientY - canvas.getBoundingClientRect().top };
    };

    const drawRectangle = (event) => {
      if (isDrawing.current) {
        endPosition.current = { x: event.clientX - canvas.getBoundingClientRect().left, y: event.clientY - canvas.getBoundingClientRect().top };
        const width = endPosition.current.x - startPosition.current.x;
        const height = endPosition.current.y - startPosition.current.y;

        drawRectangles(); // Draw existing rectangles

        ctx.fillStyle = 'black';
        ctx.fillRect(startPosition.current.x, startPosition.current.y, width, height);

        // Log start and end positions
        // console.log("Start Position:", startPosition.current);
        // console.log("End Position:", endPosition.current);
      }
    };

    const stopDrawing = () => {
      if (isDrawing.current) {
        isDrawing.current = false;
        handleClick(startPosition.current.x,startPosition.current.y, endPosition.current.x, endPosition.current.y);
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', drawRectangle);
    canvas.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', drawRectangle);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, []);

  return (
    <div className="canvas-container">
      <label className="title">After</label>
      <canvas id="canvas2" ref={canvasRef2} width={500} height={500}></canvas>
    </div>
  );
};

export default AfterCanvasContainer;
