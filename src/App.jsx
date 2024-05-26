import React, { useState, useEffect } from "react";
import TopBar from './comp/TopBar'; 
import BeforeCanvasContainer from './comp/BeforeCanvasContainer';
import AfterCanvasContainer from './comp/AfterCanvasContainer';
import Paint from './comp/Files';
import './css/CanvasConCss.css'
import './App.css';
import User from './comp/ForUser';

const App = () => {

  return (
    <div>
      <TopBar/>
      <div className="mainBody">
        <BeforeCanvasContainer />
        <div>
          <Paint/>
        </div>
        <AfterCanvasContainer  />
      </div>
      <User />
    </div>
  );
};

export default App;
