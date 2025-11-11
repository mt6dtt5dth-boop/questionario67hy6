# 🌸 Sistema de Avaliação Psicossexual - Newdri Clinic

Sistema profissional para aplicação e análise de questionários de intimidade e bem-estar sexual.

**Desenvolvido para:** Dr. Newton Guimarães - Newdri Clinic, São Lourenço/MG

---

## 📚 Documentação Completa

### 🎯 **[📚 INDEX.md](INDEX.md)** ← **ÍNDICE COMPLETO** (navegue por tudo!)

### Guias Principais:
- **[⚡ QUICK-START.md](QUICK-START.md)** ← **COMECE AQUI!** (3 passos, 15 minutos)
- **[📖 GUIA-COMPLETO-FINAL.md](GUIA-COMPLETO-FINAL.md)** - Guia definitivo completo
- **[🔧 CONFIGURAR-SUPABASE.md](CONFIGURAR-SUPABASE.md)** - Setup do banco de dados (5 min)
- **[🚀 DEPLOY.md](DEPLOY.md)** - Deploy no Cloudflare Pages (5 min)
- **[🎨 SHOWCASE-VISUAL.md](SHOWCASE-VISUAL.md)** - Todas as cores e gradientes
- **[✅ PROJETO-FINALIZADO.md](PROJETO-FINALIZADO.md)** - Resumo do projeto
- **[📄 ENTREGA-FINAL.txt](ENTREGA-FINAL.txt)** - Documento de entrega

---

## 📋 Visão Geral

Sistema web completo para avaliação psicossexual com:

- ✅ **66 questões validadas** organizadas em 14 seções temáticas
- ✅ **5 escalas psicométricas** automatizadas
- ✅ **10 pares validadores** para detecção de dissonâncias
- ✅ **6 perfis identificáveis** (Dominante, Submisso, Switch, Explorador, Romântico, Conservador)
- ✅ **Análise contextual** (idade, localidade, profissão, estado civil, renda)
- ✅ **Relatórios detalhados** prontos para impressão/PDF
- ✅ **100% privado** - processamento local, sem envio de dados

---

## 🚀 Como Utilizar

### Para o Dr. Newton:

1. **Acesse o sistema:** Abra `index.html` no navegador
2. **Painel Admin:** Clique em "Acesso Profissional" para instruções completas
3. **Aplicação:** Forneça o link do questionário ao paciente
4. **Análise:** Revise o relatório gerado automaticamente

### Para Pacientes:

1. Acessar link fornecido pelo Dr. Newton
2. Preencher dados demográficos e 66 questões
3. Salvar progresso a qualquer momento (opcional)
4. Finalizar para gerar relatório

---

## 📊 Escalas Calculadas

### 1. **Abertura Sexual** (0-100%)
- Avalia disposição para experimentar novas experiências
- Considera: exploração, curiosidade, histórico de experimentação
- Ajustado por contexto social (interior conservador +15 pontos)

### 2. **Autoconhecimento** (0-100%)
- Mede consciência sobre próprios desejos e limites
- Baseado em: autoerotismo, conhecimento corporal, consistência
- Fundamental para saúde sexual

### 3. **Dominância ↔ Submissão** (-50 a +50)
- **Positivo (+20 a +50):** Tendência dominante
- **Negativo (-20 a -50):** Tendência submissa
- **Neutro (-20 a +20):** Switch/Versátil

### 4. **Masoquismo** (0-100%)
- Interesse em sensações intensas e leve dor consensual
- Marcadores: prazer em desconforto, curiosidade sobre restrições
- Não patológico - exploração dentro de SSC (Seguro, São, Consensual)

### 5. **Dissonância Contexto/Desejo** (0-100%)
- **CRÍTICO se > 70%** - Intervenção urgente
- Revela diferença entre desejos reais e expressão permitida
- Causas: repressão social, trauma, medo de julgamento

---

