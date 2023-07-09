import React,{useState} from "react";

import { Link } from "react-router-dom";
import "./Signup.css";

import Navbar from "../navbar/Navbar";
import CustomerService from "../../service/CustomerService";

const Signup=()=>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleUserNameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };

    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }
    
    const handlePhoneChange=(e)=>{
        setPhone(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Perform JavaScript validation
      if (username=== '') {
        setMessage('Please enter your email address');
      } else if (!isValidEmail(email)) {
        setMessage('Please enter a valid email address');
      } else if (password === '') {
        setMessage('Please enter your password');
      } else if (password.length < 6) {
        setMessage('Password must be at least 6 characters long');
      } else if (confirmPassword === '') {
        setMessage('Please confirm your password');
      } else if (password !== confirmPassword) {
        setMessage('Passwords do not match');
      }
      else if(phone.length!==10){
        setMessage('Invalid Phone number')
      } else {
        // Validation passed, perform signup logic here
        setMessage('');
        // Continue with your signup logic or redirect to a different page

        let obj={
            username:username,
            email:email,
            password:password,
            phone:phone,

        }

        CustomerService.signup(obj).then(
          res=>{
            window.alert("Account Created")
          }
        ).catch((error)=>{
          window.alert("Something went wrong")
        })

        //console.log(obj)

       




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

      <div className="container-fluid" style={{backgroundImage:"url("+"https://wallpaperaccess.com/full/2389930.jpg"+")"}}>

      </div>
       <div>
      <form onSubmit={handleSubmit}>
      <div >
          <input style={{padding:'10px'}} className="form-control"  type="text" value={username} onChange={handleUserNameChange} placeholder="Username" />
        </div>
        
        <div style={{paddingTop:'20px'}}>
          <input style={{padding:'10px'}} className="form-control"  type="email" value={email} onChange={handleEmailChange} placeholder="Email"/>
        </div>
        <div style={{paddingTop:'20px'}}>
          <input style={{padding:'10px'}} className="form-control" type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
        </div>
        <div style={{paddingTop:'20px'}}>
          <input style={{padding:'10px'}} className="form-control" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password"/>
        </div>
        <div style={{marginBottom:"20px",paddingTop:'20px'}} className="form-group">
          <input style={{padding:'10px'}} className="form-control" type="text" value={phone} onChange={handlePhoneChange} placeholder="Phone"/>
        </div>
        <button className="form-control btn btn-dark" type="submit">Signup</button>

        {message && <p className="message text-danger">{message}</p>}

        <Link to=".."  className="link-primary link-underline-light" >Already an User ? Login</Link>


      </form>
      </div>


      </div>
   );
}
export default Signup;