/**
 * 🔒 Sistema de Wake Lock - Mantém áudio tocando quando tela desliga
 * 
 * Previne que o navegador pause o áudio quando:
 * - Usuário desliga a tela do celular
 * - App vai para background
 * - Celular entra em modo de economia de energia
 * 
 * Usa Screen Wake Lock API (quando disponível) + fallbacks
 */

class WakeLockSystem {
    constructor() {
        this.wakeLock = null;
        this.isSupported = 'wakeLock' in navigator;
        this.isActive = false;
        
        console.log(`🔒 Wake Lock suportado: ${this.isSupported}`);
        
        // Listeners para reativar wake lock
        this.setupEventListeners();
    }
    
    /**
     * Ativa o Wake Lock
     */
    async enable() {
        if (!this.isSupported) {
            console.warn('⚠️ Wake Lock API não suportada neste navegador');
            this.setupFallbacks();
            return false;
        }
        
        try {
            console.log('🔒 Solicitando Wake Lock...');
            this.wakeLock = await navigator.wakeLock.request('screen');
            this.isActive = true;
            
            console.log('✅ Wake Lock ativado!');
            
            // Listener para quando wake lock é liberado
            this.wakeLock.addEventListener('release', () => {
                console.log('🔓 Wake Lock liberado');
                this.isActive = false;
            });
            
            return true;
            
        } catch (error) {
            console.error('❌ Erro ao ativar Wake Lock:', error);
            this.setupFallbacks();
            return false;
        }
    }
    
    /**
     * Desativa o Wake Lock
     */
    async disable() {
        if (this.wakeLock && this.isActive) {
            try {
                await this.wakeLock.release();
                this.wakeLock = null;
                this.isActive = false;
                console.log('🔓 Wake Lock desativado');
            } catch (error) {
                console.error('❌ Erro ao desativar Wake Lock:', error);
            }
        }
    }
    