## 🎯 Perfis Identificáveis

### **Dominante**
- Liderança, controle, excitação em dominar
- Marcadores: Q8(a), Q10(a), Q11(a), Q13(a)

### **Submisso**
- Entrega, vulnerabilidade, receber ordens
- Subtipos: Masoquista, Romântica
- Marcadores: Q8(c), Q9(a/b), Q10(c), Q11(c), Q13(b)

### **Switch/Versátil**
- Alternância entre papéis
- Situacional, depende do contexto e parceiro

### **Explorador/Experimental**
- Alta abertura (>70%)
- Busca ativa de novas experiências
- Pesquisa e curiosidade intelectual

### **Romântico/Emocional**
- Conexão emocional prioritária
- Q11(b), Q31(b), Q35(b)

### **Conservador/Reprimido**
- Baixa abertura (<30%)
- **Tipos:** Genuíno, Contextual, Trauma
- Requer análise cuidadosa para diferenciação

---

## 🔍 Dissonâncias Detectadas

Sistema identifica automaticamente inconsistências entre pares de questões:

| Par | O que Detecta | Interpretação |
|-----|---------------|---------------|
| Q4 ↔ Q6 | Comunicação vs Recepção | Insegurança profunda |
| Q8 ↔ Q10 | Role-play vs Fantasias | Repressão de desejos |
| Q17 ↔ Q18 | Experiência vs Abertura | Culpa sobre prazer |
| Q22 ↔ Q24 | Fantasias vs Compartilhar | Vergonha/medo |
| **Q49 ↔ Q50** | **Desejo vs Permissão** | **CRÍTICO: Repressão contextual** |
| **Q60 ↔ Q61** | **Satisfação vs Desejos ocultos** | **CRÍTICO: Comunicação falha** |

---

## 🌍 Análise Contextual

### Por Localidade:
- **Interior (<100k hab):** +15 pontos abertura se contexto conservador
- **Capital:** Respostas mais fidedignas, menor pressão social

### Por Idade:
- **18-25:** Fase de descoberta, conservadorismo atípico = alerta
- **26-35:** Pico exploração, conflito desejo/expectativa comum
- **36-45:** Redescobrimento, despertar tardio possível
- **46+:** Consolidação, menor julgamento social

### Por Estado Civil:
- **Casada:** Atenção especial para Q60↔Q61 (satisfação vs desejos)
- **Solteira:** Verificar impedimentos para exploração (Q62)

### Por Profissão:
- **Educação:** Alta pressão por "comportamento exemplar"
- **Corporativa/Jurídica:** Controle profissional vs entrega sexual

---

## 📈 Interpretação de Resultados

### Escalas de Abertura:

#### 70-100%: ALTA
- Muito aberta para exploração
- Busca ativa ou receptividade forte
- Provavelmente já experimentou diversas práticas

#### 40-69%: MODERADA
- Aberta com pessoa certa
- Depende de contexto e confiança
- Curiosidade presente

#### 0-39%: BAIXA
- Preferência por familiar
- Cautelosa ou conservadora
- Investigar: genuíno, contextual ou trauma

### Dissonância:

#### 70-100%: SEVERA 🚨
- **URGENTE** - Intervenção imediata
- Risco: depressão, ansiedade, crise
- Possível acúmulo de décadas

#### 40-69%: MODERADA ⚠️
- Atenção necessária
- Trabalho terapêutico recomendado
- Monitorar evolução

#### 0-39%: BAIXA ✅
- Alinhamento saudável
- Desejos e expressão congruentes

---

## 🏥 Recomendações por Perfil

### Submisso com Alta Dissonância + Interior Conservador:
1. **URGENTE:** Terapia individual (desconstrução de culpa)
2. **IMPORTANTE:** Educação sobre BDSM seguro
3. **DESEJÁVEL:** Terapia de casal (se em relacionamento)

