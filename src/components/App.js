import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/index";
import SignIn from "../pages/SignIn/index";
import Repairs from "../pages/Repairs";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// import theme from "../assets/theme";

const theme = createTheme();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<SignIn />} />
                    <Route exact path="/repairs" element={<Repairs />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
