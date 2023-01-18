import React, { useState } from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch(props) {
  const [toggleSwitch, setToggleSwitch] = useState(false);

  const handleToggle = (e) => {
    setToggleSwitch(!toggleSwitch);
    props.onSetToggle(toggleSwitch)
  };

  return (
    <div>
      <div id="housing" onClick={handleToggle}>
        <div
          id="switch"
          onClick={handleToggle}
          className={toggleSwitch ? "left" : "right"}
        ></div>
      </div>
    </div>
  );
}
