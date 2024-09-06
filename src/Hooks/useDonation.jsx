
import useAxios from "./useAxios";
import { useQuery} from "@tanstack/react-query";


const useDonation = () => {
    const axiosPublic = useAxios();

    const { data: donations = [], isPending: loading, refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation');
            return res.data;
        }
    })


    return {donations, loading,refetch}
};

export default useDonation;