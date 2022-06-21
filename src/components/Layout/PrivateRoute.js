import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";

function PrivateRoute({ Element: element, roles, ...rest }) {
    useEffect = () => {
        console.log(element);
    };
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!localStorage.getItem("user")) {
                    // not logged in so redirect to login page with the return url
                    return (
                        <Link
                            to={{
                                pathname: "/",
                                state: { from: props.location },
                            }}
                        />
                    );
                }

                // logged in so return component
                return <element {...props} />;
            }}
        />
    );
}

export { PrivateRoute };
