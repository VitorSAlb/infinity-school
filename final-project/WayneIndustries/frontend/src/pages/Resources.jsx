import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Resources() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    tipo: "",
    nome: "",
    status: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login"); // ou "/"
      return;
    }
    const fetchResources = async () => {
      try {
        const response = await api.get("/resources");
        setResources(response.data);
      } catch (error) {
        console.error("Erro ao buscar recursos:", error);
      }
    };
    fetchResources();
  }, [navigate]);

  const handleChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };


  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/resources", newResource);
      alert(response.data.message || "Recurso adicionado!");
      setResources([...resources, response.data.newResource]);
      setNewResource({ tipo: "", nome: "", status: "" });
    } catch (error) {
      console.error("Erro ao adicionar recurso:", error);
    }
  };

  const handleEdit = (resource) => {
    const novoTipo = prompt("Tipo:", resource.tipo);
    if (novoTipo === null) return;

    const novoNome = prompt("Nome:", resource.nome);
    if (novoNome === null) return;

    const novoStatus = prompt("Status:", resource.status);
    if (novoStatus === null) return;

    const updatedResource = {
      ...resource,
      tipo: novoTipo,
      nome: novoNome,
      status: novoStatus,
    };
    updateResource(updatedResource);
  };

  const updateResource = async (updated) => {
    try {
      const response = await api.put(`/resources/${updated.id}`, updated);
      alert(response.data.message || "Recurso atualizado!");
      setResources(
        resources.map((r) =>
          r.id === updated.id ? response.data.resource : r
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar recurso:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza de que deseja excluir este recurso?")) {
      return;
    }
    try {
      const response = await api.delete(`/resources/${id}`);
      alert(response.data.message || "Recurso excluído!");
      setResources(resources.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Erro ao excluir recurso:", error);
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
      <h1>Recursos</h1>

      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {resources.map((r) => (
          <li key={r.id} style={{ marginBottom: "10px" }}>
            <strong>{r.tipo}</strong> - {r.nome} ({r.status}){" "}
            <button onClick={() => handleEdit(r)}>Editar</button>
            <button onClick={() => handleDelete(r.id)}>Excluir</button>
          </li>
        ))}
      </ul>


      <form onSubmit={handleAddResource} style={{ marginTop: "20px" }}>
        <h2>Adicionar Recurso</h2>
        <div>
          <label style={{ marginRight: "10px" }}>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={newResource.tipo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>Nome:</label>
          <input
            type="text"
            name="nome"
            value={newResource.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>Status:</label>
          <input
            type="text"
            name="status"
            value={newResource.status}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Adicionar
        </button>
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

export default Resources;
