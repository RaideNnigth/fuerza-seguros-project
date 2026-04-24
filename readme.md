# Fuerza Seguros Project – Guia de Configuração e Execução

Este documento fornece instruções completas para configurar e executar o projeto **Fuerza Seguros** em ambiente local e em um servidor (VPS Ubuntu). Inclui os pré-requisitos de software, passos para rodar o frontend e backend localmente, procedimentos de deploy em produção (VPS), estrutura esperada dos arquivos de ambiente (*.env*) e dicas para habilitar HTTPS opcionalmente no ambiente de desenvolvimento. Seguindo este guia, desenvolvedores poderão preparar rapidamente o ambiente e compreender como executar a aplicação de forma correta.

## Pré-requisitos

Certifique-se de ter os seguintes componentes instalados antes de continuar:

- **Node.js** – Ambiente de execução JavaScript. Recomenda-se usar a versão LTS (ex: 18.x ou superior).
- **npm** – Gerenciador de pacotes do Node.
- **MongoDB** – Banco de dados NoSQL. Instale uma instância do MongoDB localmente ou via apt no Ubuntu.
- **Git** – Sistema de controle de versão para clonar o repositório.
- **OpenSSL** *ou* **mkcert** (opcional, para HTTPS local).
- **PM2** (opcional, recomendado para produção) – Gerenciador de processos Node.js.

## Executando o Projeto Localmente

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/RaideNnigth/fuerza-seguros-project.git
   cd fuerza-seguros-project
   ```

2. **Instalar dependências:**
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Iniciar MongoDB local:**  
   Certifique-se de que o serviço MongoDB está rodando (`mongod`).

4. **Criar os arquivos .env:**

- backend/.env:
  ```env
  PORT=3000
  MONGO_URI=mongodb://localhost:27017/fuerzaseguros
  JWT_SECRET=#Token
  JWT_SECRET_REFRESH=#Token
  EMAIL_USER=#Seu Email
  EMAIL_PASS=#App Pass
  EMAIL_SERVICE=gmail
  EMAIL_FOR_LEAD=#email para onde mandar o lead
  ```

- frontend/.env:
  ```env
  VITE_API_URL=https://localhost:3000
  ```

5. **Rodar os servidores:**

- Backend:
  ```bash
  cd backend
  npm run dev
  ```

- Frontend:
  ```bash
  cd frontend
  npm run dev
  ```

6. **Acessar a aplicação:**

- Frontend: https://localhost:5174/
- API: https://localhost:3000/

## Executando em uma VPS Ubuntu

1. **Instalar dependências na VPS:**
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm mongodb git
   npm install -g pm2
   ```

2. **Clonar o projeto:**
   ```bash
   git clone https://github.com/RaideNnigth/fuerza-seguros-project.git
   cd fuerza-seguros-project
   ```

3. **Criar os arquivos .env conforme descrito acima.**

4. **Instalar dependências e buildar o frontend:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install && npm run build
   ```

5. **Rodar o backend com PM2:**
   ```bash
   cd ../backend
   pm2 start index.js --name fuerza-backend
   pm2 startup
   pm2 save
   ```

6. **Servir o frontend com nginx ou `serve` se desejar.**

## Deploy com Coolify (Docker Compose)

Para subir as duas aplicaÃ§Ãµes no Coolify como **Docker Compose Application**, use o arquivo [`docker-compose.yml`](./docker-compose.yml) da raiz do projeto.

### Arquitetura recomendada

- `frontend`: serviÃ§o pÃºblico com domÃ­nio no Coolify
- `backend`: serviÃ§o interno da stack, sem domÃ­nio pÃºblico

O Nginx do `frontend` faz proxy de `/api` para `backend:3000`, entÃ£o o site e a API funcionam no mesmo domÃ­nio.

Exemplo:

- site: `https://fuerza.exemplo.com`
- API: `https://fuerza.exemplo.com/api/...`

### VariÃ¡veis obrigatÃ³rias no Coolify

Defina estas variÃ¡veis no ambiente da aplicaÃ§Ã£o:

```env
MONGO_URI=
JWT_SECRET=
JWT_SECRET_REFRESH=
EMAIL_USER=
EMAIL_PASS=
EMAIL_SERVICE=gmail
EMAIL_FOR_LEAD=
```

### Como configurar no painel

- atribua domÃ­nio apenas ao serviÃ§o `frontend`
- nÃ£o exponha domÃ­nio para o `backend`

### ObservaÃ§Ãµes

- o `backend` roda em modo `production`, portanto usa HTTP normal dentro do container
- o `frontend` chama a API usando caminho relativo `/api`, sem depender de `VITE_API_URL` em produÃ§Ã£o

### Teste local com Docker

Para testar localmente antes de subir no Coolify, use o compose principal junto com o override local:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

Isso publica:

- `http://localhost` para o frontend
- `http://localhost:3000` para o backend

Para parar:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml down
```

## Suporte a HTTPS (opcional)

Coloque `cert.pem` e `key.pem` nas pastas:

- `backend/cert/`
- `frontend/cert/`

Você pode gerar os certificados com:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=localhost"
```

Ou usando `mkcert`:

```bash
mkcert -install
mkcert localhost
```

Renomeie os arquivos gerados e coloque nas pastas indicadas.

## Links Úteis

- Frontend local: https://localhost:5174/
- Backend local: https://localhost:3000/
- Repositório: https://github.com/RaideNnigth/fuerza-seguros-project
