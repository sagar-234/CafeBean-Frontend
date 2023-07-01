import axios from "axios";
class CafeTableService{
    getAllCafeTable(){
        return axios.get("http://localhost:8080/cafeTable-rest/fetch");
    }
    getAvailableCafeTable(date,starttime){
        return axios.get(`http://localhost:8080/cafeTable-rest/availableTable?date=${date}&time=${starttime}`);
    }
}
export default new CafeTableService();