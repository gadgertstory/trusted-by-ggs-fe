import { createTheme } from "@mui/material/styles";
import {
    blue,
    yellow,
    green,
    lightBlue,
    grey,
    red,
    teal,
} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: blue[500],
            light: blue[400],
            dark: blue[800],
            contrastText: grey[50],
        },
        secondary: {
            main: teal[700],
            light: teal[500],
            dark: teal[900],
            contrastText: grey[100],
        },
        error: {
            light: red[400],
            main: red[500],
            dark: red[300],
            contrastText: grey[700],
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
        // action: {
        //     active: teal[200],
        //     activeOpacity: 1,
        //     disabled: grey[700],
        //     disabledBackground: grey[200],
        //     hover: teal[100],
        //     hoverOpacity: 0.7,
        //     focus: teal[600],
        //     focusOpacity: 1,
        //     selected: teal[300],
        //     selectedOpacity: 1,
        // },
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
