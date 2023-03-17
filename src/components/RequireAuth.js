import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/>
            : auth?.email
                ? <Navigate to='/' state={{from: location}} replace/>
                : <Navigate to='/login' state={{from: location}} replace/>
    )
}

export default RequireAuth;