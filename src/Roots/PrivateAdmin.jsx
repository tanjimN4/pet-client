import { useContext } from "react";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Pages/provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateAdmin = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isAdmin,isPending]=useAdmin()
   const location=useLocation()
   if(loading || isPending){
    return<progress className="progress w-56"></progress>
   }
   if(user && isAdmin){
    return children
   }
   return<Navigate to='/login'state={{form:location}} replace></Navigate>
};

export default PrivateAdmin;