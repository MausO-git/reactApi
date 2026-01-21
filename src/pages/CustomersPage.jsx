import { useState, useEffect } from "react";
import Axios  from "axios";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([]);
    
    useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/customers")
            .then(response => response.data.member)
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response))
    }, [])
    return ( 
        <>

        </>
     );
}
 
export default CustomersPage;