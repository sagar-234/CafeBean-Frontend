

import { useEffect } from "react";
import UserNavbar from "./UserNavbar"
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const UserDashboard=()=>{

    // const navigate=useNavigate()

    // useEffect(()=>{
        
    // },[]) 

   
    
    return (
        
        <div>

            
           
            <UserNavbar/>
            <Outlet/>
        </div>
    )
}

export default UserDashboard;
