import { useState } from "react";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";
import { useContext } from "react";
import { AccountContext } from "../context/accountContext";

function MyRoutes() {
    const { account } = useContext(AccountContext)

    return(
        <>{account ? <PrivateRoutes /> : <PublicRoutes />}</>
    )
}

export default MyRoutes