"use client"
import { createContext, useState } from "react";

// create a context -->
export const authContext = createContext(null);
// create a context provider-->
export const AuthProvider = (props) => {
    //handle that's user is auth is not--->
    const [isAuth, setAuth] = useState(false);
    return <>
        <authContext.Provider value={{ isAuth, setAuth }}>
            {props.children}
        </authContext.Provider>

    </>
} 