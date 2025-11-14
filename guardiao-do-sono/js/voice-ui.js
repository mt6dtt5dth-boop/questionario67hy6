/**
 * Interface UI para configuração de voz
 */

document.addEventListener('DOMContentLoaded', () => {
    const voiceOptions = document.querySelectorAll('.voice-option');
    const configAPIButton = document.getElementById('config-api-button');
    const apiConfigScreen = document.getElementById('api-config-screen');
    const closeAPIConfig = document.getElementById('close-api-config');
    const saveAPIKeys = document.getElementById('save-api-keys');
    const googleAPIInput = document.getElementById('google-api-key');
    const elevenLabsAPIInput = document.getElementById('elevenlabs-api-key');

    // Carregar preferência salva
    const savedVoiceMode = localStorage.getItem('guardiao_voice_mode') || 'webspeech';
    
    // Marcar opção salva
    voiceOptions.forEach(option => {
        if (option.dataset.voice === savedVoiceMode) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Carregar API keys existentes (mascaradas)
    const googleKey = localStorage.getItem('google_tts_api_key');
    const elevenLabsKey = localStorage.getItem('elevenlabs_api_key');
    
    if (googleKey) {
        googleAPIInput.value = maskAPIKey(googleKey);
        googleAPIInput.dataset.masked = 'true';
    }
    
    if (elevenLabsKey) {
        elevenLabsAPIInput.value = maskAPIKey(elevenLabsKey);
        elevenLabsAPIInput.dataset.masked = 'true';
    }

    // Seleção de voz
    voiceOptions.forEach(option => {
        option.addEventListener('click', () => {
            const voiceMode = option.dataset.voice;
            
            // Remover classe active de todos
            voiceOptions.forEach(opt => opt.classList.remove('active'));
            
            // Adicionar classe active ao clicado
            option.classList.add('active');
            
            // Salvar preferência
            localStorage.setItem('guardiao_voice_mode', voiceMode);
            
            // Atualizar sistema de voz global (se já existir)
            if (window.game && window.game.voiceSystem) {
                window.game.voiceSystem.setVoiceMode(voiceMode);
            }

            // Mostrar aviso se não tiver API key
            if ((voiceMode === 'google' && !googleKey) || 
                (voiceMode === 'elevenlabs' && !elevenLabsKey)) {
                showAPIWarning(voiceMode);
            }
        });
    });

    // Abrir configuração de API
    configAPIButton.addEventListener('click', () => {
        apiConfigScreen.classList.add('active');
    });

    // Fechar configuração de API
    closeAPIConfig.addEventListener('click', () => {
        apiConfigScreen.classList.remove('active');
    });

    // Desmascarar input ao focar
    [googleAPIInput, elevenLabsAPIInput].forEach(input => {
        input.addEventListener('focus', () => {
            if (input.dataset.masked === 'true') {
                input.value = '';
                input.dataset.masked = 'false';
            }
        });
    });

    // Salvar API keys
    saveAPIKeys.addEventListener('click', () => {
        const googleKey = googleAPIInput.value.trim();
        const elevenLabsKey = elevenLabsAPIInput.value.trim();

        let saved = false;

        if (googleKey && googleAPIInput.dataset.masked !== 'true') {
            localStorage.setItem('google_tts_api_key', googleKey);
            console.log('✅ Google TTS API key salva');
            saved = true;
        }

        if (elevenLabsKey && elevenLabsAPIInput.dataset.masked !== 'true') {
            localStorage.setItem('elevenlabs_api_key', elevenLabsKey);
            console.log('✅ ElevenLabs API key salva');
            saved = true;
        }

        if (saved) {
            // Feedback visual
            saveAPIKeys.textContent = '✅ Salvo!';
            saveAPIKeys.style.background = '#4caf50';
            
            setTimeout(() => {
                saveAPIKeys.textContent = 'Salvar Configurações';
                saveAPIKeys.style.background = '';
                apiConfigScreen.classList.remove('active');
            }, 2000);
        } else {
            alert('Por favor, insira pelo menos uma API key válida.');
        }
    });

    /**
     * Mascara API key (mostra apenas início e fim)
     */
    function maskAPIKey(key) {
        if (key.length < 10) return key;
        return key.substring(0, 8) + '...' + key.substring(key.length - 4);
    }

    /**
     * Mostra aviso sobre API key faltando
     */
    function showAPIWarning(voiceMode) {
        const voiceName = voiceMode === 'google' ? 'Google TTS' : 'ElevenLabs';
        
        const warning = document.createElement('div');
        warning.className = 'api-warning';
        warning.innerHTML = `
            <div class="warning-content">
                <p>⚠️ Você precisa configurar a API key do ${voiceName}</p>
                <button class="warning-button" onclick="document.getElementById('config-api-button').click(); this.parentElement.parentElement.remove();">
                    Configurar Agora
                </button>
                <button class="warning-close" onclick="this.parentElement.parentElement.remove();">×</button>
            </div>
        `;
        
        document.body.appendChild(warning);
        
        // Auto-remover após 8 segundos
        setTimeout(() => {
            if (warning.parentElement) {
                warning.remove();
            }
        }, 8000);
    }

    // Testar voz ao clicar duas vezes (debug)
    voiceOptions.forEach(option => {
        option.addEventListener('dblclick', async () => {
            const voiceMode = option.dataset.voice;
            const testText = "Esta é uma demonstração da voz selecionada.";
            
            console.log('🎤 Testando voz:', voiceMode);
            
            if (window.game && window.game.voiceSystem) {
                const currentMode = window.game.voiceSystem.voiceMode;
                window.game.voiceSystem.setVoiceMode(voiceMode);
                await window.game.voiceSystem.narrate(testText);
                window.game.voiceSystem.setVoiceMode(currentMode);
            } else {
                // Se o jogo ainda não iniciou, criar instância temporária
                const tempVoiceSystem = new VoiceSystem();
                await tempVoiceSystem.initialize();
                tempVoiceSystem.setVoiceMode(voiceMode);
                await tempVoiceSystem.narrate(testText);
            }
        });
    });
});
