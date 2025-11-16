# 🧪 Guia de Teste: Sistema de Rastreamento de Sessões

## ✅ Como Verificar se Está Funcionando

### Teste 1: Login e Início de Sessão

1. **Abra o sistema**: https://8000-ivnjkm25y6t6lgjsfn0te-cc2fbc16.sandbox.novita.ai
2. **Faça login como CLIENTE** (crie um novo se necessário)
3. **Abra o Console do Navegador** (F12 → Console)
4. **Verifique se aparece**:
   ```
   📊 Nova sessão iniciada: session_xxxxxxxxx
   ```

### Teste 2: Verificar localStorage Durante Uso

1. **Com o sistema aberto, pressione F12**
2. **Vá em: Application → Storage → Local Storage**
3. **Procure a chave**: `user_[seu_id]_sessions_history`
4. **Clique para ver o JSON**
5. **Deve mostrar algo como**:
   ```json
   [
     {
       "id": "session_1731773000000",
       "userId": "user_xxx",
       "userName": "João Silva",
       "startTime": "2025-11-16T16:30:00.000Z",
       "endTime": null,
       "duration": 0,
       "activities": [
         {
           "timestamp": "2025-11-16T16:30:00.000Z",
           "type": "login",
           "description": "Usuário fez login no sistema"
         }
       ],
       "phasesCompleted": [],
       "xpGained": 0,
       "crystalsGained": 0
     }
   ]
   ```

### Teste 3: Jogar e Completar Fases

1. **Clique em "🌙 Iniciar Jornada ao Sono"**
2. **No console, deve aparecer**:
   ```
   📊 Nova sessão iniciada: session_xxx (se ainda não tinha)
   📝 Atividade registrada: phase_start - Iniciou Fase 1
   ```
3. **Complete a Fase 1** (espere ~2 minutos ou ajuste tempo para teste)
4. **No console, deve aparecer**:
   ```
   📝 Atividade registrada: phase_complete - Completou Fase 1
   ✅ Fase 1 registrada como completa
   📝 Atividade registrada: phase_start - Iniciou Fase 2
   ```
5. **Complete as Fases 2 e 3 da mesma forma**

### Teste 4: Verificar Atividades Registradas

1. **No console do navegador, digite**:
   ```javascript
   // Ver sessão atual
   window.game.sessionTracker.getCurrentSession()
   ```
2. **Deve mostrar**:
   ```javascript
   {
     id: "session_xxx",
     userId: "user_xxx",
     userName: "João Silva",
     activities: [
       { type: "login", description: "...", timestamp: "..." },
       { type: "phase_start", description: "Iniciou Fase 1", ... },
       { type: "phase_complete", description: "Completou Fase 1", ... },
       // ... mais atividades
     ],
     phasesCompleted: [1, 2, 3], // conforme completar
     xpGained: 100,
     crystalsGained: 5
   }
   ```

### Teste 5: Plantar Semente do Incubador

1. **Durante o jogo, abra o painel lateral**
2. **Role até "🌱 Incubador de Sonhos"**
3. **Digite uma intenção**: "Quero sonhar com..."
4. **Clique em "🌱 Plantar Semente do Sonho"**
5. **No console, deve aparecer**:
   ```
   📝 Atividade registrada: dream_incubator - Usou Incubador de Sonhos
   🌱 Incubador de Sonhos registrado
   ```

### Teste 6: Completar Sessão e Ganhar Recompensas

1. **Complete todas as 3 fases**
2. **No console, deve aparecer**:
   ```
   📝 Atividade registrada: crystals_gained - Ganhou 5 cristais
   ```
3. **Se subir de nível, verá**:
   ```
   📝 Atividade registrada: xp_gained - Ganhou 100 XP
   ```

### Teste 7: Logout e Finalização de Sessão

1. **Clique no botão "🚪 Sair"**
2. **No console, deve aparecer**:
   ```
   📊 Sessão finalizada: session_xxx
   ⏱️ Duração: Xmin Ys
   💾 Sessão salva no histórico do usuário user_xxx
   ```

