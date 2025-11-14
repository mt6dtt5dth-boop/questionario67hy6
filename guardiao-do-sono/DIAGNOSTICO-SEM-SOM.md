# 🔇 Diagnóstico: Sistema Sem Som

## 🎯 Problema Relatado

Você configurou a API key do ElevenLabs mas **não há nenhum som** no jogo (nem narração nem áudio binaural).

---

## 🔍 DIAGNÓSTICO PASSO A PASSO

### **Passo 1: Teste Básico**

1. **Recarregue a página** (Ctrl+F5 ou Cmd+Shift+R)
2. Na tela inicial, clique em **"🔊 Testar Som Completo (Debug)"**
3. **Observe** o resultado

#### ✅ Se aparecer "Som funcionando perfeitamente":
→ O som está OK! O problema pode ser outra coisa.

#### ❌ Se aparecer erro:
→ Continue para o Passo 2

---

### **Passo 2: Abrir Console de Debug**

**Como abrir:**
- **Chrome/Edge**: Pressione `F12` ou `Ctrl+Shift+J`
- **Firefox**: Pressione `F12` ou `Ctrl+Shift+K`
- **Safari**: `Cmd+Option+C` (ative menu Desenvolvedor primeiro)
- **Mobile**: Conecte ao computador e use Remote Debugging

**O que procurar:**

```javascript
// BOM ✅
🎵 Iniciando binaural beats: 7 Hz
✅ AudioContext state: running
🎛️ Frequências: L=200Hz, R=207Hz
✅ Binaural beats iniciado com sucesso

🎤 ElevenLabs - Verificando API key...
✅ API key encontrada: sk_409b7c...
📡 Response status: 200
✅ Áudio recebido, reproduzindo...
▶️ Reprodução iniciada
```

```javascript
// RUIM ❌ - Exemplos de erros comuns
❌ AudioContext não inicializado
❌ ElevenLabs error 401: Unauthorized (API key inválida)
❌ ElevenLabs error 429: Too Many Requests (limite excedido)
❌ Erro ao reproduzir áudio: NotAllowedError
```

---

### **Passo 3: Verificações Específicas**

#### A) **API Key do ElevenLabs**

**Verificar se está salva:**
1. Abra o Console (F12)
2. Digite: `localStorage.getItem('elevenlabs_api_key')`
3. Pressione Enter

**Resultado esperado:**
```
"sk_409b7c09814aff595144b90467fc0650ec5906300ce2adf4"
```

**Se retornar `null`:**
→ A key não foi salva! Configure novamente:
1. Clique em "⚙️ Configurar APIs"
2. Cole a key
3. Clique em "Salvar Configurações"

#### B) **Voz Selecionada**

Verifique qual botão está ativo:
- ✅ **Voz Sintética** (🔊) - Grátis, offline
- 🌐 **Google TTS** - Requer API do Google
- ✨ **ElevenLabs** - Requer API do ElevenLabs (sua key)

**Se ElevenLabs está selecionado mas sem key:**
→ Selecione "Voz Sintética" temporariamente para testar

#### C) **Permissões do Navegador**

Alguns navegadores bloqueiam áudio automático.

**Verificar:**
1. Olhe na barra de endereço
2. Procure ícone de 🔊 ou 🔇
3. Clique e permita áudio

**Chrome/Edge:**
- `chrome://settings/content/sound`
- Adicione o site às exceções

**Firefox:**
- `about:preferences#privacy`
- Permissões → Reproduzir Som

---

### **Passo 4: Testar ElevenLabs Diretamente**

Vamos verificar se a API key funciona fora do jogo:

**Teste via cURL (Terminal/CMD):**

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB" \
  -H "xi-api-key: sk_409b7c09814aff595144b90467fc0650ec5906300ce2adf4" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Teste de voz",
    "model_id": "eleven_multilingual_v2"
  }' \
  --output test.mp3
```

**Resultado esperado:**
- Arquivo `test.mp3` criado
- Pode reproduzir o áudio

**Se der erro 401:**
→ API key inválida ou expirada

**Se der erro 429:**
→ Limite de caracteres excedido (10.000/mês no plano grátis)

---

## 🛠️ SOLUÇÕES COMUNS

### Solução 1: Reconfigurar API Key

```javascript
// No Console (F12), execute:
localStorage.removeItem('elevenlabs_api_key');
localStorage.setItem('elevenlabs_api_key', 'sk_409b7c09814aff595144b90467fc0650ec5906300ce2adf4');
```

Depois **recarregue a página**.

---

### Solução 2: Usar Voz Sintética Temporariamente

1. Na tela inicial
2. Clique em **"🔊 Voz Sintética"**
3. Teste o som
4. Se funcionar → problema é na API
5. Se não funcionar → problema é no áudio geral

---

### Solução 3: Verificar Estado do AudioContext

```javascript
// No Console, durante o jogo:
game.binauralBeats.audioContext.state
```

**Resultado esperado:** `"running"`

**Se retornar `"suspended"`:**
→ Clique na tela para ativar

**Solução:**
```javascript
game.binauralBeats.audioContext.resume();
```

---

### Solução 4: Forçar Inicialização do Áudio

Navegadores modernos exigem **interação do usuário** antes de tocar áudio.

**Teste:**
1. Clique em qualquer lugar da tela inicial
2. **DEPOIS** clique em "Iniciar Jornada"

Isso garante que o AudioContext seja ativado.

---

## 🔧 VERIFICAÇÕES AVANÇADAS

### 1. Verificar Limite da API ElevenLabs

**Acesse:** https://elevenlabs.io/app/usage

**O que verificar:**
- Caracteres usados no mês
- Limite: 10.000 (plano grátis)
- Se excedeu → upgrade ou esperar próximo mês

**Caracteres por sessão do jogo:** ~2.760

---

### 2. Verificar CORS (Cross-Origin)

Se estiver rodando localmente com `file://`:

