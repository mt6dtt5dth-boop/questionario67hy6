/**
 * MAIN.JS - Controlador Principal do Jogo "O Guardião do Sono"
 * Integra todas as fases, sistemas de áudio e gerencia o fluxo completo
 */

class GuardianGame {
    constructor() {
        // Three.js
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();
        
        // Sistemas
        this.audioSystem = null;
        this.binauralBeats = null;
        this.phaseTransition = null;
        
        // Fases
        this.phase1 = null;
        this.phase2 = null;
        this.phase3 = null;
        this.currentPhase = null;
        this.currentPhaseIndex = 0;
        
        // Estado
        this.isRunning = false;
        this.isPaused = false;
        
        // UI
        this.canvas = null;
        this.welcomeScreen = null;
        this.endScreen = null;
        this.loadingScreen = null;
        this.hudOverlay = null;
        this.breathIndicator = null;
    }

    /**
     * Inicializa o jogo
     */
    async initialize() {
        console.log('🌙 Inicializando O Guardião do Sono...');
        
        // Obter elementos UI
        this.canvas = document.getElementById('game-canvas');
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.endScreen = document.getElementById('end-screen');
        this.loadingScreen = document.getElementById('loading-screen');
        this.hudOverlay = document.getElementById('hud-overlay');
        this.breathIndicator = document.getElementById('breath-indicator');
        
        // Configurar botões
        this.setupButtons();
        
        // Inicializar Three.js
        this.initThreeJS();
        
        // Inicializar sistemas de áudio
        await this.initAudioSystems();
        
        // Criar fases
        this.createPhases();
        
        // Configurar transições
        this.setupPhaseTransitions();
        
        console.log('✅ Jogo inicializado com sucesso');
    }

    /**
     * Inicializa Three.js
     */
    initThreeJS() {
        // Cena
        this.scene = new THREE.Scene();
        
        // Câmera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Otimização mobile
        this.renderer.setClearColor(0x0a0e27, 1);
        
        // Responsividade
        window.addEventListener('resize', () => this.onWindowResize());
        
        console.log('📐 Three.js configurado');
    }

    /**
     * Inicializa sistemas de áudio
     */
    async initAudioSystems() {
        // Sistema de áudio
        this.audioSystem = new AudioSystem();
        await this.audioSystem.initialize();
        
        // Batidas binaurais
        this.binauralBeats = new BinauralBeats();
        await this.binauralBeats.initialize();
        
        console.log('🎵 Sistemas de áudio inicializados');
    }

    /**
     * Cria as três fases
     */
    createPhases() {
        // Sistema de transição
        this.phaseTransition = new PhaseTransition(
            this.scene,
            this.camera,
            this.renderer
        );
        
        // Fase 1: Pôr do Sol
        this.phase1 = new Phase1Sunset(
            this.scene,
            this.camera,
            this.audioSystem,
            this.binauralBeats
        );
        
        // Fase 2: Jardim Submerso
        this.phase2 = new Phase2Underwater(
            this.scene,
            this.camera,
            this.audioSystem,
            this.binauralBeats,
            this.renderer
        );
        
        // Fase 3: O Guardião
        this.phase3 = new Phase3Guardian(
            this.scene,
            this.camera,
            this.audioSystem,
            this.binauralBeats,
            this.renderer
        );
        
        console.log('🎭 Fases criadas');
    }

    /**
     * Configura transições entre fases
     */
    setupPhaseTransitions() {
        // Fase 1 → Fase 2
        this.phase1.onComplete = async () => {
            console.log('Fase 1 completa, transitando para Fase 2...');
            this.currentPhaseIndex = 1;
            await this.phaseTransition.startTransition(
                this.phase1,
                this.phase2,
                this.audioSystem,
                this.binauralBeats
            );
            this.currentPhase = this.phase2;
        };
        
        // Fase 2 → Fase 3
        this.phase2.onComplete = async () => {
            console.log('Fase 2 completa, transitando para Fase 3...');
            this.currentPhaseIndex = 2;
            await this.phaseTransition.startTransition(
                this.phase2,
                this.phase3,
                this.audioSystem,
                this.binauralBeats
            );
            this.currentPhase = this.phase3;
        };
        
        // Fase 3 → Fim
        this.phase3.onComplete = () => {
            console.log('Fase 3 completa, finalizando experiência...');
            this.endExperience();
        };
    }

