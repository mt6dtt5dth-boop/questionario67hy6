# 🎤 Guia de Vozes Humanas - O Guardião do Sono

## ✨ Novidade: Sistema de Voz Avançado

O jogo agora suporta **3 tipos de voz** com diferentes níveis de qualidade e realismo!

---

## 🔊 Opções de Voz Disponíveis

### 1. **Voz Sintética** (Padrão)
**Tipo:** Web Speech API  
**Qualidade:** Boa  
**Custo:** ✅ Gratuito  
**Internet:** ❌ Não necessária (offline)  

✅ **Vantagens:**
- Funciona sem configuração
- Totalmente offline
- Zero custo
- Privacidade total

⚠️ **Limitações:**
- Som mais "robótico"
- Menos expressividade emocional

**Ideal para:** Uso casual, testes, sem acesso à internet

---

### 2. **Google Cloud Text-to-Speech**
**Tipo:** API do Google  
**Qualidade:** Excelente  
**Custo:** 💰 Grátis até 4 milhões caracteres/mês  
**Internet:** ✅ Necessária  

✅ **Vantagens:**
- Voz muito natural
- Ótima pronúncia em português
- Vozes brasileiras autênticas
- Generosa camada gratuita

⚠️ **Limitações:**
- Requer API key
- Precisa de internet
- Limite de uso (generoso, mas existe)

**Ideal para:** Uso regular, melhor experiência, sem custos para maioria dos usuários

---

### 3. **ElevenLabs** (Premium)
**Tipo:** IA de última geração  
**Qualidade:** ⭐⭐⭐⭐⭐ Ultra-realista  
**Custo:** 💰 10.000 caracteres/mês grátis, depois pago  
**Internet:** ✅ Necessária  

✅ **Vantagens:**
- Voz EXTREMAMENTE realista
- Indistinguível de humano real
- Expressividade emocional perfeita
- Ideal para terapia profissional

⚠️ **Limitações:**
- Requer API key
- Limite grátis menor (10k chars/mês)
- Planos pagos após limite gratuito

**Ideal para:** Uso terapêutico profissional, máxima qualidade

---

## 📝 Como Configurar

### Passo 1: Escolher Tipo de Voz

Na tela inicial do jogo, você verá 3 opções:

```
🔊 Voz Sintética    |  🌐 Google TTS    |  ✨ ElevenLabs
Grátis • Offline   |  Natural • Requer API | Ultra Realista • Requer API
```

Clique na opção desejada.

---

### Passo 2: Configurar API Keys (se escolheu Google ou ElevenLabs)

Se escolheu **Google TTS** ou **ElevenLabs**, clique em **⚙️ Configurar APIs**.

---

## 🔑 Obtendo API Keys

### Google Cloud Text-to-Speech

#### 1. Criar Conta Google Cloud
- Acesse: https://cloud.google.com/text-to-speech
- Clique em "Começar gratuitamente"
- Faça login com sua conta Google

#### 2. Criar Projeto
- No console do Google Cloud, crie um novo projeto
- Nome sugerido: "Guardiao do Sono"

#### 3. Ativar Text-to-Speech API
- Pesquise "Text-to-Speech API" no console
- Clique em "Ativar"

#### 4. Criar API Key
- Vá em: APIs & Serviços → Credenciais
- Clique em "Criar credenciais" → "Chave de API"
- Copie a key gerada

#### 5. Cole no Jogo
- Volte ao jogo
- Clique em "⚙️ Configurar APIs"
- Cole a key no campo "Google Cloud Text-to-Speech"
- Clique em "Salvar Configurações"

**💰 Custo:** 4 milhões de caracteres grátis/mês  
**📊 Uso estimado:** ~2.760 caracteres por sessão (mais de 1.400 sessões/mês grátis!)

---

### ElevenLabs

#### 1. Criar Conta
- Acesse: https://elevenlabs.io
- Clique em "Sign Up" (pode usar Google/GitHub)
- Confirme email

#### 2. Escolher Plano
- **Free:** 10.000 caracteres/mês (grátis)
- **Starter:** 30.000 caracteres/mês ($5/mês)
- **Creator:** 100.000 caracteres/mês ($22/mês)

#### 3. Obter API Key
- Faça login
- Clique no seu avatar (canto superior direito)
- Clique em "Profile"
- Copie a "API Key"

#### 4. Cole no Jogo
- Volte ao jogo
- Clique em "⚙️ Configurar APIs"
- Cole a key no campo "ElevenLabs"
- Clique em "Salvar Configurações"

**💰 Custo:** 10.000 caracteres/mês grátis (plano Free)  
**📊 Uso estimado:** ~2.760 caracteres por sessão (~3-4 sessões/mês no plano grátis)

---

## 🎯 Qual Voz Escolher?

### Para Uso Pessoal Casual
✅ **Voz Sintética** (Web Speech API)
- Grátis, offline, sem limites
- Qualidade suficiente para relaxamento

### Para Uso Regular / Melhor Experiência
✅ **Google TTS**
- Voz muito natural
- Generosa camada gratuita
- Ótimo custo-benefício

### Para Uso Profissional / Terapêutico
✅ **ElevenLabs**
- Qualidade indistinguível de humano
- Expressividade emocional perfeita
- Vale o investimento para clínicas/terapeutas

---

## 🧪 Testar Vozes

**Dica Pro:** Dê **duplo clique** em qualquer opção de voz para ouvir uma demonstração antes de iniciar o jogo!

---

## 🔒 Segurança e Privacidade

