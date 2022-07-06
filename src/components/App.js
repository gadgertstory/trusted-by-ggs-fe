import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../assets/theme";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Repair from "../pages/Repair";
import LogIn from "../pages/Login";

import { clearMessage } from "../services/actions/message";
import { history } from "../helpers/history";

const App = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const routeMapping = [
        {
            pathname: "/",
            element: <Dashboard />,
        },
        {
            pathname: "/profile",
            element: <Profile />,
        },
        {
            pathname: "/repair/*",
            element: <Repair />,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                {currentUser ? <Header currentUser={currentUser} /> : ""}
                <Routes>
                    {currentUser === null ? (
                        <>
                            <Route exact path="/login" element={<LogIn />} />
                            <Route exact path="*" element={<LogIn />} />
                        </>
                    ) : (
                        <>
                            {routeMapping.map((index) => {
                                return (
                                    <Route
                                        key={index.pathname}
                                        exact
                                        path={index.pathname}
                                        element={
                                            <Box sx={{ display: "flex" }}>
                                                <Box
                                                    component="main"
                                                    sx={{
                                                        backgroundColor: (
                                                            theme
                                                        ) =>
                                                            theme.palette
                                                                .mode ===
                                                            "light"
                                                                ? theme.palette
                                                                      .grey[100]
                                                                : theme.palette
                                                                      .grey[900],
                                                        flexGrow: 1,
                                                        height: "100vh",
                                                        overflow: "auto",
                                                    }}
                                                >
                                                    <Container
                                                        maxWidth="lg"
                                                        sx={{ mt: 4, mb: 4 }}
                                                    >
                                                        {index.element}
                                                    </Container>
                                                </Box>
                                            </Box>
                                        }
                                    />
                                );
                            })}
                        </>
                    )}
                    {/* <Route path="/user" component={BoardUser} />
                            <Route path="/mod" component={BoardModerator} />
                        <Route path="/admin" component={BoardAdmin} /> */}
                </Routes>
                {/* <AuthVerify logOut={logOut}/> */}
            </Router>
        </ThemeProvider>
    );
};

export default App;
