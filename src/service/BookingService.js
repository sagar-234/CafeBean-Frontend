import axios from "axios";
class BookingService{

    getBookingByUserid(userid)
    {
        return axios.get(`http://localhost:8080/Booking-rest/fetch/${userid}`)
    }

    addBooking(booking)
    {
        return axios.post("http://localhost:8080/Booking-rest/addBooking",booking)
    }
}

export default new BookingService();