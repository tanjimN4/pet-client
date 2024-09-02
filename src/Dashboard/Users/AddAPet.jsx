import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Pages/provider/AuthProvider";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AddAPet = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic=useAxios()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const formData = new FormData();
        formData.append("file", data.photoURL[0]);
        formData.append("upload_preset", uploadPreset)
        const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const imageUrl = cloudinaryRes.data.secure_url;
        const info = {
            email: user?.email,
            pet_code: data.category,
            pet_name:data.name,
            pet_age:data.age,
            pet_location:data.location,
            date_added:formattedDate,
            pet_image:imageUrl,
            description:data.description,
            long_escription:data.long_description,
            adopted: false
            
        }
        console.log(info);
        axiosPublic.post('pets',info)
        .then(res=>{
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
            }
            
        })
        
    }
    return (
        <div>
            <div className="flex justify-center my-10">
                <h1 className="text-4xl font-extrabold">Add A Pet</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body mx-20">
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Name</span>
                            </label>
                            <input  {...register("name", { required: true })} className="input w-96 input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Age</span>
                            </label>
                            <input  {...register("age", { required: true })} className="input w-96 input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center gap-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet Category</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select w-96 select-bordered ">
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
                            <input type="file"  {...register("photoURL", { required: true })} className="input w-96 input-bordered" />
                        </div>
                    </div>
                    <div className="flex m justify-center gap-10">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pet location</span>
                            </label>
                            <input  {...register("location", { required: true })} className="input w-96 input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Short Description</span>
                            </label>
                            <input  {...register("description", { required: true })} className="input w-96 input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Long Description</span>
                            </label>
                            <input  {...register("long_description", { required: true })} className="input w-[800px] input-bordered" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="form-control mt-6">
                            <button className="btn min-w-96 btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAPet;