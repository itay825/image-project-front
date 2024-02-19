import React from 'react';
import { FaUndo, FaRedo } from "react-icons/fa";
import '../css/MiddleBoxCss.css';

const MiddleBox = ({ onUndo, onRedo }) => {

  return (
    <div className="middle-box">
      <div className="undo-container">
        <button className="undo-button" onClick={onUndo}>Undo</button>
        <FaUndo className="arrow-icon" />
      </div>
      <div className="redo-container">
        <button className="undo-button" onClick={onRedo}>Redo</button>
        <FaRedo className="arrow-icon" />
      </div>
    </div>
  );
};

export default MiddleBox;