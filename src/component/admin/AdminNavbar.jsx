import { Link } from "react-router-dom";
import {AiOutlineLogout,AiFillShop} from "react-icons/ai";

import {MdAccountBalanceWallet ,MdOutlineFoodBank,MdFastfood} from "react-icons/md";

const AdminNavbar=()=>{

    const logOut=()=>{
        sessionStorage.removeItem('log')
      }
     return(
     <>
      <div  style={{height:'100%',backgroundColor:'rgb(211,211,211)'}} >
        <div style={{marginBottom:"30%"}}>
  
      <h1>CafeBean <MdFastfood/></h1>
        </div>
  
      <ul style={{listStyle:'none',padding:'0px'}}>
          
  
      <li><Link className="btn btn-lg" style={{width:'100%'}} to={"/admin"}>Coffee <MdOutlineFoodBank/></Link></li>
  
  
      <li><Link className="btn btn-lg" style={{width:'100%'}} to={"tableform"} >Table <MdAccountBalanceWallet/></Link></li>
   
      <li><Link className="btn btn-lg" style={{width:'100%'}} to={"bookings"} >Order <AiFillShop/></Link></li>

      <li><Link className="btn btn-lg" style={{width:'100%'}} onClick={logOut} to={"../"} >Logout <AiOutlineLogout/></Link></li>
      </ul> 
  
     </div>
  
     </>
     );
}
export default AdminNavbar;