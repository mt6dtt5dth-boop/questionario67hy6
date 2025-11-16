/**
 * 🌱 INCUBADOR DE SONHOS - Sistema Inédito de Ancoragem NLP
 * 
 * Permite ao usuário "plantar" uma intenção de sonho antes de dormir.
 * Utiliza técnicas de Programação Neurolinguística (PNL) e visualização
 * para criar uma ancoragem mental que influencia o conteúdo dos sonhos.
 * 
 * FUNCIONALIDADES:
 * - Input de intenção de sonho
 * - Visualização 3D de "crescimento" da semente
 * - Histórico de sonhos com análise de padrões
 * - Sistema de recompensa (cristais extras)
 * - Ancoragem temporal (melhor horário para plantar)
 */

class DreamIncubator {
    constructor() {
        this.activeSeed = null;
        this.dreamHistory = [];
        this.seedCanvas = null;
        this.seedContext = null;
        this.animationFrame = null;
        this.seedAge = 0;
        this.seedGrowth = 0;
        
        this.loadHistory();
        this.initializeUI();
        this.setupEventListeners();
        this.startSeedAnimation();
    }
    
    /**
     * Carrega histórico do localStorage
     */
    loadHistory() {
        // 👥 Usar chaves isoladas por usuário
        let historyKey = 'dream_history';
        let activeSeedKey = 'active_dream_seed';
        
        if (window.game && window.game.userManagement && window.game.userManagement.currentUser) {
            const userId = window.game.userManagement.currentUser.id;
            historyKey = `user_${userId}_dream_history`;
            activeSeedKey = `user_${userId}_active_dream_seed`;
        }
        
        const saved = localStorage.getItem(historyKey);
        if (saved) {
            this.dreamHistory = JSON.parse(saved);
        }
        
        const activeSaved = localStorage.getItem(activeSeedKey);
        if (activeSaved) {
            this.activeSeed = JSON.parse(activeSaved);
            // Calcular idade da semente
            const plantedTime = new Date(this.activeSeed.plantedAt);
            const now = new Date();
            const ageMinutes = Math.floor((now - plantedTime) / 60000);
            this.seedAge = ageMinutes;
            this.seedGrowth = Math.min(ageMinutes / 10, 100); // 10min = 100%
        }
    }
    
    /**
     * Salva no localStorage
     */
    saveData() {
        // 👥 Usar chaves isoladas por usuário
        let historyKey = 'dream_history';
        let activeSeedKey = 'active_dream_seed';
        
        if (window.game && window.game.userManagement && window.game.userManagement.currentUser) {
            const userId = window.game.userManagement.currentUser.id;
            historyKey = `user_${userId}_dream_history`;
            activeSeedKey = `user_${userId}_active_dream_seed`;
        }
        
        localStorage.setItem(historyKey, JSON.stringify(this.dreamHistory));
        if (this.activeSeed) {
            localStorage.setItem(activeSeedKey, JSON.stringify(this.activeSeed));
        } else {
            localStorage.removeItem(activeSeedKey);
        }
    }
    
    /**
     * Inicializa UI
     */
    initializeUI() {
        // Contador de histórico
        document.getElementById('history-count').textContent = this.dreamHistory.length;
        
        // Se tem semente ativa, mostrar
        if (this.activeSeed) {
            this.showActiveSeed();
        }
        
        // Renderizar histórico
        this.renderHistory();
    }
    
    /**
     * Configura event listeners
     */
    setupEventListeners() {
        const input = document.getElementById('dream-intention');
        const charCount = document.getElementById('char-count');
        const plantBtn = document.getElementById('plant-dream-btn');
        const harvestBtn = document.getElementById('harvest-dream-btn');
        const toggleHistory = document.getElementById('toggle-history');
        
        // Contador de caracteres
        input.addEventListener('input', () => {
            const length = input.value.length;
            charCount.textContent = length;
            plantBtn.disabled = length < 10; // Mínimo 10 caracteres
        });
        
        // Plantar semente
        plantBtn.addEventListener('click', () => this.plantSeed());
        
        // Colher sonho
        if (harvestBtn) {
            harvestBtn.addEventListener('click', () => this.harvestDream());
        }
        
        // Toggle histórico
        if (toggleHistory) {
            toggleHistory.addEventListener('click', () => this.toggleHistory());
        }
    }
    