### Teste 8: Login como Terapeuta e Ver Dados

1. **Faça login como TERAPEUTA** (código: `NEWDRI193117`)
2. **Clique em "👥 Gerenciar"**
3. **Localize o usuário que você testou**
4. **Deve ver**:
   - **Total de Sessões**: 1 (ou mais)
   - **Tempo Total**: Duração somada
   - **Tempo Médio**: Calculado automaticamente
   - **Fases Completadas**: 3 (se completou tudo)
5. **Clique em "📖 Ver Últimas Sessões"**
6. **Deve mostrar tabela com**:
   - Data/Hora do login
   - Duração da sessão
   - Fases completadas (3/3)
   - XP ganho

### Teste 9: Verificar Persistência Após Reload

1. **Faça login como cliente, navegue pelo jogo**
2. **Faça logout**
3. **Feche completamente o navegador**
4. **Abra novamente e faça login como terapeuta**
5. **Vá em Gerenciar → Usuários**
6. **Verifique se os dados da sessão anterior ainda estão lá**
7. **✅ Se estiverem, a persistência está funcionando!**

---

## 🔍 Comandos Úteis no Console

### Ver histórico completo de um usuário:
```javascript
// Substitua 'user_xxx' pelo ID real
localStorage.getItem('user_user_xxx_sessions_history')
```

### Ver estatísticas:
```javascript
window.game.userManagement.sessionTracker.getUserStats('user_xxx')
```

### Ver sessão atual:
```javascript
window.game.sessionTracker.getCurrentSession()
```

### Ver todas as atividades da sessão atual:
```javascript
window.game.sessionTracker.getCurrentSession().activities
```

---

## ❌ Problemas Comuns e Soluções

### "sessionTracker is undefined"
**Causa**: SessionTracker não foi inicializado ainda  
**Solução**: Aguarde o jogo carregar completamente, deve ver no console:
```
📊 Sistema de Rastreamento de Sessões inicializado
```

### "Sessão não está sendo registrada"
**Causa**: Pode não estar logado  
**Solução**: 
1. Verifique se fez login corretamente
2. Veja no console se apareceu "📊 Nova sessão iniciada"
3. Verifique `sessionStorage.getItem('guardiao_current_user')`

### "Dados não aparecem no painel do terapeuta"
**Causa**: Pode estar vendo usuário errado ou localStorage diferente  
**Solução**:
1. Confirme que está no mesmo navegador
2. Verifique se o userId está correto
3. Abra DevTools → Application → Local Storage
4. Procure chave com padrão `user_{userId}_sessions_history`

### "Histórico vazio após reload"
**Causa**: Cache/localStorage foi limpo  
**Solução**:
- **IMPORTANTE**: Não limpe cache do navegador ou dados do site
- localStorage é por domínio, use sempre o mesmo URL

---

## 📊 Estrutura de Dados Salva

### localStorage Keys:

```
guardiao_users                          → Lista de todos os usuários
guardiao_master_code                    → Código do terapeuta
guardiao_current_user                   → ID do usuário logado (sessionStorage)
user_{userId}_sessions_history          → Histórico COMPLETO de sessões
user_{userId}_evolution_progress        → Progresso de XP/cristais
user_{userId}_dream_history             → Histórico do Incubador
```

### Estrutura de uma Sessão:

