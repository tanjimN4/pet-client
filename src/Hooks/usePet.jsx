import {useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const usePet = () => {
    const axiosPublic = useAxios();

    const { data: pets = [], isPending: loading, refetch } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/pets');
            return res.data;
        }
    })


    return { pets, loading, refetch }
};

export default usePet;