    /**
     * Configura event listeners para reativar wake lock
     */
    setupEventListeners() {
        // Reativar quando página fica visível novamente
        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState === 'visible' && !this.isActive) {
                console.log('👁️ Página ficou visível, reativando Wake Lock...');
                await this.enable();
            }
        });
        
        // iOS: Listeners específicos
        window.addEventListener('focus', async () => {
            if (!this.isActive) {
                console.log('🎯 Window focus, tentando reativar Wake Lock...');
                await this.enable();
            }
        });
        
        // Listener para quando usuário interage novamente
        const reactivate = async () => {
            if (!this.isActive) {
                console.log('👆 Interação detectada, reativando Wake Lock...');
                await this.enable();
            }
        };
        
        // Só adiciona uma vez
        document.addEventListener('touchstart', reactivate, { once: true, passive: true });
        document.addEventListener('click', reactivate, { once: true, passive: true });
    }
    
    /**
     * Fallbacks para navegadores sem Wake Lock API
     */
    setupFallbacks() {
        console.log('🔄 Configurando fallbacks para manter áudio ativo...');
        
        // 1️⃣ Prevenir pausa automática via Page Visibility API
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('📱 Página oculta - mantendo áudio...');
                // Forçar áudio a continuar
                window.dispatchEvent(new CustomEvent('keep-audio-alive'));
                
                // 🆕 FORÇA: Resumir todos os AudioContext
                this.resumeAllAudioContexts();
            } else {
                console.log('📱 Página visível novamente');
                this.resumeAllAudioContexts();
            }
        });
        
        // 2️⃣ iOS: Prevenir sleep via meta viewport (já adicionado no HTML)
        
        // 3️⃣ Criar oscillator invisível que mantém AudioContext ativo
        this.createSilentOscillator();
        
        // 4️⃣ 🆕 Media Session API para controle em background
        this.setupMediaSession();
    }
    
    /**
     * 🆕 Resume todos os AudioContext quando página fica oculta
     */
    resumeAllAudioContexts() {
        console.log('🔊 Forçando todos os AudioContext a continuarem...');
        
        // Procurar todos os AudioContext globais
        const contexts = [
            window.audioContext,
            window.binauralContext,
            window.voiceContext
        ].filter(Boolean);
        
        contexts.forEach(ctx => {
            if (ctx.state === 'suspended' || ctx.state === 'interrupted') {
                console.log(`▶️ Resumindo AudioContext (state: ${ctx.state})`);
                ctx.resume().catch(e => console.warn('⚠️ Erro ao resumir:', e));
            }
        });
    }
    
    /**
     * 🆕 Configura Media Session API para background playback
     */
    setupMediaSession() {
        if (!('mediaSession' in navigator)) {
            console.warn('⚠️ Media Session API não suportada');
            return;
        }
        
        console.log('🎵 Configurando Media Session API...');
        
        // Metadata para aparecer na tela de bloqueio / notificação
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'O Guardião do Sono',
            artist: 'Jornada Terapêutica',
            album: 'Relaxamento Profundo',
            artwork: [
                {
                    src: 'https://via.placeholder.com/96x96.png?text=🌙',
                    sizes: '96x96',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/128x128.png?text=🌙',
                    sizes: '128x128',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/192x192.png?text=🌙',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/256x256.png?text=🌙',
                    sizes: '256x256',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/384x384.png?text=🌙',
                    sizes: '384x384',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/512x512.png?text=🌙',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        });
        
        // Action handlers (botões na notificação/lock screen)
        navigator.mediaSession.setActionHandler('play', () => {
            console.log('▶️ Media Session: Play');
            window.dispatchEvent(new CustomEvent('media-session-play'));
        });
        
        navigator.mediaSession.setActionHandler('pause', () => {
            console.log('⏸️ Media Session: Pause');
            window.dispatchEvent(new CustomEvent('media-session-pause'));
        });
        
        navigator.mediaSession.setActionHandler('stop', () => {
            console.log('⏹️ Media Session: Stop');
            window.dispatchEvent(new CustomEvent('media-session-stop'));
        });
        
        // Seekbackward/forward (opcional)
        try {
            navigator.mediaSession.setActionHandler('seekbackward', () => {
                console.log('⏪ Media Session: Seek Backward');
            });
            
            navigator.mediaSession.setActionHandler('seekforward', () => {
                console.log('⏩ Media Session: Seek Forward');
            });
        } catch (e) {
            // Alguns navegadores não suportam
            console.log('ℹ️ Seek actions não suportados');
        }
        
        console.log('✅ Media Session configurado!');
    }
    
    /**
     * Cria oscillator silencioso para manter AudioContext ativo
     * (truque para iOS/Safari)
     */
    createSilentOscillator() {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            
            const ctx = new AudioContextClass();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            // Volume zero (inaudível mas mantém contexto ativo)
            gainNode.gain.value = 0;
            
            oscillator.frequency.value = 440;
            oscillator.start();
            
            console.log('🔇 Oscillator silencioso criado (mantém AudioContext)');
            
            // Guardar referência
            this.silentOscillator = oscillator;
            this.silentContext = ctx;
            
        } catch (error) {
            console.warn('⚠️ Não foi possível criar oscillator silencioso:', error);
        }
    }
    
    /**
     * Para o oscillator silencioso
     */
    stopSilentOscillator() {
        if (this.silentOscillator) {
            try {
                this.silentOscillator.stop();
                this.silentContext?.close();
                console.log('🔇 Oscillator silencioso parado');
            } catch (error) {
                console.warn('⚠️ Erro ao parar oscillator:', error);
            }
        }
    }
    
    /**
     * Verifica status atual
     */
    getStatus() {
        return {
            supported: this.isSupported,
            active: this.isActive,
            wakeLock: !!this.wakeLock,
            silentOscillator: !!this.silentOscillator
        };
    }
}

// Exportar para uso global
window.WakeLockSystem = WakeLockSystem;

// Log de inicialização
console.log('🔒 Wake Lock System carregado');
