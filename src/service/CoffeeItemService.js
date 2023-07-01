import axios from "axios";
class CoffeeItemService{
    addCoffee(userid,coffee){
       return axios.post(`http://localhost:8080/CoffeeItem-rest/addCoffee/${userid}`,coffee)
    }
    getCoffeeItemById(userid){
        return axios.get(`http://localhost:8080/CoffeeItem-rest/fetch/${userid}`)

    }
    updateCoffeeItem(coffeeitem){
        return axios.post("http://localhost:8080/CoffeeItem-rest/updateCoffeeItem",coffeeitem)
    }
    deleteCoffeeItemById(id)
    {
       return axios.delete(`http://localhost:8080/CoffeeItem-rest/deleteCoffeeItem/${id}`)
    }
}
export default new CoffeeItemService();