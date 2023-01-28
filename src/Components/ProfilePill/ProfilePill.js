import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/AuthHook";
import NotificationBell from "../NotificationBell/NotificationBell";
import "./ProfilePill.css";
import CustomButton from "../CustomButton/CustomButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Navigate, useNavigate } from "react-router-dom";


const menuItems = ["Profile", "Settings", "Dashboard", "Log out"];

export default function ProfilePill(props) {
  const [menuDrawn, setMenuDrawn] = useState(false);
  const [unreadNotifications, setNotifications] = useState(1);
  const [profileImage, setProfileImage] = useState([]);
  const { setAuth, user } = useAuth();
  const navigate = useNavigate()

  const handleMenuDraw = (e) => {
    setMenuDrawn(!menuDrawn);
  };

  const handleNotiClick = (e) => {
    props.onToggleNotiTray();
  };



  const handleButtonClick = (e, button) => {
    if (button === "Log out") {
      localStorage.setItem("loggedIn", false);
      setAuth(false);
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login")
    }
  };

  // Note for future self: important to use async await as you do not want to
  // create an ObjectURL before the image has been loaded

  // const fetchImage = async () => {
  //   var jwt = localStorage.getItem("jwt");
  
  //   const response = await fetch("/api/v1/images/getProfileImage", {
  //     credentials: "include",
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${jwt}` },
  //   });

    

  //   const imageBlob = await response.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);
  //   setProfileImage(imageObjectURL);
  // };

  // useEffect(() => {
  //   fetchImage();
  // }, []);


  function renderMenuItems() {
    return (
      <div id="profilePillMenu">
        {menuItems.map((item, index) => (
          <CustomButton
            key={index}
            onClick={(event) => handleButtonClick(event, item)}
            id="profilePillMenuItem"
          >
            {item}
          </CustomButton>
        ))}
      </div>
    );
  }

  return (
    <div id="userProfileContainer">
      {menuDrawn ? renderMenuItems() : null}
      <div
        onClick={handleMenuDraw}
        variant="outlined"
        id="profilePillContainer"
      >
        <MoreVertIcon />
        <img id="profilePicture" src="https://fastly.picsum.photos/id/913/200/200.jpg?hmac=MQWqYyJuxoagkUNdhY5lwuKw7QwcqzMEm4otshKpUWQ"></img>
        <h1 id="profileName">
          {user === null
            ? ""
            : user.firstName + " " + user.lastName}
        </h1>
      </div>
      <NotificationBell onClick={handleNotiClick}></NotificationBell>
    </div>
  );
}
