import React, { useState } from "react";


export const AppContext = React.createContext();
export const AppContextProvider = ({children}) => {
    const [userData, setUserData] = useState({});
    const [regEvents, setRegEvents] = useState([]);
    const [unregEvents, setUnregEvents] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");

    return (
        <AppContext.Provider value={{
            userData, 
            setUserData,
            regEvents,
            setRegEvents, 
            unregEvents,
            setUnregEvents,
            isLoggedIn, 
            setIsLoggedIn,
            open,
            setOpen,
            isAlertOpen,
            setIsAlertOpen,
            alertText,
            setAlertText,
            alertSeverity,
            setAlertSeverity
        }}>
            {children}
        </AppContext.Provider>
    );
}