import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomButton from "../CustomButton/CustomButton";
import useAlert from "../../Hooks/AlertHook";

import "./VerificationCard.css";

export default function VerificationCard(props) {
  const [userLocked, setUserLocked] = useState(true);
  const {setAlert} = useAlert()


  const handleContinue =() =>{
    var email = props.email;
    fetch("api/v1/account/checkVerified/" + email, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {

      if (response.ok) {
        response.json().then((responseJson) => {
          console.log(responseJson)
          localStorage.setItem("jwt", responseJson.jwt);
        });
        setUserLocked(false);
        setTimeout(() => {
          props.onSetActiveStage(4);
        }, 2000);
      }
      if(!response.ok){
        setAlert("Please verify your email address before continuing", "error")
      }
    });
  }

  const handleResendEmail =(e) =>{

    let email = props.email;
    fetch(`/api/v1/account/resendConfirmationEmail/${email}`,{
      credentialsc:"indlude",
      method:"POST",
    }).then((response) => {
      if(response.ok){
        setAlert("New confirmation email sent.")
      }
    })

  }

  function isUserLocked() {
    switch (userLocked) {
      case true:
        return (
          <div
          id="verificationContainer"
        >A verification email has been sent to {props.email}. Please click on the attached link to verify your account and then press continue below to resume.
          <div id="verificationButtonsContainer">
          <CustomButton onClick={handleContinue} className="verificationButton">Continue</CustomButton>
          <CustomButton onClick={handleResendEmail} className="verificationButton">Resend Email</CustomButton>
          </div>
        </div>
        );

      case false:
        return (
          <div className="confirmed-container">
            <CheckCircleIcon className="tick"></CheckCircleIcon>
          </div>
        );
    }
  }

  return (
    <div>
          {isUserLocked()}
    </div>
  );
}
