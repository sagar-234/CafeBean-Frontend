import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import InvalidPage from "../src/pages/invalid-page/InvalidPage";
import Login from "../src/pages/login/Login";
import Signup from "../src/pages/signup/Signup";
import TablePage from './component/user/TablePage';
import UserDashboard from './component/user/UserDashboard';
import CoffeeList from './component/user/CoffeeList';
import BookingProvider from './context/BookingProvider';
import RecentVisits from './component/user/RecentVisits';
function App() {
  return (
    <div className="App">
 <Router>

<Routes>


<Route path="/" element={<Login/>}/>

<Route path="/signup" element={<Signup/>}/>

<Route path="/user" element={<UserDashboard/>}>
  <Route index element={<BookingProvider><TablePage/></BookingProvider>}/>
  <Route path='coffee' element={<BookingProvider><CoffeeList/></BookingProvider>}/>
  <Route path="recentVisits" element={<RecentVisits/>}/>

</Route>
       





<Route path="*" element={<InvalidPage/>}/>




</Routes>



</Router>




    </div>
  );
}

export default App;
