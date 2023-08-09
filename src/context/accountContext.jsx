import { createContext, useEffect, useState } from "react";

export const AccountContext = createContext();

export const AccountContextProvider = ({ children }) => {
    const [account, setAccount] = useState(null)

    useEffect(() => {
        const accountData = localStorage.getItem('accountData');
        if (accountData) {
            setAccount(JSON.parse(accountData));
        }
    }, []);

    return (
        <AccountContext.Provider value={{ account, setAccount}}>
            {children}
        </AccountContext.Provider>
    )
}