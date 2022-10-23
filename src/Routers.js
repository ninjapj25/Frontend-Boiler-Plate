import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import AuthHelper from "./helpers/auth.js";

function Routers() {
    const routes = [
        {
            exact: true,
            path: "/register",
            Component: RegisterPage,
            layout: null,
            isPrivate: false,
        },
        { exact: true, path: "/login", Component: LoginPage, isPrivate: false },
        { exact: true, path: "/home", Component: HomePage, isPrivate: true },
    ];

    function getRedirectedPath(location) {
        if (
            location.pathname.split("?")[0] === "/login" &&
            location.pathname.split("?").length > 1
        ) {
            return location.pathname + location.search + location.hash;
        }

        // skip the redirection from these routes
        if (
            ["/login", "/callback/cas", "/logout"].indexOf(
                location.pathname.split("?")[0]
            ) !== -1
        ) {
            return "/login";
        }
        return `/login?path=${
            location.pathname + location.search + location.hash
        }`;
    }
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) => {
                if (AuthHelper.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: getRedirectedPath(props.location),
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );

    return (
        <Router>
            <Switch>
                {routes.map(({ Component, exact, path, isPrivate }) => {
                    if (isPrivate) {
                        return (
                            <PrivateRoute
                                key={path}
                                path={path}
                                exact={exact}
                                component={Component}
                            />
                        );
                    } else {
                        return (
                            <Route
                                exact={exact}
                                key={path}
                                path={path}
                                render={(props) => <Component {...props} />}
                            />
                        );
                    }
                })}
                <Route
                    render={(props) =>
                        AuthHelper.isAuthenticated() ? (
                            <Redirect to={"/home"} />
                        ) : (
                            <Redirect to={getRedirectedPath(props.location)} />
                        )
                    }
                />
            </Switch>
        </Router>
    );
}

export default Routers;
