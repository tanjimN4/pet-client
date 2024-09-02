import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PetListing from "../Pages/PetListing/PetListing";
import Login from '../Pages/LoginAndRegister/Login'
import Register from "../Pages/LoginAndRegister/Register";
import Details from "../Pages/PetListing/Details";
import Private from "./Private";
import Donation from "../Pages/Donation/Donation";
import ViewDetails from "../Pages/Donation/ViewDetails";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Dashboard/Admin/Users";
import PrivateAdmin from "./PrivateAdmin";
import AddAPet from "../Dashboard/Users/AddAPet";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/petlisting',
            element:<PetListing></PetListing>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/details/:id',
            element:<Private><Details></Details></Private>
        },
        {
            path:'/donation',
            element:<Donation></Donation>
        },
        {
            path:'/view/details/:id',
            element:<Private><ViewDetails></ViewDetails></Private>
        },
        
      ]
    },
    {
        path:'/dashboard',
        element:<Private><Dashboard></Dashboard></Private>,
        children:[
            //user
            {
                path:'add',
                element:<AddAPet></AddAPet>
            },
            //admin
            {
                path:'users',
                element:<PrivateAdmin><Users></Users></PrivateAdmin>
            }
        ]
    }
]);