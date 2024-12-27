# Wayne Industries - Sistema de Gerenciamento

Este projeto é um **sistema web** completo, composto por um **back-end em Node.js/Express** e um **front-end em React**, permitindo o gerenciamento de recursos, logs de segurança e um painel (dashboard) que exibe dados como número de funcionários, alertas ativos e veículos disponíveis, com **tema escuro** inspirado no **Batman**.

## Índice
1. [Visão Geral do Projeto](#visão-geral-do-projeto)  
2. [Pré-requisitos](#pré-requisitos)  
3. [Configuração do Back-end](#configuração-do-back-end)  
4. [Configuração do Front-end](#configuração-do-front-end)  
5. [Execução do Sistema](#execução-do-sistema)  
6. [Funcionalidades Principais](#funcionalidades-principais)  
7. [Estrutura de Pastas](#estrutura-de-pastas)  
8. [Tecnologias Utilizadas](#tecnologias-utilizadas)  
9. [Contato](#contato)

---

## Visão Geral do Projeto
O sistema **Wayne Industries** foi criado para:
- **Gerenciar recursos** (equipamentos e veículos).
- **Gerenciar logs de segurança** (acessos a áreas restritas).
- **Exibir** e **atualizar** informações de um **painel (dashboard)** (total de funcionários, alertas ativos, veículos disponíveis etc.).
- **Autenticar** usuários (login com usuário/senha padrão).
- **Proporcionar** um tema escuro estilo “Batman” (fundo preto, destaques em amarelo).

O objetivo é demonstrar um **projeto full-stack** (Node.js + React) com CRUD (Create, Read, Update, Delete) e layout customizado.

---

## Pré-requisitos
Para executar o projeto localmente, você precisará:

- **Node.js** (versão 14+ ou 16+ recomendada).  
- **NPM** (geralmente instalado junto com o Node) ou **Yarn**.  
- Um navegador atualizado (Chrome, Firefox, Edge, etc.).

> Verifique a instalação rodando:  
> ```bash
> node -v
> npm -v
> ```

---

## Configuração do Back-end
1. **Clonar o repositório** ou baixar os arquivos e, no terminal, vá até a pasta `backend`:
   ```bash
   cd WayneIndustries/backend
   ```
2. **Instalar as dependências**:
   ```bash
   npm install
   ```
3. **Verificar o arquivo `server.js`** para confirmar se a porta do servidor está configurada como `3001`.
4. **Iniciar o servidor**:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   node server.js
   ```
5. Se estiver tudo certo, o back-end subirá em:  
   **[http://localhost:3001](http://localhost:3001)**

**Testar** uma rota rapidamente:
- Acesse [http://localhost:3001/resources](http://localhost:3001/resources) no navegador.  
- Deve retornar um JSON com a lista inicial de recursos (exemplo: Batmóvel, Batsinal).

---

## Configuração do Front-end
1. Em outro terminal, vá até a pasta `frontend`:
   ```bash
   cd WayneIndustries/frontend
   ```
2. **Instalar as dependências**:
   ```bash
   npm install
   ```
3. **Iniciar o front-end**:
   ```bash
   npm start
   ```
4. Aguarde o React abrir em:
   **[http://localhost:3000](http://localhost:3000)**

---

## Execução do Sistema
1. **Rodar o back-end** primeiro (porta 3001).  
2. **Rodar o front-end** em seguida (porta 3000).  
3. Abrir [http://localhost:3000](http://localhost:3000) no navegador.  
4. **Tela de Login**:
   - Usuário padrão: `admin`
   - Senha padrão: `1234`
   - Após login, você é direcionado para o **Dashboard**.
5. **Dashboard**:
   - Exibe gráfico com quantidades (Funcionários, Alertas, Veículos, Recursos, Segurança).
   - Permite editar manualmente alguns valores (como total de Funcionários) e atualizá-los no servidor.
   - Também lista os **recursos** cadastrados (ex.: Batmóvel).
   - Opcionalmente, mostra logs de segurança.
6. Menu de navegação (header):
   - **Recursos**: CRUD completo para adicionar/editar/excluir recursos (veículos/equipamentos).
   - **Segurança**: CRUD completo para logs de segurança (acessos, datas etc.).
   - **Sair**: efetua logout limpando dados de sessão.

---

## Funcionalidades Principais
1. **Login** e **Logout**:
   - Apenas usuário `admin` e senha `1234` por padrão.
   - Armazena status de login via `localStorage`.
2. **Dashboard**:
   - Mostra números de funcionários, alertas, veículos e conta quantos recursos (array) e logs de segurança (array) existem.
   - Gráfico em **Recharts** (barras amarelas) para visualização rápida.
   - Botão “Editar” para ajustar dados do dashboard (`PUT /dashboard`).
3. **Gerenciamento de Recursos**:
   - **Listar** recursos (`GET /resources`).
   - **Adicionar** recurso (`POST /resources`).
   - **Editar** recurso (`PUT /resources/:id`).
   - **Excluir** recurso (`DELETE /resources/:id`).
4. **Gerenciamento de Segurança**:
   - **Listar** logs de segurança (`GET /security`).
   - **Adicionar** log (`POST /security`).
   - **Editar** log (`PUT /security/:id`).
   - **Excluir** log (`DELETE /security/:id`).
5. **Tema Batman**:
   - Fundo escuro (`#121212`).
   - Destaques em amarelo (`#ffeb3b`) e branco.
   - Ícone de morcego (opcional) no header.

---

## Estrutura de Pastas
```
WayneIndustries/
│
├─ backend/
│  ├─ server.js            
│  ├─ package.json         
│  └─ ...                 
│
├─ frontend/
│  ├─ public/
│  │   └─ index.html
│  ├─ src/
│  │   ├─ components/
│  │   │   └─ Header.jsx   
│  │   ├─ pages/
│  │   │   ├─ Login.jsx
│  │   │   ├─ Dashboard.jsx
│  │   │   ├─ Resources.jsx
│  │   │   └─ Security.jsx
│  │   ├─ services/
│  │   │   └─ api.js       
│  │   ├─ App.jsx
│  │   └─ index.js
│  ├─ package.json
│  └─ ...
│
└─ README.md               
```

---

## Tecnologias Utilizadas
- **Node.js** + **Express**: para criar as rotas de back-end (login, dashboard, resources, security).  
- **React** (Create React App): para a interface do usuário.  
- **Axios**: requisições HTTP entre front-end e back-end.  
- **Recharts**: construção de gráfico de barras no Dashboard.  
- **CSS** (tema escuro, amarelo e branco inspirado no Batman).
