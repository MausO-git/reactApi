import {NavLink, useNavigate} from "react-router-dom";
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

const Navbar = (props) => {
    const navigate = useNavigate()
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const handleLogout = () => {
        authAPI.logout()
        setIsAuthenticated(false)
        navigate("/login", {replace: true})
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">API-Platform React</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {(!isAuthenticated) ? (
                            <>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">Inscription</a>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;