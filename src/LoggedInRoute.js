import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/authProvider";

export default function LoggedInRoute ({children}) {
    const {currentUser} = useAuth();
    return currentUser ? <Navigate to="/campaign"/> : children
}