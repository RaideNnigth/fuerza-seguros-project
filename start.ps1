# Caminho base
$ProjectDir = Get-Location
$LogDir = Join-Path $ProjectDir "logs"
$MongoPidFile = Join-Path $ProjectDir "mongod.pid"

# Cria a pasta de logs se não existir
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir | Out-Null
}

function Stop-AllServices {
    Write-Host "`n🛑 Encerrando processos..."

    if ($BackendJob -and $BackendJob.State -eq "Running") {
        Stop-Job $BackendJob
        Remove-Job $BackendJob
    }
    if ($FrontendJob -and $FrontendJob.State -eq "Running") {
        Stop-Job $FrontendJob
        Remove-Job $FrontendJob
    }

    if (Test-Path $MongoPidFile) {
        Write-Host "🗃️ Encerrando MongoDB..."
        $mongoPid = Get-Content $MongoPidFile
        Stop-Process -Id $mongoPid -Force -ErrorAction SilentlyContinue
        Remove-Item $MongoPidFile -Force
    }

    Write-Host "✅ Tudo encerrado com sucesso."
    if (Get-Command figlet -ErrorAction SilentlyContinue) {
        figlet "Até logo!"
    } elseif (Get-Command cowsay -ErrorAction SilentlyContinue) {
        cowsay "Até logo!"
    } else {
        Write-Host "👋 Até logo!"
    }
    exit
}

Write-Host "🔧 Encerrando processos nas portas 3000 e 5173 (se houver)..."
$ports = @(3000, 5173)
foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    foreach ($conn in $connections) {
        try {
            Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
        } catch {}
    }
}

if (-not (Get-Process -Name "mongod" -ErrorAction SilentlyContinue)) {
    Write-Host "🟢 Iniciando MongoDB..."
    Start-Process "mongod.exe" -ArgumentList "--dbpath=./data --logpath=./mongod.log --logappend" -NoNewWindow
    Start-Sleep -Seconds 2
    $mongoProcess = Get-Process -Name "mongod" | Select-Object -First 1
    $mongoProcess.Id | Out-File $MongoPidFile
} else {
    Write-Host "📦 MongoDB já está rodando."
}

Write-Host "🚀 Iniciando backend..."
$BackendJob = Start-Job -ScriptBlock {
    Set-Location "$using:ProjectDir/backend"
    npm run dev *> "$using:LogDir/backend.log"
}

Write-Host "🌐 Iniciando frontend..."
$FrontendJob = Start-Job -ScriptBlock {
    Set-Location "$using:ProjectDir/frontend"
    npm run dev *> "$using:LogDir/frontend.log"
}

Write-Host "`n📝 Digite 'exit' ou 'q' para encerrar tudo."
while ($true) {
    $userInput = Read-Host "> "
    if ($userInput -eq "exit" -or $userInput -eq "q") {
        Stop-AllServices
    }
}
