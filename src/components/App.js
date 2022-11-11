import React, { useEffect, useCallback, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../assets/theme";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";

import { clearMessage } from "../services/actions/message";

import { history } from "../helpers/history";

import { logout } from "../services/actions/auth";
import AuthVerify from "../common/AuthVerify";

const PreviewDocument = lazy(() => import("./PreviewDocument"));
const Header = lazy(() => import("./Header"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const Repair = lazy(() => import("../pages/Repair"));
const Warranty = lazy(() => import("../pages/Warranty"));
const WarrantyCheck = lazy(() =>
    import("../pages/Warranty/pages/WarrantyCheck")
);
const WarrantyCheckDetail = lazy(() =>
    import("../pages/Warranty/pages/WarrantyCheckDetail")
);
const LogIn = lazy(() => import("../pages/Login"));
const Permission = lazy(() => import("../pages/ManagePermission"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
            pathname: `/warranty`,
            element: <Warranty />,
        },
        {
            pathname: `/register`,
            element: <Register />,
        },
        {
            pathname: "/404",
            element: <NotFound />,
        },
        {
            pathname: "*",
            element: <Navigate replace to="/404" />,
        },
        {
            pathname: `/manage-permission/*`,
            element: <Permission />,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                {currentUser ? (
                    <Header logOut={logOut} currentUser={currentUser} />
                ) : (
                    ""
                )}
                <Routes>
                    {currentUser === null ? (
                        <>
                            <Route exact path="/" element={<LogIn />} />
                            <Route exact path="/login" element={<LogIn />} />
                            <Route
                                exact
                                path={`/repair-document/:id`}
                                element={<PreviewDocument />}
                            />
                            <Route
                                exact
                                path={`/warranty-check`}
                                element={<WarrantyCheck />}
                            />
                            <Route
                                exact
                                path={`/warranty-check-detail`}
                                element={<WarrantyCheckDetail />}
                            />
                            <Route
                                exact
                                path={`/forgot-password`}
                                element={<ForgotPassword />}
                            />
                            <Route
                                exact
                                path={`/reset-password`}
                                element={<ResetPassword />}
                            />
                            <Route path="/404" element={<NotFound />} />
                            <Route
                                path="*"
                                element={<Navigate replace to="/404" />}
                            />
                            <Route
                                path={`/repair-document/*`}
                                element={<Navigate replace to="/404" />}
                            />
                            <Route
                                path={`/forgot-password/*`}
                                element={<Navigate replace to="/404" />}
                            />
                        </>
                    ) : (
                        <>
                            {routeMapping?.map((index) => {
                                return (
                                    <React.Fragment key={index.pathname}>
                                        {index.pathname === "*" ? (
                                            <Route
                                                path={index.pathname}
                                                element={index.element}
                                            />
                                        ) : (
                                            <Route
                                                exact
                                                path={index.pathname}
                                                element={
                                                    <Box
                                                        sx={{ display: "flex" }}
                                                    >
                                                        <Box
                                                            component="main"
                                                            sx={{
                                                                backgroundColor:
                                                                    (theme) =>
                                                                        theme
                                                                            .palette
                                                                            .mode ===
                                                                        "light"
                                                                            ? theme
                                                                                  .palette
                                                                                  .grey[100]
                                                                            : theme
                                                                                  .palette
                                                                                  .grey[900],
                                                                flexGrow: 1,
                                                                height: "100vh",
                                                                overflow:
                                                                    "auto",
                                                            }}
                                                        >
                                                            <Container
                                                                maxWidth={
                                                                    index.pathname ===
                                                                    "xl"
                                                                }
                                                                sx={{
                                                                    mt: 4,
                                                                    mb: 4,
                                                                }}
                                                            >
                                                                {index.element}
                                                            </Container>
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </>
                    )}
                    {/* <Route path="/user" component={BoardUser} />
                            <Route path="/mod" component={BoardModerator} />
                        <Route path="/admin" component={BoardAdmin} /> */}
                </Routes>
                <AuthVerify logOut={logOut} />
            </Router>
        </ThemeProvider>
    );
};

export default App;
