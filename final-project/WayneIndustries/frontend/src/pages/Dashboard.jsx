import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [dash, setDash] = useState({
    totalFuncionarios: 0,
    alertasAtivos: 0,
    veiculosDisponiveis: 0,
    recursos: 0,
    securities: 0
  });

  const [resources, setResources] = useState([]);
  const [securities, setSecurities] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const resp = await api.get("/dashboard");
        setDash(resp.data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    const fetchResources = async () => {
      try {
        const resp = await api.get("/resources");
        setResources(resp.data);
      } catch (error) {
        console.error("Erro ao buscar resources:", error);
      }
    };

    const fetchSecurity = async () => {
      try {
        const resp = await api.get("/security");
        setSecurities(resp.data);
      } catch (error) {
        console.error("Erro ao buscar security:", error);
      }
    };

    fetchSecurity();
    fetchDashboard();
    fetchResources();
  }, [navigate]);

  const handleChange = (e) => {
    setDash({ ...dash, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put("/dashboard", {
        totalFuncionarios: parseInt(dash.totalFuncionarios),
        alertasAtivos: parseInt(dash.alertasAtivos),
        veiculosDisponiveis: parseInt(dash.veiculosDisponiveis),
        recursos: parseInt(resources.length),
        security: parseInt(securities.length)
      });
      alert("Dados do dashboard atualizados!");
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar dashboard:", error);
      alert("Erro ao salvar mudanças no dashboard");
    }
  };

  const chartData = [
    { name: "Funcionários", value: Number(dash.totalFuncionarios) },
    { name: "Alertas", value: Number(dash.alertasAtivos) },
    { name: "Veículos", value: Number(dash.veiculosDisponiveis) },
    { name: "Recursos", value: Number(resources.length) },
    { name: "Segurança", value: Number(securities.length) },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bem-vindo(a), {localStorage.getItem("userName")}!</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" /> 
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="value" fill="#ffeb3b" />
        </BarChart>
      </div>

      {!editing && (
        <button onClick={() => setEditing(true)} style={{ marginBottom: "20px" }}>
          Editar Números do Dashboard
        </button>
      )}
      {editing && (
        <div style={{ marginBottom: "20px" }}>
          <div>
            <label>Funcionários: </label>
            <input
              type="number"
              name="totalFuncionarios"
              value={dash.totalFuncionarios}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Alertas Ativos: </label>
            <input
              type="number"
              name="alertasAtivos"
              value={dash.alertasAtivos}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Veículos Disponíveis: </label>
            <input
              type="number"
              name="veiculosDisponiveis"
              value={dash.veiculosDisponiveis}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Recursos Disponíveis: </label>
            <input
              type="number"
              name="recursosDisponiveis"
              value={dash.veiculosDisponiveis}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSave}>Salvar</button>
          <button onClick={() => setEditing(false)} style={{ marginLeft: "10px" }}>
            Cancelar
          </button>
        </div>
      )}

      <h2>Recursos</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {resources.map((r) => (
          <li key={r.id} style={{ marginBottom: "8px" }}>
            <strong>{r.tipo}</strong> - {r.nome} ({r.status})
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/resources")} style={{ marginRight: "10px" }}>
          Página de Recursos (CRUD)
        </button>
        <button onClick={() => navigate("/security")} style={{ marginRight: "10px" }}>
          Página de Segurança (CRUD)
        </button>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default Dashboard;
