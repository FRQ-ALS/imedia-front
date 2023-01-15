import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CustomTextField from "../TextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";

import "./PasswordCard.css";

export default function PasswordCard(props) {
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [fieldVariant, setFieldVariant] = useState("");

  const handleSubmit = (e) => {

    if (!checkPassword(password, retype)) {
      setFieldVariant("error");
      setTimeout(() => {
        setFieldVariant("");
      }, 1000);
      return;
    }

    setFieldVariant("success");
    props.onSetPassword(password)
    
    setTimeout(()=>{
        props.onSetActiveStage(3)
    },1000)


  };

  function checkPassword(pass1, pass2) {
    if (pass1 === pass2) {
      return true;
    }

    return false;
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

  };

  const handleRetypeChange = (e) => {
    setRetype(e.target.value);
  };

  return (
    <div>
      <div
       id="passwordCardContainer"
      >
        <CustomTextField
          onChange={handlePasswordChange}
          className="textfield"
          type="password"
          variant={fieldVariant}
          placeholder="Enter a password"
        />
        <CustomTextField
          onChange={handleRetypeChange}
          className="textfield"
          type="password"
          variant={fieldVariant}
          placeholder="Confirm your password"
        />
           <CustomButton
        id="passwordSubmitButton"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        > Submit
          {/* <SendIcon /> */}
        </CustomButton>
      </div>
    </div>
  );
}
