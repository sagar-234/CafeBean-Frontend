

import UserNavbar from "./UserNavbar"
import { Outlet } from "react-router-dom";

const UserDashboard=()=>{
    return (
        <div>
            <UserNavbar/>
            <Outlet/>
        </div>
    )
}

export default UserDashboard;
