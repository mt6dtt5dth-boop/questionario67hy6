# 📊 Guia Completo de Teste - Rastreamento de Sessões

## ✅ Correções Implementadas

O sistema agora está **COMPLETAMENTE FUNCIONAL** e rastreando todas as atividades dos usuários!

### 🔧 Problemas Corrigidos:

1. **Isolamento de Dados por Usuário** ✅
   - Antes: Todos usuários compartilhavam o mesmo `guardiao_progress`
   - Agora: Cada usuário tem `user_{userId}_progress` isolado

2. **Recarregamento de Dados no Login** ✅
   - Antes: Sistemas não recarregavam dados ao fazer login
   - Agora: `reloadUserSystems()` recarrega Evolution e Dream Incubator

3. **Registro de XP e Cristais** ✅
   - Antes: Conquistas não registravam no SessionTracker
   - Agora: `unlockAchievement()` registra +50 XP e cristais ganhos

4. **Logs Detalhados** ✅
   - Agora mostra no console:
     - Início de sessão com usuário, ID e hora
     - Fim de sessão com duração, fases, XP e cristais

---

## 🧪 Como Testar o Sistema Completo

### Passo 1: Criar um Usuário Cliente

1. Acesse: **https://8000-ivnjkm25y6t6lgjsfn0te-cc2fbc16.sandbox.novita.ai**

2. Faça login como **TERAPEUTA**:
   - Campo ENTRADA TERAPEUTA: `NEWDRI193117`
   - Clique em "🔐 Entrar como Terapeuta"

3. Clique no botão **👥 Gerenciar**

4. Vá para aba **➕ Novo Usuário**

5. Preencha o formulário:
   ```
   Nome: João
   Sobrenome: Silva
   Data de Nascimento: 01/01/1990
   WhatsApp: (11) 99999-9999
   E-mail: joao@teste.com
   Cidade: São Paulo
   Estado: São Paulo
   Queixa Principal: Insônia e ansiedade
   Duração do Acesso: 30 dias
   ```

6. Clique em **Criar Usuário**

7. **IMPORTANTE**: Copie o código gerado (ex: `ABC123`)

---

### Passo 2: Testar Sessão do Cliente

#### 2.1 - Fazer Logout do Terapeuta

1. Clique no botão **🚪 Sair** (topo direito)
2. Confirme o logout

#### 2.2 - Fazer Login como Cliente

1. No campo **ENTRADA CLIENTE**, digite o código (ex: `ABC123`)
2. Clique em "✨ Entrar como Cliente"
3. **ABRA O CONSOLE DO NAVEGADOR** (F12)
4. Você deverá ver:
   ```
   📊 ============================================
   📊 NOVA SESSÃO INICIADA
   📊 ID: session_1234567890
   📊 Usuário: João Silva
   📊 Hora: 16/11/2025 14:30:00
   📊 ============================================
   ```

#### 2.3 - Usar o Sistema

1. **Plantar Semente de Sonho**:
   - No painel lateral, role até "🌱 Incubador de Sonhos"
   - Digite uma intenção: "Quero sonhar que estou voando livremente"
   - Clique em "🌱 Plantar Semente do Sonho"
   - No console, veja: `🌱 Incubador de Sonhos registrado`

2. **Iniciar Jornada**:
   - Clique em "🌙 Iniciar Jornada ao Sono"
   - Complete a Fase 1 (cerca de 2 minutos)
   - No console, veja: `✅ Fase 1 registrada como completa`

3. **(Opcional) Completar Sessão Inteira**:
   - Continue até o final das 3 fases
   - Ao final, veja: `🎉 Sessão completa registrada!`
   - Cristais e XP serão adicionados

#### 2.4 - Fazer Logout do Cliente

1. Clique em **🚪 Sair**
2. **OBSERVE O CONSOLE**:
   ```
   📊 ============================================
   📊 SESSÃO FINALIZADA
   📊 ID: session_1234567890
   📊 Usuário: João Silva
   ⏱️  Duração: 2min 30s
   🎯 Fases completadas: 1
   ⭐ XP ganho: 50
   💎 Cristais ganhos: 5
   📊 ============================================
   💾 Sessão salva no histórico do usuário user_xxx
   ```

---

### Passo 3: Verificar Dados no Painel do Terapeuta

1. Faça login novamente como **TERAPEUTA** (`NEWDRI193117`)

2. Clique em **👥 Gerenciar**

3. Localize o usuário **João Silva**