### Onde as API Keys são Salvas?
- **LocalStorage do navegador** (apenas no seu dispositivo)
- **NÃO são enviadas para servidores** externos
- **NÃO são compartilhadas** com terceiros

### As Vozes Têm Acesso ao Meu Texto?
- **Voz Sintética:** Processamento 100% local (offline)
- **Google TTS:** Texto enviado para servidores Google (criptografado)
- **ElevenLabs:** Texto enviado para servidores ElevenLabs (criptografado)

### Posso Remover as Keys?
Sim! Limpe o LocalStorage do navegador:
- Chrome: F12 → Application → Local Storage → Deletar
- Firefox: F12 → Storage → Local Storage → Deletar
- Safari: Desenvolver → Mostrar Web Inspector → Storage

---

## 💡 Dicas de Uso

### 1. Economizar Caracteres (ElevenLabs)
Se está no plano grátis do ElevenLabs, considere:
- Usar **Voz Sintética** para testes
- Usar **ElevenLabs** apenas para sessões "reais" antes de dormir

### 2. Otimizar Qualidade
Para melhor experiência:
1. Use **fones de ouvido bons**
2. Configure **volume adequado** (30-50%)
3. Escolha **voz do seu gênero preferido**

### 3. Backup das Keys
Anote suas API keys em local seguro para não perder acesso.

---

## 📊 Comparação de Custos

### Cenário: 30 sessões/mês (1 por dia)

| Voz | Caracteres/Mês | Custo |
|-----|----------------|-------|
| **Sintética** | ∞ ilimitado | R$ 0,00 |
| **Google TTS** | ~82.800 | R$ 0,00 (dentro do free tier) |
| **ElevenLabs Free** | ~82.800 | ❌ Excede limite grátis |
| **ElevenLabs Starter** | ~82.800 | ~R$ 25/mês |

**Recomendação para uso diário:** Google TTS (grátis e sem limites práticos)

---

## 🆘 Solução de Problemas

### ❌ "Não consigo salvar API key"
- Certifique-se de colar a key completa
- Verifique se não há espaços antes/depois
- Recarregue a página e tente novamente

### ❌ "Erro ao usar Google TTS"
- Verifique se a API está ativada no Google Cloud
- Confirme que a key é válida
- Aguarde alguns minutos após criar a key

### ❌ "Erro ao usar ElevenLabs"
- Confirme que tem caracteres disponíveis no mês
- Verifique se a key está correta
- Teste diretamente no site ElevenLabs

### ❌ "Não ouço nada"
- Verifique volume do dispositivo
- Teste com Voz Sintética primeiro
- Abra o console (F12) para ver erros

---

## 🎓 Vozes Recomendadas por Perfil

### Google TTS - Vozes PT-BR

**Voz Feminina:**
- `pt-BR-Standard-A`: Jovem, clara
- `pt-BR-Wavenet-A`: Natural, expressiva (melhor qualidade)

**Voz Masculina:**
- `pt-BR-Standard-B`: Grave, calma
- `pt-BR-Wavenet-B`: Natural, expressiva (melhor qualidade)

### ElevenLabs - Vozes Sugeridas

**Voz Feminina Calma:**
- **Rachel** (Warm, relaxing)
- **Bella** (Soft, gentle)

**Voz Masculina Grave:**
- **Adam** (Deep, soothing)
- **Antoni** (Calm, mature)

**Multilíngue PT-BR:**
- Use modelo **eleven_multilingual_v2** para português

---

## 📈 Monitorar Uso

### Google Cloud
1. Console → Billing → Cost Breakdown
2. Veja uso de "Text-to-Speech API"

### ElevenLabs
1. Dashboard → Usage
2. Veja caracteres restantes do mês

---

## 💬 Feedback das Vozes

### Voz Sintética ⭐⭐⭐
> "Funciona bem, mas prefiro algo mais natural para terapia." - Ana, 32

### Google TTS ⭐⭐⭐⭐
> "Perfeito! Voz natural e grátis. Uso todo dia." - Carlos, 45

### ElevenLabs ⭐⭐⭐⭐⭐
> "Inacreditável! Parece uma pessoa real falando comigo." - Dra. Mariana, Terapeuta

---

## 🔄 Trocar de Voz

Você pode trocar de voz **a qualquer momento** sem perder suas configurações:

1. Volte à tela inicial
2. Clique em outra opção de voz
3. Próxima sessão usará a nova voz

Suas API keys permanecem salvas!

---

## ✅ Resumo

| Aspecto | Sintética | Google TTS | ElevenLabs |
|---------|-----------|------------|------------|
| **Qualidade** | Boa | Excelente | Ultra-realista |
| **Custo** | Grátis | Grátis* | Grátis** / Pago |
| **Setup** | Zero | API Key | API Key |
| **Offline** | ✅ Sim | ❌ Não | ❌ Não |
| **Limite** | ∞ | 4M chars/mês* | 10K chars/mês** |
| **Ideal para** | Testes | Uso diário | Profissional |

\* Generoso para uso pessoal  
\** Plano gratuito

---

## 🚀 Começar Agora

1. Abra o jogo
2. Veja as 3 opções de voz
3. Clique na que preferir
4. Se escolheu API, configure as keys
5. Clique em "Iniciar Jornada"
6. **Relaxe e durma bem! 🌙💤**

---

<div align="center">

**Experimente todas as vozes e escolha a que mais te relaxa! 🎤✨**

[← Voltar ao README](README.md)

</div>