### Explorador com Baixo Autoconhecimento:
1. **IMPORTANTE:** Aumentar prática de autoerotismo
2. **DESEJÁVEL:** Experimentação gradual com recursos simples
3. Foco: transformar curiosidade teórica em prática

### Conservador Reprimido por Trauma:
1. **CRÍTICO:** Encaminhar para especialista em trauma
2. Não forçar exploração antes de trabalho terapêutico
3. Avaliação psicológica completa necessária

---

## 🔒 Confidencialidade e LGPD

### Armazenamento:
- ✅ Dados ficam **apenas** no navegador do paciente (localStorage)
- ✅ **Nenhuma informação** enviada para servidores
- ✅ Análise processada **localmente**

### Arquivamento Profissional:
1. Imprimir relatório ou salvar como PDF
2. Código do paciente (ex: PSX-2025-001)
3. Armazenar em local seguro físico
4. **NUNCA** compartilhar sem consentimento explícito

### Limpeza:
- Paciente: Pode limpar dados do navegador a qualquer momento
- Profissional: Botão no painel admin para limpar dados locais

---

## 🛠️ Estrutura do Sistema

```
newdri-clinic/
├── index.html              # Página inicial
├── questionario.html       # Formulário de 66 questões
├── relatorio.html          # Visualização de resultados
├── admin.html              # Painel administrativo
├── css/
│   └── styles.css          # Estilos profissionais
├── js/
│   ├── questoes-data.js    # Banco de dados das questões
│   ├── questionario.js     # Lógica do formulário
│   └── analise.js          # Motor de análise psicométrica
└── README.md               # Esta documentação
```

---

## 🖥️ Requisitos Técnicos

- **Navegador:** Chrome, Firefox, Safari, Edge (versões recentes)
- **JavaScript:** Habilitado (essencial)
- **LocalStorage:** Habilitado (para salvar progresso)
- **Conexão:** Não necessária após carregamento inicial

---

## 📱 Uso Recomendado

### No Consultório:
- Tablet ou computador disponível
- Aplicação presencial com suporte
- Relatório impresso entregue na sessão

### Remoto:
- Enviar link por email seguro
- Paciente preenche em casa
- Relatório discutido em próxima sessão

---

## ⚕️ Ética Profissional

### ✅ FAZER:
- Aplicar em contexto terapêutico
- Obter consentimento informado
- Interpretar com formação adequada
- Manter confidencialidade absoluta
- Usar como ferramenta de apoio

### ❌ NÃO FAZER:
- Usar fora de contexto clínico
- Compartilhar resultados sem consentimento
- Diagnosticar baseado apenas no questionário
- Aplicar sem supervisão profissional
- Ignorar alertas críticos do sistema

---

## 🚨 Alertas Importantes

### Encaminhar IMEDIATAMENTE para especialista se:
- ✅ Q40(c/d) + Conservadorismo extremo = **Possível trauma sexual**
- ✅ Dissonância > 80% + Idade 35+ + Casada + Interior = **"Bomba relógio"**
- ✅ Inconsistências massivas (>5 pares) = **Confusão profunda ou desonestidade**
- ✅ Q7(c) + Q52(c/d) = **Possível relacionamento abusivo**

---

## 📞 Suporte

**Desenvolvido especialmente para:**
- **Profissional:** Dr. Newton Guimarães
- **Clínica:** Newdri Clinic
- **Localização:** São Lourenço - MG

Para dúvidas técnicas ou ajustes no sistema, manter documentação deste arquivo.

---

## 📄 Licença e Uso

- **Uso Profissional Exclusivo**
- Desenvolvido para Newdri Clinic
- Proibida reprodução ou distribuição sem autorização
- Sistema protegido por direitos autorais

---

## 🔄 Versão

**Versão:** 1.0  
**Data:** Novembro 2025  
**Status:** Produção  

---

**🌸 Newdri Clinic - Cuidando da sua saúde emocional e sexual com profissionalismo e ética**
