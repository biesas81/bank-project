import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewAccount = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({});

    // funkcija, kuri apdoroja formos pateikimą
    const handleSubmit = (e) => {
        e.preventDefault();

        // helperis, kad gauti duomenis iš formos
        const data = new FormData(e.target);
        
        axios.post('/api', data)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                });
                // po 3 sekundžių nukreipimas į Home
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            })
            .catch(err => {
                setAlert({
                    message: err.response?.data || 'Įvyko klaida kuriant sąskaitą',
                    status: 'danger'
                });
            });
    };

    return (
        <div>
            <h1 className="mb-5">Sukurti naują sąskaitą</h1>

            {alert.message && 
                <div className={`mt-4 alert alert-${alert.status}`}>
                    {alert.message}
                </div>
            }

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="personalId"
                        placeholder="Personal ID"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        name="passportPhoto"
                        required
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Sukurti sąskaitą</button>
                </div>
            </form>
        </div>
    );
}

export default NewAccount;