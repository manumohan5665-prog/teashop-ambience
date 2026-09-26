import { FiMenu } from "react-icons/fi";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <span className="logo-icon">☕</span>

                <div>
                    <h2>Chaaya Kada</h2>
                    <span>ചായക്കട</span>
                </div>
            </div>

            <nav className="navbar-links">
                <a href="#ambience">Ambience</a>
                <a href="#music">Music</a>
                <a href="#about">About</a>
            </nav>

            <button className="menu-button">
                <FiMenu />
            </button>
        </header>
    );
}

export default Navbar;