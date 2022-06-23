import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Repairs from "../pages/Repairs";
import LogIn from "../pages/Login";

import { clearMessage } from "../services/actions/message";
import { history } from "../helpers/history";

// import theme from "../assets/theme";
const theme = createTheme();

const App = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                <div>
                        <Header
                            currentUser={currentUser}
                        />

                    <div className="container mt-3">
                        <Routes>
                            <Route exact path="/" element={<Dashboard />} />
                            <Route
                                exact
                                path="/dashboard"
                                element={<Dashboard />}
                            />
                            <Route exact path="/login" element={<LogIn />} />
                            <Route
                                exact
                                path="/profile"
                                element={<Profile />}
                            />
                            <Route
                                exact
                                path="/repairs"
                                element={<Repairs />}
                            />
                            {/* <Route path="/user" component={BoardUser} />
                            <Route path="/mod" component={BoardModerator} />
                            <Route path="/admin" component={BoardAdmin} /> */}
                        </Routes>
                    </div>

                    {/* <AuthVerify logOut={logOut}/> */}
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
