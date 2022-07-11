import React, { useEffect,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

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
import NotFound from "../pages/NotFound";

import { clearMessage } from "../services/actions/message";
import { history } from "../helpers/history";
import PrintDocument from "./PrintDocument";

import { logout } from "../services/actions/auth";
import AuthVerify from "../common/AuthVerify";

const App = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = useCallback(() => {
        dispatch(logout());
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
            pathname: `/repair/*`,
            element: <Repair />,
        },
        {
            pathname: "*",
            element: <NotFound />,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                {currentUser ? <Header logOut={logOut} currentUser={currentUser} /> : ""}
                <Routes>
                    {currentUser === null ? (
                        <>
                            <Route exact path="/" element={<LogIn />} />
                            <Route exact path="/login" element={<LogIn />} />
                            <Route
                                exact
                                path="/repair-document"
                                element={<PrintDocument />}
                            />
                            <Route path="*" element={<NotFound />} />
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
                                                        maxWidth={
                                                            index.pathname ===
                                                            "*"
                                                                ? "xl"
                                                                : "lg"
                                                        }
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
                <AuthVerify logOut={logOut}/>
            </Router>
        </ThemeProvider>
    );
};

export default App;
