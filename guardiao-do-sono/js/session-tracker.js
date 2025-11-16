/**
 * 📊 SISTEMA DE RASTREAMENTO DE SESSÕES
 * 
 * Registra automaticamente cada vez que o usuário:
 * - Faz login
 * - Completa uma fase
 * - Completa sessão completa
 * - Usa o Incubador de Sonhos
 * 
 * Dados salvos PERMANENTEMENTE no localStorage do usuário
 */

class SessionTracker {
    constructor(userManagement) {
        this.userManagement = userManagement;
        this.currentSession = null;
        this.sessionStartTime = null;
        
        console.log('📊 Session Tracker inicializado');
    }
    
    /**
     * Inicia nova sessão ao fazer login
     */
    startSession() {
        if (!this.userManagement.currentUser) {
            console.warn('⚠️ Sem usuário logado');
            return;
        }
        
        this.sessionStartTime = new Date();
        
        this.currentSession = {
            id: 'session_' + Date.now(),
            userId: this.userManagement.currentUser.id,
            userName: `${this.userManagement.currentUser.nome} ${this.userManagement.currentUser.sobrenome}`,
            startTime: this.sessionStartTime.toISOString(),
            endTime: null,
            duration: 0, // em segundos
            activities: [],
            phasesCompleted: [],
            dreamIncubatorUsed: false,
            xpGained: 0,
            crystalsGained: 0
        };
        
        console.log(`📊 ============================================`);
        console.log(`📊 NOVA SESSÃO INICIADA`);
        console.log(`📊 ID: ${this.currentSession.id}`);
        console.log(`📊 Usuário: ${this.currentSession.userName}`);
        console.log(`📊 Hora: ${this.sessionStartTime.toLocaleString('pt-BR')}`);
        console.log(`📊 ============================================`);
        
        // Registrar atividade de login
        this.logActivity('login', 'Usuário fez login no sistema');
        
        return this.currentSession.id;
    }
    
    /**
     * Registra uma atividade na sessão atual
     */
    logActivity(type, description, metadata = {}) {
        if (!this.currentSession) {
            console.warn('⚠️ Nenhuma sessão ativa');
            return;
        }
        
        const activity = {
            timestamp: new Date().toISOString(),
            type: type, // 'login', 'phase_start', 'phase_complete', 'dream_incubator', 'logout'
            description: description,
            metadata: metadata
        };
        
        this.currentSession.activities.push(activity);
        
        console.log(`📝 Atividade registrada: ${type} - ${description}`);
    }
    
    /**
     * Registra início de fase
     */
    phaseStarted(phaseNumber) {
        this.logActivity('phase_start', `Iniciou Fase ${phaseNumber}`, {
            phase: phaseNumber,
            time: new Date().toISOString()
        });
    }
    
    /**
     * Registra conclusão de fase
     */
    phaseCompleted(phaseNumber, duration) {
        this.logActivity('phase_complete', `Completou Fase ${phaseNumber}`, {
            phase: phaseNumber,
            duration: duration,
            time: new Date().toISOString()
        });
        
        if (!this.currentSession.phasesCompleted.includes(phaseNumber)) {
            this.currentSession.phasesCompleted.push(phaseNumber);
        }
        
        console.log(`✅ Fase ${phaseNumber} registrada como completa`);
    }
    
    /**
     * Registra uso do Incubador de Sonhos
     */
    dreamIncubatorUsed(intention, seedId) {
        this.currentSession.dreamIncubatorUsed = true;
        
        this.logActivity('dream_incubator', 'Usou Incubador de Sonhos', {
            intention: intention,
            seedId: seedId,
            time: new Date().toISOString()
        });
        
        console.log('🌱 Incubador de Sonhos registrado');
    }
    
    /**
     * Registra XP ganho
     */
    addXP(amount, reason) {
        this.currentSession.xpGained += amount;
        
        this.logActivity('xp_gained', `Ganhou ${amount} XP`, {
            amount: amount,
            reason: reason,
            total: this.currentSession.xpGained
        });
    }
    
    /**
     * Registra cristais ganhos
     */
    addCrystals(amount, reason) {
        this.currentSession.crystalsGained += amount;
        
        this.logActivity('crystals_gained', `Ganhou ${amount} cristais`, {
            amount: amount,
            reason: reason,
            total: this.currentSession.crystalsGained
        });
    }
    
