import { useContext } from "react";
import { AuthContext } from "../Pages/provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const Private = ({children}) => {
    const location = useLocation()
    const {user,loading}=useContext(AuthContext)
    
    if(loading){
        return<>Loading</>
    }
    if(user){
        return children
    }

    return <Navigate to='/login' state={{form:location}} replace></Navigate>
};


export default Private;