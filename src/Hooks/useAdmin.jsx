import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Pages/provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user}=useContext(AuthContext)
    const email=user?.email
    const axiosSecure=useAxiosSecure()
    const {data:isAdmin,isPending}=useQuery({
        queryKey:[email,'isAdmin'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${email}`)
            
            return res.data
        }
    })
    return [isAdmin,isPending]
};

export default useAdmin;