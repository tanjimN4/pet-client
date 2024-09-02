import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Pages/provider/AuthProvider";

 const axiosSecure=axios.create({
    baseURL:'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate=useNavigate()
    const {logOut}=useContext(AuthContext)
    axiosSecure.interceptors.request.use(function(config){
        // console.log('request stop by interceptor');
        const token=localStorage.getItem('access-token')
        // console.log(token);
        config.headers.authorization=`Bearer ${token}`
        return config
    },(error)=>{
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use((response)=>{
        return response
    },async (error)=>{
        const status=error.response.status
        if(status === 401 || status ===403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;