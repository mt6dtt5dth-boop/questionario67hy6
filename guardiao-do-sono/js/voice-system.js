/**
 * Sistema de Voz Humana Aprimorado
 * Suporta múltiplas fontes de voz: Web Speech API, Google TTS, ElevenLabs
 */

class VoiceSystem {
    constructor() {
        this.voiceMode = 'webspeech'; // 'webspeech', 'google', 'elevenlabs', 'recorded'
        this.speechSynthesis = window.speechSynthesis;
        this.audioContext = null;
        this.voiceCache = {}; // Cache de áudios gravados
        
        // Configurações de voz por modo
        this.voiceConfigs = {
            webspeech: {
                rate: 0.65,
                pitch: 0.88,
                volume: 0.9,
                lang: 'pt-BR'
            },
            google: {
                languageCode: 'pt-BR',
                ssmlGender: 'FEMALE', // ou 'MALE'
                voiceName: 'pt-BR-Standard-A' // Voz feminina brasileira
            },
            elevenlabs: {
                voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam (masculina) ou escolher outra
                modelId: 'eleven_multilingual_v2',
                stability: 0.5,
                similarityBoost: 0.75
            }
        };
        
        // Lista de narrações do jogo
        this.narrations = {
            phase1_1: {
                text: "Cada luz que se apaga no horizonte é um pensamento que se despede. Você não precisa fazer nada. Só deixar que o silêncio volte a morar em você.",
                timing: 3000,
                phase: 1
            },
            phase1_2: {
                text: "Observe as cores se transformando. Cada respiração escurece o cenário. O dia já passou. Agora é hora de descansar.",
                timing: 45000,
                phase: 1
            },
            phase2_1: {
                text: "Essas bolhas são partes do seu dia. Toque, e veja-as subirem... libertas. A mente aprende que soltar é dormir.",
                timing: 3000,
                phase: 2
            },
            phase2_2: {
                text: "Cada bolha que sobe leva consigo uma preocupação. Você está seguro aqui, no fundo tranquilo. Nada pode perturbá-lo.",
                timing: 80000,
                phase: 2
            },
            phase2_3: {
                text: "Sinta a leveza da água sustentando você. Não há peso. Não há pressa. Apenas a suave corrente do descanso.",
                timing: 160000,
                phase: 2
            },
            phase3_1: {
                text: "Sou o reflexo do seu próprio descanso. Enquanto você dorme, eu permaneço desperto. Tudo está bem. Tudo pode parar.",
                timing: 5000,
                phase: 3,
                rate: 0.6,
                pitch: 0.85
            },
            phase3_2: {
                text: "Não há nada a fazer. Não há nada a controlar. Seu corpo descansa. Sua mente se cura. Eu cuido de tudo enquanto você se entrega ao sono.",
                timing: 60000,
                phase: 3,
                rate: 0.6,
                pitch: 0.85
            },
            phase3_3: {
                text: "Agora, feche seus olhos internos. Deixe a escuridão abraçá-lo. Você está seguro. Você está em paz. Durma.",
                timing: 120000,
                phase: 3,
                rate: 0.5,
                pitch: 0.8
            }
        };
    }

    /**
     * Inicializa o sistema de áudio
     */
    async initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Carregar vozes disponíveis
            await this.loadAvailableVoices();
            
