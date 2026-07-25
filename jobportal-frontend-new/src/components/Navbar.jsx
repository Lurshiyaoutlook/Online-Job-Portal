import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Job Portal
        </Link>

        <div className="ms-auto">

          <Link className="btn btn-outline-light me-2" to="/">
            Home
          </Link>

          {role === "ADMIN" && (
            <>
              <Link className="btn btn-primary me-2" to="/add-job">
                Add Job
              </Link>

              <Link className="btn btn-success me-2" to="/applications">
                Applications
              </Link>
            </>
          )}

          {!token ? (
            <>
              <Link className="btn btn-outline-warning me-2" to="/login">
                Login
              </Link>

              <Link className="btn btn-success" to="/register">
                Register
              </Link>
            </>
          ) : (
            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;