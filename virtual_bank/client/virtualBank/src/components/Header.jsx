import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = ({ user, setUser }) => {

    const handleLogout = () => {
        axios.get('/api/logout')
            .then(resp => {
                setUser(false);
                console.log(user);
            })
    }

    return (

        <header className="container text-bg-dark d-flex justify-content-center py-3">
            <ul className="nav nav-pills flex-column flex-sm-row">
                {user ?
                    <>
                        <li className="nav-item">
                            <Link to="/accounts" className="nav-link text-white">Sąskaitos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/new-account" className="nav-link text-white">Nauja sąskaita</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
                                onClick={handleLogout}
                            >Logout</Link>
                        </li>
                    </>
                    :
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-white">Login</Link>
                    </li>
                }

            </ul>
        </header>
    );
}

export default Header;