    /**
     * Configura botões
     */
    setupButtons() {
        const startButton = document.getElementById('start-button');
        const restartButton = document.getElementById('restart-button');
        
        startButton.addEventListener('click', () => this.startGame());
        restartButton.addEventListener('click', () => this.restartGame());
    }

    /**
     * Inicia o jogo
     */
    async startGame() {
        if (this.isRunning) return;
        
        console.log('🎮 Iniciando jogo...');
        
        // 🔧 CORREÇÃO MOBILE: Desbloquear AudioContext IMEDIATAMENTE no click
        await this.unlockAudioContext();
        
        // Mostrar loading
        this.showScreen('loading');
        
        // Pequeno delay para mostrar loading
        await this.delay(2000);
        
        // Esconder welcome e loading, mostrar canvas e HUD
        this.hideScreen('welcome');
        this.hideScreen('loading');
        this.canvas.style.display = 'block';
        this.hudOverlay.classList.add('active');
        
        // Iniciar primeira fase
        this.currentPhaseIndex = 0;
        await this.phaseTransition.startTransition(
            null,
            this.phase1,
            this.audioSystem,
            this.binauralBeats
        );
        this.currentPhase = this.phase1;
        
        // Iniciar respiração guiada
        this.startBreathingIndicator();
        
        // Iniciar loop de renderização
        this.isRunning = true;
        this.animate();
        
        console.log('✨ Jogo iniciado!');
    }
    
    /**
     * Desbloqueia AudioContext para iOS/Android (restrição de autoplay)
     */
    async unlockAudioContext() {
        console.log('🔓 Desbloqueando AudioContext...');
        
        try {
            // Desbloquear binaural beats AudioContext
            if (this.binauralBeats && this.binauralBeats.audioContext) {
                const ctx = this.binauralBeats.audioContext;
                console.log(`🎵 AudioContext state: ${ctx.state}`);
                
                if (ctx.state === 'suspended') {
                    console.log('⏸️ AudioContext está suspenso, tentando resumir...');
                    await ctx.resume();
                    console.log(`✅ AudioContext resumido! Novo state: ${ctx.state}`);
                } else {
                    console.log('✅ AudioContext já está ativo');
                }
            }
            
            // Desbloquear voice system AudioContext
            if (this.audioSystem && this.audioSystem.voiceSystem && this.audioSystem.voiceSystem.audioContext) {
                const voiceCtx = this.audioSystem.voiceSystem.audioContext;
                console.log(`🎤 Voice AudioContext state: ${voiceCtx.state}`);
                
                if (voiceCtx.state === 'suspended') {
                    console.log('⏸️ Voice AudioContext está suspenso, tentando resumir...');
                    await voiceCtx.resume();
                    console.log(`✅ Voice AudioContext resumido! Novo state: ${voiceCtx.state}`);
                }
            }
            
            // 🔧 MOBILE FIX: Criar e tocar um áudio silencioso para desbloquear
            console.log('🔊 Criando áudio silencioso para desbloquear mobile...');
            const silentAudio = new Audio();
            silentAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAA4T0DIwcAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
            silentAudio.volume = 0.01;
            
            try {
                await silentAudio.play();
                silentAudio.pause();
                silentAudio.remove();
                console.log('✅ Áudio silencioso tocado com sucesso (mobile desbloqueado)');
            } catch (e) {
                console.warn('⚠️ Não foi possível tocar áudio silencioso:', e.message);
            }
            
        } catch (error) {
            console.error('❌ Erro ao desbloquear AudioContext:', error);
        }
    }

