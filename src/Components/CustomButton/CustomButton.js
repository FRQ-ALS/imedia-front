import React from "react";
import "./CustomButton.css";

export default function CustomButton(props) {
  const className = `defaultButton ${props.className}`


  return <button name={props.name} id={props.id} onClick={props.onClick} className={className}>{props.children}</button>;
}
