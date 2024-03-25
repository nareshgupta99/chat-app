import { useState } from "react";
import { toast } from "react-toastify";
import { userAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const useSignup=()=>{
    console.log("in custom hook")
    const [loading,setLoading]=useState(false);
    const {authUser,setAuthUser}=userAuthContext();
    
    const signup= async ({fullName,username,password,confirmPassword,gender})=>{
        const success= validate({fullName,username,password,confirmPassword,gender});
        if(!success) return;
        
        setLoading(true);        
        try{
            const res= await fetch("http://localhost:8080/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender})
            });
            
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            console.log(data);
            // <Navigate to=    "/api/auth/chat"/>
        }catch(error){
            // toast.error(error.message);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
        }finally{
            setLoading(false);
        }
    }

return {loading,signup};

}

function validate({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error(" All field are Required");
        return false;
    }

    if(password!==confirmPassword){
        console.log("Password and Confirm Password do not match");
        toast.error("Password and Confirm Password do not match");
        return false;
    }

    if(password.length<6){
        toast.error("Password must be 6 character long");
        return false;
    }

    return true;
}




export default useSignup;