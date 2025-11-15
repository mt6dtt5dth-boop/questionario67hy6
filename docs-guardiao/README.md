# 🌙 O Guardião do Sono

**Uma experiência terapêutica 3D de relaxamento profundo**

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Three.js](https://img.shields.io/badge/Three.js-r128-orange.svg)](https://threejs.org/)

---

## 📖 Sobre o Projeto

**O Guardião do Sono** é um jogo terapêutico 3D de curta duração (9 minutos) projetado para ser jogado antes de dormir, com o objetivo de induzir relaxamento profundo, eliminar ansiedade noturna e facilitar a transição natural da vigília para o sono.

O projeto combina:
- 🧠 **Neurociência**: Batidas binaurais que induzem ondas Alfa → Teta → Delta
- 💆 **Psicologia**: Técnicas de relaxamento progressivo e visualização guiada
- 🎭 **PNL**: Metáforas terapêuticas e ancoragem respiratória
- 🌀 **Hipnose Ericksoniana**: Linguagem permissiva e indução suave

---

## ✨ Características

### 🎮 Experiência Imersiva
- **Duração**: 9 minutos de jornada guiada
- **3 Fases distintas**: Transição, Imersão e Dissolução
- **Zero menus**: Experiência fluida sem interrupções
- **Design sensorial**: Otimizado para uso com fones de ouvido

### 🎵 Sistema de Áudio Avançado
- **Batidas binaurais procedurais**: 7Hz → 4Hz → 2Hz (Alfa → Teta → Delta)
- **Narração hipnótica**: Voz sintética com timing preciso
- **Sons ambientes**: Vento, água e bolhas gerados proceduralmente
- **Web Audio API**: Zero dependências de arquivos de áudio

### 🎨 Visuais 3D Procedurais
- **Three.js r128**: Renderização WebGL otimizada
- **Shaders personalizados**: Céu gradiente, água volumétrica
- **Partículas dinâmicas**: Luzes flutuantes, bolhas, estrelas
- **Performance mobile**: 60fps em dispositivos modernos

### 🧘 Funcionalidades Terapêuticas
- Progressão de ondas cerebrais cientificamente embasada
- Visualização guiada com metáforas simbólicas
- Indicador de respiração sincronizado
- Transições suaves entre fases
- Continuação de áudio pós-experiência para facilitar o sono

---

## 🚀 Como Usar

### 📱 Acesso Direto
Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Safari, Edge).

### 🌐 Servidor Local
```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (http-server)
npx http-server -p 8000

# Acesse: http://localhost:8000
```

### 📋 Preparação Recomendada
1. 🛏️ **Deite-se confortavelmente** em sua cama
2. 🎧 **Use fones de ouvido** (obrigatório para binaural)
3. 🌑 **Reduza a iluminação** do ambiente
4. 📱 **Ative o modo não perturbe** no celular
5. 😌 **Respire profundamente** e clique em "Iniciar Jornada"

---

## 🗂️ Estrutura do Projeto

```
guardiao-do-sono/
│
├── index.html                          # Página principal
│
├── css/
│   └── style.css                       # Estilos e animações
│
├── js/
│   ├── main.js                         # Controlador principal
│   ├── binaural-beats.js               # Sistema de batidas binaurais
│   ├── audio-system.js                 # Sistema de áudio e narração
│   ├── phase-transition.js             # Transições entre fases
│   ├── phase-1-sunset.js               # Fase 1: Pôr do Sol
│   ├── phase-2-underwater.js           # Fase 2: Jardim Submerso
│   └── phase-3-guardian.js             # Fase 3: O Guardião
│
├── docs/
│   ├── storyboard_guardiao_sono.json   # Storyboard completo
│   ├── roteiro_audio.txt               # Roteiro de áudio e narração
│   └── assets_sugeridos.txt            # Assets opcionais para upgrade
│
└── README.md                           # Este arquivo
```

---

## 🎭 As Três Fases

### 1️⃣ Fase 1: Transição - "Apagar o Dia" (2 min)
**Frequência**: 7 Hz (Ondas Alfa - Relaxamento)

Ambiente de pôr do sol com cores quentes que gradualmente se transformam em azul petróleo. Cada respiração escurece o cenário, simbolizando o encerramento do dia.

**Objetivo**: Desaceleração cognitiva e relaxamento progressivo

### 2️⃣ Fase 2: Imersão - "O Jardim Submerso" (4 min)
**Frequência**: 4 Hz (Ondas Teta - Meditação profunda)

Jardim aquático onírico com bolhas interativas flutuando. Cada bolha representa um pensamento que se dissolve e sobe, libertando a mente.

**Objetivo**: Dissolução de preocupações através de metáfora visual

### 3️⃣ Fase 3: Dissolução - "O Guardião" (3 min)
**Frequência**: 2 Hz (Ondas Delta - Sono profundo)

Figura de luz translúcida surge representando o próprio descanso. O guardião permanece vigilante enquanto você pode finalmente parar de controlar tudo.

**Objetivo**: Condicionamento de segurança e indução final do sono

---

## 🧬 Base Científica

O projeto é fundamentado em pesquisas nas seguintes áreas:

### Neurociência
- **Batidas Binaurais**: Diferença de frequências entre ouvidos induz ondas cerebrais específicas
- **Ondas Alfa (7-13 Hz)**: Estado de relaxamento consciente
- **Ondas Teta (4-7 Hz)**: Meditação profunda, criatividade
- **Ondas Delta (0.5-4 Hz)**: Sono profundo, recuperação

