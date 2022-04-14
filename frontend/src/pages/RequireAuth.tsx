import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { rootState } from "../redux/store";


function RequireAuth({children}:{children:JSX.Element}) {
    const location = useLocation(); 
    const {user} = useSelector((state: rootState) => state.user);
    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace/>
    }
    return children;
}

export default RequireAuth;