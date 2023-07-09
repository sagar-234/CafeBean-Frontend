import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";


import "./Login.css";

import Navbar from "../navbar/Navbar";
import CustomerService from "../../service/CustomerService";


 const Login=()=>
{
  const navigate=useNavigate()

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');
 
   const handleEmailChange = (e) => {
     setEmail(e.target.value);
   };
 
   const handlePasswordChange = (e) => {
     setPassword(e.target.value);
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
 
     // Perform JavaScript validation
     if (email === '') {
       setMessage('Please enter your email address');
     } else if (!isValidEmail(email)) {
       setMessage('Please enter a valid email address');
     } else if (password === '') {
       setMessage('Please enter your password');
     } else if (password.length < 6) {
       setMessage('Password must be at least 6 characters long');
     } else {
       // Validation passed, perform login logic here
       setMessage('');
       // Continue with your login logic or redirect to a different page



       let obj={
         password:password,
         email:email
       }
      
       if(obj.email==="admin@gmail.com" && obj.password==="admin123")
       {
        navigate("admin")
         return;
       }
     CustomerService.login(obj).then(
      res=>{
            
               navigate("user")
               sessionStorage.setItem("log",JSON.stringify(res.data))
            
      })
      .catch((error)=>{
        window.alert("Invalid Credential")
      })

     
      
       
     
        }
    
    
   
   };
 
   const isValidEmail = (email) => {
     // Simple email validation using regex
     const emailRegex = /^\S+@\S+\.\S+$/;
     return emailRegex.test(email);
   };
 
   return(

    <div>
    <Navbar/>

   <div className="container-fluid" > 
   </div>

    <div className="card-body" 
    style={{
      height: "300px",
      minHeight: "300px",
       // Replace with your actual image path
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }} >

      <form onSubmit={handleSubmit} style={{height:'300px',minHeight:'300px'}} >
        <div>
          <input style={{padding:'10px'}} className="form-control" type="email" value={email} onChange={handleEmailChange} placeholder="Email"/>
        </div>
        <div style={{marginBottom:"20px",paddingTop:'20px'}}>
          <input style={{padding:'10px'}} className="form-control" type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
        </div>
        <button className="form-control btn btn-dark" type="submit">Login</button>

        {message && <p className="message text-danger">{message}</p>}


        <Link to="signup" className="link-primary link-underline-light">New to the CafeBean ? Signup</Link>

      </form>



   </div>
   </div>
   

   );

}
 
export default Login;
