import axios from "axios";

 const axiosPublic=axios.create({
    baseURL:'https://project-12-server-peach.vercel.app'
})

const useAxios = () => {
    return axiosPublic
};

export default useAxios;