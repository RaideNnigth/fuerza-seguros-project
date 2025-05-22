#!/bin/bash

# Caminho base
PROJECT_DIR="$(pwd)"
LOG_DIR="$PROJECT_DIR/logs"
MONGO_PID_FILE="$PROJECT_DIR/mongod.pid"

# Cria a pasta de logs se não existir
mkdir -p "$LOG_DIR"

# Função para desligar tudo
shutdown_all() {
  echo -e "\n🛑 Encerrando processos..."

  # Mata backend e frontend
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null

  # Finaliza MongoDB se estiver rodando via PID
  if [[ -f "$MONGO_PID_FILE" ]]; then
    echo "🗃️ Encerrando MongoDB..."
    mongod --shutdown --dbpath ./data
    rm "$MONGO_PID_FILE"
  fi

  echo "✅ Tudo encerrado com sucesso."

  if command -v figlet &> /dev/null; then
    figlet "Até logo!"
  elif command -v cowsay &> /dev/null; then
    cowsay "Até logo!"
  else
    echo "👋 Até logo!"
  fi

  exit 0
}

# Fecha possíveis processos nas portas padrão
echo "🔧 Encerrando processos nas portas 3000 e 5174 (se houver)..."
fuser -k 3000/tcp 5174/tcp 2>/dev/null

# Iniciar MongoDB (se ainda não estiver rodando)
if ! pgrep -f "mongod" > /dev/null; then
  echo "🟢 Iniciando MongoDB..."
  mkdir -p ./data  # ← ESSENCIAL
  mongod --dbpath ./data --fork --logpath ./mongod.log || {
    echo "❌ Falha ao iniciar MongoDB. Veja mongod.log para detalhes."
    tail -n 10 mongod.log
    exit 1
  }
  echo $! > "$MONGO_PID_FILE"
else
  echo "📦 MongoDB já está rodando."
fi

# Iniciar backend
echo "🚀 Iniciando backend..."
(cd backend && npm run dev > "$LOG_DIR/backend.log" 2>&1) &
BACKEND_PID=$!

# Iniciar frontend
echo "🌐 Iniciando frontend..."
(cd frontend && npm run dev > "$LOG_DIR/frontend.log" 2>&1) &
FRONTEND_PID=$!

# Instruções
echo -e "\n📝 Digite 'exit' ou 'q' para encerrar tudo."
while true; do
  read -rp "> " input
  if [[ "$input" == "exit" || "$input" == "q" ]]; then
    shutdown_all
  fi
done
