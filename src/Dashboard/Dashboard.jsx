import { useState } from "react";
import { FaClipboardList, FaDonate, FaEnvelope, FaHeart, FaHome, FaPaw, FaPlusCircle, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    const navLinks = (
        <>
            <li><NavLink to='/' className="flex text-white items-center"><FaHome className="mr-2" />Home</NavLink></li>
            <li><NavLink to='/dashboard/add' className="flex text-white items-center"><FaPaw className="mr-2" />Add A Pet</NavLink></li>
            <li><NavLink to='/dashboard/my/pets' className="flex text-white items-center"><FaPaw className="mr-2" />My Added Pets</NavLink></li>
            <li><NavLink to='/dashboard/adoptRequest' className="flex text-white items-center"><FaEnvelope className="mr-2" />Adoption Request</NavLink></li>
            <li><NavLink to='/dashboard/createDonationCampaign' className="flex text-white items-center"><FaPlusCircle className="mr-2" />Create Donation Campaign</NavLink></li>
            <li><NavLink to='/dashboard/myDonationCamping' className="flex text-white items-center"><FaClipboardList className="mr-2" />My Donation Campaigns</NavLink></li>
            <li><NavLink to='/dashboard/myDonation' className="flex text-white items-center"><FaHeart className="mr-2" />My Donations</NavLink></li>
            <div className="divider"></div>
            {isAdmin && (
                <>
                    <li className="text-center text-xl md:text-2xl text-white mt-4">Admin</li>
                    <li><NavLink to='/dashboard/users' className="flex text-white items-center"><FaUser className="mr-2" />Users</NavLink></li>
                    <li><NavLink to='/dashboard/allPet' className="flex text-white items-center"><FaPaw className="mr-2" />All Pets</NavLink></li>
                    <li><NavLink to='/dashboard/alldonation' className="flex text-white items-center"><FaDonate className="mr-2" />All Donations</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="flex flex-col md:flex-row">
            <div className="bg-yellow-400 text-green-950 w-full md:w-80 h-24 lg:h-full">
                <h1 className="text-2xl md:text-3xl font-bold text-center mt-5">Adopt A Buddy</h1>
                <div className="md:hidden">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                </div>
                <div className="hidden md:block mt-2 ml-4">
                    <ul className="menu font-bold text-lg md:text-xl text-red-950 space-y-2">
                        {navLinks}
                    </ul>
                </div>
            </div>
            <div className="flex-1 bg-gray-100 p-4 md:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