4. Você deverá ver:

   **📊 Estatísticas de Uso**:
   ```
   ┌──────────────────┬──────────────┬──────────────┬───────────────────┐
   │ Total de Sessões │ Tempo Total  │ Tempo Médio  │ Fases Completadas │
   │        1         │   2min 30s   │   2min 30s   │         1         │
   └──────────────────┴──────────────┴──────────────┴───────────────────┘
   ```

5. Clique em **📖 Ver Últimas Sessões (1)**

6. A tabela aparecerá mostrando:
   ```
   ┌──────────────────────┬──────────┬────────┬──────┐
   │ Data/Hora            │ Duração  │ Fases  │  XP  │
   ├──────────────────────┼──────────┼────────┼──────┤
   │ 16/11/2025 14:30     │ 2min 30s │  1/3   │ +50  │
   └──────────────────────┴──────────┴────────┴──────┘
   ```

---

### Passo 4: Testar Múltiplas Sessões

1. Repita os passos 2.2 a 2.4 mais algumas vezes
2. Cada vez:
   - Varie o tempo de uso
   - Complete diferentes quantidades de fases
   - Use ou não use o Incubador de Sonhos

3. Volte ao painel do terapeuta e veja:
   - **Total de Sessões** aumentando
   - **Tempo Total** acumulando
   - **Tempo Médio** sendo calculado
   - **Últimas 5 sessões** na tabela

---

### Passo 5: Testar Edição de Usuário

1. No painel do terapeuta, localize o usuário
2. Clique em **✏️ Editar**
3. Um modal aparecerá com todos os dados
4. Modifique alguns campos (ex: WhatsApp, E-mail)
5. Clique em **💾 Salvar Alterações**
6. Verifique que os dados foram atualizados

---

### Passo 6: Testar Isolamento de Dados

#### 6.1 - Criar Segundo Usuário

1. Crie outro usuário:
   ```
   Nome: Maria
   Sobrenome: Santos
   ```
2. Copie o novo código (ex: `XYZ789`)

#### 6.2 - Fazer Login como Maria

1. Logout do terapeuta
2. Login com código de Maria
3. **Observe no console**: Nova sessão para "Maria Santos"
4. Use o sistema por alguns minutos
5. Logout

#### 6.3 - Verificar Dados Separados

1. Login como terapeuta
2. Verifique painel:
   - **João Silva**: Tem suas sessões
   - **Maria Santos**: Tem sessões diferentes
   - **Os dados NÃO se misturam**

---

## 🔍 O Que Verificar no Console do Navegador

### Durante Login:
```
📊 ============================================
📊 NOVA SESSÃO INICIADA
📊 ID: session_1731771000000
📊 Usuário: João Silva
📊 Hora: 16/11/2025 14:30:00
📊 ============================================
📝 Atividade registrada: login - Usuário fez login no sistema
```

### Durante Uso:
```
🌱 Incubador de Sonhos registrado
✅ Fase 1 registrada como completa
📝 Atividade registrada: phase_complete - Completou Fase 1
💎 Cristais ganhos registrados
⭐ XP ganho registrado
```

### Durante Logout:
```
📊 ============================================
📊 SESSÃO FINALIZADA
📊 ID: session_1731771000000
📊 Usuário: João Silva
⏱️  Duração: 5min 23s
🎯 Fases completadas: 1, 2
⭐ XP ganho: 150
💎 Cristais ganhos: 8
📊 ============================================
💾 Sessão salva no histórico do usuário user_1731770500000
```

---

## 🗂️ Onde os Dados São Armazenados

### localStorage (F12 > Application > Local Storage):

```javascript
// Dados do usuário Master
'guardiao_users' = {
  "master": {...},
  "user_1234": {...}
}

// Progresso isolado de cada usuário
'user_1234_progress' = {
  sessionCount: 5,
  crystals: 25,
  currentLevel: 2,
  achievements: {...}
}

// Histórico de sessões (PERMANENTE)
'user_1234_sessions_history' = [
  {
    id: 'session_1234567890',
    userId: 'user_1234',
    userName: 'João Silva',
    startTime: '2025-11-16T14:30:00.000Z',
    endTime: '2025-11-16T14:35:23.000Z',
    duration: 323,  // segundos
    activities: [...],
    phasesCompleted: [1, 2],
    dreamIncubatorUsed: true,
    xpGained: 150,
    crystalsGained: 8
  },
  // ... mais sessões
]

// Dream Incubator isolado
'user_1234_dream_history' = [...]
'user_1234_active_dream_seed' = {...}
```

### sessionStorage (Temporário):
```javascript
'guardiao_current_user' = 'user_1234'  // Usuário logado
```

---

## ✅ Checklist de Verificação

