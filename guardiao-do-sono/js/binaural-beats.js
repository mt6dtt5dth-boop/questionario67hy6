/**
 * Sistema de Batidas Binaurais (Binaural Beats)
 * Gera frequências que induzem estados cerebrais específicos
 * 
 * Alfa (7-13 Hz): Relaxamento, meditação leve
 * Teta (4-7 Hz): Meditação profunda, sono leve
 * Delta (0.5-4 Hz): Sono profundo
 */

class BinauralBeats {
    constructor() {
        this.audioContext = null;
        this.leftOscillator = null;
        this.rightOscillator = null;
        this.leftGain = null;
        this.rightGain = null;
        this.merger = null;
        this.masterGain = null;
        
        this.baseFrequency = 200; // Frequência base confortável
        this.currentBeatFrequency = 7; // Começa em Alfa (7Hz)
        this.volume = 0.15; // Volume baixo para não incomodar
    }

    /**
     * Inicializa o contexto de áudio
     */
    async initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Criar merger para separar canais esquerdo e direito
            this.merger = this.audioContext.createChannelMerger(2);
            
            // Criar ganhos para cada canal
            this.leftGain = this.audioContext.createGain();
            this.rightGain = this.audioContext.createGain();
            
            // Criar ganho master
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.volume;
            
            // Conectar merger ao master gain e ao destino
            this.merger.connect(this.masterGain);
            this.masterGain.connect(this.audioContext.destination);
            
            return true;
        } catch (error) {
            console.error('Erro ao inicializar áudio binaural:', error);
            return false;
        }
    }

    /**
     * Inicia a reprodução das batidas binaurais
     */
    start(beatFrequency = 7) {
        if (!this.audioContext) {
            console.error('AudioContext não inicializado');
            return;
        }

        // Parar osciladores existentes
        this.stop();

        this.currentBeatFrequency = beatFrequency;

        // Criar osciladores
        this.leftOscillator = this.audioContext.createOscillator();
        this.rightOscillator = this.audioContext.createOscillator();

        // Configurar tipo de onda (sine = suave)
        this.leftOscillator.type = 'sine';
        this.rightOscillator.type = 'sine';

        // Configurar frequências
        // Canal esquerdo: frequência base
        this.leftOscillator.frequency.value = this.baseFrequency;
        
        // Canal direito: frequência base + diferença (cria o efeito binaural)
        this.rightOscillator.frequency.value = this.baseFrequency + beatFrequency;

        // Configurar ganhos
        this.leftGain.gain.value = 1;
        this.rightGain.gain.value = 1;

        // Conectar osciladores aos ganhos e depois ao merger
        this.leftOscillator.connect(this.leftGain);
        this.rightOscillator.connect(this.rightGain);
        
        this.leftGain.connect(this.merger, 0, 0); // Canal esquerdo
        this.rightGain.connect(this.merger, 0, 1); // Canal direito

        // Iniciar osciladores
        this.leftOscillator.start();
        this.rightOscillator.start();
    }

    /**
     * Para a reprodução
     */
    stop() {
        if (this.leftOscillator) {
            try {
                this.leftOscillator.stop();
                this.leftOscillator.disconnect();
            } catch (e) { /* já parado */ }
            this.leftOscillator = null;
        }

        if (this.rightOscillator) {
            try {
                this.rightOscillator.stop();
                this.rightOscillator.disconnect();
            } catch (e) { /* já parado */ }
            this.rightOscillator = null;
        }
    }

    /**
     * Transição suave entre frequências
     */
    transitionTo(targetFrequency, durationSeconds = 5) {
        if (!this.rightOscillator || !this.audioContext) return;

        const currentTime = this.audioContext.currentTime;
        const targetRightFreq = this.baseFrequency + targetFrequency;

        // Transição exponencial suave
        this.rightOscillator.frequency.exponentialRampToValueAtTime(
            targetRightFreq,
            currentTime + durationSeconds
        );

        this.currentBeatFrequency = targetFrequency;
    }

    /**
     * Fade in do volume
     */
    fadeIn(durationSeconds = 3) {
        if (!this.masterGain || !this.audioContext) return;

        const currentTime = this.audioContext.currentTime;
        this.masterGain.gain.setValueAtTime(0, currentTime);
        this.masterGain.gain.linearRampToValueAtTime(
            this.volume,
            currentTime + durationSeconds
        );
    }

    /**
     * Fade out do volume
     */
    fadeOut(durationSeconds = 5) {
        if (!this.masterGain || !this.audioContext) return;

        const currentTime = this.audioContext.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(
            0,
            currentTime + durationSeconds
        );
    }

    /**
     * Ajusta o volume geral
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.masterGain) {
            this.masterGain.gain.value = this.volume;
        }
    }

    /**
     * Retorna a frequência atual
     */
    getCurrentFrequency() {
        return this.currentBeatFrequency;
    }

    /**
     * Verifica se está tocando
     */
    isPlaying() {
        return this.leftOscillator !== null && this.rightOscillator !== null;
    }
}

// Exportar para uso global
window.BinauralBeats = BinauralBeats;
