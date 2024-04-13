import React, { useState } from "react";
import '../css/TopBarCss.css';
import { IoMdDownload } from "react-icons/io";
import User from './ForUser';

const TopBar = ({ handleDownload }) => {
  return (
    <div className="Top-bar">
      <div className="Section">
        <label htmlFor="fileInput">Choose File:</label>
        <input type="file" id="fileInput" />
        <button onClick={handleDownload}><IoMdDownload /> Download</button>
        <User />
      </div>
    </div>
  );
};

export default TopBar;
