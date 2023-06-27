import axios from "axios"
class CustomerService{

 signup=(data)=>{
 return axios.post("http://localhost:8080/customer-rest/createUser",data);
}

login=(data)=>{
    return axios.post("http://localhost:8080/customer-rest/login",data);
   }


}
export  default  new CustomerService();
