import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import { useForm } from 'react-hook-form';
import AuthProvider, { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Details = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { user } = useContext(AuthContext)

    const { id } = useParams()
    const [pet, setPet] = useState()
    const axiosPublic = useAxios()
    useEffect(() => {
        axiosPublic.get(`/pets/${id}`)
            .then(res => setPet(res.data))
    }, [])

    if (!pet) return <div>Loading...</div>;



    const onSubmit = (data) => {
        const pet_image = pet.pet_image
        const pet_name = pet.pet_name
        const pet_id = pet._id
        const pet_age = pet.pet_age
        const pet_email=pet.email
        const adoptData = {
            pet_image, pet_name,pet_email, pet_id, pet_age, username: data.username, email: data.email, phone: data.phone, address: data.address
        }
        axiosPublic.post('/adopt/pet', adoptData)
            .then(res => {
                console.log(res);
                
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    return (
        <div className='mx-10 my-20'>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={pet.pet_image}
                        className='h-96'
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Name : {pet.pet_name}</h2>
                    <p>Age : {pet.pet_age}</p>
                    <p>Location : {pet.pet_location}</p>
                    <div className="card-actions justify-end">
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>Adopt</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog" action="">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <h1 className='text-3xl text-center'>{pet.pet_name}</h1>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">User Name</span>
                                            </label>
                                            <input type="name" defaultValue={user?.displayName}  {...register("username", { required: true })} className="input input-bordered" readOnly />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="email" defaultValue={user?.email}  {...register("email", { required: true })} className="input input-bordered" readOnly />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Phone Number</span>
                                            </label>
                                            <input type="tel"  {...register("phone", { required: true, pattern: /^[0-9]*$/ })} className="input input-bordered" />
                                            {errors.phone?.type === "pattern" && (
                                                <p role="alert" className="text-red-500 text-xs italic">Use only numbers</p>
                                            )}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Address</span>
                                            </label>
                                            <input type="text"  {...register("address", { required: true })} className="input input-bordered" />
                                        </div>
                                        <div className='flex justify-center my-5'> <input className='btn btn-success' type="submit" value="Submit" /></div>
                                    </div>
                                </form>

                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;