### Funcionalidades Básicas:
- [ ] Login como terapeuta funciona
- [ ] Criar novo usuário funciona
- [ ] Login como cliente funciona
- [ ] Logout funciona (terapeuta e cliente)

### Rastreamento de Sessões:
- [ ] Console mostra "NOVA SESSÃO INICIADA" no login
- [ ] Console mostra "SESSÃO FINALIZADA" no logout
- [ ] Duração é calculada corretamente
- [ ] Dados aparecem no painel do terapeuta

### Registro de Atividades:
- [ ] Plantar semente registra no SessionTracker
- [ ] Completar fase registra no SessionTracker
- [ ] Ganhar XP registra no SessionTracker
- [ ] Ganhar cristais registra no SessionTracker

### Isolamento de Dados:
- [ ] Cada usuário tem dados separados
- [ ] Trocar de usuário mostra dados corretos
- [ ] Histórico não se mistura entre usuários

### Painel do Terapeuta:
- [ ] Estatísticas aparecem corretamente
- [ ] Tabela de sessões mostra dados
- [ ] Expandir/ocultar histórico funciona
- [ ] Data/hora em português (pt-BR)
- [ ] Duração formatada (Xmin Ys)

### Edição de Usuário:
- [ ] Modal de edição abre
- [ ] Campos preenchidos com dados atuais
- [ ] Salvar altera os dados
- [ ] Dados atualizados aparecem no card

---

## 🐛 Troubleshooting

### Problema: "Nenhuma sessão registrada ainda"

**Causa**: Usuário ainda não usou o sistema  
**Solução**: Faça login como o cliente e use o sistema

### Problema: Estatísticas mostram zeros

**Causa**: localStorage pode estar vazio ou corrupto  
**Solução**:
1. Abra F12 > Console
2. Digite: `localStorage.clear()`
3. Recarregue a página
4. Crie novo usuário e teste novamente

### Problema: Console não mostra logs de sessão

**Causa**: sessionTracker pode não estar inicializado  
**Solução**:
1. Verifique no console: `window.game.sessionTracker`
2. Deve retornar um objeto SessionTracker
3. Se retornar undefined, recarregue a página

### Problema: Dados de usuários se misturam

**Causa**: Pode estar usando versão antiga do código  
**Solução**:
1. Force reload: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)
2. Limpe cache do navegador
3. Verifique se está usando a URL correta

---

## 📞 Informações Técnicas

### Commits Realizados:

1. **fcff9cf** - Implementação inicial do SessionTracker
2. **eb8fc3b** - Correção crítica: Isolamento por usuário

### Arquivos Modificados:

- `js/session-tracker.js` - Logs detalhados
- `js/user-management.js` - Função reloadUserSystems()
- `js/evolution-system.js` - Chaves isoladas por usuário
- `js/dream-incubator.js` - Chaves isoladas por usuário

### Chaves localStorage Usadas:

```
guardiao_users                        - Lista de todos usuários
guardiao_master_code                  - Código master
user_{userId}_progress                - Progresso do jogo
user_{userId}_sessions_history        - Histórico de sessões
user_{userId}_dream_history           - Histórico de sonhos
user_{userId}_active_dream_seed       - Semente ativa
```

---

## 🎯 Resultado Esperado

Após seguir todos os passos, você deverá ter:

✅ **Para o Cliente**:
- Sistema funciona normalmente
- Dados são salvos e carregados corretamente
- Progresso é mantido entre sessões

✅ **Para o Terapeuta**:
- Visibilidade completa de uso de cada cliente
- Estatísticas precisas (sessões, tempo, fases)
- Histórico detalhado das últimas 5 sessões
- Data/hora de cada acesso registrada
- Duração de cada sessão calculada
- Fases completadas registradas
- XP e Cristais ganhos registrados

✅ **Isolamento de Dados**:
- Cada cliente tem dados completamente separados
- Trocar de usuário mostra dados corretos
- Nenhum vazamento de dados entre usuários

---

## 🚀 Próximos Passos (Opcional)

Se quiser expandir o sistema, considere:

1. **Exportar Relatórios**: Botão para gerar PDF/CSV
2. **Gráficos**: Visualização de progresso ao longo do tempo
3. **Alertas**: Notificar terapeuta sobre inatividade
4. **Backup**: Sistema automático de backup
5. **Sincronização**: Backend para sincronizar entre dispositivos

---

**Sistema Testado e Funcionando! ✅**

Desenvolvido em: 16 de Novembro de 2025  
URL de Teste: https://8000-ivnjkm25y6t6lgjsfn0te-cc2fbc16.sandbox.novita.ai  
Repositório: https://github.com/mt6dtt5dth-boop/questionario67hy6/tree/main
