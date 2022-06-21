import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header/index";
import SignIn from "../pages/SignIn/index";
import Repairs from "../pages/Repairs";
import { PrivateRoute } from "./Layout/PrivateRoute";
import { history } from "../helpers/history";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// import theme from "../assets/theme";

const theme = createTheme();
// const <Repairs/> = props;
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Header />
                <Routes history={history}>
                    <Route
                        // {...rest}
                        render={(props) => {
                            if (!localStorage.getItem("user")) {
                                // not logged in so redirect to login page with the return url
                                return (
                                    <Link
                                        to={{
                                            pathname: "/",
                                            // state: { from: props.location },
                                        }}
                                    />
                                );
                            }

                            // logged in so return component
                            return <element Repairs {...props} />;
                        }}
                    />
                    {/* <PrivateRoute exact path="/" element={<Repairs />} /> */}
                    <Route exact path="/" element={<SignIn />} />
                    <Route exact path="/repairs" element={<Repairs />} />
                    {/* <Link from="*" to="/" /> */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
