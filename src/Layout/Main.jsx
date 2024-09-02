import { Outlet } from "react-router-dom";
import Navbar from "../Pages/NavBar/Navbar";


const Main = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;