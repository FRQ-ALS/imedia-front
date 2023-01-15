import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

import "./NotificationBell.css";

export default function NotificationBell(props) {
  const [unreadNotifications, setNotifications] = useState(1);

  return (
    <div id="notificationBellContainer" onClick={props.onClick}>
      <NotificationsIcon id="bellIcon" />
      {unreadNotifications != 0 ? (
        <div id="redDot">{unreadNotifications}</div>
      ) : null}
    </div>
  );
}
