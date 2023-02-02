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
import AssessmentPage from "./Components/AssessmentPage/AssessmentPage";
import LoginWindow from "./Components/LoginWindow/LoginWindow";
import CustomAlert from "./Components/CustomAlert/CustomAlert";
import useAuth from "./Hooks/AuthHook";
import PageRedirect from "./Components/PageRedirect/PagRedirect";
import BehaviourView from "./Components/BehaviourView/BehaviourView";




function App() {

  const {auth} = useAuth();


  return (
    <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar setLogin={auth} />
          <CustomAlert id="alert"/>
          <Routes>
            {auth===false ? <Route path="/*" element={<LoginWindow/>}/> : <>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/assessment-builder/:token" element={<AssessmentPage/>}/>
            <Route path="*" element={<PageRedirect/>}/>
            <Route path="/behaviour" element={<BehaviourView/>}/>

            </>
              }
          </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
