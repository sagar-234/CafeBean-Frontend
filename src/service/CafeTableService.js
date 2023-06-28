import axios from "axios";
class CafeTableService{
    getAllCafeTable(){
        return axios.get("http://localhost:8080/cafeTable-rest/fetch");
    }
}
export default new CafeTableService();