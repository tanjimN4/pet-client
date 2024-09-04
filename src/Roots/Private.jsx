import { useContext } from "react";
import { AuthContext } from "../Pages/provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Private = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                <div className="w-64 h-32 p-4 bg-gray-200 rounded-lg shadow-md animate-pulse">
                    <Skeleton className="w-full h-full bg-gray-300 rounded-lg" />
                </div>
            </div>
        );
    }
    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
};


export default Private;