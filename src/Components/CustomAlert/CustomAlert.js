import React from "react";
import "./CustomAlert.css";
import useAlert from "../../Hooks/AlertHook"; 

export default function CustomAlert(props) {

  const {text, type} = useAlert()

  const id = "alert " + props.id;

  return (
    <>
      {text ? (
        <div id="alert" className={type}>
          {text}
        </div>
      ) : null}
    </>
  );
}
