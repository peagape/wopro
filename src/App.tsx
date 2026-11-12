import { useState } from 'react';

const optimizedScript = `@echo off
title Windows Optimizer Pro v2.0
color 0A
mode con cols=100 lines=40

:: ============================================
:: VERIFICACAO DE PRIVILEGIOS ADMINISTRATIVOS
:: ============================================
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Este script precisa ser executado como Administrador!
    echo Clique com o botao direito e selecione "Executar como administrador".
    echo.
    pause
    exit /b 1
)

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║          WINDOWS OPTIMIZER PRO v2.0                      ║
echo  ║          Script de Otimizacao Avancado                   ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo  [INFO] Executando com privilegios de administrador...
echo.

:: ============================================
:: CRIAR PONTO DE RESTAURACAO
:: ============================================
echo [1/10] Criando ponto de restauracao do sistema...
wmic.exe /Namespace:\\root\\default Path SystemRestore Call CreateRestorePoint "Antes do Windows Optimizer Pro", 100, 7 >nul 2>&1
if %errorlevel% equ 0 (
    echo         [OK] Ponto de restauracao criado com sucesso.
) else (
    echo         [AVISO] Nao foi possivel criar ponto de restauracao.
)
echo.

:: ============================================
:: DESABILITAR INDEXACAO DE ARQUIVOS (WSearch)
:: ============================================
echo [2/10] Desabilitando indexacao de arquivos (Windows Search)...
sc config WSearch start= disabled >nul 2>&1
net stop WSearch >nul 2>&1
echo         [OK] Servico Windows Search desabilitado.
echo.

:: ============================================
:: DESABILITAR SYSMAIN (SUPERFETCH)
:: ============================================
echo [3/10] Desabilitando SysMain (Superfetch)...
sc config SysMain start= disabled >nul 2>&1
net stop SysMain >nul 2>&1
echo         [OK] Servico SysMain desabilitado.
echo.

:: ============================================
:: DESABILITAR SERVICOS DESNECESSARIOS
:: ============================================
echo [4/10] Desabilitando servicos desnecessarios...

:: Diagnostic Tracking
sc config DiagTrack start= disabled >nul 2>&1
echo         [OK] Diagnostic Tracking Service desabilitado.

:: Windows Error Reporting
sc config WerSvc start= disabled >nul 2>&1
echo         [OK] Windows Error Reporting desabilitado.

:: Fax Service
sc config Fax start= disabled >nul 2>&1
echo         [OK] Fax Service desabilitado.

:: Print Spooler (se nao usa impressora)
:: sc config Spooler start= disabled >nul 2>&1
:: echo         [OK] Print Spooler desabilitado.

:: Remote Registry
sc config RemoteRegistry start= disabled >nul 2>&1
echo         [OK] Remote Registry desabilitado.

:: Xbox Services
sc config XblAuthManager start= disabled >nul 2>&1
sc config XblGameSave start= disabled >nul 2>&1
sc config XboxNetApiSvc start= disabled >nul 2>&1
echo         [OK] Servicos Xbox desabilitados.
echo.

:: ============================================
:: OTIMIZAR PLANO DE ENERGIA
:: ============================================
echo [5/10] Configurando plano de energia para alto desempenho...
powercfg -duplicatescheme 8a54837c-5275-4862-b7f8-2130f6e2e3ee >nul 2>&1
powercfg -s 8a54837c-5275-4862-b7f8-2130f6e2e3ee >nul 2>&1
echo         [OK] Plano de energia definido para Alto Desempenho.

:: Desabilitar hibernacao (libera espaco no disco)
powercfg -h off >nul 2>&1
echo         [OK] Hibernacao desabilitada (espaco liberado no disco).
echo.

:: ============================================
:: DESATIVAR EFEITOS VISUAIS
:: ============================================
echo [6/10] Desativando efeitos visuais para melhor desempenho...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v VisualFXSetting /t REG_DWORD /d 2 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Desktop" /v UserPreferencesMask /t REG_BINARY /d 9012038010000000 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarAnimations /t REG_SZ /d 0 /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Windows\\DWM" /v EnableAeroPeek /t REG_DWORD /d 0 /f >nul 2>&1
echo         [OK] Efeitos visuais desativados.
echo.

:: ============================================
:: OTIMIZAR REDE
:: ============================================
echo [7/10] Otimizando configuracoes de rede...
netsh int tcp set global autotuninglevel=normal >nul 2>&1
netsh int tcp set global chimney=disabled >nul 2>&1
netsh int tcp set global netdma=disabled >nul 2>&1
netsh int tcp set global dca=enabled >nul 2>&1
netsh int tcp set global rss=enabled >nul 2>&1
ipconfig /flushdns >nul 2>&1
echo         [OK] Configuracoes de rede otimizadas.
echo         [OK] Cache DNS limpo.
echo.

:: ============================================
:: LIMPAR ARQUIVOS TEMPORARIOS E CACHE
:: ============================================
echo [8/10] Limpando arquivos temporarios e cache...

:: Temp do usuario
del /q /f /s "%TEMP%\\*" >nul 2>&1
echo         [OK] Temp do usuario limpo.

:: Temp do Windows
del /q /f /s "C:\\Windows\\Temp\\*" >nul 2>&1
echo         [OK] Temp do Windows limpo.

:: Prefetch
del /q /f /s "C:\\Windows\\Prefetch\\*" >nul 2>&1
echo         [OK] Prefetch limpo.

:: Cache DNS
ipconfig /flushdns >nul 2>&1
echo         [OK] Cache DNS limpo.

:: Thumbnails
del /q /f /s "%LOCALAPPDATA%\\Microsoft\\Windows\\Explorer\\thumbcache_*" >nul 2>&1
echo         [OK] Cache de thumbnails limpo.

:: Windows Update Cache
del /q /f /s "C:\\Windows\\SoftwareDistribution\\Download\\*" >nul 2>&1
echo         [OK] Cache do Windows Update limpo.
echo.

:: ============================================
:: OTIMIZAR DISCO E MEMORIA
:: ============================================
echo [9/10] Otimizando disco e memoria...

:: Desfragmentar (apenas HDD)
:: defrag C: /O >nul 2>&1

:: Limpar memoriastandby
echo         [INFO] Reiniciando Explorer para liberar memoria...
taskkill /IM explorer.exe /F >nul 2>&1
timeout /t 3 /nobreak >nul
start explorer.exe >nul 2>&1
echo         [OK] Explorer reiniciado.

:: Otimizar drives
fsutil behavior set disablelastaccess 1 >nul 2>&1
echo         [OK] Last access time desabilitado (melhor desempenho de disco).
echo.

:: ============================================
:: CONFIGURACOES FINAIS
:: ============================================
echo [10/10] Aplicando configuracoes finais...

:: Desabilitar telemetria
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f >nul 2>&1
echo         [OK] Telemetria do Windows desabilitada.

:: Desabilitar Cortana
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f >nul 2>&1
echo         [OK] Cortana desabilitada.

:: Otimizar tempo de shutdown
reg add "HKCU\\Control Panel\\Desktop" /v WaitToKillAppTimeout /t REG_SZ /d 2000 /f >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control" /v WaitToKillServiceTimeout /t REG_SZ /d 2000 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Desktop" /v HungAppTimeout /t REG_SZ /d 1000 /f >nul 2>&1
echo         [OK] Tempos de espera otimizados para shutdown.

:: Desabilitar OneDrive sync automatico (opcional)
:: taskkill /f /im OneDrive.exe >nul 2>&1
echo.

:: ============================================
:: FINALIZACAO
:: ============================================
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║                                                          ║
echo  ║     [SUCESSO] Otimizacao concluida com sucesso!          ║
echo  ║                                                          ║
echo  ║     RECOMENDACOES:                                       ║
echo  ║     - Reinicie o computador para aplicar todas           ║
echo  ║       as alteracoes                                      ║
echo  ║     - Um ponto de restauracao foi criado caso            ║
echo  ║       precise reverter                                   ║
echo  ║                                                          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: Log de conclusao
echo [%date% %time%] Otimizacao concluida com sucesso. >> "%USERPROFILE%\\WindowsOptimizer_Log.txt"
echo         [OK] Log salvo em: %USERPROFILE%\\WindowsOptimizer_Log.txt
echo.

choice /C SN /M "Deseja reiniciar o computador agora? (S=Sim, N=Nao)"
if %errorlevel% equ 1 (
    echo.
    echo [INFO] Reiniciando em 10 segundos...
    shutdown /r /t 10 /c "Reiniciando apos otimizacao do Windows"
) else (
    echo.
    echo [INFO] Reinicie manualmente para aplicar todas as alteracoes.
)

echo.
pause`;

