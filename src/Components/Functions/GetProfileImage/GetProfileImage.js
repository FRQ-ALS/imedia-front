import React, { useState } from "react";

export async function GetProfileImage(userid) {
  let jwt = localStorage.getItem("jwt");
  const response = await fetch(`/api/v1/images/getProfileImageById=${userid}`, {
    credentials: "include",
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  const imageBlob = await response.blob();
  return imageBlob;
}
