


const TablePage=()=>{
    return (
        <div>
            <p>Please select your date and time for table booking</p>

            <div style={{marginLeft:"30%",marginRight:"30%"}}>
            <input  className="form-control" type="date" placeholder="Please set the date" style={{maxWidth:"400px",minWidth:"250px"}}/>
            <br/>

            <input className="form-control" type="time" placeholder="Please set the time"style={{maxWidth:"400px",minWidth:"250px"}}/>
            </div>
          

            <p>Table Page</p>
        </div>
    )
}
export default TablePage;