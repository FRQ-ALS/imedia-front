import React from "react";
import "./TextField.css";

export default function CustomTextField(props) {
  const classes = "textfield " + props.className;

  return (
    <input
      id={props.id}
      onChange={props.onChange}
      value={props.value}
      defaultValue={props.defaultValue}
      type={props.type}
      className={classes}
      name={props.name}
      placeholder={props.placeholder}
    ></input>
  );
}
