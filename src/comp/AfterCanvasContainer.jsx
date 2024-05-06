import React, { useEffect, useRef, useState } from "react";

const AfterCanvasContainer = () => {
  const canvasRef2 = useRef(null);
  const paintCanvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const brushSize = 25; // Updated brush size
  const canvasWidth = 500;
  const canvasHeight = 500;
  const rectangles = useRef([]);
  const [imageURL, setImageURL] = useState("");
  const [maskURL, setMaskURL] = useState("");

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

    const startDrawing = (event) => {
      isDrawing.current = true;
      const { x, y } = getPosition(event);
      lastPosition.current = { x, y };
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const continueDrawing = (event) => {
      if (isDrawing.current) {
        const { x, y } = getPosition(event);
        ctx.lineWidth = brushSize; // Set brush size
        ctx.lineTo(x, y);
        ctx.stroke();
        lastPosition.current = { x, y };
        // Paint on the paint canvas as well
        const paintCtx = paintCanvasRef.current.getContext('2d');
        paintCtx.fillRect(x, y, brushSize, brushSize);
      }
    };

    const stopDrawing = () => {
      if (isDrawing.current) {
        isDrawing.current = false;
        // handleClick();
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', continueDrawing);
    canvas.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', continueDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, [brushSize]);

  const getPosition = (event) => {
    const rect = canvasRef2.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const getImageURL = (canvas) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;
    const ctx = tempCanvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);
    return tempCanvas.toDataURL();
  };

  const getBinaryMaskURL = () => {
    const paintCanvas = paintCanvasRef.current;
    const ctx = paintCanvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;
    const offsetX = -10; // Adjust the offset to the left
    const offsetY = -12; // Adjust the offset higher
  
    // Create a binary mask with values 255 and 0
    for (let i = 0; i < data.length; i += 4) {
      const value = data[i] > 0 ? 255 : 0; // Check if the pixel is painted
      data[i] = data[i + 1] = data[i + 2] = value;
    }
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    // Put the modified image data back with an offset
    ctx.putImageData(imageData, offsetX, offsetY);
  
    return paintCanvas.toDataURL();
  };
  
  

  const handleExport = () => {
    console.log("Export button clicked");
  
    const canvas = canvasRef2.current;
    const imageURL = canvas.toDataURL();
    
    const paintCanvas = paintCanvasRef.current;
    const maskURL = getBinaryMaskURL(); // Using the getBinaryMaskURL function
    
    console.log("Image URL:", imageURL);
    console.log("Mask URL:", maskURL);
    
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;
    const tempCtx = tempCanvas.getContext("2d");
  
    // Draw the original image on the temporary canvas
    const originalImage = new Image();
    originalImage.onload = function () {
      tempCtx.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
  
      // Draw the painted areas on top of the original image
      const paintedImage = new Image();
      paintedImage.onload = function () {
        tempCtx.drawImage(paintedImage, 0, 0, canvasWidth, canvasHeight);
        
        // Get the data URL of the composite image (original + painted)
        const compositeImageURL = tempCanvas.toDataURL();
  
        // Send the composite image URL and the mask URL to the server
        fetch('http://localhost:5000/process_image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dataURL: compositeImageURL, maskDataURL: maskURL }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to process image');
          }
          return response.blob();
        })
        .then(blob => {
          console.log("Received image data from server:", blob);
          // Process the image blob data here
          const img = new Image();
          img.onload = function () {
            canvas.getContext('2d').clearRect(0, 0, canvasWidth, canvasHeight);
            paintCanvas.getContext('2d').clearRect(0, 0, canvasWidth, canvasHeight);
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
          };
          img.src = URL.createObjectURL(blob);
        })
        .catch(error => {
          console.error('Error sending request to server:', error);
        });
      };
      paintedImage.src = imageURL; // Use the original image URL
    };
    originalImage.src = imageURL; // Use the original image URL
  };
  

  useEffect(() => {
    const canvas = canvasRef2.current;
    const paintCanvas = paintCanvasRef.current;
    paintCanvas.width = canvasWidth;
    paintCanvas.height = canvasHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef2.current;
    const ctx = canvas.getContext('2d');

    document.getElementById('fileInput').addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          // drawRectangles();
        };
        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    });
  }, []);

  return (
    <div className="canvas-container">
      <label className="title">After</label>
      <canvas id="canvas2" ref={canvasRef2} width={canvasWidth} height={canvasHeight}></canvas>
      <canvas ref={paintCanvasRef} style={{ display: "none" }}></canvas>
      <button onClick={handleExport}>Export & Clear</button>
    </div>
  );
};

export default AfterCanvasContainer;