**Problema:** Navegadores bloqueiam `fetch()` de APIs externas

**Solução:** Use servidor local
```bash
cd guardiao-do-sono
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

---

### 3. Verificar Bloqueadores de Anúncios

Extensões como uBlock Origin podem bloquear APIs.

**Teste:**
1. Desative extensões temporariamente
2. Recarregue a página
3. Teste o som

---

## 📋 CHECKLIST COMPLETO

Marque o que você já verificou:

- [ ] ✅ Recarreguei a página (Ctrl+F5)
- [ ] ✅ Cliquei em "🔊 Testar Som Completo"
- [ ] ✅ Abri o Console (F12)
- [ ] ✅ Verifiquei se há erros no console
- [ ] ✅ Confirmei que API key está salva
- [ ] ✅ Testei com "Voz Sintética" primeiro
- [ ] ✅ Verifiquei permissões do navegador
- [ ] ✅ Cliquei na tela antes de iniciar
- [ ] ✅ Testei em outro navegador
- [ ] ✅ Verifiquei limite da API ElevenLabs
- [ ] ✅ Desativei bloqueadores temporariamente
- [ ] ✅ Uso servidor local (não file://)

---

## 🎯 DIAGNÓSTICOS POR ERRO

### Erro: "NotAllowedError"

**Causa:** Navegador bloqueou áudio automático

**Solução:**
1. Clique na tela inicial
2. Aguarde 1 segundo
3. Clique em "Iniciar Jornada"

---

### Erro: "AudioContext suspended"

**Causa:** AudioContext precisa de interação

**Solução no Console:**
```javascript
game.binauralBeats.audioContext.resume();
game.audioSystem.audioContext.resume();
```

---

### Erro: "401 Unauthorized" (ElevenLabs)

**Causa:** API key inválida

**Soluções:**
1. Verifique se copiou key completa
2. Gere nova key no ElevenLabs
3. Use "Voz Sintética" temporariamente

---

### Erro: "429 Too Many Requests"

**Causa:** Limite de 10.000 caracteres excedido

**Soluções:**
1. Aguarde próximo mês
2. Upgrade para plano pago ($5/mês)
3. Use "Voz Sintética" gratuitamente

---

## 💡 TESTE RÁPIDO: SOM BÁSICO

Cole no Console (F12) e pressione Enter:

```javascript
// Teste 1: Binaural simples
const testBinaural = new BinauralBeats();
await testBinaural.initialize();
testBinaural.start(7);
// Deve ouvir um tom contínuo suave

// Espere 3 segundos, depois pare:
testBinaural.stop();

// Teste 2: Voz sintética
const testVoice = new VoiceSystem();
await testVoice.initialize();
await testVoice.narrate("Teste de som");
// Deve ouvir a narração
```

---

## 🆘 AINDA SEM SOM?

### Envie estas informações:

1. **Sistema Operacional:** Windows/Mac/Linux/iOS/Android
2. **Navegador e versão:** Chrome 120, Safari 17, etc.
3. **Console logs:** Copie TODAS as linhas com 🎵 🎤 ✅ ❌
4. **Resultado do teste:** "🔊 Testar Som Completo"
5. **API key salva?** Sim/Não (verifique localStorage)
6. **Voz selecionada:** Sintética/Google/ElevenLabs
7. **Servidor local ou file://?**

---

## ✅ RESULTADO ESPERADO

Após seguir este guia:

1. **Logs no console:**
   ```
   ✅ Binaural beats iniciado
   ✅ VoiceSystem avançado inicializado
   ✅ ElevenLabs concluído com sucesso
   ```

2. **Som audível:**
   - Tom contínuo suave (binaural)
   - Narração clara e natural

3. **Feedback visual:**
   - Alert: "Som funcionando perfeitamente"
   - HUD mostra textos das narrações

---

<div align="center">

**Se nada funcionar, use temporariamente "Voz Sintética"**  
**É grátis, offline e sempre funciona! 🔊**

[← Voltar](README.md) | [Guia de Vozes](VOZES-HUMANAS.md)

</div>