    /**
     * Planta uma nova semente de sonho
     */
    plantSeed() {
        const input = document.getElementById('dream-intention');
        const intention = input.value.trim();
        
        if (intention.length < 10) {
            this.showNotification('⚠️ Escreva pelo menos 10 caracteres', 'warning');
            return;
        }
        
        // Verificar se já existe semente ativa
        if (this.activeSeed) {
            if (!confirm('Você já tem uma semente ativa. Deseja substituí-la?')) {
                return;
            }
        }
        
        // Criar nova semente
        this.activeSeed = {
            intention: intention,
            plantedAt: new Date().toISOString(),
            id: Date.now(),
            grown: false
        };
        
        this.seedAge = 0;
        this.seedGrowth = 0;
        
        // Salvar
        this.saveData();
        
        // Limpar input
        input.value = '';
        document.getElementById('char-count').textContent = '0';
        document.getElementById('plant-dream-btn').disabled = true;
        
        // Mostrar semente ativa
        this.showActiveSeed();
        
        // Iniciar canvas se não estiver rodando
        if (!this.animationFrame) {
            this.startSeedAnimation();
        }
        
        // Notificação
        this.showNotification('🌱 Semente plantada! Ela crescerá enquanto você relaxa', 'success');
        
        // 📊 Registrar uso do Incubador de Sonhos no SessionTracker
        if (window.game && window.game.sessionTracker) {
            window.game.sessionTracker.dreamIncubatorUsed(intention, this.activeSeed.id);
        }
        
        console.log('🌱 Semente plantada:', this.activeSeed);
    }
    
    /**
     * Mostra a semente ativa
     */
    showActiveSeed() {
        const container = document.getElementById('active-seed');
        const textEl = document.getElementById('seed-text');
        
        container.style.display = 'block';
        textEl.textContent = this.activeSeed.intention;
        
        // Inicializar canvas
        this.seedCanvas = document.getElementById('seed-canvas');
        if (this.seedCanvas) {
            this.seedContext = this.seedCanvas.getContext('2d');
        }
        
        // Atualizar idade
        this.updateSeedAge();
        setInterval(() => this.updateSeedAge(), 60000); // Atualizar a cada minuto
    }
    
    /**
     * Atualiza idade da semente
     */
    updateSeedAge() {
        if (!this.activeSeed) return;
        
        const plantedTime = new Date(this.activeSeed.plantedAt);
        const now = new Date();
        const ageMinutes = Math.floor((now - plantedTime) / 60000);
        this.seedAge = ageMinutes;
        
        const ageEl = document.getElementById('seed-age');
        if (ageEl) {
            if (ageMinutes < 60) {
                ageEl.textContent = `Plantada há ${ageMinutes} min`;
            } else {
                const hours = Math.floor(ageMinutes / 60);
                const mins = ageMinutes % 60;
                ageEl.textContent = `Plantada há ${hours}h ${mins}min`;
            }
        }
        
        // Calcular crescimento (10 minutos = 100%)
        this.seedGrowth = Math.min((ageMinutes / 10) * 100, 100);
        
        // Atualizar barra de crescimento
        const growthFill = document.getElementById('seed-growth-fill');
        if (growthFill) {
            growthFill.style.width = this.seedGrowth + '%';
        }
        
        // Se cresceu 100%, notificar
        if (this.seedGrowth >= 100 && !this.activeSeed.grown) {
            this.activeSeed.grown = true;
            this.saveData();
            this.showNotification('✨ Sua semente cresceu completamente! Hora de colher', 'success');
        }
    }
    
    /**
     * Animação do canvas da semente
     */
    startSeedAnimation() {
        if (!this.seedCanvas || !this.seedContext) return;
        
        const ctx = this.seedContext;
        const width = this.seedCanvas.width;
        const height = this.seedCanvas.height;
        
        let time = 0;
        
        const animate = () => {
            if (!this.activeSeed) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
                return;
            }
            
            time += 0.02;
            
            // Limpar
            ctx.clearRect(0, 0, width, height);
            
            // Background gradient
            const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
            gradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)');
            gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // Calcular crescimento visual
            const growth = this.seedGrowth / 100;
            
            // Centro
            const cx = width / 2;
            const cy = height / 2;
            
