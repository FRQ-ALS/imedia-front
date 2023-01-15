import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectTaskBar.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default function ProjectTaskBar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false)

  const navigate = useNavigate()

  const handleAddButton = () => {
    navigate("/new")
  };

  const handleSearchButton = () => {
    setSearchOpen(!searchOpen)
  };

  return (
    <div id="mainContainer">
      <div id="taskbar-container">
        <SearchIcon onClick={handleSearchButton} id="search" className="true" />
        {searchOpen ? <input id="input"></input> : null}
        <AddIcon onClick={handleAddButton} className="button" />
      </div>
      </div>
  );
}
