"use client"
import { createContext,useState } from "react";

export const authContext= createContext(null);

export const AuthProvider=(props)=>{
    const [isAuth,setAuth]=useState(false);
    return <>
        <authContext.Provider value={{isAuth, setAuth }}>
            {props.children}
        </authContext.Provider>
    
    </>
} 