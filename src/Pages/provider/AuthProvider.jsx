import { createContext, useEffect, useState } from "react";
import {app} from '../../firebase/firebase.config'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxios from "../../Hooks/useAxios";


const auth =getAuth(app)

export const AuthContext=createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const axiosPublic=useAxios()



    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIN =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInPop = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile=async(name,photo)=>{
        setLoading(true)
       return  await  updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        const unsubcrive =onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo={email:currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                //insert token
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
            }else{
                //remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return()=>{
            unsubcrive()
        }
    },[])

    const authInfo={
        user,
        loading,createUser,signIN,logOut,updateUserProfile,signInPop
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;