import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const setDark=()=>{
        document.querySelector('body').setAttribute('data-theme','dark')
        localStorage.setItem('theme', 'dark')
        setIsDarkMode(true)
    }
    const setLight=()=>{
        document.querySelector('body').setAttribute('data-theme','light')
        localStorage.setItem('theme', 'light')
        setIsDarkMode(false)
    }

    const toggle=(e)=>{
        if(e.target.checked)setDark()
        else setLight()
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setDark();
        } else {
            setLight();
        }
    }, [])


    const { user, logOut, loading } = useContext(AuthContext)
    console.log(user);

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => console.error(error)
            )
    }

    const links = <>
        <li>
        <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={toggle}
                    checked={isDarkMode}
                />
        </li>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/petlisting'>Pet Listing</Link></li>
        <li><Link to='/donation'> Donation Campaigns</Link></li>
        {
            user && <li><Link to='/dashboard/my/pets'>DashBoard</Link></li>
        }
    </>


    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>

                    <a className="btn btn-ghost text-xl">Adopt A Buddy</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className='flex gap-5 items-center'>
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                    <img src={user.photoURL} />
                                </div>
                            </div>
                            <button onClick={handleLogOut} className='btn btn-primary'>Log Out</button>
                        </div>
                            :
                            <Link to='/login'><button className='btn'>Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;