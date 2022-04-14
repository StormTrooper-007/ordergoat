import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { rootState } from "../redux/store";

type Props = {}

export function RequireAdminAuth({children}:{children:JSX.Element}){
    const location = useLocation(); 
    const {user}:any = useSelector((state: rootState) => state.user);
    if(!user.isAdmin){
        return <Navigate to="/" state={{ from: location }} replace/>
    }
    return children;
}

