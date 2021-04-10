import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: null,
    authUser: {},
    login: () => { },
    logout: () => { },
    signUp: () => { },
}); // Create a context object

export default AuthContext;