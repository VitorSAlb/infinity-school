import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Security() {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    usuario: "",
    area: "",
    data: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
      return;
    }
    const fetchLogs = async () => {
      try {
        const response = await api.get("/security");
        setLogs(response.data);
      } catch (error) {
        console.error("Erro ao buscar logs:", error);
      }
    };
    fetchLogs();
  }, [navigate]);

  const handleChange = (e) => {
    setNewLog({ ...newLog, [e.target.name]: e.target.value });
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/security", newLog);
      alert(response.data.message || "Log adicionado com sucesso!");
      setLogs([...logs, response.data.newLog]);
      setNewLog({ usuario: "", area: "", data: "" });
    } catch (error) {
      console.error("Erro ao adicionar log:", error);
    }
  };

  const handleEdit = (log) => {
    const novoUsuario = prompt("Usuário:", log.usuario);
    if (novoUsuario === null) return; // se cancelar

    const novaArea = prompt("Área:", log.area);
    if (novaArea === null) return;

    const novaData = prompt("Data:", log.data);
    if (novaData === null) return;

    const updatedLog = {
      ...log,
      usuario: novoUsuario,
      area: novaArea,
      data: novaData,
    };
    updateLog(updatedLog);
  };

  const updateLog = async (updated) => {
    try {
      const response = await api.put(`/security/${updated.id}`, updated);
      alert(response.data.message || "Log atualizado!");
      setLogs(logs.map((l) => (l.id === updated.id ? response.data.log : l)));
    } catch (error) {
      console.error("Erro ao atualizar log:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este log?")) return;
    try {
      const response = await api.delete(`/security/${id}`);
      alert(response.data.message || "Log excluído!");

      setLogs(logs.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Erro ao excluir log:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Segurança</h1>


      <ul style={{ listStyle: "none", padding: 0 }}>
        {logs.map((log) => (
          <li key={log.id} style={{ marginBottom: "10px" }}>
            <strong>[{log.data}]</strong> {log.usuario} acessou {log.area} (ID: {log.id}){" "}
            <button onClick={() => handleEdit(log)}>Editar</button>
            <button onClick={() => handleDelete(log.id)}>Excluir</button>
          </li>
        ))}
      </ul>


      <form onSubmit={handleAddLog} style={{ marginTop: "20px" }}>
        <h2>Adicionar Log de Acesso</h2>
        <div>
          <label style={{ marginRight: "10px" }}>Usuário:</label>
          <input
            type="text"
            name="usuario"
            value={newLog.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>Área:</label>
          <input
            type="text"
            name="area"
            value={newLog.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>Data:</label>
          <input
            type="text"
            name="data"
            value={newLog.data}
            onChange={handleChange}
            placeholder="DD/MM/AAAA"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Adicionar</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/")}>Voltar ao Dashboard</button>
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Security;
