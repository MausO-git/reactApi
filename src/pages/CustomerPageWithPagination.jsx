import { useState, useEffect } from "react";
import Axios  from "axios";
import Pagination from "../components/Pagination";

const CustomerPageWithPagination = (props) => {
    const [customers, setCustomers] = useState([]);
    
    // pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

        // définir le nombre d'items par page
    const itemsPerPage = 10;
    
    const handlePageChange = (page) => {
        setCustomers([])
        setCurrentPage(page)
    }

    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data.member)
                setTotalItems(response.data.totalItems)
            })
            
    }, [currentPage])
    return ( 
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>E-mail</th>
                        <th>Entreprise</th>
                        <th>Factures</th>
                        <th className="text-center">Montant total</th>
                        <th className="text-center">Montant restant</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 
                        A && B
                        => si A falsy => js retourne A    
                        => si A truthy => js retourne B   
                    */}
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center">Chargement ...</td>
                        </tr>
                    )}
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName} {customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td>
                                <span className="badge text-bg-primary">{customer.invoices.length}</span>
                            </td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()}</td>
                            <td className="text-center">{customer.unpaidAmount.toLocaleString()}</td>
                            <td>
                                <button className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />
        </>
     );
}
 
export default CustomerPageWithPagination;