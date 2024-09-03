import React from 'react';
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const MydonationCampaing = () => {
    const axiosPublic = useAxios();

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
        formData.append("file", data.petImage[0]);
        formData.append("upload_preset", uploadPreset);
        const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const imageUrl = cloudinaryRes.data.secure_url;
        const campaignInfo = {
            pet_image: imageUrl,
            max_donation_amount: data.maxDonationAmount,
            last_date: data.lastDate,
            short_description: data.shortDescription,
            long_description: data.longDescription,
            date_created: formattedDate,
        };
        
        axiosPublic.post('donation-campaigns', campaignInfo)
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
        <div>
            <div className="flex justify-center my-10">
                <h1 className="text-4xl font-extrabold">Create Donation Campaign</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body mx-20">
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Image</span>
                            </label>
                            <input type="file" {...register("petImage", { required: true })} className="input w-96 input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Maximum Donation Amount</span>
                            </label>
                            <input type="number" {...register("maxDonationAmount", { required: true })} className="input w-96 input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Date of Donation</span>
                            </label>
                            <input type="date" {...register("lastDate", { required: true })} className="input w-96 input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <input {...register("shortDescription", { required: true })} className="input w-96 input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <input {...register("longDescription", { required: true })} className="input w-[800px] input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="form-control mt-6">
                            <button className="btn min-w-96 btn-primary">Create Campaign</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MydonationCampaing;