            // Desenhar "semente" (círculo central)
            ctx.beginPath();
            ctx.arc(cx, cy, 8 + growth * 12, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(138, 180, 248, ${0.6 + growth * 0.4})`;
            ctx.fill();
            
            // Desenhar "raízes" (linhas para baixo)
            const rootCount = Math.floor(3 + growth * 5);
            for (let i = 0; i < rootCount; i++) {
                const angle = (Math.PI / 2) + (i - rootCount / 2) * 0.3;
                const length = growth * 30 + Math.sin(time + i) * 5;
                
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(
                    cx + Math.cos(angle) * length,
                    cy + Math.sin(angle) * length
                );
                ctx.strokeStyle = `rgba(138, 180, 248, ${0.3 + growth * 0.3})`;
                ctx.lineWidth = 1 + growth * 2;
                ctx.stroke();
            }
            
            // Desenhar "brotos" (linhas para cima)
            if (growth > 0.3) {
                const sproutCount = Math.floor((growth - 0.3) * 6);
                for (let i = 0; i < sproutCount; i++) {
                    const angle = -(Math.PI / 2) + (i - sproutCount / 2) * 0.4;
                    const length = (growth - 0.3) * 40 + Math.sin(time * 2 + i) * 3;
                    
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(
                        cx + Math.cos(angle) * length,
                        cy + Math.sin(angle) * length
                    );
                    ctx.strokeStyle = `rgba(76, 175, 80, ${0.4 + growth * 0.4})`;
                    ctx.lineWidth = 1 + growth * 2;
                    ctx.stroke();
                }
            }
            
            // Partículas flutuantes
            const particleCount = Math.floor(growth * 20);
            for (let i = 0; i < particleCount; i++) {
                const px = cx + Math.cos(time + i) * (30 + i * 3);
                const py = cy + Math.sin(time * 0.5 + i) * (20 + i * 2);
                const size = 1 + Math.sin(time * 3 + i) * 1;
                
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(138, 180, 248, ${0.3 + Math.sin(time + i) * 0.3})`;
                ctx.fill();
            }
            
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    /**
     * Colhe o sonho (finaliza a semente)
     */
    harvestDream() {
        if (!this.activeSeed) return;
        
        // Adicionar ao histórico
        const dream = {
            ...this.activeSeed,
            harvestedAt: new Date().toISOString(),
            growth: this.seedGrowth,
            ageMinutes: this.seedAge
        };
        
        this.dreamHistory.unshift(dream); // Adicionar no início
        
        // Limpar semente ativa
        this.activeSeed = null;
        this.seedAge = 0;
        this.seedGrowth = 0;
        
        // Salvar
        this.saveData();
        
        // Esconder container
        document.getElementById('active-seed').style.display = 'none';
        
        // Atualizar histórico
        document.getElementById('history-count').textContent = this.dreamHistory.length;
        this.renderHistory();
        
        // Recompensa: dar cristais extras se cresceu 100%
        if (dream.growth >= 100 && window.evolutionSystem) {
            window.evolutionSystem.crystals += 3;
            window.evolutionSystem.saveProgress();
            window.evolutionSystem.initializeUI();
            this.showNotification('✨ Sonho colhido! +3 💎 Cristais de bônus', 'success');
        } else {
            this.showNotification('✨ Sonho colhido e registrado no histórico', 'success');
        }
        
        console.log('✨ Sonho colhido:', dream);
    }
    
    /**
     * Toggle histórico
     */
    toggleHistory() {
        const list = document.getElementById('history-list');
        const isVisible = list.style.display !== 'none';
        list.style.display = isVisible ? 'none' : 'block';
    }
    
    /**
     * Renderiza o histórico
     */
    renderHistory() {
        const list = document.getElementById('history-list');
        if (!list) return;
        
        if (this.dreamHistory.length === 0) {
            list.innerHTML = '<div class="history-empty">Nenhum sonho registrado ainda</div>';
            return;
        }
        
        list.innerHTML = '';
        
        // Mostrar últimos 10
        const recentDreams = this.dreamHistory.slice(0, 10);
        
        recentDreams.forEach(dream => {
            const item = document.createElement('div');
            item.className = 'history-item';
            
            const date = new Date(dream.harvestedAt);
            const dateStr = date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short' 
            });
            
            const growthEmoji = dream.growth >= 100 ? '🌟' : dream.growth >= 50 ? '🌱' : '🌰';
            
            item.innerHTML = `
                <div class="history-item-header">
                    <span class="history-emoji">${growthEmoji}</span>
                    <span class="history-date">${dateStr}</span>
                    <span class="history-growth">${Math.floor(dream.growth)}%</span>
                </div>
                <div class="history-intention">${dream.intention}</div>
            `;
            
            list.appendChild(item);
        });
    }
    
    /**
     * Mostra notificação
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `evolution-notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar quando DOM carregar
let dreamIncubator;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        dreamIncubator = new DreamIncubator();
        console.log('🌱 Incubador de Sonhos inicializado!');
    }, 500);
});