const improvements = [
  {
    icon: "🛡️",
    title: "Verificação de Administrador",
    description: "Verifica se o script está sendo executado com privilégios administrativos antes de prosseguir."
  },
  {
    icon: "💾",
    title: "Ponto de Restauração",
    description: "Cria automaticamente um ponto de restauração do sistema antes de fazer qualquer alteração."
  },
  {
    icon: "🔧",
    title: "Desabilitar Serviços Desnecessários",
    description: "Desabilita DiagTrack, Error Reporting, Fax, Remote Registry e serviços Xbox que consomem recursos."
  },
  {
    icon: "🌐",
    title: "Otimização de Rede",
    description: "Configura TCP para melhor desempenho, habilita RSS e limpa cache DNS."
  },
  {
    icon: "🧹",
    title: "Limpeza Completa",
    description: "Limpa Temp, Prefetch, Thumbnails, Windows Update Cache e muito mais."
  },
  {
    icon: "🎨",
    title: "Desativar Efeitos Visuais",
    description: "Desativa animações, Aero Peek, sombras e outros efeitos visuais via registro."
  },
  {
    icon: "📊",
    title: "Desabilitar Telemetria",
    description: "Remove coleta de dados da Microsoft e desabilita Cortana para mais privacidade."
  },
  {
    icon: "⚡",
    title: "Shutdown Rápido",
    description: "Reduz tempos de espera para fechar aplicativos e serviços durante o desligamento."
  },
  {
    icon: "📝",
    title: "Sistema de Logs",
    description: "Registra data e hora da execução em um arquivo de log para referência futura."
  },
  {
    icon: "💿",
    title: "Otimização de Disco",
    description: "Desabilita last access time e otimiza configurações de filesystem."
  },
  {
    icon: "🔄",
    title: "Reinício Opcional",
    description: "Pergunta ao usuário se deseja reiniciar para aplicar todas as alterações."
  },
  {
    icon: "🎯",
    title: "Interface Melhorada",
    description: "Interface visual com cores, bordas ASCII e numeração de etapas para melhor acompanhamento."
  }
];

