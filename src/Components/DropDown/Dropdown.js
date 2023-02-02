import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./Dropdown.css";

export default function Dropdown(props) {
  const id = "dropDown " + props.id;

  const [itemsEnabled, setItemsEnabled] = useState(false);

  const items = props.items;

  return (
    <div  onMouseOver={event=>setItemsEnabled(true)} onMouseLeave={event=>setItemsEnabled(false)}  id={id}>
      <div id="dropDownTitle">
        <KeyboardArrowDownIcon />
        Subjects
      </div>
      {itemsEnabled ? (
        <div id="itemsContainer">
          {items.map((item) => (
            <div onClick={event=> console.log(item)} id="dropDownItem">{item}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