```javascript
{
  "id": "session_1731773000000",
  "userId": "user_123",
  "userName": "João Silva",
  "startTime": "2025-11-16T16:30:00.000Z",  // ISO timestamp
  "endTime": "2025-11-16T16:45:23.000Z",    // ISO timestamp
  "duration": 923,                           // segundos
  "activities": [
    {
      "timestamp": "2025-11-16T16:30:00.000Z",
      "type": "login",
      "description": "Usuário fez login no sistema",
      "metadata": {}
    },
    {
      "timestamp": "2025-11-16T16:32:00.000Z",
      "type": "phase_start",
      "description": "Iniciou Fase 1",
      "metadata": { "phase": 1, "time": "..." }
    },
    {
      "timestamp": "2025-11-16T16:34:00.000Z",
      "type": "phase_complete",
      "description": "Completou Fase 1",
      "metadata": { "phase": 1, "duration": 120 }
    },
    // ... mais atividades
    {
      "timestamp": "2025-11-16T16:45:23.000Z",
      "type": "logout",
      "description": "Sessão finalizada: user_logout",
      "metadata": { "reason": "user_logout", "duration": 923 }
    }
  ],
  "phasesCompleted": [1, 2, 3],
  "dreamIncubatorUsed": true,
  "xpGained": 100,
  "crystalsGained": 5
}
```

---

## ✅ Checklist de Verificação

Use esta lista para confirmar que tudo está funcionando:

- [ ] Login registra sessão (console mostra "Nova sessão iniciada")
- [ ] Início do jogo registra Fase 1 started
- [ ] Completar fases registra phase_complete
- [ ] Plantar semente registra dream_incubator
- [ ] Completar sessão registra crystals_gained
- [ ] Subir de nível registra xp_gained
- [ ] Logout finaliza sessão e calcula duração
- [ ] localStorage contém `user_{id}_sessions_history`
- [ ] Terapeuta vê estatísticas corretas
- [ ] Terapeuta vê histórico de sessões
- [ ] Dados persistem após fechar navegador
- [ ] Recarregar página retoma sessão (se ainda logado)

---

## 🎯 Teste Completo Passo a Passo

### Cenário: Teste de Ponta a Ponta

1. **Limpar dados anteriores** (opcional para teste limpo):
   - F12 → Console
   - `localStorage.clear(); sessionStorage.clear();`
   - Recarregar página

2. **Criar novo usuário**:
   - Login como terapeuta (`NEWDRI193117`)
   - Gerenciar → Novo Usuário
   - Preencher dados: Nome, Sobrenome, etc.
   - Anotar o código gerado (ex: `ABC123`)

3. **Fazer logout**:
   - Botão 🚪 Sair

4. **Login como cliente**:
   - Usar código recém-criado
   - Console deve mostrar: "📊 Nova sessão iniciada"

5. **Jogar o jogo**:
   - Iniciar Jornada ao Sono
   - Observar console para mensagens de phase_start/complete
   - (Opcional) Plantar semente no Incubador

6. **Completar sessão**:
   - Terminar todas as 3 fases
   - Observar mensagens de crystals/xp

7. **Fazer logout**:
   - Botão 🚪 Sair
   - Console deve mostrar: "📊 Sessão finalizada" com duração

8. **Verificar como terapeuta**:
   - Login como terapeuta
   - Gerenciar → Usuários
   - Localizar o cliente
   - Verificar estatísticas: deve mostrar 1 sessão
   - Clicar "📖 Ver Últimas Sessões"
   - Confirmar dados: data, hora, duração, fases

9. **Teste de persistência**:
   - Fechar navegador completamente
   - Abrir novamente
   - Login como terapeuta
   - Verificar que dados ainda estão lá

10. **✅ Sucesso!** Se todos os dados aparecerem corretamente, o sistema está 100% funcional!

---

## 📞 Debug e Troubleshooting

Se algo não funcionar:

1. **Abra o console** (F12)
2. **Verifique por erros** (texto vermelho)
3. **Teste comandos**:
   ```javascript
   // SessionTracker foi carregado?
   typeof SessionTracker
   
   // Game tem sessionTracker?
   window.game?.sessionTracker
   
   // UserManagement tem sessionTracker?
   window.game?.userManagement?.sessionTracker
   
   // Há usuário logado?
   window.game?.userManagement?.currentUser
   
   // Há sessão ativa?
   window.game?.sessionTracker?.getCurrentSession()
   ```

4. **Copie os erros e mensagens de console** se precisar de ajuda

---

**Teste criado em: 16 de Novembro de 2025**  
**Sistema: O Guardião do Sono - Session Tracking v2.0**
