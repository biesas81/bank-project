import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({});
    const [refresh, setRefresh] = useState(false);

    // naudojame useEffect, kad atliktume užklausą tik įkėlus puslapį
    useEffect(() => {
        axios.get('/api')
            // aktyvuojama eilutė, jei statuso kodas 200
            .then(resp => setData(resp.data))
            // bet kuriuo kitu gautu statuso kodu:
            .catch(err => setAlert({
                message: err.response.data,
                status: 'danger'
            }));
    }, [refresh]);

    // sąskaitos ištrynimas
    const deleteAccount = (id) => {
        axios.delete('/api/' + id)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                setRefresh(!refresh);
            })
            .catch(err => setAlert({
                message: err.response.data,
                status: 'warning'
            }));
    };

    return (
        <>
            <div className="container">
                <h1>Sąskaitų sąrašas</h1>
                {/* klaidų pranešimai */}
                {alert.message &&
                    <div className={"mt-4 alert alert-" + alert.status}>
                        {alert.message}
                    </div>
                }
                {alert.status !== 'danger' &&
                    <div className="row">
                        {data.sort((a, b) => a.lastName.localeCompare(b.lastName))  // rūšiavimas pagal pavardę
                            .map((value) => (
                                <div key={value._id} className="col-12 col-md-6 col-lg-4 mb-3 card">
                                        <div className="card-body">
                                            {/* sąskaitos duomenys */}
                                            <h5 className="card-title">{value.firstName} {value.lastName}</h5>
                                            <p className="card-text">Sąskaitos numeris: {value.accountNumber}</p>
                                            <p className="card-text">Balansas: {value.balance} EUR</p>
                                            <div className='row'>
                                                <div className='col-6 mb-3'>
                                                    <Link to={`/topup/${value._id}`} className="btn btn-success w-100 h-100 d-flex align-items-stretch">Pridėti lėšų</Link>
                                                </div>
                                                <div className='col-6 mb-3'>
                                                    <Link to={`/reduce/${value._id}`} className="btn btn-warning ml-1 w-100 h-100 d-flex align-items-stretch">Nuskaičiuoti lėšas</Link>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-danger mt-2"
                                                onClick={() => deleteAccount(value._id)}
                                                disabled={value.balance !== 0}
                                            >
                                                Ištrinti
                                            </button>
                                        </div>
                                </div>
                            ))}

                    </div>
                }
            </div>
        </>
    );
};

export default Home;