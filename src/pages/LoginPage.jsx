import {useState, useContext} from 'react'
import authAPI from '../services/authAPI'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const LoginPage = (props) => {
    const navigate = useNavigate()
    const {setIsAuthenticated} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("")


    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await authAPI.authenticate(credentials)
            setError()
            setIsAuthenticated(true)
            navigate("/customers", {replace: true})
        }catch(error){
            setError("Aucun compte ne possÃ¨de cette adresse e-mail ou les informations ne correspondent pas")
        }
    }



    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials(credentials => ({...credentials, [name]: value}))
        /*
            // si name est "username" alors
            //  setCredentials(credentials => ({...credentials, [name]: value}))
            //  setCredentials(credentials => ({...credentials, username: value}))
            // credentials = {username: "valeur du champ"}

            crediatials = {
                username: "valeur du champ",
                password: ""
            }


         */

        // setCredentials({...credentials, name: value})
        /*
            crediatials = {
                username: "",
                password: "",
                name: "valeur du champ"
            }


         */
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-4 offset-sm-4">
                    <h2>Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="username">Adresse E-mail</label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={handleChange}
                                name="username"
                                placeholder="Adresse E-mail de connexion"
                                className={"form-control" + (error && " is-invalid")}
                            />
                            {/* gestion de l'erreur */}
                            {error && (
                                <p className="invalid-feedback">{error}</p>
                            )}
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                name="password"
                                placeholder="Mot de passe de connexion"
                                className={"form-control" + (error && " is-invalid")}
                            />
                            {/* gestion de l'erreur */}
                            {error && (
                                <p className="invalid-feedback">{error}</p>
                            )}
                        </div>
                        <div className="form-group my-3">
                            <button className="btn btn-success">Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;