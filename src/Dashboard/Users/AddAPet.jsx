import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AddAPet = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxios();
    const [longDescription, setLongDescription] = useState("");

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
        formData.append("file", data.photoURL[0]);
        formData.append("upload_preset", uploadPreset);
        const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const imageUrl = cloudinaryRes.data.secure_url;
        const info = {
            email: user?.email,
            pet_code: data.category,
            pet_name: data.name,
            pet_age: data.age,
            pet_location: data.location,
            date_added: formattedDate,
            pet_image: imageUrl,
            description: data.description,
            long_description: longDescription,
            adopted: false
        };
        
        axiosPublic.post('pets', info)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is added to the platform.`,
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
                <h1 className="text-4xl font-extrabold">Add A Pet</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body mx-4 md:mx-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Name</span>
                            </label>
                            <input {...register("name", { required: true })} className="input w-full input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Age</span>
                            </label>
                            <input {...register("age", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Category</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select w-full select-bordered">
                                <option disabled value="default">Select a category</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="fish">Fish</option>
                                <option value="rabbit">Rabbit</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Image</span>
                            </label>
                            <input type="file" {...register("photoURL", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Location</span>
                            </label>
                            <input {...register("location", { required: true })} className="input w-full input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Short Description</span>
                            </label>
                            <input {...register("description", { required: true })} className="input w-full input-bordered" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <ReactQuill
                                value={longDescription}
                                onChange={setLongDescription}
                                className="w-full"
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['bold', 'italic', 'underline'],
                                        [{ 'color': [] }, { 'background': [] }],
                                        [{ 'align': [] }],
                                        ['link', 'image'],
                                        ['clean']
                                    ]
                                }}
                                formats={[
                                    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
                                    'color', 'background', 'align', 'link', 'image'
                                ]}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <div className="form-control mt-6 w-full md:w-auto">
                            <button className="btn w-full md:w-96 btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAPet;
