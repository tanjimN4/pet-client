import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch,isPending } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

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
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div className="mx-4 md:mx-10">
            <h1 className="text-center text-3xl md:text-4xl mt-6 md:mt-10 font-extrabold">Users</h1>
            <div className="overflow-x-auto mt-6 md:mt-10">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* head */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">#</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Profile Pic</th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Name</th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Email</th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12">
                                                <img
                                                    src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                                    alt={user?.name}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{user?.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900">{user?.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-900 text-center">
                                        {
                                            user.role === 'admin'
                                                ? 'Admin'
                                                : <button onClick={() => handleMakeAdmin(user)} className="btn btn-primary btn-sm">
                                                    <FaUser />
                                                </button>
                                        }
                                    </td>
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
