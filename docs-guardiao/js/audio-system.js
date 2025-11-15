/**
 * Sistema de Áudio e Narração
 * Gerencia sons ambientes e narração com voz sintética ou APIs externas
 */

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.ambientSounds = {};
        this.narrationQueue = [];
        this.isNarrating = false;
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.ambientGain = null;
        this.masterVolume = 0.3;
        
        // Usar novo VoiceSystem se disponível
        this.voiceSystem = null;
        this.useNewVoiceSystem = typeof VoiceSystem !== 'undefined';
    }

    /**
     * Inicializa o sistema de áudio
     */
    async initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.ambientGain = this.audioContext.createGain();
            this.ambientGain.gain.value = this.masterVolume;
            this.ambientGain.connect(this.audioContext.destination);
            
            // Inicializar novo sistema de voz
            if (this.useNewVoiceSystem) {
                this.voiceSystem = new VoiceSystem();
                await this.voiceSystem.initialize();
                this.voiceSystem.loadVoicePreference();
                console.log('✅ VoiceSystem avançado inicializado');
            }
            
            return true;
        } catch (error) {
            console.error('Erro ao inicializar sistema de áudio:', error);
            return false;
        }
    }

    /**
     * Cria som ambiente procedural (vento, água, etc)
     */
    createAmbientSound(type, options = {}) {
        if (!this.audioContext) return null;

        const {
            frequency = 100,
            volume = 0.1,
            type: oscillatorType = 'sine'
        } = options;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.type = oscillatorType;
        oscillator.frequency.value = frequency;
        
        filter.type = 'lowpass';
        filter.frequency.value = 500;
        filter.Q.value = 1;

        gainNode.gain.value = volume;

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ambientGain);

        return { oscillator, gainNode, filter };
    }

    /**
     * Inicia som de vento suave
     */
    startWind() {
        const windSound = this.createAmbientSound('wind', {
            frequency: 150,
            volume: 0.05,
            type: 'sawtooth'
        });

        if (windSound) {
            this.ambientSounds.wind = windSound;
            windSound.oscillator.start();
            
            // Modulação aleatória para simular vento
            this.modulateWind(windSound);
        }
    }

    /**
     * Modula o som do vento aleatoriamente
     */
    modulateWind(windSound) {
        if (!windSound || !this.audioContext) return;

        const modulate = () => {
            if (!this.ambientSounds.wind) return;

            const currentTime = this.audioContext.currentTime;
            const randomFreq = 100 + Math.random() * 100;
            const randomGain = 0.03 + Math.random() * 0.04;

            windSound.oscillator.frequency.exponentialRampToValueAtTime(
                randomFreq,
                currentTime + 3
            );
            windSound.gainNode.gain.linearRampToValueAtTime(
                randomGain,
                currentTime + 3
            );

            setTimeout(modulate, 3000);
        };

        modulate();
    }

    /**
     * Som de água (bolhas, ondas)
     */
    startWater() {
        const waterSound = this.createAmbientSound('water', {
            frequency: 200,
            volume: 0.08,
            type: 'sine'
        });

        if (waterSound) {
            this.ambientSounds.water = waterSound;
            waterSound.oscillator.start();
            
            // Criar efeito de bolhas
            this.createBubbles();
        }
    }

    /**
     * Cria efeito de bolhas de água
     */
    createBubbles() {
        const createBubble = () => {
            if (!this.ambientSounds.water || !this.audioContext) return;

            const bubble = this.audioContext.createOscillator();
            const bubbleGain = this.audioContext.createGain();

            bubble.type = 'sine';
            bubble.frequency.value = 400 + Math.random() * 400;
            bubbleGain.gain.value = 0.02;

            bubble.connect(bubbleGain);
            bubbleGain.connect(this.ambientGain);

            const currentTime = this.audioContext.currentTime;
            bubble.start(currentTime);
            
            // Fade out rápido
            bubbleGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.5);
            bubble.stop(currentTime + 0.5);

            // Próxima bolha em intervalo aleatório
            const nextBubble = 1000 + Math.random() * 3000;
            setTimeout(createBubble, nextBubble);
        };

        createBubble();
    }

    /**
     * Para todos os sons ambientes
     */
    stopAllAmbient() {
        Object.keys(this.ambientSounds).forEach(key => {
            const sound = this.ambientSounds[key];
            if (sound && sound.oscillator) {
                try {
                    sound.oscillator.stop();
                    sound.oscillator.disconnect();
                } catch (e) { /* já parado */ }
            }
        });
        this.ambientSounds = {};
    }

    /**
     * Configura voz brasileira para narração
     */
    getVoice() {
        const voices = this.speechSynthesis.getVoices();
        
        // Procurar voz em português brasileiro
        let voice = voices.find(v => v.lang === 'pt-BR' && v.name.includes('Google'));
        
        // Fallback para qualquer voz em português
        if (!voice) {
            voice = voices.find(v => v.lang.startsWith('pt'));
        }
        
        // Fallback para voz padrão
        if (!voice && voices.length > 0) {
            voice = voices[0];
        }

        return voice;
    }

    /**
     * Narra texto com voz suave e lenta (usa VoiceSystem se disponível)
     */
    async narrate(text, options = {}) {
        // Usar novo VoiceSystem se disponível
        if (this.useNewVoiceSystem && this.voiceSystem) {
            return await this.voiceSystem.narrate(text, options);
        }
        
        // Fallback para sistema antigo
        return new Promise((resolve) => {
            if (!this.speechSynthesis) {
                console.warn('Speech synthesis não disponível');
                resolve();
                return;
            }

            const {
                rate = 0.7,  // Velocidade lenta (70 BPM aproximado)
                pitch = 0.9, // Tom levemente grave
                volume = 0.8
            } = options;

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = this.getVoice();
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.volume = volume;
            utterance.lang = 'pt-BR';

            utterance.onend = () => {
                this.isNarrating = false;
                this.currentUtterance = null;
                resolve();
            };

            utterance.onerror = (error) => {
                console.error('Erro na narração:', error);
                this.isNarrating = false;
                resolve();
            };

            this.isNarrating = true;
            this.currentUtterance = utterance;
            this.speechSynthesis.speak(utterance);
        });
    }

    /**
     * Para a narração atual
     */
    stopNarration() {
        if (this.speechSynthesis && this.isNarrating) {
            this.speechSynthesis.cancel();
            this.isNarrating = false;
            this.currentUtterance = null;
        }
    }

    /**
     * Fade out de todos os sons
     */
    fadeOutAll(duration = 5) {
        if (!this.ambientGain || !this.audioContext) return;

        const currentTime = this.audioContext.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0, currentTime + duration);
    }

    /**
     * Para tudo
     */
    stopAll() {
        this.stopNarration();
        this.stopAllAmbient();
    }
}

// Exportar para uso global
window.AudioSystem = AudioSystem;
