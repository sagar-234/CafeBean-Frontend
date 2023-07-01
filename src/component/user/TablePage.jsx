import { useContext, useEffect, useState } from "react";
import CafeTableService from "../../service/CafeTableService";
import BookingContext from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";





const TablePage=()=>{
    const[table,setTable]=useState([]);

    const[date,setDate]=useState(undefined)
const [startTime,setStartTime]=useState(undefined)
const [endTime,setEndTime]=useState(undefined)
const{value,setValue}=useContext(BookingContext)

const navigate=useNavigate();

const isTimeValid = (time) => {
    const minTime = '12:00';
    const maxTime = '21:00';
    return time >= minTime && time <= maxTime;
  };


    const fetchAvailableTables=()=>{
        CafeTableService.getAvailableCafeTable(date,startTime).then(
            res=>{
                setTable(res.data)
            }
        ).catch(
          (error)=>{
            window.alert("Error Occured")
          }
        )
    }

    const updateTableId = (newValue) => {
      
      setValue({ ...value, table_id: newValue ,
        bookingdate:date,
        startTimeField:startTime,
        endTimeField:endTime});

      console.log(value)
      navigate("coffee")


    };
    useEffect(()=>{
    },[])



    return (
        <div className="container p-2">
          
               
            <p>Please select your date and time for table booking</p>

            <div style={{marginLeft:"30%",marginRight:"30%"}}>
            <input  name="date" className="form-control" type="date" placeholder="Please set the date" style={{maxWidth:"400px",minWidth:"250px"}} onChange={(e)=>setDate(e.target.value)}/>
            <br/>

            <input name="startTime" className="form-control" type="time" placeholder="Please set the start time"style={{maxWidth:"400px",minWidth:"250px"}}  onChange={(e)=>setStartTime(e.target.value)}/>
            <input name="endTime" className="form-control" type="time" placeholder="Please set the end time"style={{maxWidth:"400px",minWidth:"250px"}}  onChange={(e)=>setEndTime(e.target.value)}/>

            <button className="btn btn-lg btn-block btn-primary"  onClick={fetchAvailableTables} disabled={date===undefined || startTime===undefined|| endTime===undefined }>Search Table</button>

            </div>
          

            <p>Table Page</p>


            <div className="row">
                

            

        {(date!==undefined && startTime!==undefined && table.length!==0)
        ?(
            
                
                table.map((t)=>(
        <div key={t.tableId} className="col-lg-3 col-md-4 mb-4" >
            <div className="card h-100" >
              <div className="card-body " >
                <h6 className="card-title">Table No:{t.tableId}</h6>
                <p className="text-muted">Seating Capacity :{t.seatingCapacity}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-lg btn-block" onClick={()=>updateTableId(t.tableId)}>Book Table</button>
              </div>
            </div>
          </div>

                ))

        )
        :
        (
            <p>Not available</p>
        )
        
        }  
        </div>
        </div>
    )
}
export default TablePage;