    /**
     * Finaliza a sessão atual
     */
    endSession(reason = 'logout') {
        if (!this.currentSession) {
            console.warn('⚠️ Nenhuma sessão ativa para finalizar');
            return null;
        }
        
        const endTime = new Date();
        this.currentSession.endTime = endTime.toISOString();
        
        // Calcular duração em segundos
        const durationMs = endTime - this.sessionStartTime;
        this.currentSession.duration = Math.floor(durationMs / 1000);
        
        // Registrar logout
        this.logActivity('logout', `Sessão finalizada: ${reason}`, {
            reason: reason,
            duration: this.currentSession.duration
        });
        
        // Salvar sessão no histórico do usuário
        this.saveSessionToHistory();
        
        console.log(`📊 ============================================`);
        console.log(`📊 SESSÃO FINALIZADA`);
        console.log(`📊 ID: ${this.currentSession.id}`);
        console.log(`📊 Usuário: ${this.currentSession.userName}`);
        console.log(`⏱️  Duração: ${this.formatDuration(this.currentSession.duration)}`);
        console.log(`🎯 Fases completadas: ${this.currentSession.phasesCompleted.join(', ')}`);
        console.log(`⭐ XP ganho: ${this.currentSession.xpGained}`);
        console.log(`💎 Cristais ganhos: ${this.currentSession.crystalsGained}`);
        console.log(`📊 ============================================`);
        
        const completedSession = this.currentSession;
        this.currentSession = null;
        this.sessionStartTime = null;
        
        return completedSession;
    }
    
    /**
     * Salva sessão no histórico permanente do usuário
     */
    saveSessionToHistory() {
        if (!this.currentSession || !this.userManagement.currentUser) {
            return;
        }
        
        const userId = this.userManagement.currentUser.id;
        
        // Obter histórico existente
        const historyKey = `user_${userId}_sessions_history`;
        let history = [];
        
        const savedHistory = localStorage.getItem(historyKey);
        if (savedHistory) {
            history = JSON.parse(savedHistory);
        }
        
        // Adicionar sessão atual
        history.push(this.currentSession);
        
        // Salvar de volta
        localStorage.setItem(historyKey, JSON.stringify(history));
        
        // Também salvar no objeto do usuário
        if (!this.userManagement.users[userId].sessionsHistory) {
            this.userManagement.users[userId].sessionsHistory = [];
        }
        
        this.userManagement.users[userId].sessionsHistory.push({
            sessionId: this.currentSession.id,
            date: this.currentSession.startTime,
            duration: this.currentSession.duration,
            phasesCompleted: this.currentSession.phasesCompleted.length,
            xpGained: this.currentSession.xpGained
        });
        
        // Atualizar última sessão
        this.userManagement.users[userId].lastSession = this.currentSession.startTime;
        
        // Incrementar contador de sessões
        if (!this.userManagement.users[userId].totalSessions) {
            this.userManagement.users[userId].totalSessions = 0;
        }
        this.userManagement.users[userId].totalSessions++;
        
        // Salvar usuários atualizados
        this.userManagement.saveUsers();
        
        console.log(`💾 Sessão salva no histórico do usuário ${userId}`);
    }
    
    /**
     * Obtém histórico de sessões do usuário
     */
    getUserSessionHistory(userId) {
        const historyKey = `user_${userId}_sessions_history`;
        const savedHistory = localStorage.getItem(historyKey);
        
        if (savedHistory) {
            return JSON.parse(savedHistory);
        }
        
        return [];
    }
    
    /**
     * Obtém estatísticas do usuário
     */
    getUserStats(userId) {
        const history = this.getUserSessionHistory(userId);
        
        if (history.length === 0) {
            return {
                totalSessions: 0,
                totalDuration: 0,
                averageDuration: 0,
                totalPhasesCompleted: 0,
                totalXP: 0,
                lastSession: null
            };
        }
        
        const stats = {
            totalSessions: history.length,
            totalDuration: 0,
            totalPhasesCompleted: 0,
            totalXP: 0,
            totalCrystals: 0,
            dreamIncubatorUses: 0,
            lastSession: history[history.length - 1].startTime
        };
        
        history.forEach(session => {
            stats.totalDuration += session.duration;
            stats.totalPhasesCompleted += session.phasesCompleted.length;
            stats.totalXP += session.xpGained || 0;
            stats.totalCrystals += session.crystalsGained || 0;
            if (session.dreamIncubatorUsed) {
                stats.dreamIncubatorUses++;
            }
        });
        
        stats.averageDuration = Math.floor(stats.totalDuration / stats.totalSessions);
        
        return stats;
    }
    
    /**
     * Formata duração em formato legível
     */
    formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}min ${secs}s`;
        } else if (minutes > 0) {
            return `${minutes}min ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }
    
    /**
     * Formata data/hora em português
     */
    formatDateTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    /**
     * Obtém sessão atual
     */
    getCurrentSession() {
        return this.currentSession;
    }
}

// Exportar
window.SessionTracker = SessionTracker;

console.log('📊 Session Tracker System carregado');
