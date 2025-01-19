import { useState } from 'react'; 
import axios from 'axios';
import { extractFormData } from '../helpers/util.js';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {

    const [alert, setAlert] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = extractFormData(e.target);

        axios.post('/api/login', data)
            .then(resp => {
                setUser(resp.data);
                navigate('/accounts')
            })
            .catch(err => setAlert({
                message: err.response.data,
                status: 'danger'
            }));
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
            <div className="card" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Prisijungti</h5>
                    {alert.message &&
                        <div className={"alert alert-" + alert.status}>{alert.message}</div>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">El. paštas</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Įveskite savo el. paštą"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Slaptažodis</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Įveskite savo slaptažodį"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Prisijungti</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;