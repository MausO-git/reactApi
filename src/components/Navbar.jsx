import { NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">API-Platform</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Factures</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="btn btn-success">Connexion</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="btn btn-danger">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;