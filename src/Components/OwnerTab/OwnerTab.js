import React, { useState, useEffect } from "react";

import "./OwnerTab.css";

export default function OwnerTab(props) {
  const [profileImage, setProfileImage] = useState([]);

  // // Note for future self: important to use async await as you do not want to
  // // create an ObjectURL before the image has been loaded

  // const fetchImage = async () => {
  //   var jwt = localStorage.getItem("jwt");
  //   var imageURL;

  //   const response = await fetch("/api/v1/images/download/" + 1, {
  //     credentials: "include",
  //     method: "GET",
  //     headers: { Authorization: "Bearer " + jwt },
  //   });

  //   const imageBlob = await response.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);

  //   setProfileImage(imageObjectURL);
  // };

  // useEffect(() => {
  //   fetchImage();
  // }, []);

  return (
    <div>
      <div variant="outlined" id="profile-container">
        <div className="icon">
          <img className="icon" src={props.imageURL}></img>
        </div>
        <h1 id="profile-name">{props.displayName}</h1>
      </div>
    </div>
  );
}
