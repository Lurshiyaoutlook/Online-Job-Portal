import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/users/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        alert("Role: " + response.data.role);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        alert("Login Successful!");
        navigate("/");

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Login Failed!");

    }

  };

  return (

    <div className="container mt-5" style={{ maxWidth: "400px" }}>

      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;