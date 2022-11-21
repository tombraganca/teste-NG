import { Navigate, Route, RouteProps } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";

export function PrivateRoute({ element, ...rest }: RouteProps) {
    return <Route {...rest} element={element} />;
    console.log('entrei')
    if (isAuthenticated()) {
        return <Route {...rest} element={element} />;
    } else {
        return <Navigate to='/login' />;
    }

}