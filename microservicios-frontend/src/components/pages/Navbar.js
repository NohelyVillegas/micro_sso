import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user && <li className="nav-item">
              <Link className="nav-link" to="/usuarios">Usuarios</Link>
            </li>}
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
