import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", "true");

      setMsg("Login bem-sucedido!");
      localStorage.setItem("userName", username);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMsg("Usuário ou senha inválidos.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Wayne Industries - Login</h1>
      <form onSubmit={handleLogin} style={{ display: "inline-block" }}>
        <div>
          <label>Usuário: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Senha: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default Login;
