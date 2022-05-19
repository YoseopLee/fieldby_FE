import { useEffect, useState } from "react"
import { authService } from "../fBase";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserInfo = authService.onAuthStateChanged(fbUser => {
            // console.log('유저정보담기', fbUser);
            setUser(fbUser);
        });
        return getUserInfo;
    }, []);

    return <AuthContext.Provider value = {user}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;