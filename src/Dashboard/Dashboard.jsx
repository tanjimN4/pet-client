import { useState } from "react";
import { FaClipboardList, FaDonate, FaEnvelope, FaHeart, FaHome, FaPaw, FaPlusCircle, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin()
    return (
        <div className="flex">
            <div className="w-80 min-h-screen  bg-yellow-400 text-green-950">
                <h1 className="text-3xl font-bold text-center mt-5">Adopt A Buddy</h1>
                <div className="ml-5">
                    <ul className="menu font-bold text-xl text-red-950">
                        <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>

                        <li><NavLink to='/dashboard/add'><FaPaw></FaPaw>Add A Pet</NavLink></li>
                        <li><NavLink to='/dashboard/my/pets'><FaPaw></FaPaw> My Added Pets</NavLink></li>
                        <li><NavLink to='/dashboard/adoptRequest'><FaEnvelope></FaEnvelope>Adoption Request</NavLink></li>
                        <li><NavLink to='/dashboard/createDonationCampaign'><FaPlusCircle></FaPlusCircle>Create Donation Campaign</NavLink></li>
                        <li><NavLink to='/dashboard/myDonationCamping'><FaClipboardList></FaClipboardList>My Donation Campaigns</NavLink></li>
                        <li><NavLink to='/dashboard/myDonation'><FaHeart></FaHeart>My Donations</NavLink></li>
                        <br />
                        <div className=" mr-5 rounded-xl divide bg-white h-2"></div>
                        <br />
                        {
                            isAdmin && <div className="text-center text-2xl">Admin</div>
                        }
                        {
                            isAdmin && <>
                                <li><NavLink to='/dashboard/users'><FaUser></FaUser>Users</NavLink></li>
                                <li><NavLink to='/dashboard/my/pets'><FaPaw></FaPaw>All Pets</NavLink></li>
                                <li><NavLink to='/dashboard/adoptRequest'><FaDonate></FaDonate>All Donations </NavLink></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;