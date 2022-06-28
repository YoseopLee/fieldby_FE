import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Spinner from "../Components/Common/Spinner";
import { authService } from "../fBase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function login(email, password) {
        return signInWithEmailAndPassword(
            authService,
            email,
            password
        )
    }

    useEffect(() => {
        const getUserData = authService.onAuthStateChanged((user) => {
            setLoading(false);
            setCurrentUser(user);
        })
        return getUserData
    }, [])


    const value = {
        currentUser,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="spinner-cm-main">
                    <Spinner />
                </div>
            ) : (
                <div>
                    {children}
                </div>
            )}
        </AuthContext.Provider>
    )
}