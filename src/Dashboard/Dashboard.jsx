import { useState } from "react";
import { FaClipboardList, FaDonate, FaEnvelope, FaHeart, FaHome, FaPaw, FaPlusCircle, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex flex-col md:flex-row">
            <div className="bg-yellow-400 text-green-950 w-full md:w-80 min-h-screen md:min-h-full">
                <h1 className="text-2xl md:text-3xl font-bold text-center mt-5">Adopt A Buddy</h1>
                <div className="ml-4 md:ml-5 mt-4 md:mt-6">
                    <ul className="menu font-bold text-lg md:text-xl text-red-950 space-y-2">
                        <li><NavLink to='/' className="flex items-center"><FaHome className="mr-2"/>Home</NavLink></li>
                        <li><NavLink to='/dashboard/add' className="flex items-center"><FaPaw className="mr-2"/>Add A Pet</NavLink></li>
                        <li><NavLink to='/dashboard/my/pets' className="flex items-center"><FaPaw className="mr-2"/>My Added Pets</NavLink></li>
                        <li><NavLink to='/dashboard/adoptRequest' className="flex items-center"><FaEnvelope className="mr-2"/>Adoption Request</NavLink></li>
                        <li><NavLink to='/dashboard/createDonationCampaign' className="flex items-center"><FaPlusCircle className="mr-2"/>Create Donation Campaign</NavLink></li>
                        <li><NavLink to='/dashboard/myDonationCamping' className="flex items-center"><FaClipboardList className="mr-2"/>My Donation Campaigns</NavLink></li>
                        <li><NavLink to='/dashboard/myDonation' className="flex items-center"><FaHeart className="mr-2"/>My Donations</NavLink></li>
                        <br />
                        <div className="mr-5 rounded-xl divide bg-white h-2"></div>
                        <br />
                        {isAdmin && <div className="text-center text-xl md:text-2xl mt-4">Admin</div>}
                        {isAdmin && (
                            <>
                                <li><NavLink to='/dashboard/users' className="flex items-center"><FaUser className="mr-2"/>Users</NavLink></li>
                                <li><NavLink to='/dashboard/allPet' className="flex items-center"><FaPaw className="mr-2"/>All Pets</NavLink></li>
                                <li><NavLink to='/dashboard/alldonation' className="flex items-center"><FaDonate className="mr-2"/>All Donations</NavLink></li>
                            </>
                        )}
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
