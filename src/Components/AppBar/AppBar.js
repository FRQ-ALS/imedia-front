import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./AppBar.css";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import { useNavigate } from "react-router-dom";
import ProfilePill from "../ProfilePill/ProfilePill";
import NotificationTray from "../NotificationTray/NotificationTray";
import useAuth from "../../Hooks/AuthHook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CustomButton from "../CustomButton/CustomButton";
import Dropdown from "../DropDown/Dropdown";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BarChartIcon from "@mui/icons-material/BarChart";

const options = ["Science", "Maths", "English"];

export default function Appbar(props) {
  const [loginWindowToggle, setLoginWindowToggle] = useState(false);
  const [notiTrayToggle, setNotiTrayToggle] = useState(false);
  const [appBarExtended, setAppBarExtended] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  let navigate = useNavigate();

  const signInHandler = () => {
    navigate("/login");
  };

  const homePageHandler = () => {
    setSelectedButton("home")
    setAppBarExtended(false)
    navigate("/home");
  };

  const handleSideBarToggle = (e) => {
    setAppBarExtended(!appBarExtended);
  };

  const handleToggleNotiTray = () => {
    setNotiTrayToggle(!notiTrayToggle);
  };

  const behaviourPageHandler = (e) => {
    setSelectedButton("behaviour")
    setAppBarExtended(false);
    navigate("/behaviour");
  };

  return (
    <div
      className={appBarExtended ? "extended" : "retracted"}
      id="appBarContainer"
    >
      
      <div
        onClick={homePageHandler}
        style={{
          color: "white",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          fontFamily: "Tahoma",
          padding:'5px 2px',
        }}
        appBarHighlighted={selectedButton=="home" ? "yes" : null}
      >
        <HomeRoundedIcon />
        {appBarExtended ? "Home" : ""}
      </div>

      <div
        style={{
          color: "white",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          fontFamily: "Tahoma",
          padding:'5px 2px',
        }}
        onClick={behaviourPageHandler}
        appBarHighlighted={selectedButton=="behaviour" ? "yes" : null}

      >
        <BarChartIcon />
        {appBarExtended ? "Behaviour" : ""}
      </div>

      <div
        style={{ color: "white", cursor: "pointer", marginTop: "30px" }}
        onClick={handleSideBarToggle}
      >
        {appBarExtended ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
      </div>
    </div>
  );
}

{
  /* <div variant="regular" className="main">
        <div id="homeLabelContainer" className="home-container">
          <img
            onClick={homePageHandler}
            id="imediaImage"
            src="https://static.wixstatic.com/media/9f1b94_dda5cfa09f504547b66f237ad22c5106~mv2.png/v1/fill/w_385,h_192,al_c,lg_1,q_85,enc_auto/9f1b94_dda5cfa09f504547b66f237ad22c5106~mv2.png"
          ></img>
          <label id="imediaLabel">iMedia School Portal</label>
        </div>

        {!props.setLogin ? (
          <div className="login-container">
            <CustomButton id="signInButton" onClick={signInHandler}>
              SIGN IN
            </CustomButton>
          </div>
        ) : (
          <>
            <div id="linksContainer">
              <Dropdown id="dropDownAppBar" items={options} />
              <div id="link">Behaviour</div>
            </div>
            <ProfilePill onToggleNotiTray={handleToggleNotiTray} />
          </>
        )}
      </div> */
}

{
  /* <div className="notificationTrayWrapper">
        <NotificationTray
          show={notiTrayToggle}
          onClickOutSide={(event) => setNotiTrayToggle(false)}
        />
      </div> */
}
