import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import SocialLogin from "./SocialLogin";
import axios from "axios";
// const image_hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_KEY
// const image_hosti_api = `https://api.imgbb.com/1/upload?key=${image_hosting_Key}`
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const Register = () => {

    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const { axiosSecure } = useAxios()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const axiosPublic = useAxios()
    const onSubmit = async (data) => {
        console.log(data);

        const formData = new FormData();
        formData.append("file", data.photoURL[0]);
        formData.append("upload_preset", uploadPreset)
        const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const imageUrl = cloudinaryRes.data.secure_url;
        // const res = await axiosPublic.post(image_hosti_api, formData, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })
        // console.log(res.data);
        // const imageUrl = res.data.data.display_url;
        console.log(imageUrl);

        await createUser(data.email, data.password)
            .then(res => {
                updateUserProfile(data.name,imageUrl)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image:imageUrl
                            
                        }
                        axiosPublic.post('users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Success",
                                        showClass: {
                                            popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                              `
                                        },
                                        hideClass: {
                                            popup: `
                                animate__animated
                                animate__fadeOutDown
                                animate__faster
                              `
                                        }
                                    });
                                    navigate('/')
                                }
                            })

                    })

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: error.message,
                });
            });

    }

    return (
        <div>
            <div className="flex justify-center items-center mt-20">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input  {...register("name", { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="file"  {...register("photoURL", { required: true })} className="input input-bordered" />
                            {/* <input type="text" {...register("photoURL", { required: true })} className="input input-bordered" /> */}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" {...register("password", { required: true })} className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                    </form>
                    <div className="text-center my-5"><h1>Already have a account <Link to='/login'>Login</Link></h1></div>
                </div>
            </div>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;