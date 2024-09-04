import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from '../../Pages/provider/AuthProvider';
import axios from 'axios';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CreateDonationCamping = () => {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("upload_preset", uploadPreset);
        const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const imageUrl = cloudinaryRes.data.secure_url;
        const campaignInfo = {
            name: data.name,
            image: imageUrl,
            maxDonation: data.maxDonation,
            createdAt: formattedDate,
            campaign_type: data.category,
            email: user?.email,
            lastdate: data.lastDate,
            description: data.description,
            longDescription: data.longDescription
        };
        console.log(campaignInfo);

        axiosPublic.post('donation', campaignInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Donation campaign created successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                }
            });
    };

    return (
        <div className="p-4 md:p-8 lg:p-16">
            <div className="flex justify-center my-6 md:my-10">
                <h1 className="text-2xl md:text-4xl font-extrabold">Create Donation Campaign</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-center">
                        <div className="form-control w-full md:w-1/2 lg:w-1/3">
                            <label className="label">
                                <span className="label-text">Pet Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-6">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Pet Image</span>
                            </label>
                            <input type="file" {...register("image", { required: true })} className="input w-full input-bordered" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Maximum Donation Amount</span>
                            </label>
                            <input type="number" {...register("maxDonation", { required: true })} className="input w-full input-bordered" />
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
                            <input type="date" {...register("lastDate", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-6">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <input {...register("description", { required: true })} className="input w-full input-bordered" />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <input {...register("longDescription", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full sm:w-auto">Create Campaign</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationCamping;
