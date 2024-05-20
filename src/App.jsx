import React, { useState, useEffect } from "react";
import TopBar from './comp/TopBar'; 
import BeforeCanvasContainer from './comp/BeforeCanvasContainer';
import AfterCanvasContainer from './comp/AfterCanvasContainer';
import BottomBar from './comp/BottomBar';
import MiddleBox from './comp/MiddleBox';
import Paint from './comp/Paint';
import './css/CanvasConCss.css'
import './App.css';
import { useUser } from './comp/UserContext';

const App = () => {
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
  const [paintMode, setPaintMode] = useState(false);
  // const { loggedInUser } = useUser(); // Check the useUser hook here

  const handlePaintModeToggle = () => {
    setPaintMode((prevMode) => !prevMode);
  };
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


  const sendImageToServer = async (dataURL, startX, startY, endX, endY ) => {
    const apiUrl = 'https://localhost:5000/process_image';
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    };
  
    console.log('Sending data to server:', { dataURL, startX, startY, endX, endY });
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({dataURL , startX, startY, endX, endY}),
    });
  
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} - ${response.statusText}`);
    }
  
    console.log('Received response from server:', response);
  
    const data = await response.blob();
  
    console.log('Received image data from server:', data);
  
    const blob = new Blob([data], { type: 'image/png' });
    const imgUrl = URL.createObjectURL(blob);
  
    return imgUrl;
  };
  

  const drawCanvas = (canvasId, imgUrl) => {
    const canvas = document.getElementById(canvasId);
    const img = new Image();
    img.onload = function () {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      console.log('Image displayed on canvas successfully');
    };
    img.src = imgUrl;
  };

  const handleCanvasUpdate = (imgUrl) => {
    setCanvasHistory((prevHistory) => [
      ...prevHistory.slice(0, currentCanvasIndex + 1),
      imgUrl
    ]);
    setCurrentCanvasIndex((prevIndex) => prevIndex + 1);
  };

const updateCanvasFromCanvas2 = (index) => {
  const canvas = document.getElementById('canvas');

  // Draw the last image in canvas2 onto canvas
  if (index > 0) {
    drawCanvas('canvas', canvasHistory[index - 1]);
  } else {
    // If there is no previous image in canvas2, clear canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

const handleUndo = () => {
  if (currentCanvasIndex > 0) {
    const prevIndex = currentCanvasIndex - 1;
    setCurrentCanvasIndex(prevIndex);
    drawCanvas('canvas2', canvasHistory[prevIndex]);
    updateCanvasFromCanvas2(prevIndex);
  }
};

const handleRedo = () => {
  if (currentCanvasIndex < canvasHistory.length - 1) {
    const nextIndex = currentCanvasIndex + 1;
    setCurrentCanvasIndex(nextIndex);
    drawCanvas('canvas2', canvasHistory[nextIndex]);
    updateCanvasFromCanvas2(nextIndex);
  }
};

const handleClick = async (startX, startY, endX, endY) => {
  try {
    const canvas = document.getElementById('canvas2');
    const dataURL = canvas.toDataURL("image/png");

    // Send canvas image data, rectangle coordinates, start, and end coordinates to the server
    const imgUrl = await sendImageToServer(dataURL, startX, startY, endX, endY);

    drawCanvas('canvas2', imgUrl);

    // Update canvas to be canvas2 -1
    if (currentCanvasIndex > 0) {
      drawCanvas('canvas', canvasHistory[currentCanvasIndex - 1]);
    }

    handleCanvasUpdate(imgUrl);

  } catch (error) {
    console.error('Error:', error.message || error);
  }
};

  useEffect(() => {
    return () => {
      setCanvasHistory([]);
    };
  }, []);

  // console.log('loggedInUser:', loggedInUser); // Add this console log to check loggedInUser

  return (
    <div>
      <TopBar handleDownload={downloadCanvasImage} />
      <div className="mainBody">
        <BeforeCanvasContainer handleClick={handleClick} />
        <div>
          <MiddleBox onUndo={handleUndo} onRedo={handleRedo} />
          <Paint handleClick={handlePaintModeToggle}/>
        </div>
        <AfterCanvasContainer handleClick={handleClick} paintMode={paintMode} />
      </div>
      <BottomBar handleClick={handleClick} />

    </div>
  );
};

export default App;
