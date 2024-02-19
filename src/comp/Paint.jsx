import React, { } from 'react';
import '../css/PaintCss.css';
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { FaArrowRightLong } from "react-icons/fa6";

const Paint = ({ handleClick }) => {
  return (
    <div className="button-container">
        <button className="paintbrush-button"><HiOutlinePaintBrush /></button>
        <FaArrowRightLong className='right-icon'/>
        <button className="inpainting-button">Image Inpainting</button>
    </div>
  );
};

export default Paint;