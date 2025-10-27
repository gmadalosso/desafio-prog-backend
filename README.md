# Desafio: Programação Backend
Este repositório contém o projeto desenvolvido para o Desafio da disciplina de Programação Back-End da Unisinos. 

O objetivo é planejar e implementar o back-end de um sistema de matrículas para uma instituição de ensino.

## Integrantes do grupo

- Daniel Sandri Souto
- Gabriela Madalosso
- Luís Henrique Lehr
- Luiz Augusto da Silva 
- Rafael de Souza Moura

## 🚀 Como executar o projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd desafio-prog-backend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configuração do banco de dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=desafio_prog_backend

# Configuração JWT
JWT_SECRET=seu_jwt_secret_aqui

# Porta do servidor
PORT=5001
```

### 4. Configure o MySQL
```bash
# Inicie o MySQL
sudo service mysql start

# Crie o banco de dados
mysql -u root -p
CREATE DATABASE desafio_prog_backend;
```

### 5. Execute o projeto
```bash
# Modo desenvolvimento (com auto-reload)
npm run dev
```

O servidor estará rodando em `http://localhost:5001`

## 🧪 Como executar os testes

### Usando o arquivo requests.http (VS Code)

1. **Instale a extensão REST Client** no VS Code
2. **Abra o arquivo `requests.http`**
3. **Execute os testes** clicando em "Send Request" acima de cada endpoint


## 🛠️ Tecnologias utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas
- **dotenv** - Variáveis de ambiente

## 📁 Estrutura do projeto

```
src/
├── config/          # Configurações (banco de dados)
├── controllers/      # Controladores das rotas
├── data/            # Dados mockados (ignorado pelo git)
├── enums/           # Enums do sistema
├── repositories/    # Camada de acesso a dados
├── routes/          # Definição das rotas
├── security/        # Middlewares de segurança
├── services/        # Lógica de negócio
├── app.js           # Configuração da aplicação
└── server.js        # Inicialização do servidor
```

### Banco de dados
As tabelas são criadas automaticamente na inicialização:
- `usuarios` - Usuários do sistema
- `disciplinas` - Disciplinas oferecidas
- `turmas` - Turmas das disciplinas
- `matriculas` - Matrículas dos alunos