            return true;
        } catch (error) {
            console.error('Erro ao inicializar sistema de voz:', error);
            return false;
        }
    }

    /**
     * Carrega vozes disponíveis do navegador
     */
    async loadAvailableVoices() {
        return new Promise((resolve) => {
            if (!this.speechSynthesis) {
                console.warn('⚠️ speechSynthesis não disponível');
                resolve();
                return;
            }

            const loadVoices = () => {
                let voices = this.speechSynthesis.getVoices();
                
                if (voices.length > 0) {
                    this.availableVoices = voices;
                    console.log(`✅ ${voices.length} vozes carregadas`);
                    
                    // Listar vozes PT-BR disponíveis
                    const ptBrVoices = voices.filter(v => v.lang.startsWith('pt'));
                    console.log(`🇧🇷 Vozes em Português: ${ptBrVoices.length}`);
                    ptBrVoices.forEach((v, i) => {
                        console.log(`  ${i+1}. ${v.name} (${v.lang}) ${v.default ? '⭐' : ''}`);
                    });
                    
                    resolve();
                } else {
                    console.log('⏳ Aguardando carregamento de vozes...');
                    return false;
                }
                
                return true;
            };

            // Tentar carregar imediatamente
            if (loadVoices()) {
                return;
            }

            // Se não carregou, esperar evento
            this.speechSynthesis.onvoiceschanged = () => {
                if (loadVoices()) {
                    this.speechSynthesis.onvoiceschanged = null;
                }
            };

            // Timeout de segurança (5 segundos)
            setTimeout(() => {
                if (!this.availableVoices || this.availableVoices.length === 0) {
                    console.warn('⚠️ Timeout ao carregar vozes, usando padrão');
                    this.availableVoices = this.speechSynthesis.getVoices();
                }
                resolve();
            }, 5000);
        });
    }

    /**
     * Seleciona a melhor voz PT-BR disponível
     */
    getBestVoice() {
        if (!this.availableVoices || this.availableVoices.length === 0) {
            console.warn('⚠️ Nenhuma voz disponível ainda');
            return null;
        }

        console.log(`🔍 Buscando melhor voz entre ${this.availableVoices.length} vozes disponíveis`);

        // Prioridade de vozes PT-BR (mais específico primeiro)
        const priorities = [
            // Google Chrome (melhores)
            { pattern: 'Google português do Brasil', priority: 1 },
            { pattern: 'pt-BR-Wavenet', priority: 1 },
            
            // Microsoft Edge
            { pattern: 'Microsoft Maria', priority: 2 },
            { pattern: 'Microsoft Francisca', priority: 2 },
            
            // macOS/iOS
            { pattern: 'Luciana', priority: 3 },
            { pattern: 'Fernanda', priority: 3 },
            { pattern: 'Joana', priority: 3 },
            
            // Android
            { pattern: 'pt-br-x-', priority: 4 },
            
            // Genéricos
            { pattern: 'pt-BR', priority: 5 },
            { pattern: 'pt_BR', priority: 6 }
        ];

        let bestVoice = null;
        let bestPriority = 999;

        for (let voice of this.availableVoices) {
            // Só considerar vozes PT ou PT-BR
            if (!voice.lang.startsWith('pt')) continue;

            for (let { pattern, priority } of priorities) {
                if (voice.name.includes(pattern) || voice.lang.includes(pattern)) {
                    if (priority < bestPriority) {
                        bestVoice = voice;
                        bestPriority = priority;
                    }
                    break;
                }
            }
        }

        if (bestVoice) {
            console.log(`✅ Melhor voz encontrada: ${bestVoice.name} (${bestVoice.lang}) [Prioridade: ${bestPriority}]`);
            return bestVoice;
        }

        // Fallback: qualquer voz português
        const ptVoice = this.availableVoices.find(v => v.lang.startsWith('pt'));
        if (ptVoice) {
            console.log(`⚠️ Voz fallback PT: ${ptVoice.name} (${ptVoice.lang})`);
            return ptVoice;
        }

        // Último fallback: primeira voz disponível
        console.warn(`⚠️ Nenhuma voz PT encontrada! Usando: ${this.availableVoices[0].name}`);
        return this.availableVoices[0];
    }

    /**
     * Narra usando Web Speech API (melhorado)
     */
    async narrateWebSpeech(text, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.speechSynthesis) {
                console.warn('⚠️ Speech Synthesis não disponível');
                resolve();
                return;
            }

            const config = this.voiceConfigs.webspeech;
            const {
                rate = options.rate || config.rate,
                pitch = options.pitch || config.pitch,
                volume = options.volume || config.volume
            } = options;

            console.log(`🎤 Web Speech Config: rate=${rate}, pitch=${pitch}, volume=${volume}`);

            const utterance = new SpeechSynthesisUtterance(text);
            
            // Garantir que as vozes foram carregadas
            const voice = this.getBestVoice();
            if (voice) {
                utterance.voice = voice;
                console.log(`🔊 Usando voz: ${voice.name}`);
            } else {
                console.warn('⚠️ Nenhuma voz selecionada, usando padrão do sistema');
            }
            
            utterance.lang = config.lang;
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.volume = volume;

            utterance.onstart = () => {
                console.log('▶️ Narração iniciada');
            };

            utterance.onend = () => {
                console.log('✅ Narração concluída:', text.substring(0, 30) + '...');
                resolve();
            };

            utterance.onerror = (error) => {
                console.error('❌ Erro na narração:', error);
                console.error('Detalhes:', {
                    error: error.error,
                    charIndex: error.charIndex
                });
                resolve(); // Resolve mesmo com erro para não travar o jogo
            };

            // Cancelar qualquer narração anterior
            this.speechSynthesis.cancel();
            
            // Pequeno delay para garantir que cancelamento funcionou
            setTimeout(() => {
                console.log('🚀 Iniciando fala...');
                this.speechSynthesis.speak(utterance);
            }, 150);
        });
    }

    /**
     * Narra usando Google Cloud Text-to-Speech
     * Requer API key configurada
     */
    async narrateGoogleTTS(text, options = {}) {
        const apiKey = this.getGoogleAPIKey();
        
        if (!apiKey) {
            console.warn('Google TTS API key não configurada, usando Web Speech');
            return this.narrateWebSpeech(text, options);
        }

        try {
            const config = this.voiceConfigs.google;
            
            const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: { text: text },
                    voice: {
                        languageCode: config.languageCode,
                        ssmlGender: config.ssmlGender,
                        name: config.voiceName
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        speakingRate: options.rate || 0.85,
                        pitch: (options.pitch - 1) * 20 || -2, // Converter para range do Google
                        volumeGainDb: 0
                    }
                })
            });

            const data = await response.json();
            
            if (data.audioContent) {
                await this.playAudioBase64(data.audioContent);
                console.log('✅ Google TTS concluído');
            } else {
                throw new Error('Sem audioContent na resposta');
            }
            
        } catch (error) {
            console.error('❌ Erro no Google TTS:', error);
            console.log('Fallback para Web Speech');
            return this.narrateWebSpeech(text, options);
        }
    }

    /**
     * Narra usando ElevenLabs (voz ultra-realista)
     * Requer API key configurada
     */
    async narrateElevenLabs(text, options = {}) {
        const apiKey = this.getElevenLabsAPIKey();
        
        console.log('🎤 ElevenLabs - Verificando API key...');
        
        if (!apiKey) {
            console.warn('⚠️ ElevenLabs API key não configurada, usando Web Speech');
            return this.narrateWebSpeech(text, options);
        }

        console.log(`✅ API key encontrada: ${apiKey.substring(0, 10)}...`);
        console.log(`📝 Texto a narrar (${text.length} caracteres):`, text.substring(0, 50) + '...');

        try {
            const config = this.voiceConfigs.elevenlabs;
            
            console.log(`🔊 Usando voz: ${config.voiceId}`);
            console.log(`🎛️ Modelo: ${config.modelId}`);
            
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: config.modelId,
                    voice_settings: {
                        stability: config.stability,
                        similarity_boost: config.similarityBoost,
                        style: 0.5,
                        use_speaker_boost: true
                    }
                })
            });

            console.log(`📡 Response status: ${response.status}`);

            if (response.ok) {
                console.log('✅ Áudio recebido, reproduzindo...');
                const audioBlob = await response.blob();
                console.log(`📦 Blob size: ${audioBlob.size} bytes`);
                await this.playAudioBlob(audioBlob);
                console.log('✅ ElevenLabs concluído com sucesso!');
            } else {
                const errorText = await response.text();
                console.error(`❌ ElevenLabs error ${response.status}:`, errorText);
                throw new Error(`ElevenLabs error: ${response.status} - ${errorText}`);
            }
            
        } catch (error) {
            console.error('❌ Erro no ElevenLabs:', error);
            console.log('🔄 Fallback para Web Speech');
            return this.narrateWebSpeech(text, options);
        }
    }

    /**
     * Toca áudio de base64 (para Google TTS)
     */
    async playAudioBase64(base64Audio) {
        return new Promise((resolve, reject) => {
            const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
            audio.onended = resolve;
            audio.onerror = reject;
            audio.play().catch(reject);
        });
    }

    /**
     * Toca áudio de blob (para ElevenLabs)
     */
    async playAudioBlob(blob) {
        return new Promise((resolve, reject) => {
            console.log('🎵 Criando URL do blob...');
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            
            console.log('🔊 Configurando eventos de áudio...');
            
            audio.onloadedmetadata = () => {
                console.log(`⏱️ Duração do áudio: ${audio.duration.toFixed(2)}s`);
            };
            
            audio.oncanplaythrough = () => {
                console.log('✅ Áudio pronto para reprodução');
            };
            
            audio.onplay = () => {
                console.log('▶️ Reprodução iniciada');
            };
            
            audio.onended = () => {
                console.log('⏹️ Reprodução concluída');
                URL.revokeObjectURL(url);
                resolve();
            };
            
            audio.onerror = (error) => {
                console.error('❌ Erro ao reproduzir áudio:', error);
                console.error('Audio error code:', audio.error?.code);
                console.error('Audio error message:', audio.error?.message);
                URL.revokeObjectURL(url);
                reject(error);
            };
            
            console.log('🚀 Iniciando reprodução...');
            audio.play()
                .then(() => console.log('✅ Play() executado com sucesso'))
                .catch(error => {
                    console.error('❌ Erro no play():', error);
                    reject(error);
                });
        });
    }

    /**
     * Método principal de narração (detecta modo automaticamente)
     */
    async narrate(textOrKey, options = {}) {
        // Se for uma chave, buscar nos narrations
        let text = textOrKey;
        if (this.narrations[textOrKey]) {
            text = this.narrations[textOrKey].text;
            // Usar configurações específicas da narração se existirem
            if (this.narrations[textOrKey].rate) {
                options.rate = this.narrations[textOrKey].rate;
            }
            if (this.narrations[textOrKey].pitch) {
                options.pitch = this.narrations[textOrKey].pitch;
            }
        }

        console.log(`🎤 Narrando (${this.voiceMode}):`, text.substring(0, 40) + '...');

        switch (this.voiceMode) {
            case 'google':
                return this.narrateGoogleTTS(text, options);
            
            case 'elevenlabs':
                return this.narrateElevenLabs(text, options);
            
            case 'webspeech':
            default:
                return this.narrateWebSpeech(text, options);
        }
    }

    /**
     * Define o modo de voz
     */
    setVoiceMode(mode) {
        const validModes = ['webspeech', 'google', 'elevenlabs'];
        
        if (validModes.includes(mode)) {
            this.voiceMode = mode;
            console.log('✅ Modo de voz alterado para:', mode);
            
            // Salvar preferência
            localStorage.setItem('guardiao_voice_mode', mode);
        } else {
            console.error('❌ Modo de voz inválido:', mode);
        }
    }

    /**
     * Carrega preferência de voz do localStorage
     */
    loadVoicePreference() {
        const saved = localStorage.getItem('guardiao_voice_mode');
        if (saved) {
            this.voiceMode = saved;
            console.log('📂 Preferência de voz carregada:', saved);
        }
    }

    /**
     * Obtém API key do Google TTS (do localStorage ou variável)
     */
    getGoogleAPIKey() {
        return localStorage.getItem('google_tts_api_key') || null;
    }

    /**
     * Obtém API key do ElevenLabs (do localStorage ou variável)
     */
    getElevenLabsAPIKey() {
        return localStorage.getItem('elevenlabs_api_key') || null;
    }

    /**
     * Salva API keys
     */
    setAPIKeys(googleKey, elevenLabsKey) {
        if (googleKey) {
            localStorage.setItem('google_tts_api_key', googleKey);
            console.log('✅ Google TTS API key salva');
        }
        
        if (elevenLabsKey) {
            localStorage.setItem('elevenlabs_api_key', elevenLabsKey);
            console.log('✅ ElevenLabs API key salva');
        }
    }

    /**
     * Para qualquer narração em andamento
     */
    stop() {
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
    }

    /**
     * Lista vozes disponíveis (debug)
     */
    listAvailableVoices() {
        console.log('🎤 Vozes disponíveis:');
        if (this.availableVoices) {
            this.availableVoices
                .filter(v => v.lang.startsWith('pt'))
                .forEach((voice, index) => {
                    console.log(`  ${index + 1}. ${voice.name} (${voice.lang}) ${voice.default ? '⭐' : ''}`);
                });
        }
    }
}

// Exportar para uso global
window.VoiceSystem = VoiceSystem;
