import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";


const SocialLogin = () => {
    const google=new GoogleAuthProvider()
    const gitHub=new GithubAuthProvider()
    const location = useLocation();
    const axiosPublic=useAxios()
    const navigate = useNavigate()
    const {signInPop } = useContext(AuthContext)
    const from = location.state?.from?.pathname || "/";
    const handleGoogleLogin=()=>{
        signInPop(google)
        .then(res=>{
            console.log(res.user);
            
            const userData={
                email:res.user?.email,
                name:res.user?.displayName,
                image:res.user?.photoURL

            }  
            axiosPublic.post('/users',userData)
            .then(res=>{
                // console.log(res.data);
                
            } )
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "success",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
            
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: error.message,
            });
        });
    }
    const handleGitHubLogin=()=>{
        signInPop(gitHub)
        .then(res=>{
            const userData={
                email:res.user?.email,
                name:res.user?.displayName,
                image:res.user?.photoURL
            }  
            axiosPublic.post('/users',userData)
            .then(res=>{
                console.log(res.data);
                
            })            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
            
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: error.message,
            });
        });
    }
    return (
        <div>
            <div className=" flex justify-center my-10 gap-5">
                <div onClick={handleGitHubLogin} className="flex btn w-36 btn-primary justify-center font-extrabold"><FaGithub /></div>
                <div onClick={handleGoogleLogin} className="flex btn w-36 btn-primary justify-center font-extrabold"><FaGoogle /></div>
            </div>
        </div>
    );
};

export default SocialLogin;