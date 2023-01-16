import { createTheme } from "@mui/material";

const theme = createTheme({

palette : {
    primary: {
        main: "rgb(9, 19, 121)",
        mainGradient: "linear-gradient(63deg,rgba(9, 19, 121, 1) 0%,rgba(6, 27, 163, 1) 21%,rgba(0, 44, 255, 1) 100%)"
        
    },
    secondary: {
        main: "#FBEAEB",
        contrastText: "#2F3C7E"
    },
    background: {
        // default: "#121212"
        default: "#FFFFFF"
        //nice blue color 143745
      },

}


});

export default theme