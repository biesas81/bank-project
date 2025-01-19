import { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Accounts from './pages/Accounts.jsx';
import NewAccount from './pages/NewAccount.jsx';
import TopUp from './pages/TopUp.jsx';
import Reduce from './pages/Reduce.jsx';
import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';

const App = () => {

    // Vartotojo duomenys kuriuos tikriname
    const [user, setUser] = useState();

    // Kai perkrauname narsykle
    useEffect(() => {
        axios.get('/api/check-auth')
            .then(resp => {
                console.log(resp);
                setUser(resp.data)
            })
            .catch(err => console.log(err));
    }, []);

    return (

        <BrowserRouter>
            <Header user={user} setUser={setUser} />
            <div className="container">
                <div className="container mt-5">
                    {user &&
                        <div className="mb-3">Sveiki, {user?.firstName}</div>
                    }
                    <Routes>
                        <Route path="/" element={<Login setUser={setUser}/>} />
                        {user &&
                        <>
                        <Route path="/accounts" element={<Accounts />} />
                        <Route path="/new-account" element={<NewAccount />} />
                        <Route path="/topup/:id" element={<TopUp />} />
                        <Route path="/reduce/:id" element={<Reduce />} />
                        </>
}
                        <Route path="*" element={<h1>Toks puslapis nerastas</h1>} />
                    </Routes>
                </div>
                </div>   
        </BrowserRouter>

    );
}
export default App;

// CRUD
// CREATE
// READ
// UPDATE
// DELETE