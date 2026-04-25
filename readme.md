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

## Deploy com Coolify (Dockerfile)

Para subir o projeto no Coolify, use o `Dockerfile` da raiz como **Dockerfile Application**.

### Configuracao no Coolify

- Build Pack: `Dockerfile`
- Dockerfile: `./Dockerfile`
- Porta exposta: `80` ou `3000`
- Dominio: aponte para a aplicacao criada no Coolify

O container roda o backend Node internamente na porta `3001` e o Nginx publica o frontend nas portas `80` e `3000`. O Nginx tambem faz proxy de `/api` para o backend, entao site e API funcionam no mesmo dominio.

Exemplo:

- site: `https://fuerza.exemplo.com`
- API: `https://fuerza.exemplo.com/api/...`

### Variaveis obrigatorias no Coolify

Defina estas variaveis no ambiente da aplicacao:

```env
MONGO_URI=
MONGO_DB_NAME=fuerzaseguros
JWT_SECRET=
JWT_SECRET_REFRESH=
EMAIL_USER=
EMAIL_PASS=
EMAIL_SERVICE=gmail
EMAIL_FOR_LEAD=
```

### Observacoes

- o `backend` roda em modo `production`, portanto usa HTTP normal dentro do container
- o `frontend` chama a API usando caminho relativo `/api`, sem depender de `VITE_API_URL` em producao
- o banco MongoDB deve estar em um servico externo ou em outro recurso configurado no Coolify, e a conexao deve ir em `MONGO_URI`
- se `MONGO_URI` nao incluir o nome do banco, `MONGO_DB_NAME` define o banco usado; por padrao a API usa `fuerzaseguros`

### Teste local com Docker

Para testar localmente antes de subir no Coolify:

```bash
docker build -t fuerza-seguros-coolify .
docker run --rm -p 8080:80 --env-file backend/.env fuerza-seguros-coolify
```

Depois acesse `http://localhost:8080`.

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
