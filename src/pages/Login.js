import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call to register
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    const data = response.json()
    if (response.ok) {
        console.log(response)
        console.log("Logged in! Token:", data.accessToken);
        navigate("/home");
    } else {
        console.error("Login failed!")
    }

  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginPage;
