import { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import { useForm } from "react-hook-form";
import useDonation from "../../Hooks/useDonation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";


const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


const Edit = () => {
    const axiosSecure=useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const {donations}=useDonation()
    const filteredDonation = donations.find(donation => donation._id === id)
    // console.log(filteredDonation);
    
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("upload_preset", uploadPreset);
        const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const imageUrl = cloudinaryRes.data.secure_url;
        const Info = {
            name: data.name,
            image: imageUrl,
            maxDonation: data.maxDonation,
            campaign_type: data.category,
            lastdate: data.lastDate,
            description: data.description,
            longDescription: data.longDescription
        };
        console.log(id);

        axiosSecure.patch(`/donation/user/${id}`, Info)
        .then(res=>{
            if(res.data.modifiedCount>0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Donation campaign created successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }
            
        })
        

    };
    if (!filteredDonation) {
        return <div><Skeleton></Skeleton></div>;
    }
    return (
        <div className="bg-gray-700 text-white h-full rounded-lg">
            <div className="text-3xl text-center font-extrabold">Update Donation Campaign</div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-center">
                        <div className="form-control w-full md:w-1/2 lg:w-1/3">
                            <label className="label">
                                <span className="label-text">Pet Name</span>
                            </label>
                            <input type="text" defaultValue={filteredDonation.name} {...register("name", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-6">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Pet Image</span>
                            </label>
                            <div className="flex">
                            <input type="file"  {...register("image")} className="input w-full input-bordered" />
                            {filteredDonation?.image && (
                                <img src={filteredDonation.image} alt="Current Pet" className=" p-2 w-20 h-20 object-cover" />
                            )}
                            </div>
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Maximum Donation Amount</span>
                            </label>
                            <input type="number" defaultValue={filteredDonation.maxDonation} {...register("maxDonation", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-6">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Campaign Type</span>
                            </label>
                            <select {...register('category', { required: true })} className="select w-full select-bordered">
                                <option disabled value="default">Select a category</option>
                                <option value='camping'>Camping</option>
                            </select>
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Last Date of Donation</span>
                            </label>
                            <input type="date" defaultValue={filteredDonation.lastdate} {...register("lastDate", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-6">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <input defaultValue={filteredDonation.description} {...register("description", { required: true })} className="input w-full input-bordered" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <input defaultValue={filteredDonation.longDescription} {...register("longDescription", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full sm:w-auto">Update Campaign</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;