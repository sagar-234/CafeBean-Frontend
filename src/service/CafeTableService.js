import axios from "axios";
class CafeTableService{
    getAllCafeTable(){
        return axios.get("http://localhost:8080/cafeTable-rest/fetch");
    }
    getAvailableCafeTable(date,starttime){
        return axios.get(`http://localhost:8080/cafeTable-rest/availableTable?date=${date}&time=${starttime}`);
    }
    addCafeTable(table){
        return axios.post("http://localhost:8080/cafeTable-rest/createCafeTable",table)
    }
    updateCafeTable(table)
    {
        return axios.put("http://localhost:8080/cafeTable-rest/updateCafeTable",table)
    }
    deleteCafeTable(tableId)
    {
        return axios.delete(`http://localhost:8080/cafeTable-rest/deleteCafeTable/${tableId}`)
    }
}
export default new CafeTableService();