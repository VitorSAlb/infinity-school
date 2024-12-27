const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({
      message: "Login bem-sucedido",
      token: "12345-abcde",
    });
  } else {
    return res.status(401).json({ message: "Usuário ou senha inválido(s)." });
  }
});

let dashboardData = {
  totalFuncionarios: 20,
  alertasAtivos: 3,
  veiculosDisponiveis: 12,
};

app.get("/dashboard", (req, res) => {
  res.status(200).json(dashboardData);
});

app.put("/dashboard", (req, res) => {
  dashboardData = { ...dashboardData, ...req.body };
  return res.json(dashboardData);
});

let resources = [
  { id: 1, tipo: "Veículo", nome: "Batmóvel", status: "Disponível" },
  { id: 2, tipo: "Equipamento", nome: "Batsinal", status: "Em uso" },
];

app.get("/resources", (req, res) => {
  res.status(200).json(resources);
});

app.post("/resources", (req, res) => {
  const newResource = req.body;
  const newId = resources.length > 0 ? resources[resources.length - 1].id + 1 : 1;
  const resourceToAdd = { id: newId, ...newResource };
  resources.push(resourceToAdd);
  return res.status(201).json({
    message: "Recurso adicionado com sucesso!",
    newResource: resourceToAdd,
  });
});

app.put("/resources/:id", (req, res) => {
  const { id } = req.params;
  const updatedResource = req.body;
  const index = resources.findIndex((r) => r.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Recurso não encontrado" });
  }
  resources[index] = {
    ...resources[index],
    ...updatedResource,
  };
  return res.status(200).json({
    message: "Recurso atualizado",
    resource: resources[index],
  });
});

app.delete("/resources/:id", (req, res) => {
  const { id } = req.params;
  const index = resources.findIndex((r) => r.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Recurso não encontrado" });
  }
  const removed = resources.splice(index, 1);
  return res.status(200).json({ message: "Recurso excluído", removed });
});

let accessLogs = [
  { id: 1, usuario: "Bruce", area: "Laboratório", data: "26/12/2024" },
  { id: 2, usuario: "Alfred", area: "Sala de Controle", data: "25/12/2024" },
];

app.get("/security", (req, res) => {
  res.status(200).json(accessLogs);
});

app.post("/security", (req, res) => {
  const newLog = req.body;
  const newId = accessLogs.length > 0 ? accessLogs[accessLogs.length - 1].id + 1 : 1;
  const logToAdd = { id: newId, ...newLog };
  accessLogs.push(logToAdd);
  return res.status(201).json({
    message: "Log de acesso registrado com sucesso!",
    newLog: logToAdd,
  });
});

app.put("/security/:id", (req, res) => {
  const { id } = req.params;
  const updatedLog = req.body;
  const index = accessLogs.findIndex((log) => log.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Log não encontrado" });
  }
  accessLogs[index] = {
    ...accessLogs[index],
    ...updatedLog,
  };
  return res.status(200).json({
    message: "Log atualizado",
    log: accessLogs[index],
  });
});

app.delete("/security/:id", (req, res) => {
  const { id } = req.params;
  const index = accessLogs.findIndex((log) => log.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Log não encontrado" });
  }
  const removed = accessLogs.splice(index, 1);
  return res.status(200).json({ message: "Log excluído", removed });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