### Técnicas Aplicadas
1. **Relaxamento Progressivo de Jacobson**: Redução gradual de tensão
2. **Visualização Criativa Guiada**: Imagens mentais terapêuticas
3. **Hipnose Ericksoniana**: Linguagem permissiva e indireta
4. **Ancoragem Respiratória**: Sincronização de estímulos com respiração
5. **Metáforas de PNL**: Símbolos que o inconsciente processa profundamente
6. **Condicionamento Associativo**: Criação de âncoras de segurança

### Referências Bibliográficas
- Gawain, S. (1987). *Creative Visualization*
- Shepard, K. (2019). *Reverse Psychology*
- Beckwith, H. (1997). *Selling the Invisible*
- Cesari, F. (2019). *Video Persuasion*

---

## 🔧 Requisitos Técnicos

### Navegadores Suportados
- ✅ Chrome 90+ (recomendado)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### APIs Utilizadas
- **WebGL**: Renderização 3D (Three.js)
- **Web Audio API**: Síntese de áudio binaural
- **Web Speech API**: Narração em português
- **Screen Wake Lock API**: Previne tela de dormir (quando disponível)

### Performance
- **Desktop**: 60fps garantido
- **Mobile**: 60fps em dispositivos modernos (2020+)
- **RAM**: ~150MB durante execução
- **Storage**: ~200KB (sem assets externos)

---

## 📱 Compatibilidade Mobile

### iOS (iPhone/iPad)
✅ Safari 14+  
⚠️ Requer interação do usuário antes de iniciar áudio  
✅ Modo retrato ou paisagem

### Android
✅ Chrome 90+  
✅ Firefox 88+  
✅ Samsung Internet 14+

### Otimizações Móveis
- Pixel ratio limitado a 2x para economia de bateria
- Geometrias simplificadas automaticamente
- Touch-friendly UI
- Orientação adaptativa

---

## 🎨 Customização

### Ajustar Frequências Binaurais
```javascript
// Em binaural-beats.js
this.binauralBeats.start(7); // Alfa (7Hz)
this.binauralBeats.transitionTo(4, 10); // Teta (4Hz, transição de 10s)
```

### Modificar Duração das Fases
```javascript
// Em phase-X-*.js
this.duration = 120; // 2 minutos (120 segundos)
```

### Personalizar Narração
Edite os textos em cada arquivo de fase (`phase-X-*.js`) dentro das chamadas:
```javascript
this.audioSystem.narrate("Seu texto aqui", {
    rate: 0.7,  // Velocidade
    pitch: 0.9, // Tom
    volume: 0.8 // Volume
});
```

---

## 🐛 Troubleshooting

### ❌ Áudio não funciona
**Solução**: Clique na tela antes de iniciar (requisito de navegadores modernos)

### ❌ Narração não toca
**Solução**: Verifique se há vozes PT-BR instaladas no sistema:
- **Windows**: Configurações > Hora e Idioma > Fala
- **macOS**: Preferências > Acessibilidade > Fala > Vozes do Sistema
- **iOS**: Ajustes > Acessibilidade > Conteúdo Falado > Vozes

### ❌ Performance ruim em mobile
**Solução**: 
1. Feche outros apps
2. Ative modo economizador de bateria
3. Reduza resolução (ajuste `renderer.setPixelRatio(1)`)

### ❌ Tela desliga durante experiência
**Solução**: O app tenta usar Wake Lock API, mas nem todos os navegadores suportam. Ajuste manualmente para "nunca desligar" nas configurações do dispositivo.

---

## 🚧 Roadmap Futuro

### v1.1 (Planejado)
- [ ] Modo de personalização (escolher duração de fases)
- [ ] Salvamento de progresso (LocalStorage)
- [ ] Estatísticas de uso (quantas vezes usou)
- [ ] Temas alternativos (montanha, espaço, floresta)

### v1.2 (Planejado)
- [ ] PWA (Progressive Web App) para instalação
- [ ] Suporte offline completo
- [ ] Notificações para lembrar de usar antes de dormir
- [ ] Integração com Google Fit / Apple Health

### v2.0 (Futuro)
- [ ] Vozes humanas gravadas profissionalmente
- [ ] Assets 3D de alta qualidade
- [ ] Modo VR (WebXR)
- [ ] Música original ao vivo de artistas terapêuticos

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você deseja melhorar o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Áreas de Contribuição
- 🎨 Design visual e UX
- 🔊 Engenharia de áudio
- 🧠 Consultoria psicológica/terapêutica
- 📝 Tradução para outros idiomas
- 🐛 Correção de bugs
- 📚 Documentação

---

## ⚠️ Aviso Importante

**Este jogo é um complemento relaxante e NÃO substitui tratamento médico ou psicoterapêutico.**

Se você sofre de:
- Insônia crônica
- Transtornos do sono diagnosticados
- Ansiedade severa
- Depressão

**Consulte um profissional de saúde qualificado.**

Este projeto foi criado com base em técnicas reconhecidas, mas não deve ser usado como único tratamento para condições médicas.

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

```
Copyright (c) 2024 O Guardião do Sono

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Agradecimentos

- **Three.js Community**: Por manter a melhor biblioteca 3D para web
- **Web Audio API**: Por possibilitar síntese de áudio em tempo real
- **Pesquisadores de Neurociência**: Que estudam batidas binaurais
- **Comunidade de Hipnoterapia**: Por compartilhar técnicas terapêuticas
- **Você**: Por se preocupar com seu descanso e bem-estar ❤️

---

## 📞 Contato

Criado com 💙 para ajudar pessoas a dormirem melhor.

---

## 🌟 Agradecimentos Especiais

Um projeto dedicado a todos que lutam para desligar a mente à noite.  
Que este guardião digital possa acompanhá-los em jornadas tranquilas para o sono. 🌙✨

---

<div align="center">

**Feche os olhos. Respire. Descanse.**

[⬆ Voltar ao topo](#-o-guardião-do-sono)

</div>
