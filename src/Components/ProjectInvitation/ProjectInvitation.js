import React, { useEffect, useState } from "react";

import "./ProjectInvitation.css";
import CustomTextField from "../TextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";

// background-color: #2c2e33;



export default function ProjectInvitation(props) {
  const [buttonSelected, setButtonSelected] = useState(null);

  const handlePromptButton = (e) => {
    let x = e.target.name;
    switch (x) {
      case "Yes":
        setButtonSelected("Yes");
        setInvitation({...invitation, inviteToggled: true})
        break;
      case "No":
        setButtonSelected("No");
        setInvitation({...invitation, inviteToggled: false})
        
    }
  };

  const [invitation, setInvitation] = useState({
    inviteToggled: false,
    expiry: "",
    maximumUses: "",
  });

  const handleDate = (e) => {
    setInvitation({...invitation, expiry: e.target.value})
  };

  const handleMaxNumber = (e) => {
    setInvitation({...invitation, maximumUses: e.target.value})
  };


  useEffect(()=>{

    props.onSetInvitation(invitation)

  }, [invitation])

  return (
    <div id="invitationcontainer">
      <div id="promptcontainer">
        <p1 id="text">Would you like to generate an invitation link?</p1>
        <CustomButton
          onClick={handlePromptButton}
          name="Yes"
          id="button"
          className={buttonSelected === "Yes" ? "selected" : ""}
        >
          Yes
        </CustomButton>
        <CustomButton
          onClick={handlePromptButton}
          name="No"
          id="button"
          className={buttonSelected === "No" ? "selected" : ""}
        >
          No
        </CustomButton>
      </div>

      {buttonSelected === "Yes" ? (
        <div id="invFormContainer">
          <div id="expiryContainer">
            <label id="text" for="birthday">
              Set invite expiry date:
            </label>
            <input
              onChange={handleDate}
              type="date"
              id="expiryday"
              name="expiryday"
            />
          </div>

          <div id="expiryContainer">
            <label id="text" for="birthday">
              Set maximum uses: 
            </label>
            <CustomTextField
              onChange={handleMaxNumber}
              className="uses"
              type="number"
            ></CustomTextField>
          </div>
        </div>
      ) : null}
    </div>
  );
}
