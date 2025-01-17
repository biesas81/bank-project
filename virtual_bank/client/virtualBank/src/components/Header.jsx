import { Link } from 'react-router-dom';

const Header = () => {

    return (

        <header className="container text-bg-dark d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-white">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/accounts" className="nav-link text-white">Sąskaitos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/new-account" className="nav-link text-white">Nauja sąskaita</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;