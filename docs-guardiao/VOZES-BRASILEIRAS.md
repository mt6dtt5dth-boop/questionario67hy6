# 🇧🇷 Guia de Vozes Brasileiras - O Guardião do Sono

## 🎤 Vozes Disponíveis no ElevenLabs (Português do Brasil)

### ✨ **Lotte** (Padrão) - `S9K4e72HyPCxvHe7p5rK`
- **Gênero:** Feminino
- **Tom:** Suave, calmo, terapêutico
- **Ideal para:** Indução de sono, meditação, relaxamento profundo
- **Características:** Voz melodiosa com ritmo relaxante, perfeita para narração hipnótica

---

### 🌸 **Valentina** - `z9fAnlkpzviPz146aGWa`
- **Gênero:** Feminino
- **Tom:** Jovem, energético, amigável
- **Ideal para:** Narrações dinâmicas, conteúdo motivacional
- **Características:** Voz clara e expressiva, transmite positividade

---

### 🎭 **Giovanni** - `zcAOhNBS3c14rBihAFp1`
- **Gênero:** Masculino
- **Tom:** Profundo, autoritário, confiante
- **Ideal para:** Narrações sérias, comandos de meditação guiada
- **Características:** Voz grave e imponente, transmite segurança

---

### 👔 **Marcus** - `iP95p4xoKVk53GoZ742B`
- **Gênero:** Masculino
- **Tom:** Maduro, confiante, tranquilo
- **Ideal para:** Meditação guiada, relaxamento masculino
- **Características:** Voz equilibrada e estável, transmite confiança

---

## 🔧 Como Trocar a Voz

### Método 1: Editar o Código (Recomendado)

1. Abra o arquivo `js/voice-system.js`
2. Localize a linha 27 (seção `elevenlabs`)
3. Substitua o `voiceId` pela voz desejada:

```javascript
elevenlabs: {
    voiceId: 'S9K4e72HyPCxvHe7p5rK', // ← Troque aqui
    modelId: 'eleven_multilingual_v2',
    stability: 0.65,
    similarityBoost: 0.8,
    style: 0.3,
    use_speaker_boost: true
}
```

### Exemplos de Substituição:

**Para voz masculina profunda (Giovanni):**
```javascript
voiceId: 'zcAOhNBS3c14rBihAFp1', // Giovanni
```

**Para voz feminina jovem (Valentina):**
```javascript
voiceId: 'z9fAnlkpzviPz146aGWa', // Valentina
```

**Para voz masculina madura (Marcus):**
```javascript
voiceId: 'iP95p4xoKVk53GoZ742B', // Marcus
```

---

## ⚙️ Ajuste Fino dos Parâmetros de Voz

Você pode personalizar ainda mais a voz ajustando os parâmetros:

```javascript
elevenlabs: {
    voiceId: 'S9K4e72HyPCxvHe7p5rK',
    modelId: 'eleven_multilingual_v2',
    
    // Estabilidade (0.0 - 1.0)
    // Mais baixo = mais expressivo, mas menos previsível
    // Mais alto = mais estável, mas menos emotivo
    stability: 0.65,
    
    // Similaridade (0.0 - 1.0)
    // Mais alto = mais fiel à voz original
    // Mais baixo = mais variado
    similarityBoost: 0.8,
    
    // Estilo (0.0 - 1.0)
    // Controla a expressividade emocional
    // 0.0 = neutro, 1.0 = muito expressivo
    style: 0.3,
    
    // Amplificação do falante
    use_speaker_boost: true
}
```

### Configurações Recomendadas por Uso:

#### 🌙 Para Indução de Sono (Padrão)
```javascript
stability: 0.65,
similarityBoost: 0.8,
style: 0.3,
use_speaker_boost: true
```

#### 🧘 Para Meditação Guiada
```javascript
stability: 0.75,
similarityBoost: 0.85,
style: 0.2,
use_speaker_boost: true
```

#### 📖 Para Narração Expressiva
```javascript
stability: 0.50,
similarityBoost: 0.75,
style: 0.6,
use_speaker_boost: true
```

---

## 🎯 Testar as Vozes

Após configurar sua API key do ElevenLabs:

1. Na tela inicial, clique em **"⚙️ Configurar APIs"**
2. Cole sua API key do ElevenLabs
3. Salve as configurações
4. Selecione **"✨ ElevenLabs"** no seletor de voz
5. Clique em **"🎵 Testar Voz Atual"**
6. Ouça e avalie se a voz está em português do Brasil

---

## 🆓 Limites de Uso Gratuito

### ElevenLabs (Conta Gratuita)
- **10.000 caracteres/mês** grátis
- Aproximadamente **15-20 minutos de áudio**
- Suficiente para **30-40 sessões completas** do jogo

### Dicas para Economizar Caracteres:
1. Use modo **"Voz Sintética"** (Web Speech) para testes
2. Só use ElevenLabs para a experiência final
3. A narração completa do jogo usa aproximadamente **250-300 caracteres**

---

## ❓ Perguntas Frequentes

### **P: Por que o áudio está em inglês?**
**R:** A voz padrão anterior (Adam) era em inglês. Agora usamos **Lotte** (PT-BR). Se ainda estiver em inglês, limpe o cache do navegador (Ctrl+Shift+Delete).

### **P: Posso usar minha própria voz clonada?**
**R:** Sim! O ElevenLabs permite clonar vozes. Depois de criar sua voz clonada no site deles, copie o `voiceId` e substitua no código.

### **P: Como saber o ID da minha voz clonada?**
**R:** No painel do ElevenLabs:
1. Vá em **"Voices"**
2. Clique na sua voz
3. Copie o **Voice ID** (aparece embaixo do nome)

---

## 🔗 Links Úteis

- **ElevenLabs Dashboard:** https://elevenlabs.io/app
- **Documentação da API:** https://elevenlabs.io/docs
- **Criar Conta Gratuita:** https://elevenlabs.io/sign-up

---

## 📝 Changelog de Vozes

### v1.1.0 (2025-11-14)
- ✅ Alterada voz padrão de **Adam (inglês)** para **Lotte (PT-BR)**
- ✅ Ajustados parâmetros para tom mais terapêutico
- ✅ Adicionada documentação completa de vozes brasileiras

### v1.0.0 (2025-11-13)
- 🚀 Lançamento inicial com suporte a ElevenLabs
- Voz padrão: Adam (inglês) - **DESCONTINUADO**

---

**Última atualização:** 14/11/2025  
**Autor:** Guardião do Sono Development Team
