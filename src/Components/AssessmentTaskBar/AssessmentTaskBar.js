import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./AssesskentTaskBar.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from 'uuid';

export default function AssessmentTaskBar() {
  const [searchOpen, setSearchOpen] = useState(false)

  const navigate = useNavigate()

  const handleAddButton = () => {
    const token = uuidv4()
    
    navigate(`/assessment-builder/${token}`)
  };

  const handleSearchButton = () => {
    setSearchOpen(!searchOpen)
  };

  return (
    <div id="mainContainer">
      <div id="taskBarContainer">
        <p id="draftsLabel">DRAFTS</p>
        <div id="iconsContainer">
        <SearchIcon onClick={handleSearchButton} id="search" className="true"/>
        {searchOpen ? <input id="input"></input> : null}
        <AddIcon onClick={handleAddButton} className="button" />
        </div>
      </div>
      </div>
  );
}
