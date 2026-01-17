import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Authentication/auth";
import { Children } from "react";

const ProtectedRoute = ({children}) => {
        if (!isAuthenticated()) {
            return <Navigate to={'/login'} replace/>
        }

    return children
};

export default ProtectedRoute;