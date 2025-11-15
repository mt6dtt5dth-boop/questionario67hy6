/**
 * Interface UI para configuração de voz
 */

// Função para mostrar notificações visuais na tela
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    // Cores por tipo
    const colors = {
        'info': { bg: '#2196F3', color: '#fff' },
        'success': { bg: '#4CAF50', color: '#fff' },
        'warning': { bg: '#FF9800', color: '#fff' },
        'error': { bg: '#f44336', color: '#fff' }
    };
    
    const color = colors[type] || colors.info;
    notification.style.background = color.bg;
    notification.style.color = color.color;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    const voiceOptions = document.querySelectorAll('.voice-option');
    const testVoiceButton = document.getElementById('test-voice-button');
    const testAudioButton = document.getElementById('test-audio-button');
    const configAPIButton = document.getElementById('config-api-button');
    const apiConfigScreen = document.getElementById('api-config-screen');
    const closeAPIConfig = document.getElementById('close-api-config');
    const saveAPIKeys = document.getElementById('save-api-keys');
    const googleAPIInput = document.getElementById('google-api-key');
    const elevenLabsAPIInput = document.getElementById('elevenlabs-api-key');

    // Carregar preferência salva (padrão: ElevenLabs - voz mais realista)
    const savedVoiceMode = localStorage.getItem('guardiao_voice_mode') || 'elevenlabs';
    
    // Mostrar notificação de boas-vindas
    setTimeout(() => {
        const voiceNames = {
            'webspeech': '🔊 Voz Sintética (Robótica)',
            'google': '🌐 Google TTS',
            'elevenlabs': '✨ ElevenLabs PT-BR (Ultra-realista)'
        };
        showNotification(`Voz ativa: ${voiceNames[savedVoiceMode]}`, 'success');
    }, 500);
    
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

    // Testar voz atual
    testVoiceButton.addEventListener('click', async () => {
        const activeOption = document.querySelector('.voice-option.active');
        const voiceMode = activeOption ? activeOption.dataset.voice : 'webspeech';
        
        testVoiceButton.disabled = true;
        testVoiceButton.textContent = '⏳ Testando...';
        
        // Mostrar qual voz será usada
        const voiceNames = {
            'webspeech': '🔊 Voz Sintética (Robótica)',
            'google': '🌐 Google TTS',
            'elevenlabs': '✨ ElevenLabs (Ultra-realista PT-BR)'
        };
        
        showNotification(`Testando: ${voiceNames[voiceMode] || voiceMode}`, 'info');
        
        try {
            const testText = "Esta é uma demonstração da voz selecionada. Eu sou o Guardião do Sono e vou ajudá-lo a relaxar profundamente.";
            
            // Criar sistema temporário para teste
            const tempVoiceSystem = new VoiceSystem();
            await tempVoiceSystem.initialize();
            tempVoiceSystem.setVoiceMode(voiceMode);
            
            // Verificar API key se for ElevenLabs
            if (voiceMode === 'elevenlabs') {
                const apiKey = tempVoiceSystem.getElevenLabsAPIKey();
                if (!apiKey) {
                    showNotification('❌ API key do ElevenLabs não encontrada!', 'error');
                    throw new Error('API key não configurada');
                } else {
                    showNotification(`✅ API key encontrada: ${apiKey.substring(0, 10)}...`, 'success');
                }
            }
            
            console.log('🎤 Testando voz:', voiceMode);
            await tempVoiceSystem.narrate(testText, {
                rate: 0.65,
                pitch: 0.88,
                volume: 0.9
            });
            
            console.log('✅ Teste de voz concluído');
            
            // Perguntar ao usuário se a voz está correta
            setTimeout(() => {
                const resultado = confirm(
                    `🎧 Você ouviu a voz?\n\n` +
                    `Modo testado: ${voiceNames[voiceMode]}\n\n` +
                    `A voz estava NATURAL (não robótica)?\n\n` +
                    `Clique OK se estava boa.\n` +
                    `Clique CANCELAR se ainda estava robótica.`
                );
                
                if (!resultado && voiceMode === 'elevenlabs') {
                    showNotification('⚠️ Voz robótica detectada! Verificando problema...', 'warning');
                    alert(
                        '🔍 DIAGNÓSTICO:\n\n' +
                        '❌ A voz do ElevenLabs está robótica\n\n' +
                        'POSSÍVEIS CAUSAS:\n' +
                        '1. API key inválida ou sem créditos\n' +
                        '2. Problema de conexão com servidor\n' +
                        '3. Navegador bloqueando áudio\n\n' +
                        'Me informe este problema para eu corrigir!'
                    );
                }
            }, 1000);
            
        } catch (error) {
            console.error('❌ Erro no teste de voz:', error);
            showNotification(`❌ Erro: ${error.message}`, 'error');
            alert('Erro ao testar voz: ' + error.message);
        } finally {
            testVoiceButton.disabled = false;
            testVoiceButton.textContent = '🎵 Testar Voz';
        }
    });

    // Testar som completo (voz + binaural)
    if (testAudioButton) {
        testAudioButton.addEventListener('click', async () => {
            testAudioButton.disabled = true;
            testAudioButton.textContent = '⏳ Testando...';
            
            console.log('🔊 ========== TESTE COMPLETO DE SOM ==========');
            
            try {
                // 1. Testar Binaural Beats
                console.log('1️⃣ Testando Binaural Beats...');
                const binauralBeats = new BinauralBeats();
                await binauralBeats.initialize();
                binauralBeats.start(7);
                binauralBeats.fadeIn(2);
                
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log('✅ Binaural funcionando!');
                
                // 2. Testar Voz
                console.log('2️⃣ Testando Sistema de Voz...');
                const activeOption = document.querySelector('.voice-option.active');
                const voiceMode = activeOption ? activeOption.dataset.voice : 'webspeech';
                
                const voiceSystem = new VoiceSystem();
                await voiceSystem.initialize();
                voiceSystem.setVoiceMode(voiceMode);
                
                const testText = "Som funcionando perfeitamente. Você está ouvindo o áudio binaural e esta narração.";
                await voiceSystem.narrate(testText);
                
                console.log('✅ Voz funcionando!');
                
                // 3. Parar binaural
                binauralBeats.fadeOut(2);
                await new Promise(resolve => setTimeout(resolve, 2000));
                binauralBeats.stop();
                
                console.log('✅ Teste completo concluído com sucesso!');
                alert('✅ Som está funcionando perfeitamente!\n\n- Áudio binaural: OK\n- Narração (' + voiceMode + '): OK\n\nVerifique o console (F12) para detalhes.');
                
            } catch (error) {
                console.error('❌ Erro no teste:', error);
                alert('❌ Erro ao testar som:\n\n' + error.message + '\n\nAbra o console (F12) para mais detalhes.');
            } finally {
                testAudioButton.disabled = false;
                testAudioButton.textContent = '🔊 Testar Som Completo (Debug)';
            }
        });
    }

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

    // Baixar áudio puro do ElevenLabs (teste sem navegador)
    const downloadTestButton = document.getElementById('download-test-button');
    if (downloadTestButton) {
        downloadTestButton.addEventListener('click', async () => {
            downloadTestButton.disabled = true;
            downloadTestButton.textContent = '⏳ Gerando...';
            
            showNotification('🎤 Gerando áudio no ElevenLabs...', 'info');
            
            try {
                const voiceSystem = new VoiceSystem();
                await voiceSystem.initialize();
                
                const apiKey = voiceSystem.getElevenLabsAPIKey();
                const voiceId = 'S9K4e72HyPCxvHe7p5rK'; // Lotte
                const testText = "Esta é uma demonstração da voz Lotte em português do Brasil. O Guardião do Sono está testando o áudio puro.";
                
                showNotification('📡 Conectando com ElevenLabs...', 'info');
                
                const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'audio/mpeg',
                        'Content-Type': 'application/json',
                        'xi-api-key': apiKey
                    },
                    body: JSON.stringify({
                        text: testText,
                        model_id: 'eleven_multilingual_v2',
                        voice_settings: {
                            stability: 0.65,
                            similarity_boost: 0.8,
                            style: 0.3,
                            use_speaker_boost: true
                        }
                    })
                });
                
                if (response.ok) {
                    const audioBlob = await response.blob();
                    showNotification(`✅ Áudio recebido: ${(audioBlob.size / 1024).toFixed(2)} KB`, 'success');
                    
                    // Criar link de download
                    const url = URL.createObjectURL(audioBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'guardiao-do-sono-teste-elevenlabs.mp3';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    showNotification('💾 Áudio baixado! Ouça no seu player de música', 'success');
                    alert(
                        '✅ ÁUDIO BAIXADO!\n\n' +
                        'Um arquivo MP3 foi baixado para seu dispositivo:\n' +
                        '"guardiao-do-sono-teste-elevenlabs.mp3"\n\n' +
                        '🎧 Ouça esse arquivo no seu player de música.\n\n' +
                        'Se esse áudio estiver NATURAL (não robótico),\n' +
                        'o problema está no navegador, não no ElevenLabs.\n\n' +
                        'Me diga: o arquivo MP3 baixado está natural ou robótico?'
                    );
                } else {
                    const errorText = await response.text();
                    showNotification(`❌ Erro ${response.status}: ${errorText}`, 'error');
                    alert(`Erro: ${response.status}\n${errorText}`);
                }
                
            } catch (error) {
                console.error('❌ Erro:', error);
                showNotification(`❌ Erro: ${error.message}`, 'error');
                alert('Erro ao baixar áudio: ' + error.message);
            } finally {
                downloadTestButton.disabled = false;
                downloadTestButton.textContent = '💾 Baixar Áudio ElevenLabs (Teste Puro)';
            }
        });
    }

    // Listar todas as vozes disponíveis (diagnóstico)
    const listVoicesButton = document.getElementById('list-voices-button');
    if (listVoicesButton) {
        listVoicesButton.addEventListener('click', async () => {
            console.log('🎤 ========== LISTANDO TODAS AS VOZES ==========');
            
            const voiceSystem = new VoiceSystem();
            await voiceSystem.initialize();
            
            const voices = voiceSystem.availableVoices || [];
            
            console.log(`📊 Total de vozes encontradas: ${voices.length}`);
            console.log('');
            
            // Separar por idioma
            const ptVoices = voices.filter(v => v.lang.startsWith('pt'));
            const otherVoices = voices.filter(v => !v.lang.startsWith('pt'));
            
            console.log(`🇧🇷🇵🇹 Vozes em Português: ${ptVoices.length}`);
            ptVoices.forEach((v, i) => {
                const isBrazil = v.lang.includes('BR') || v.name.includes('Brasil');
                const flag = isBrazil ? '🇧🇷' : '🇵🇹';
                console.log(`  ${i+1}. ${flag} ${v.name}`);
                console.log(`      Lang: ${v.lang} | Default: ${v.default ? 'SIM' : 'NÃO'} | Local: ${v.localService ? 'SIM' : 'NÃO'}`);
            });
            
            console.log('');
            console.log(`🌍 Outras vozes: ${otherVoices.length}`);
            
            // Testar qual voz seria escolhida
            console.log('');
            console.log('🎯 ========== VOZ SELECIONADA PELO SISTEMA ==========');
            const selectedVoice = voiceSystem.getBestVoice();
            if (selectedVoice) {
                const isBrazil = selectedVoice.lang.includes('BR') || selectedVoice.name.includes('Brasil');
                const flag = isBrazil ? '🇧🇷' : '🇵🇹';
                console.log(`${flag} VOZ ESCOLHIDA: ${selectedVoice.name}`);
                console.log(`   Lang: ${selectedVoice.lang}`);
                console.log(`   É brasileira? ${isBrazil ? '✅ SIM' : '❌ NÃO - PROBLEMA!'}`);
            } else {
                console.error('❌ NENHUMA VOZ FOI SELECIONADA!');
            }
            
            alert(`📊 Vozes encontradas:\n\n🇧🇷🇵🇹 Português: ${ptVoices.length}\n🌍 Outros idiomas: ${otherVoices.length}\n\n✅ Veja o console (F12) para detalhes completos`);
        });
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
