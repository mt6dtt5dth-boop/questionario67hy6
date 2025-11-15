/**
 * 🌙 Sistema de Evolução e Gamificação do Guardião do Sono
 * 
 * Gerencia:
 * - Níveis e progressão do usuário
 * - Sistema de conquistas (achievements)
 * - Cristais de energia (moeda virtual)
 * - Benefícios premium desbloqueáveis
 * - Persistência via localStorage
 */

class EvolutionSystem {
    constructor() {
        this.achievements = {
            primeira_jornada: {
                id: 'primeira_jornada',
                name: '🌟 Primeira Jornada',
                description: 'Completou a primeira sessão',
                icon: '🌟',
                unlocked: false,
                crystals: 5
            },
            semana_completa: {
                id: 'semana_completa',
                name: '📅 Semana Sagrada',
                description: '7 dias consecutivos',
                icon: '📅',
                unlocked: false,
                crystals: 20
            },
            mestre_delta: {
                id: 'mestre_delta',
                name: '🧘 Mestre Delta',
                description: 'Alcançou o estado Delta 10 vezes',
                icon: '🧘',
                unlocked: false,
                crystals: 15
            },
            guardiao_supremo: {
                id: 'guardiao_supremo',
                name: '👑 Guardião Supremo',
                description: 'Atingiu o nível máximo',
                icon: '👑',
                unlocked: false,
                crystals: 50
            }
        };

        this.levels = [
            { level: 1, title: 'Iniciante', sessionsRequired: 0, color: '#667eea' },
            { level: 2, title: 'Aprendiz', sessionsRequired: 5, color: '#764ba2' },
            { level: 3, title: 'Praticante', sessionsRequired: 15, color: '#f093fb' },
            { level: 4, title: 'Mestre', sessionsRequired: 30, color: '#4facfe' },
            { level: 5, title: 'Guardião Supremo', sessionsRequired: 50, color: '#ffd700' }
        ];

        this.loadProgress();
        this.initializeUI();
        this.setupEventListeners();
    }

    /**
     * Carrega o progresso salvo do localStorage
     */
    loadProgress() {
        const saved = localStorage.getItem('guardiao_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.sessionCount = data.sessionCount || 0;
            this.crystals = data.crystals || 0;
            this.currentLevel = data.currentLevel || 1;
            this.achievements = data.achievements || this.achievements;
            this.lastSessionDate = data.lastSessionDate || null;
            this.consecutiveDays = data.consecutiveDays || 0;
        } else {
            this.sessionCount = 0;
            this.crystals = 0;
            this.currentLevel = 1;
            this.consecutiveDays = 0;
            this.lastSessionDate = null;
        }
    }

    /**
     * Salva o progresso no localStorage
     */
    saveProgress() {
        const data = {
            sessionCount: this.sessionCount,
            crystals: this.crystals,
            currentLevel: this.currentLevel,
            achievements: this.achievements,
            lastSessionDate: this.lastSessionDate,
            consecutiveDays: this.consecutiveDays
        };
        localStorage.setItem('guardiao_progress', JSON.stringify(data));
        console.log('💾 Progresso salvo:', data);
    }

    /**
     * Inicializa a interface do usuário
     */
    initializeUI() {
        // Atualiza nível
        document.getElementById('user-level').textContent = this.currentLevel;
        const levelData = this.levels.find(l => l.level === this.currentLevel);
        document.getElementById('level-title').textContent = levelData.title;

        // Atualiza contador de sessões
        const nextLevel = this.levels.find(l => l.level === this.currentLevel + 1);
        const sessionsRequired = nextLevel ? nextLevel.sessionsRequired : this.sessionCount;
        document.getElementById('sessions-count').textContent = this.sessionCount;
        document.querySelector('.progress-text').innerHTML = 
            `<span id="sessions-count">${this.sessionCount}</span>/${sessionsRequired} sessões`;

        // Calcula progresso para próximo nível
        const currentLevelData = this.levels.find(l => l.level === this.currentLevel);
        const progress = nextLevel 
            ? ((this.sessionCount - currentLevelData.sessionsRequired) / 
               (nextLevel.sessionsRequired - currentLevelData.sessionsRequired)) * 100
            : 100;
        document.getElementById('progress-fill').style.width = Math.min(progress, 100) + '%';

        // Atualiza cristais
        document.getElementById('crystal-count').textContent = this.crystals;

        // Renderiza conquistas
        this.renderAchievements();

        // Atualiza benefícios premium
        this.updatePremiumBenefits();
    }

