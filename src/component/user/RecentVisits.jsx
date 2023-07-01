import React, { useEffect, useState } from "react";
import BookingService from "../../service/BookingService";

const RecentVisits=()=>{

    const[visits,setVisits]=useState([])

     
    const getAllVisits=()=>{
        BookingService.getBookingByUserid(Number(JSON.parse(sessionStorage.getItem('log')).cust_id)).then(
            res=>{
                setVisits(res.data.reverse())
            }
        )
    }

    /*
    "bookingdate": "2023-07-01",
        "startTimeField": "21:07:00",
        "endTimeField": "22:04:00",
        "amount": 120,
        "table_id": 1
    */

    useEffect(()=>{
        getAllVisits()
    },[])

    return(
        <div className="container p-2">
          
          {
            visits.map((visit)=>(
                <div className="card">
                <div className="card-header">
                Booking ID :{visit.booking_id}                </div>
                <div className="card-body">
                    <h5 className="card-title">Table ID :{visit.table_id}</h5>

                    <p className="card-text">StartTime :{visit.startTimeField}</p>
                    <p className="card-text">EndTime :{visit.endTimeField}</p>
                    <a href="#" className="btn">Amount :Rs {visit.amount}</a>
                </div>
                </div>
            ))
          }
        </div>
    )
}

export default RecentVisits;