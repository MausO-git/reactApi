import Axios from 'axios';

function findAll(){
    return Axios.get("http://127.0.0.1:8000/api/customers")
        .then(response => response.data.member)
}

function deleteCustomer(id)
{
    return Axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
}

function createCustomer(customer){
    return Axios.post("http://127.0.0.1:8000/api/customers", customer)
}

export default {
    findAll: findAll,
    delete: deleteCustomer,
    create: createCustomer
}