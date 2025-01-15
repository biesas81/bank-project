import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TopUp = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [amount, setAmount] = useState('');
    const [alert, setAlert] = useState({});

    // užklausa sąskaitos duomenims gauti
    useEffect(() => {
        axios.get('/api/' + id)
            .then(resp => setData(resp.data))
            .catch(err => setAlert({
                message: err.response.data,
                status: 'danger'
            }));
    }, [id]);

    // lėšų pridedimo funkcija
    const handleSubmit = (e) => {
        e.preventDefault();
        // patikrina ar skaicius ir ar teigiamas
        if (isNaN(amount) || Number(amount) <= 0) {
            setAlert({
                message: 'Prašome įvesti teigiamą sumą.',
                status: 'danger'
            });
            return;
        }

        const updatedBalance = data.balance + Number(amount);

        axios.put('/api/' + id, { balance: updatedBalance })
            .then(resp => {
                setAlert({
                    message: `Sąskaita papildyta: ${amount} EUR.`,
                    status: 'success'
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(err => setAlert({
                message: err.response?.data || 'Nepavyko pridėti lėšų.',
                status: 'danger'
            }));
    };

    return (
        <div className="container">
            <h1 className="mb-5">Pridėti lėšų</h1>

            {alert.message && (
                <div className={`alert alert-${alert.status} mt-4`}>
                    {alert.message}
                </div>
            )}

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.firstName} {data.lastName}</h5>
                    <p className="card-text">Balansas: {data.balance} EUR</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Įveskite sumą"
                                required
                                step="0.01"
                            />
                        </div>
                        <button className="btn btn-primary">Pridėti lėšų</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TopUp;