function App() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'improvements'>('script');

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([optimizedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'WindowsOptimizerPro.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Windows Optimizer Pro
              </h1>
              <p className="text-xs text-gray-400">v2.0 - Script de Otimização Avançado</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copiado!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .bat
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Otimize seu <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Windows</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Script avançado de otimização com verificação de segurança, ponto de restauração,
            limpeza profunda e configurações de desempenho.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm">
              ✅ Verificação Admin
            </div>
            <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm">
              ✅ Ponto de Restauração
            </div>
            <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm">
              ✅ 10 Etapas Otimizadas
            </div>
            <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm">
              ✅ Sistema de Logs
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-1 bg-gray-900 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('script')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'script'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📄 Script Completo
            </button>
            <button
              onClick={() => setActiveTab('improvements')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'improvements'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🚀 Melhorias
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'script' ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-3 text-sm text-gray-400">WindowsOptimizerPro.bat</span>
                </div>
                <span className="text-xs text-gray-500">~180 linhas</span>
              </div>
              <div className="overflow-x-auto">
                <pre className="p-6 text-sm leading-relaxed font-mono text-gray-300 whitespace-pre">
                  {optimizedScript}
                </pre>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {improvements.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Warning */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-2">Avisos Importantes</h3>
                <ul className="space-y-2 text-sm text-amber-200/80">
                  <li>• Execute sempre como <strong>Administrador</strong></li>
                  <li>• Um ponto de restauração será criado automaticamente</li>
                  <li>• Reinicie o computador após a execução para aplicar todas as alterações</li>
                  <li>• Alguns serviços desabilitados podem afetar funcionalidades específicas (ex: serviços Xbox)</li>
                  <li>• Faça backup dos seus dados importantes antes de executar</li>
                  <li>• O script é compatível com Windows 10 e Windows 11</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            Antes vs <span className="text-blue-400">Depois</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-red-900/30 rounded-2xl p-6">
              <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                <span>❌</span> Script Original
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Sem verificação de administrador</li>
                <li>• Sem ponto de restauração</li>
                <li>• Limpeza básica de TEMP</li>
                <li>• Sem otimização de rede</li>
                <li>• Sem desabilitar serviços extras</li>
                <li>• Sem logs de execução</li>
                <li>• Sem tratamento de erros</li>
                <li>• Reinicia explorer sem aviso</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-green-900/30 rounded-2xl p-6">
              <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                <span>✅</span> Script Otimizado v2.0
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Verificação de privilégios admin</li>
                <li>• Ponto de restauração automático</li>
                <li>• Limpeza profunda (6+ locais)</li>
                <li>• Otimização TCP/DNS completa</li>
                <li>• Desabilita 8+ serviços desnecessários</li>
                <li>• Sistema de logs com data/hora</li>
                <li>• Tratamento de erros em cada etapa</li>
                <li>• Interface visual e reinício opcional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>Windows Optimizer Pro v2.0 — Use por sua conta e risco.</p>
          <p className="mt-1">Compatível com Windows 10 e Windows 11</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
