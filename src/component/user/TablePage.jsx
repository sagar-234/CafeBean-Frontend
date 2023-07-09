import { useContext, useEffect, useState } from "react";
import CafeTableService from "../../service/CafeTableService";
import BookingContext from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { Col, Collapse, Form, Row } from "react-bootstrap";
import search from "../../assets/img/search.gif";

const TablePage = () => {
  const [table, setTable] = useState([]);

  const [date, setDate] = useState(undefined);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const { value, setValue } = useContext(BookingContext);

  const navigate = useNavigate();

  const isTimeValid = (time) => {
    const minTime = "12:00";
    const maxTime = "21:00";
    return time >= minTime && time <= maxTime;
  };

  const fetchAvailableTables = () => {
    CafeTableService.getAvailableCafeTable(date, startTime)
      .then((res) => {
        setTable(res.data);
      })
      .catch((error) => {
        window.alert("Error Occured");
      });
  };

  const updateTableId = (newValue) => {
    setValue({
      ...value,
      table_id: newValue,
      bookingdate: date,
      startTimeField: startTime,
      endTimeField: endTime,
    });

    console.log(value);
    navigate("coffee");
  };
  useEffect(() => {}, []);

  return (
    <div className="container p-2">
      <div className="row" style={{ height: "60%" }}>
        <div className="col">
          <p>Please select your date and time for table booking</p>

          <div>
            <input
              name="date"
              className="form-control"
              type="date"
              placeholder="Please set the date"
              style={{ maxWidth: "400px", minWidth: "250px" }}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <Form.Label>Start Time</Form.Label>
            <input
              name="startTime"
              className="form-control"
              type="time"
              placeholder="Please set the start time"
              style={{ maxWidth: "400px", minWidth: "250px" }}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Form.Label className="mt-2">End Time</Form.Label>
            <input
              name="endTime"
              className="form-control"
              type="time"
              placeholder="Please set the end time"
              style={{ maxWidth: "400px", minWidth: "250px" }}
              onChange={(e) => setEndTime(e.target.value)}
            />

            <button
              className="btn btn-lg btn-block btn-primary mt-3"
              onClick={fetchAvailableTables}
              disabled={
                date === undefined ||
                startTime === undefined ||
                endTime === undefined
              }
            >
              Search Table
            </button>
          </div>
        </div>
        <div className="col">
          <img className="card-img-top" src={search}></img>
        </div>

        <p>Table Page</p>

        <div className="row">
          {date !== undefined &&
          startTime !== undefined &&
          table.length !== 0 ? (
            table.map((t) => (
              <div key={t.tableId} className="col-lg-3 col-md-4 mb-4">
                <div
                  className="card h-100"
                  style={{
                    borderColor: "aqua",
                    borderWidth: "2px",
                    boxShadow: "2px 2px 4px 3px",
                  }}
                >
                  <div className="card-body ">
                    <h2 className="card-title" style={{ color: "chocolate" }}>
                      Table No: {t.tableId}
                    </h2>
                    <h5>Seating Capacity : {t.seatingCapacity}</h5>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-lg btn-info"
                      onClick={() => updateTableId(t.tableId)}
                    >
                      Book Table
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Not available</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TablePage;