    /**
     * Loop de animação
     */
    animate() {
        if (!this.isRunning) return;
        
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        
        // Atualizar fase atual
        if (this.currentPhase && !this.isPaused) {
            this.currentPhase.update(deltaTime);
        }
        
        // Renderizar cena
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Inicia indicador de respiração
     */
    startBreathingIndicator() {
        if (!this.breathIndicator) return;
        
        // Mostrar por 30 segundos inicialmente
        this.breathIndicator.classList.add('breathing');
        
        setTimeout(() => {
            this.breathIndicator.classList.remove('breathing');
        }, 30000);
    }

    /**
     * Finaliza experiência
     */
    async endExperience() {
        console.log('🌟 Experiência finalizada');
        
        // 🎉 REGISTRAR SESSÃO COMPLETA NO SISTEMA DE EVOLUÇÃO
        if (window.evolutionSystem) {
            evolutionSystem.completeSession();
        }
        
        // Fade out final
        await this.delay(3000);
        
        // Parar tudo
        this.isRunning = false;
        this.audioSystem.stopAll();
        
        // Manter binaural por mais 2 minutos para facilitar o sono
        setTimeout(() => {
            this.binauralBeats.fadeOut(30);
        }, 120000);
        
        // Mostrar tela final
        this.canvas.style.display = 'none';
        this.hudOverlay.classList.remove('active');
        this.showScreen('end');
    }

    /**
     * Reinicia o jogo
     */
    async restartGame() {
        console.log('🔄 Reiniciando...');
        
        // Parar tudo
        this.isRunning = false;
        this.audioSystem.stopAll();
        this.binauralBeats.stop();
        
        // Reset rápido
        await this.phaseTransition.quickReset([
            this.phase1,
            this.phase2,
            this.phase3
        ]);
        
        // Esconder tela final
        this.hideScreen('end');
        
        // Mostrar welcome novamente
        this.showScreen('welcome');
        
        // Resetar clock
        this.clock = new THREE.Clock();
    }

    /**
     * Mostra uma tela
     */
    showScreen(screenName) {
        const screen = document.getElementById(`${screenName}-screen`);
        if (screen) {
            screen.classList.add('active');
        }
    }

    /**
     * Esconde uma tela
     */
    hideScreen(screenName) {
        const screen = document.getElementById(`${screenName}-screen`);
        if (screen) {
            screen.classList.remove('active');
            setTimeout(() => {
                screen.style.display = 'none';
            }, 2000);
        }
    }

    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Responsividade
     */
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }

    /**
     * Pausa/Resume (para debug)
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        console.log(this.isPaused ? '⏸️ Pausado' : '▶️ Resumido');
    }
}

// Inicializar quando o DOM estiver pronto
let game = null;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌙 O Guardião do Sono - v1.0');
    console.log('Uma experiência terapêutica de relaxamento profundo');
    
    // Criar instância do jogo
    game = new GuardianGame();
    
    // Inicializar
    await game.initialize();
    
    // Disponibilizar globalmente para debug
    window.game = game;
    
    // 🌟 Sincronizar avatar com nível atual (após evolutionSystem e avatar3D carregarem)
    setTimeout(() => {
        if (window.evolutionSystem && window.avatar3D) {
            avatar3D.updateLevel(evolutionSystem.currentLevel);
        }
    }, 500);
    
    console.log('💤 Pronto para iniciar. Clique em "Iniciar Jornada"');
});

// Prevenir que o dispositivo durma durante a experiência
let wakeLock = null;

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('🔒 Wake Lock ativado - tela não dormirá');
        } catch (err) {
            console.log('Wake Lock não disponível:', err);
        }
    }
}

// Ativar wake lock ao iniciar o jogo
document.getElementById('start-button')?.addEventListener('click', requestWakeLock);
