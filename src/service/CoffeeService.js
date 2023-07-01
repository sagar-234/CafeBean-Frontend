import axios from "axios"

class CoffeeService{
getAllCoffee(){
    return axios.get("http://localhost:8080/coffee-rest/fetch");
}
}
export default new CoffeeService();
