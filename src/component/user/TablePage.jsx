import { useEffect, useState } from "react";
import CafeTableService from "../../service/CafeTableService";






const TablePage=()=>{
    const[table,setTable]=useState([]);


    const fetchAllTables=()=>{
        CafeTableService.getAllCafeTable().then(
            res=>{
                setTable(res.data)
            }
        )
    }
    useEffect(()=>{
     
        fetchAllTables()
    },[])



    return (
        <div>
            <p>Please select your date and time for table booking</p>

            <div style={{marginLeft:"30%",marginRight:"30%"}}>
            <input  className="form-control" type="date" placeholder="Please set the date" style={{maxWidth:"400px",minWidth:"250px"}}/>
            <br/>

            <input className="form-control" type="time" placeholder="Please set the time"style={{maxWidth:"400px",minWidth:"250px"}}/>
            </div>
          

            <p>Table Page</p>


            <div className="row">

            {
                
                table.map((t)=>(
        <div key={t.tableId} className="col-lg-3 col-md-4 mb-4" >
            <div className="card h-100" >
              <div className="card-body " >
                <p className="card-text">Table No:{t.tableId}</p>
                <h5 className="card-title">{t.seatingCapacity}</h5>
              </div>
              <div className="card-footer">
                <button className="btn btn-lg btn-block">Book Table</button>
              </div>
            </div>
          </div>

                ))}
        </div>
        </div>
    )
}
export default TablePage;