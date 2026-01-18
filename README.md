# Desafio Tecnico Fullstack - Cognvox

Este repositorio contem a solucao do desafio tecnico para a vaga de Desenvolvedor Fullstack.

A aplicacao contempla:
- Backend
- Frontend
- Banco de Dados

## Estrutura (backend)

- `routes/` -> equivalente as ACTIONS do legado (camada HTTP)
- `services/` -> equivalente aos CONTROLADORES (regra de negocio)
- `models/` -> camada de dados (SQLAlchemy)
- `database/` -> conexao com banco

## Backend

### Pre-requisitos

- Python 3.11
- MySQL rodando como servico

### Rodar o backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

### Variaveis de ambiente

Arquivo `backend/.env`:

```
ENV=dev
PORT=5000
DB_HOST=localhost
DB_USER=cognvox_user
DB_PASSWORD=cognvox_pass
DB_NAME=cognvox_db
JWT_SECRET_KEY=cognvox_chave_secreta
```

### Migrations

```powershell
cd backend
flask db init
flask db migrate -m "create users table"
flask db upgrade
```

Observacao:
- A pasta `backend/migrations/` também está no repositorio atendendo ao requisito de criacao de tabelas.

## Frontend

### Pre-requisitos

- Node.js 18+

### Rodar o frontend

```powershell
cd frontend
npm install
npm run dev
```

### Observacoes

- O frontend usa Vite e proxy para `/api` apontando para o backend.
- A tela de "Esqueci a senha" chama `/auth/forgot` e retorna mensagem generica (sem envio real de email).
- O botao "Sair" limpa o token salvo no navegador.

### Rotas do frontend (hash)

- `/#login` -> tela de login
- `/#form` -> cadastro
- `/#grid` -> lista de usuarios
- `/#forgot` -> recuperar senha
- `/#delete` -> excluir o proprio perfil

### Fluxo de exclusao (frontend)

1) A pagina `/#delete` chama `GET /users/me` para obter o id do usuario logado.
2) Em seguida chama `DELETE /users/<id>` usando o mesmo token.

## Endpoints principais

### Auth (publico)
- `POST /auth/register` -> cria usuario
- `POST /auth/login` -> retorna `access_token` (JWT)
- `POST /auth/forgot` -> retorna mensagem generica de recuperacao

### Users (protegido por JWT)
- `GET /users/me` -> perfil do usuario logado
- `GET /users` -> lista usuarios
- `GET /users/<id>` -> busca por id
- `PUT /users/<id>` -> atualiza
- `DELETE /users/<id>` -> remove

### Autenticacao (JWT)

Enviar o token no header:

```
Authorization: Bearer <token>
```

### Postman (exemplos)

Registro:
- `POST http://localhost:5000/auth/register`
- Body (JSON):
```
{
  "name": "Ana",
  "email": "ana@email.com",
  "password": "123"
}
```

Login:
- `POST http://localhost:5000/auth/login`
- Body (JSON):
```
{
  "email": "ana@email.com",
  "password": "123"
}
```

Rotas protegidas (Bearer Token):
- Authorization -> Type: Bearer Token -> Token: `<access_token>`

## Detalhes de funcionamento

### Fluxo de autenticacao

1) `POST /auth/register` cria o usuario e salva `password_hash` (bcrypt).
2) `POST /auth/login` valida email + senha e retorna JWT.
3) Rotas de `/users` exigem JWT valido.

### Validacoes principais

- `name`, `email` e `password` sao obrigatorios no cadastro.
- Email precisa ser unico (constraint no banco).
- Login valida a senha com bcrypt.

### Persistencia e seguranca

- Persistencia via SQLAlchemy.
- Consultas parametrizadas pelo ORM (protege contra SQL injection).
- Erros de validacao retornam JSON com status apropriado.

### Rotas protegidas (exemplos)

- `GET /users/me` retorna o usuario do token.
- `GET /users/<id>` usado para consulta por id (exige JWT).

### Erros esperados (JSON)

- `400 Bad Request` -> campos obrigatorios ausentes ou invalidos.
- `401 Unauthorized` -> credenciais invalidas no login.
- `404 Not Found` -> usuario nao encontrado.
