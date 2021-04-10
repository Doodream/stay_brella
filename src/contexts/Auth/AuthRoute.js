import React from "react"
import { Route, Redirect } from "react-router-dom"

import AuthContext from './AuthContext.js';

const AuthRoute = ({ component: Component, render, ...rest }) => {
    const { isAuthenticated } = React.useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    render ? render(props) : <Component {...props} />
                ) : (
                        <Redirect
                            to={{ pathname: "/login", state: { from: props.location } }}
                        />
                    )
            }
        />
    )
}

export default AuthRoute;