    /**
     * Renderiza as conquistas no painel
     */
    renderAchievements() {
        const container = document.getElementById('achievements-list');
        container.innerHTML = '';

        Object.values(this.achievements).forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                    ${achievement.unlocked ? 
                        `<div class="achievement-reward">+${achievement.crystals} 💎</div>` : 
                        `<div class="achievement-locked">🔒 Bloqueado</div>`
                    }
                </div>
            `;
            container.appendChild(achievementEl);
        });
    }

    /**
     * Atualiza o status dos benefícios premium
     */
    updatePremiumBenefits() {
        // Narrações Extras (Nível 3, 15 cristais)
        const narrationsEl = document.getElementById('benefit-narrations');
        if (this.currentLevel >= 3 && this.crystals >= 15) {
            narrationsEl.classList.remove('locked');
            narrationsEl.classList.add('unlocked');
        }

        // Fase Secreta (Nível 5, 30 cristais)
        const phaseEl = document.getElementById('benefit-phase');
        if (this.currentLevel >= 5 && this.crystals >= 30) {
            phaseEl.classList.remove('locked');
            phaseEl.classList.add('unlocked');
        }
    }

    /**
     * Configura os event listeners
     */
    setupEventListeners() {
        // Toggle do painel (minimizar/maximizar)
        const toggleBtn = document.getElementById('toggle-panel');
        const panel = document.getElementById('evolution-panel');
        
        toggleBtn.addEventListener('click', () => {
            panel.classList.toggle('collapsed');
            toggleBtn.textContent = panel.classList.contains('collapsed') ? '▶' : '◀';
        });

        // Click nos benefícios premium
        document.getElementById('benefit-narrations')?.addEventListener('click', () => {
            if (this.currentLevel >= 3 && this.crystals >= 15) {
                this.unlockNarrations();
            } else {
                this.showRequirementMessage('benefit-narrations');
            }
        });

        document.getElementById('benefit-phase')?.addEventListener('click', () => {
            if (this.currentLevel >= 5 && this.crystals >= 30) {
                this.unlockSecretPhase();
            } else {
                this.showRequirementMessage('benefit-phase');
            }
        });
    }

    /**
     * Registra uma sessão completa
     */
    completeSession() {
        console.log('🎉 Sessão completa registrada!');
        
        // Incrementa contador
        this.sessionCount++;

        // Adiciona cristais
        const crystalsEarned = 5;
        this.crystals += crystalsEarned;
        this.animateCrystalGain(crystalsEarned);

        // Verifica dias consecutivos
        this.updateConsecutiveDays();

        // Verifica conquistas
        this.checkAchievements();

        // Verifica aumento de nível
        this.checkLevelUp();

        // Salva progresso
        this.saveProgress();

        // Atualiza UI
        this.initializeUI();

        // Mostra notificação
        this.showCompletionNotification(crystalsEarned);
    }

    /**
     * Atualiza contador de dias consecutivos
     */
    updateConsecutiveDays() {
        const today = new Date().toDateString();
        
        if (this.lastSessionDate) {
            const lastDate = new Date(this.lastSessionDate);
            const diffTime = new Date(today) - lastDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Dia consecutivo
                this.consecutiveDays++;
            } else if (diffDays > 1) {
                // Quebrou a sequência
                this.consecutiveDays = 1;
            }
            // Se diffDays === 0, já fez sessão hoje, mantém contador
        } else {
            this.consecutiveDays = 1;
        }

        this.lastSessionDate = today;
    }

    /**
     * Verifica e desbloqueia conquistas
     */
    checkAchievements() {
        // Primeira Jornada
        if (this.sessionCount === 1 && !this.achievements.primeira_jornada.unlocked) {
            this.unlockAchievement('primeira_jornada');
        }

        // Semana Completa
        if (this.consecutiveDays >= 7 && !this.achievements.semana_completa.unlocked) {
            this.unlockAchievement('semana_completa');
        }

        // Mestre Delta (10 sessões)
        if (this.sessionCount >= 10 && !this.achievements.mestre_delta.unlocked) {
            this.unlockAchievement('mestre_delta');
        }

        // Guardião Supremo (nível 5)
        if (this.currentLevel === 5 && !this.achievements.guardiao_supremo.unlocked) {
            this.unlockAchievement('guardiao_supremo');
        }
    }

    /**
     * Desbloqueia uma conquista
     */
    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        achievement.unlocked = true;
        this.crystals += achievement.crystals;

        console.log(`🏆 Conquista desbloqueada: ${achievement.name}`);
        this.showAchievementNotification(achievement);
        this.saveProgress();
    }

    /**
     * Verifica se o usuário subiu de nível
     */
    checkLevelUp() {
        const nextLevel = this.levels.find(l => l.level === this.currentLevel + 1);
        
        if (nextLevel && this.sessionCount >= nextLevel.sessionsRequired) {
            this.currentLevel = nextLevel.level;
            console.log(`⬆️ Level UP! Agora você é ${nextLevel.title}`);
            this.showLevelUpNotification(nextLevel);
        }
    }

    /**
     * Animação de ganho de cristais
     */
    animateCrystalGain(amount) {
        const counter = document.getElementById('crystal-count');
        const startValue = parseInt(counter.textContent);
        const endValue = startValue + amount;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
            
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Mostra notificação de sessão completa
     */
    showCompletionNotification(crystals) {
        this.showNotification(`✨ Sessão Completa!<br>+${crystals} 💎 Cristais`, 'success');
    }

    /**
     * Mostra notificação de conquista desbloqueada
     */
    showAchievementNotification(achievement) {
        this.showNotification(
            `🏆 ${achievement.name}<br>${achievement.description}<br>+${achievement.crystals} 💎`,
            'achievement'
        );
    }

    /**
     * Mostra notificação de level up
     */
    showLevelUpNotification(levelData) {
        this.showNotification(
            `⬆️ LEVEL UP!<br>Você agora é ${levelData.title}!`,
            'levelup'
        );
    }

    /**
     * Mostra notificação de requisitos não atendidos
     */
    showRequirementMessage(benefitId) {
        const benefit = document.getElementById(benefitId);
        const requirement = benefit.querySelector('.benefit-requirement').textContent;
        this.showNotification(`🔒 Requisito: ${requirement}`, 'warning');
    }

    /**
     * Sistema de notificações genérico
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `evolution-notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Desbloqueia narrações extras
     */
    unlockNarrations() {
        if (this.crystals >= 15) {
            this.crystals -= 15;
            this.saveProgress();
            this.showNotification('🎙️ Narrações Extras Desbloqueadas!', 'success');
            // TODO: Implementar narrações extras
        }
    }

    /**
     * Desbloqueia fase secreta
     */
    unlockSecretPhase() {
        if (this.crystals >= 30) {
            this.crystals -= 30;
            this.saveProgress();
            this.showNotification('🌌 Fase Secreta Desbloqueada!', 'success');
            // TODO: Implementar fase secreta
        }
    }

    /**
     * Reseta o progresso (para debug)
     */
    resetProgress() {
        if (confirm('⚠️ Tem certeza que deseja resetar todo o progresso?')) {
            localStorage.removeItem('guardiao_progress');
            location.reload();
        }
    }
}

// Inicializa o sistema quando o DOM carregar
let evolutionSystem;
document.addEventListener('DOMContentLoaded', () => {
    evolutionSystem = new EvolutionSystem();
    console.log('🌙 Sistema de Evolução inicializado!');
});
