import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import blue from "@mui/material/colors/blue";
import yellow from "@mui/material/colors/yellow";
import green from "@mui/material/colors/green";
import lightBlue from "@mui/material/colors/lightBlue";
import grey from "@mui/material/colors/grey";
import blueGrey from "@mui/material/colors/blueGrey";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: blue[500],
            light: blue[400],
            dark: blue[800],
            contrastText: grey[50],
        },
        secondary: {
            light: blueGrey[500],
            main: blueGrey[700],
            dark: blueGrey[900],
            contrastText: grey[50],
        },
        error: {
            light: blueGrey[400],
            main: blueGrey[500],
            dark: blueGrey[300],
            contrastText: grey[800],
        },
        success: {
            main: green[500],
        },
        warning: {
            main: yellow[500],
            contrastText: grey[800],
        },
        info: {
            main: lightBlue[500],
        },
        text: {
            primary: grey[900],
            secondary: grey[700],
            disabled: grey[500],
        },
        action: {
            active: blueGrey[200],
            activeOpacity: 1,
            disabled: grey[700],
            disabledBackground: grey[200],
            hover: blueGrey[100],
            hoverOpacity: 0.7,
            focus: blueGrey[600],
            focusOpacity: 1,
            selected: blueGrey[300],
            selectedOpacity: 1,
        },
        background: {
            default: "white",
            paper: grey[100],
        },
        common: {
            black: grey[900],
            white: grey[200],
        },
        tonalOffset: 0.2,
    },
});

export default theme;
