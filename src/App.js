import "./App.css";
import { ThemeProvider } from "@mui/system";
import theme from "./Components/Theme/Theme";
import { Button } from "@mui/material";
import { useEffect } from "react";
import AppBar from "./Components/AppBar/AppBar";
import Dashboard from "./Components/Dashboard/Dashboard";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import EmailVerification from "./Components/EmailVerification/EmailVerification";
import ProjectView from "./Components/ProjectView/ProjectView";
import AddProjectPage from "./Components/AddProjectPage/AddProjectPage";
import JoinProjectCard from "./Components/JoinProjectCard/JoinProjectCard";
import LoginWindow from "./Components/LoginWindow/LoginWindow";
import CustomAlert from "./Components/CustomAlert/CustomAlert";
import useAuth from "./Hooks/AuthHook";



function App() {

  const {auth} = useAuth();


  return (
    <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar setLogin={auth} />
          <CustomAlert id="alert"/>
          <Routes>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/verify/:token" element={<EmailVerification/>}/>
            <Route exact path="/joinProject=:token" element={<JoinProjectCard/>}/>
            <Route exact path="/project/:id" element={<ProjectView/>}/>
            <Route exact path="/new:token" element={<AddProjectPage/>}/>
            <Route path="/login" element={<LoginWindow/>}/>
          </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
