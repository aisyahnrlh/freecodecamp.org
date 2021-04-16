import React, { useState, useContext } from 'react';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [display, setDisplay] = useState(String.fromCharCode(160));

    return <AppContext.Provider value={{ display, setDisplay }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
