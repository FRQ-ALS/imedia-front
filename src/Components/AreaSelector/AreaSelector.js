import React from "react";
import "./AreaSelector.css";

export default function AreaSelector() {
  var mouseDown;
  let offset = [0, 0];

  const handleMouseDown = (e) => {
    mouseDown = true;
    const areaSelector = document.getElementById("resizableRect");
    const areaSelectorRect = areaSelector.getBoundingClientRect();

    offset = [
      areaSelector.offsetLeft - e.clientX,
      areaSelector.offsetTop - e.clientY,
    ];
  };

  const handleMouseMove = (e) => {
    const areaSelector = document.getElementById("resizableRect");
    const areaSelectorRect = areaSelector.getBoundingClientRect();
    let height = areaSelectorRect.height;
    let width = areaSelectorRect.width;

    let top = areaSelectorRect.top;
    let left = areaSelectorRect.left;

    if (mouseDown) {
      areaSelector.style.left = e.clientX + offset[0] + "px";
      areaSelector.style.top = e.clientY + offset[1] + "px";
    }
  };

  const handleMouseUp = (e) => {
    mouseDown = false;
  };


  return (
    <div
    style={{left:0, top:0}}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      id="resizableRect"
    >
      <div id="left"></div>
      <div id="roofContainer">
        <div id="top"></div>
        <div id="bottom"></div>
      </div>
      <div id="right"></div>
    </div>
  );
}

//style={{ left: 0, top: 0, height: height, width: width }}
