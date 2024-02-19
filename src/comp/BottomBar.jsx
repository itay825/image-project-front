import React from "react";
import '../css/BottomBarCss.css';

const BottomBar = ({ handleClick }) => {
  return (
    <div className="Bottom-bar">
        <div onClick={() => handleClick('Image Sharpening')}>Image Sharpening</div>
        <div onClick={() => handleClick('Image Blurring')}>Image Blurring</div>
        <div onClick={() => handleClick('Color Grayscale')}>Color Grayscale</div>
        <div onClick={() => handleClick('Color Inversion')}>Color Inversion</div>
        <div onClick={() => handleClick('Rotation')}>Rotation</div>
        <div onClick={() => handleClick('Scaling')}>Scaling</div>
        <div onClick={() => handleClick('Binary Thresholding')}>Binary Thresholding</div>
        <div onClick={() => handleClick('Adaptive Thresholding')}>Adaptive Thresholding</div>
    </div>
  );
};

export default BottomBar;