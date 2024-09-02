import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Users = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeAdmin = (user) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You are about to make this user an admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: "The user has been made an admin.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }


        });
    };

    return (
        <div className="mx-10">
            <h1 className="text-center text-4xl mt-10 font-extrabold">Users</h1>
            <div className="overflow-x-auto` my-10 w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Profile pic</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td >
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.image}
                                                        alt="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {user?.name}
                                    </td>
                                    <td className="text-center">{user?.email}</td>
                                    <th className="text-center">
                                        {
                                            user.role === 'admin' ? 'Admin' : <button onClick={() => { handleMakeAdmin(user) }} className="btn btn-primary"><FaUser></FaUser></button>
                                        }
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;