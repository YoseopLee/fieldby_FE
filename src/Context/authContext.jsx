import React, { useContext } from "react";

export const AuthContext = React.createContext();

export const useFireBase = () => {
    const firebaseContext = useContext(AuthContext);
        if (firebaseContext === undefined) {
            throw new Error (
                "useFirebase must be used within a FirebaseContext.Provider"
            );
        }
}