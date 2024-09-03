import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import usePet from "../../Hooks/usePet";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const UpdatePet = () => {
    const navigation=useNavigate()
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxios();
    const { id } = useParams(); // Get the pet ID from the URL parameters
    const {pets}=usePet()
    const petData = pets.find(pet => pet._id === id)
    console.log(petData);
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        let imageUrl = petData.pet_image; // Use existing image if no new image is uploaded

        if (data.photoURL && data.photoURL.length > 0) {
            const formData = new FormData();
            formData.append("file", data.photoURL[0]);
            formData.append("upload_preset", uploadPreset);
            const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            imageUrl = cloudinaryRes.data.secure_url;
        }

        const updatedInfo = {
            pet_code: data.category,
            pet_name: data.name,
            pet_age: data.age,
            pet_location: data.location,
            description: data.description,
            long_escription: data.long_description,
            pet_image: imageUrl,
        };
        

        try {
            const res = await axiosPublic.patch(`pets/${id}`, updatedInfo);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigation('/dashboard/my/pets')
                
            }
        } catch (error) {
            console.error("Failed to update pet:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-center my-10">
                <h1 className="text-4xl font-extrabold">Update Pet</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body mx-20">
                    {/* Form Fields are the same as AddAPet */}
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Name</span>
                            </label>
                            <input  {...register("name", { required: true })}  defaultValue={petData?.pet_name || ''} className="input w-96 input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Age</span>
                            </label>
                            <input  {...register("age", { required: true })}  defaultValue={petData?.pet_age || ''} className="input w-96 input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Category</span>
                            </label>
                            <select  defaultValue={petData?.pet_code || 'default'} {...register('category', { required: true })}
                                className="select w-96 select-bordered " >
                                <option disabled value="default">Select a category</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="fish">Fish</option>
                                <option value="rabbit">Rabbit</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet image</span>
                            </label>
                            <input 
                                type="file"
                                {...register("photoURL")}
                                className="input w-96 input-bordered"
                            />
                            {petData?.pet_image && (
                                <img src={petData.pet_image} alt="Current Pet" className="mt-2 w-48 h-48 object-cover" />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet location</span>
                            </label>
                            <input defaultValue={petData?.pet_location || ''}  {...register("location", { required: true })} className="input w-96 input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <input  defaultValue={petData?.description || ''}  {...register("description", { required: true })} className="input w-96 input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <input defaultValue={petData?.long_description || ''}  {...register("long_description", { required: true })} className="input w-[800px] input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="form-control mt-6">
                            <button className="btn min-w-96 btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePet;
