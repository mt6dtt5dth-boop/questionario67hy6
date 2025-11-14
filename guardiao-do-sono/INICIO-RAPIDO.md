# 🚀 Início Rápido - O Guardião do Sono

## ⚡ Acesso Imediato

### Opção 1: Abrir Localmente (Mais Simples)
1. Navegue até a pasta `guardiao-do-sono`
2. Abra o arquivo `index.html` no seu navegador
3. ✨ Pronto! O jogo está rodando

### Opção 2: Servidor Local (Recomendado)

#### Com Python (geralmente já vem instalado)
```bash
cd guardiao-do-sono
python3 -m http.server 8080
```
**Acesse**: http://localhost:8080

#### Com Node.js
```bash
cd guardiao-do-sono
npx http-server -p 8080
```
**Acesse**: http://localhost:8080

---

## 📋 Checklist Antes de Começar

Antes de clicar em "Iniciar Jornada", certifique-se de:

- [ ] 🛏️ **Estar deitado** confortavelmente na cama
- [ ] 🎧 **Fones conectados** (OBRIGATÓRIO para áudio binaural)
- [ ] 🌑 **Luz ambiente baixa** ou desligada
- [ ] 📱 **Modo não perturbe** ativado
- [ ] 💧 **Bexiga vazia** (para não precisar levantar)
- [ ] 😌 **Mente aberta** para a experiência

---

## 🎯 O Que Esperar

### ⏱️ Duração Total: 9 minutos

#### Fase 1: Transição (2 min)
- Pôr do sol com cores quentes
- Sensação de encerramento do dia
- Início do relaxamento

#### Fase 2: Imersão (4 min)
- Jardim subaquático com bolhas
- Dissolução de preocupações
- Meditação profunda

#### Fase 3: Dissolução (3 min)
- Guardião de luz violeta
- Sensação de segurança total
- Preparação final para o sono

**💤 Pós-experiência**: O áudio binaural continua por mais 2 minutos para facilitar o sono completo.

---

## 🎮 Como Jogar

1. **Clique** em "Iniciar Jornada"
2. **Ouça** a narração com atenção
3. **Observe** as imagens sem esforço
4. **Respire** seguindo o indicador visual (primeiros 30s)
5. **Permita-se** adormecer a qualquer momento

### ✋ Não precisa fazer NADA além de observar

O jogo é completamente passivo. Você pode até adormecer durante a experiência - é exatamente o que deve acontecer! 😊

---

## 🔊 Configuração de Áudio

### Volume Ideal
- **Binaural**: Deve ser audível mas não alto
- **Narração**: Deve ser clara mas relaxante
- **Sugestão**: 30-50% do volume máximo do dispositivo

### Teste de Áudio Binaural
Se você quer verificar se está funcionando:
1. Use fones de ouvido
2. Preste atenção nos primeiros segundos
3. Você deve ouvir um tom suave e contínuo
4. Ele parece "pulsar" levemente no centro da cabeça

Se não estiver ouvindo nada, verifique:
- Fones estão conectados?
- Volume não está em 0?
- Navegador tem permissão para áudio?

---

## 📱 Modo Mobile (Celular/Tablet)

### iOS (iPhone/iPad)
1. Abra no **Safari** (recomendado)
2. Se o áudio não tocar, **toque na tela** primeiro
3. Opcionalmente, adicione à tela inicial para experiência fullscreen

### Android
1. Abra no **Chrome** (recomendado)
2. Permita áudio quando solicitado
3. Considere ativar modo "Não Perturbe"

### Dica Pro: Modo Avião + WiFi
- Ative **Modo Avião**
- Mantenha **WiFi ligado**
- Assim você não recebe chamadas/notificações

---

## 🛠️ Solucionando Problemas

### "Não escuto nada"
**Solução**: 
1. Verifique se fones estão conectados
2. Aumente o volume
3. Clique na tela antes de iniciar (navegadores modernos exigem isso)
4. Recarregue a página (F5)

### "Narração não funciona"
**Solução**:
1. Verifique se há vozes em português instaladas no sistema
2. Windows: Configurações > Hora e Idioma > Fala
3. macOS: Preferências > Acessibilidade > Fala
4. Se não tiver, o jogo ainda funciona (só sem narração)

### "Tela está piscando/lag"
**Solução**:
1. Feche outros apps/abas
2. Use em dispositivo mais recente (2018+)
3. Reduza resolução da tela do navegador

### "Tela desliga no meio"
**Solução**:
1. O app tenta impedir isso automaticamente
2. Se falhar, configure manualmente: Configurações > Tela > Nunca desligar
3. Ou use desktop (melhor suporte)

---

## ⚙️ Personalização Avançada

Se você entende de código e quer customizar:

### Mudar Duração das Fases
Edite em `js/phase-X-*.js`:
```javascript
this.duration = 120; // segundos (2 minutos)
```

### Ajustar Frequências Binaurais
Edite em arquivos de fase:
```javascript
this.binauralBeats.start(7); // Hz inicial
this.binauralBeats.transitionTo(4, 10); // Hz final, tempo transição
```

### Personalizar Textos da Narração
Edite dentro de cada fase os textos em:
```javascript
this.audioSystem.narrate("Seu texto aqui");
```

---

## 🌟 Dicas para Melhor Experiência

### 🕐 Melhor Horário
- **Ideal**: 30-60 minutos antes de dormir
- **Evite**: Logo após refeições pesadas
- **Evite**: Quando muito cansado (pode dormir antes do fim)

### 🌡️ Ambiente Ideal
- Temperatura confortável (18-22°C)
- Roupa leve e confortável
- Cama/colchão confortável
- Sem barulhos externos

### 🚫 Não Use Se...
- Estiver dirigindo ou operando máquinas
- Precisar ficar alerta
- Tiver epilepsia fotossensível (consulte médico primeiro)
- Estiver sob efeito de álcool/drogas

### ✅ Melhores Práticas
- Use diariamente por 7 dias seguidos
- Crie um ritual (sempre no mesmo horário)
- Não force nada, deixe acontecer naturalmente
- Se não dormir na primeira vez, tente novamente
- Combine com higiene do sono (evite telas 1h antes)

---

## 📊 O Que Esperar ao Longo do Tempo

### 1ª Vez
- Familiarização com a experiência
- Pode não dormir imediatamente
- Normal se sentir curioso demais para relaxar

### 3-5 Vezes
- Cérebro começa a reconhecer o padrão
- Relaxamento mais fácil
- Sono pode vir mais rápido

### 7+ Vezes
- Condicionamento estabelecido
- Apenas ouvir o início já induz relaxamento
- Sono profundo durante ou logo após

---

## 🆘 Suporte

### FAQ Completo
Consulte o `README.md` para perguntas frequentes detalhadas.

### Problemas Técnicos
Se encontrou um bug:
1. Verifique o console do navegador (F12)
2. Anote a mensagem de erro
3. Reporte no repositório do projeto

### Dúvidas Gerais
Para dúvidas sobre uso, técnicas ou customizações, consulte a documentação em `/docs`.

---

## ✨ Agora Você Está Pronto!

Feche este guia, deite-se confortavelmente e inicie sua jornada para um sono tranquilo.

**Lembre-se**: Não há forma errada de usar este jogo. Permita-se simplesmente estar presente e observar. O descanso virá naturalmente. 🌙

---

<div align="center">

**Boa viagem ao mundo dos sonhos** 💙

[← Voltar ao README](README.md)

</div>
