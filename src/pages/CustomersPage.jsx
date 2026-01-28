import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import customersAPI from "../services/customersAPI";
import { Link } from "react-router-dom";

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

    const filteredCustomers = customers.filter(c =>
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.totalAmount.toString().includes(search.toLowerCase()) ||
        c.unpaidAmount.toString().includes(search.toLowerCase()) ||
        c.company?.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )

    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)

    paginatedCustomers.map(customer => (
        console.log(customer.totalAmount)
    ))

    return ( 
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className="btn btn-primary">Créer un client</Link>
            </div>
            {/* filtre */}
            <div className="form-group my-3">
                <input type="text" className="form-control" placeholder="Rechercher..." value={search} onChange={handleSearch} />
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
                        <th></th>
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
                                <Link to={`/customers/${customer.id}`} className="btn btn-sm btn-warning mx-1">Editer</Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredCustomers.length}
                onPageChanged={handlePageChange}
            />
        </>
     );
}
 
export default CustomersPage;