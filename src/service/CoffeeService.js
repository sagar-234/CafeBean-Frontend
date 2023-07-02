import axios from "axios"

class CoffeeService{
getAllCoffee(){
    return axios.get("http://localhost:8080/coffee-rest/fetch");
}
addCoffee(coffee)
{
  return axios.post("http://localhost:8080/coffee-rest/createCoffee",coffee)
}
updateCoffee(coffee)
{
   return axios.put("http://localhost:8080/coffee-rest/updateCoffee",coffee)
}
deleteCoffee(coffeeid)
{
   return axios.delete(`http://localhost:8080/coffee-rest/deleteCoffee/${coffeeid}`)
}
}
export default new CoffeeService();
