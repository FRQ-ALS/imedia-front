import React, {useNavigate} from "react";

import { Paper, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./DashboardBar.css";

export default function DashboardBar(props) {
  const handleAddItemClick = (e) => {};

  return (
    <Paper className="bar-container">
      <Button
        onClick={handleAddItemClick}
        className="button"
        variant="contained"
      >
        <AddCircleOutlineIcon />
      </Button>
    </Paper>
  );
}
