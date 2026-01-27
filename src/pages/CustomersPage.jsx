import { useState, useEffect } from "react";
import Axios  from "axios";
import Pagination from "../components/Pagination";
import customersAPI from "../services/customersAPI";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("")

    //pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const itemsPerPage = 10;

    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
        }catch(error){
            // notif à faire
            console.error(error.response)
        }
    }
    
    useEffect(()=>{
        fetchCustomers()
    }, [])

    const handleDelete = async (id) => {
        // pessimiste
        const orignalCustomers = [...customers]
        // optimiste
        setCustomers(customers.filter(customer => customer.id !== id))

        try{
            await customersAPI.delete(id)
        }catch(error){
            setCustomers(orignalCustomers)
            // notif à faire
        }
    }

    const handleSearch = (event) => {
        const value = event.currentTarget.value
        setSearch(value)
        // remettre la pagination à 1 après la recherche
        setCurrentPage(1)
    }

    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage)

    return ( 
        <>
            <h1>Liste des clients</h1>
            {/* filtre */}
            <div className="form-group my-3">
                {/* <input type="text" className="form-control" placeholder="Rechercher..." value={search} onChange={handleSearch} /> */}
            </div>
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
                    {paginatedCustomers.map(customer => (
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
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={customers.length}
                onPageChanged={handlePageChange}
            />
        </>
     );
}
 
export default CustomersPage;