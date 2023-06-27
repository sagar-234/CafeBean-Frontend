import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import InvalidPage from "../src/pages/invalid-page/InvalidPage";
import Login from "../src/pages/login/Login";
import Signup from "../src/pages/signup/Signup";
function App() {
  return (
    <div className="App">
            <Router>

<Routes>


<Route path="/" element={<Login/>}/>

<Route path="/signup" element={<Signup/>}/>



  <Route path="*" element={<InvalidPage/>}/>




</Routes>



</Router>




    </div>
  );
}

export default App;
