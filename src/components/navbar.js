import axios from "axios";
import { Link } from "react-router-dom";
function Navbar(){

    const token = localStorage.getItem('token');
    const handleLogout = async () => {
        try {
            await axios.post(
                '/api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            localStorage.removeItem('token')
            sessionStorage.clear()
            window.location.href='/'
        } catch (error) {
            console.error(error)
        }
    };
    var Details=""

    if (JSON.parse(sessionStorage.getItem('user'))){
        const user = JSON.parse(sessionStorage.getItem('user'))
        Details=(
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Youth Profiling | Hi! {user.name}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className="nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
                </div>
            </div>
        )
    }else{
        Details=(
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Youth Profiling</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {Details}
        </nav>
    )
}
export default Navbar;