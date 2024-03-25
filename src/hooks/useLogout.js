    
    import React from 'react'
import { userAuthContext } from '../context/AuthContext';
    
    function useLogout() {
        const {setAuthUser}=userAuthContext();
        const logout=async ()=>{
            try{
                const res=await fetch("http://localhost:8080/api/auth/logout",{
                    method:"POST",
                    headers:{"Content-Type":"application.json"}
                });
                const data=await res.json();
                if(data.error){
                    throw new Error(data.error)
                }

                localStorage.removeItem("chat-user")
                setAuthUser(null);
            }catch(error){
    
            }finally{
                
            }
        }
        return {logout};
    }
    
    export default useLogout