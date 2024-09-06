import { Outlet } from "react-router-dom";
import Navbar from "../Pages/NavBar/Navbar";
import Footer from "./Footer";


const Main = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;