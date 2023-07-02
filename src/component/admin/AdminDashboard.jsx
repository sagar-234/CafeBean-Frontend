import AdminNavbar from "./AdminNavbar"
import { Outlet } from "react-router-dom";

const AdminDashboard=()=>{

    return(
        <div>
            <div className="row" style={{height:"100vh"}}>
                <div className="col col-12 col-sm-4 col-md-4 col-lg-4">
                <AdminNavbar/>

                </div>
                <div className="col col-12 col-sm-8 col-md-8 col-lg-8">
                <Outlet/>

                </div>
            </div>
        </div>
    )

}
export default AdminDashboard;
