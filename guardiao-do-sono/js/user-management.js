/**
 * 👥 SISTEMA DE GERENCIAMENTO DE USUÁRIOS
 * 
 * Permite múltiplos usuários acessarem o app com códigos individuais.
 * Usuário Master pode cadastrar e gerenciar outros usuários.
 * 
 * FUNCIONALIDADES:
 * - Login com código alfanumérico (6 dígitos)
 * - Usuário Master com privilégios administrativos
 * - CRUD completo de usuários
 * - Sistema de expiração (30/60/90 dias)
 * - Isolamento de dados por usuário
 * - Histórico de sessões individual
 */

class UserManagementSystem {
    constructor() {
        this.currentUser = null;
        this.users = {};
        this.masterCode = null;
        this.sessionTracker = null; // 📊 Será definido pelo main.js
        
        this.loadUsers();
        this.initializeUI();
        this.setupEventListeners();
        
        // Se não existe usuário master, criar
        if (!this.masterCode) {
            this.createMasterUser();
        }
        
        console.log('👥 Sistema de Gerenciamento de Usuários inicializado');
    }
    
    /**
     * Carrega usuários do localStorage
     */
    loadUsers() {
        const saved = localStorage.getItem('guardiao_users');
        if (saved) {
            this.users = JSON.parse(saved);
        }
        
        const savedMasterCode = localStorage.getItem('guardiao_master_code');
        if (savedMasterCode) {
            this.masterCode = savedMasterCode;
        }
        
        // Verificar se há usuário logado
        const currentUserId = sessionStorage.getItem('guardiao_current_user');
        if (currentUserId && this.users[currentUserId]) {
            this.currentUser = this.users[currentUserId];
            console.log('👤 Usuário já logado:', this.currentUser.nome);
            
            // 📊 Marcar que precisa iniciar sessão quando sessionTracker estiver disponível
            this.needsSessionStart = true;
        }
    }
    
    /**
     * 📊 Inicializa sessão para usuário já logado (chamado pelo main.js)
     */
    startSessionIfNeeded() {
        if (this.needsSessionStart && this.currentUser && this.sessionTracker) {
            this.sessionTracker.startSession();
            this.needsSessionStart = false;
            console.log('📊 Sessão retomada para usuário já logado');
        }
    }
    
    /**
     * Salva usuários no localStorage
     */
    saveUsers() {
        localStorage.setItem('guardiao_users', JSON.stringify(this.users));
        if (this.masterCode) {
            localStorage.setItem('guardiao_master_code', this.masterCode);
        }
    }
    
    /**
     * Cria o usuário Master inicial
     */
    createMasterUser() {
        // Código master FIXO definido pelo terapeuta
        this.masterCode = 'NEWDRI193117';
        
        const masterUser = {
            id: 'master',
            codigo: this.masterCode,
            tipo: 'master',
            nome: 'Terapeuta',
            sobrenome: 'Master',
            dataNascimento: null,
            queixaPrincipal: null,
            whatsapp: null,
            email: null,
            cidade: null,
            estado: null,
            criadoEm: new Date().toISOString(),
            expiraEm: null, // Master nunca expira
            ativo: true
        };
        
        this.users['master'] = masterUser;
        this.saveUsers();
        
        console.log('🔐 Usuário Master criado!');
        console.log(`🔑 Código Master: ${this.masterCode}`);
        
        // NÃO mostrar modal - código já é conhecido
        console.log('ℹ️ Use o código NEWDRI193117 para acessar como terapeuta');
    }
    
    /**
     * Mostra modal com código master
     */
    showMasterCodeModal(code) {
        const modal = document.createElement('div');
        modal.className = 'master-code-modal';
        modal.innerHTML = `
            <div class="master-code-content">
                <h2>🔐 Código Master Gerado!</h2>
                <p>Este é seu código de administrador. Anote em local seguro:</p>
                <div class="code-display">${code}</div>
                <p class="warning">⚠️ Este código dá acesso total ao sistema!</p>
                <button id="close-master-modal" class="primary-button">Entendi, guardar código</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('close-master-modal').addEventListener('click', () => {
            modal.remove();
            // Copiar para clipboard
            navigator.clipboard.writeText(code).then(() => {
                this.showNotification('✅ Código copiado para área de transferência!', 'success');
            });
        });
    }
    
    /**
     * Gera código alfanumérico de 6 dígitos
     */
    generateCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sem I, O, 0, 1 (confusão)
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    /**
     * Verifica se código já existe
     */
    codeExists(code) {
        if (code === this.masterCode) return true;
        return Object.values(this.users).some(user => user.codigo === code);
    }
    
    /**
     * Gera código único
     */
    generateUniqueCode() {
        let code;
        do {
            code = this.generateCode();
        } while (this.codeExists(code));
        return code;
    }
    
    /**
     * Inicializa UI
     */
    initializeUI() {
        // Aguardar DOM estar completamente carregada
        setTimeout(() => {
            // Se não está logado, mostrar tela de login
            if (!this.currentUser) {
                this.showLoginScreen();
            } else {
                this.showMainApp();
                
                // Se é master, adicionar botão de gerenciamento
                if (this.currentUser.tipo === 'master') {
                    this.addMasterButton();
                }
            }
        }, 500); // Aguardar 500ms para garantir que DOM está pronta
    }
    
    /**
     * Mostra tela de login
     */
    showLoginScreen() {
        const welcomeScreen = document.getElementById('welcome-screen');
        if (!welcomeScreen) {
            console.error('❌ welcome-screen não encontrado!');
            return;
        }
        
        console.log('🔐 Exibindo tela de login...');
        
        // ESCONDER todo o conteúdo da welcome screen
        const welcomeContent = welcomeScreen.querySelector('.welcome-content');
        if (welcomeContent) {
            welcomeContent.style.display = 'none';
            console.log('✅ Welcome content escondido');
        }
        
        // REMOVER login area antiga se existir
        const oldLoginArea = document.getElementById('login-area');
        if (oldLoginArea) {
            oldLoginArea.remove();
            console.log('🗑️ Login area antiga removida');
        }
        
        // Criar área de login NOVA
        let loginArea = document.createElement('div');
        loginArea.id = 'login-area';
        loginArea.className = 'login-container';
        
        loginArea.innerHTML = `
                <div class="login-main-card">
                    <h1 class="login-title">🌙 O Guardião do Sono</h1>
                    <p class="login-subtitle">Selecione seu tipo de acesso</p>
                    
                    <div class="login-grid">
                        <!-- ENTRADA TERAPEUTA -->
                        <div class="login-card terapeuta-card">
                            <div class="card-icon">👨‍⚕️</div>
                            <h2>ENTRADA TERAPEUTA</h2>
                            <p class="card-description">Acesso administrativo completo</p>
                            <input 
                                type="text" 
                                id="terapeuta-code-input" 
                                maxlength="13" 
                                placeholder="NEWDRI193117"
                                class="code-input"
                            />
                            <button id="terapeuta-login-btn" class="login-btn terapeuta-btn">
                                🔐 Entrar como Terapeuta
                            </button>
                        </div>
                        
                        <!-- ENTRADA CLIENTE -->
                        <div class="login-card cliente-card">
                            <div class="card-icon">🧘</div>
                            <h2>ENTRADA CLIENTE</h2>
                            <p class="card-description">Acesso à jornada terapêutica</p>
                            <input 
                                type="text" 
                                id="cliente-code-input" 
                                maxlength="6" 
                                placeholder="ABC123"
                                class="code-input"
                            />
                            <button id="cliente-login-btn" class="login-btn cliente-btn">
                                ✨ Entrar como Cliente
                            </button>
                        </div>
                    </div>
                    
                    <div id="login-error" class="error-message" style="display: none;"></div>
                </div>
        `;
        
        // Inserir no topo da welcome screen
        welcomeScreen.insertBefore(loginArea, welcomeScreen.firstChild);
        
        // Forçar exibição
        loginArea.style.display = 'flex';
        
        console.log('✅ Tela de login criada e exibida');
    }
    
    /**
     * Esconde tela de login
     */
    hideLoginScreen() {
        const loginArea = document.getElementById('login-area');
        if (loginArea) {
            loginArea.style.display = 'none';
        }
        
        // MOSTRAR o conteúdo da welcome screen
        const welcomeContent = document.querySelector('.welcome-content');
        if (welcomeContent) {
            welcomeContent.style.display = 'block';
        }
    }
    
    /**
     * Mostra app principal
     */
    showMainApp() {
        this.hideLoginScreen();
        
        // Atualizar informações do usuário na tela
        const userName = document.getElementById('current-user-name');
        if (userName) {
            userName.textContent = `${this.currentUser.nome} ${this.currentUser.sobrenome}`;
        }
        
        // 🆕 ADICIONAR BOTÕES DE CONTROLE (GERENCIAR + SAIR)
        this.addMasterButton();
        
        // Mostrar informações de expiração (se não for master)
        if (this.currentUser.tipo !== 'master' && this.currentUser.expiraEm) {
            this.showExpirationInfo();
        }
    }
    
    /**
     * Mostra informações de expiração
     */
    showExpirationInfo() {
        const expiresAt = new Date(this.currentUser.expiraEm);
        const now = new Date();
        const daysLeft = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24));
        
        if (daysLeft <= 7) {
            const notification = document.createElement('div');
            notification.className = 'expiration-warning';
            notification.innerHTML = `
                ⚠️ Seu acesso expira em ${daysLeft} dias. Entre em contato para renovar.
            `;
            document.body.appendChild(notification);
        }
    }
    
    /**
     * Adiciona botões de controle (gerenciar + logout)
     */
    addMasterButton() {
        // Verificar se já existe
        if (document.getElementById('user-controls')) return;
        
        // Container para botões
        const container = document.createElement('div');
        container.id = 'user-controls';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            display: flex;
            gap: 10px;
        `;
        
        // Botão de Gerenciar (só para Master)
        if (this.currentUser.tipo === 'master') {
            const manageBtn = document.createElement('button');
            manageBtn.id = 'master-panel-btn';
            manageBtn.className = 'control-button';
            manageBtn.innerHTML = '👥 Gerenciar';
            manageBtn.style.cssText = `
                padding: 12px 24px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
            `;
            
            manageBtn.addEventListener('mouseenter', () => {
                manageBtn.style.transform = 'translateY(-2px)';
                manageBtn.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.6)';
            });
            
            manageBtn.addEventListener('mouseleave', () => {
                manageBtn.style.transform = 'translateY(0)';
                manageBtn.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            });
            
            manageBtn.addEventListener('click', () => this.showMasterPanel());
            container.appendChild(manageBtn);
        }
        
        // Botão de Sair (para todos)
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logout-btn';
        logoutBtn.className = 'control-button';
        logoutBtn.innerHTML = '🚪 Sair';
        logoutBtn.style.cssText = `
            padding: 12px 24px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
            transition: all 0.3s ease;
        `;
        
        logoutBtn.addEventListener('mouseenter', () => {
            logoutBtn.style.transform = 'translateY(-2px)';
            logoutBtn.style.boxShadow = '0 6px 16px rgba(240, 147, 251, 0.6)';
        });
        
        logoutBtn.addEventListener('mouseleave', () => {
            logoutBtn.style.transform = 'translateY(0)';
            logoutBtn.style.boxShadow = '0 4px 12px rgba(240, 147, 251, 0.4)';
        });
        
        logoutBtn.addEventListener('click', () => {
            if (confirm('Deseja realmente sair?')) {
                this.logout();
            }
        });
        
        container.appendChild(logoutBtn);
        document.body.appendChild(container);
    }
    
    /**
     * Mostra painel de gerenciamento Master
     */
    showMasterPanel() {
        // Verificar se usuário é master
        if (this.currentUser.tipo !== 'master') {
            this.showNotification('❌ Acesso negado!', 'error');
            return;
        }
        
        // Criar painel
        const panel = document.createElement('div');
        panel.id = 'master-panel';
        panel.className = 'master-panel-overlay';
        panel.innerHTML = `
            <div class="master-panel-content">
                <div class="master-panel-header">
                    <h2>👥 Gerenciamento de Usuários</h2>
                    <button id="close-master-panel" class="close-button">✕</button>
                </div>
                
                <div class="master-panel-body">
                    <!-- Tabs -->
                    <div class="master-tabs">
                        <button class="master-tab active" data-tab="users">👤 Usuários</button>
                        <button class="master-tab" data-tab="new-user">➕ Novo Usuário</button>
                        <button class="master-tab" data-tab="settings">⚙️ Configurações</button>
                    </div>
                    
                    <!-- Tab: Lista de Usuários -->
                    <div id="tab-users" class="master-tab-content active">
                        <div id="users-list"></div>
                    </div>
                    
                    <!-- Tab: Novo Usuário -->
                    <div id="tab-new-user" class="master-tab-content">
                        <form id="new-user-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Nome *</label>
                                    <input type="text" name="nome" required />
                                </div>
                                <div class="form-group">
                                    <label>Sobrenome *</label>
                                    <input type="text" name="sobrenome" required />
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Data de Nascimento</label>
                                    <input type="date" name="dataNascimento" />
                                </div>
                                <div class="form-group">
                                    <label>WhatsApp</label>
                                    <input type="tel" name="whatsapp" placeholder="(00) 00000-0000" />
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>E-mail</label>
                                <input type="email" name="email" />
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Cidade</label>
                                    <input type="text" name="cidade" />
                                </div>
                                <div class="form-group">
                                    <label>Estado</label>
                                    <select name="estado">
                                        <option value="">Selecione...</option>
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Queixa Principal</label>
                                <textarea name="queixaPrincipal" rows="3" placeholder="Descreva o principal motivo para usar o Guardião do Sono..."></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Duração do Acesso *</label>
                                <select name="duracao" required>
                                    <option value="30">30 dias</option>
                                    <option value="60">60 dias</option>
                                    <option value="90">90 dias</option>
                                </select>
                            </div>
                            
                            <button type="submit" class="primary-button">➕ Criar Usuário</button>
                        </form>
                    </div>
                    
                    <!-- Tab: Configurações -->
                    <div id="tab-settings" class="master-tab-content">
                        <div class="settings-section">
                            <h3>🔑 Seu Código Master</h3>
                            <div class="code-display">${this.masterCode}</div>
                            <button id="copy-master-code" class="secondary-button">📋 Copiar Código</button>
                            <button id="change-master-code" class="secondary-button">🔄 Alterar Código</button>
                        </div>
                        
                        <div class="settings-section">
                            <h3>📊 Estatísticas</h3>
                            <p>Total de usuários: ${Object.keys(this.users).length}</p>
                            <p>Usuários ativos: ${Object.values(this.users).filter(u => u.ativo).length}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Setup eventos do painel
        this.setupMasterPanelEvents();
        
        // Renderizar lista de usuários
        this.renderUsersList();
    }
    
    /**
     * Configura event listeners do painel Master
     */
    setupMasterPanelEvents() {
        // Fechar painel
        document.getElementById('close-master-panel').addEventListener('click', () => {
            document.getElementById('master-panel').remove();
        });
        
        // Tabs
        document.querySelectorAll('.master-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchMasterTab(tabName);
            });
        });
        
        // Form de novo usuário
        document.getElementById('new-user-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createNewUser(new FormData(e.target));
        });
        
        // Copiar código master
        document.getElementById('copy-master-code').addEventListener('click', () => {
            navigator.clipboard.writeText(this.masterCode).then(() => {
                this.showNotification('✅ Código copiado!', 'success');
            });
        });
        
        // Alterar código master
        document.getElementById('change-master-code').addEventListener('click', () => {
            this.changeMasterCode();
        });
    }
    
    /**
     * Troca de tab no painel Master
     */
    switchMasterTab(tabName) {
        // Desativar todas as tabs
        document.querySelectorAll('.master-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.master-tab-content').forEach(content => content.classList.remove('active'));
        
        // Ativar tab selecionada
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
    }
    
    /**
     * Renderiza lista de usuários
     */
    renderUsersList() {
        const container = document.getElementById('users-list');
        if (!container) return;
        
        const usersList = Object.values(this.users).filter(u => u.tipo !== 'master');
        
        if (usersList.length === 0) {
            container.innerHTML = '<p class="empty-state">Nenhum usuário cadastrado ainda.</p>';
            return;
        }
        
        container.innerHTML = usersList.map(user => {
            // Obter histórico de sessões
            const sessionHistory = this.getSessionHistoryHTML(user.id);
            const stats = this.getUserSessionStats(user.id);
            
            return `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-header">
                    <h3>${user.nome} ${user.sobrenome}</h3>
                    <span class="status-badge ${user.ativo ? 'active' : 'inactive'}">
                        ${user.ativo ? '✓ Ativo' : '✕ Expirado'}
                    </span>
                </div>
                <div class="user-info">
                    <p><strong>Código:</strong> <span class="code-mono">${user.codigo}</span></p>
                    ${user.dataNascimento ? `<p><strong>Data de Nascimento:</strong> ${new Date(user.dataNascimento).toLocaleDateString('pt-BR')}</p>` : ''}
                    ${user.whatsapp ? `<p><strong>WhatsApp:</strong> ${user.whatsapp}</p>` : ''}
                    ${user.email ? `<p><strong>E-mail:</strong> ${user.email}</p>` : ''}
                    ${user.cidade && user.estado ? `<p><strong>Localização:</strong> ${user.cidade}/${user.estado}</p>` : ''}
                    ${user.queixaPrincipal ? `<p><strong>Queixa:</strong> ${user.queixaPrincipal}</p>` : ''}
                    <p><strong>Expira em:</strong> ${this.getExpirationText(user.expiraEm)}</p>
                </div>
                
                <!-- 📊 ESTATÍSTICAS DE SESSÕES -->
                <div class="session-stats">
                    <h4>📊 Estatísticas de Uso</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Total de Sessões</span>
                            <span class="stat-value">${stats.totalSessions}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Tempo Total</span>
                            <span class="stat-value">${this.formatDuration(stats.totalDuration)}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Tempo Médio</span>
                            <span class="stat-value">${this.formatDuration(stats.averageDuration)}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Fases Completadas</span>
                            <span class="stat-value">${stats.totalPhasesCompleted}</span>
                        </div>
                    </div>
                    ${sessionHistory}
                </div>
                
                <div class="user-actions">
                    <button class="action-btn edit-btn" data-action="edit" data-user-id="${user.id}">✏️ Editar</button>
                    <button class="action-btn extend-btn" data-action="extend" data-user-id="${user.id}">⏱️ Estender</button>
                    <button class="action-btn code-btn" data-action="change-code" data-user-id="${user.id}">🔑 Trocar Código</button>
                    <button class="action-btn ${user.ativo ? 'deactivate-btn' : 'activate-btn'}" data-action="toggle" data-user-id="${user.id}">
                        ${user.ativo ? '🔒 Desativar' : '🔓 Ativar'}
                    </button>
                </div>
            </div>
            `;
        }).join('');
        
        // Event listeners para ações
        container.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const userId = e.target.dataset.userId;
                this.handleUserAction(action, userId);
            });
        });
        
        // 📊 Event listeners para toggle de histórico de sessões
        container.querySelectorAll('.toggle-history-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const table = e.target.nextElementSibling;
                if (table) {
                    const isVisible = table.style.display !== 'none';
                    table.style.display = isVisible ? 'none' : 'block';
                    e.target.textContent = isVisible ? 
                        `📖 Ver Últimas Sessões (${e.target.textContent.match(/\d+/)[0]})` :
                        `📕 Ocultar Sessões`;
                }
            });
        });
    }
    
    /**
     * Retorna texto formatado de expiração
     */
    getExpirationText(expiraEm) {
        if (!expiraEm) return 'Nunca';
        
        const expiresAt = new Date(expiraEm);
        const now = new Date();
        const daysLeft = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24));
        
        if (daysLeft < 0) return '❌ Expirado';
        if (daysLeft === 0) return '⚠️ Hoje';
        if (daysLeft === 1) return '⚠️ Amanhã';
        if (daysLeft <= 7) return `⚠️ ${daysLeft} dias`;
        
        return `${expiresAt.toLocaleDateString('pt-BR')} (${daysLeft} dias)`;
    }
    
    /**
     * 📊 Obtém estatísticas de sessões do usuário
     */
    getUserSessionStats(userId) {
        if (this.sessionTracker) {
            return this.sessionTracker.getUserStats(userId);
        }
        
        // Fallback se SessionTracker não estiver disponível
        return {
            totalSessions: 0,
            totalDuration: 0,
            averageDuration: 0,
            totalPhasesCompleted: 0,
            totalXP: 0,
            totalCrystals: 0,
            dreamIncubatorUses: 0,
            lastSession: null
        };
    }
    
    /**
     * 📊 Gera HTML do histórico de sessões
     */
    getSessionHistoryHTML(userId) {
        if (!this.sessionTracker) {
            return '<p class="no-sessions">Nenhuma sessão registrada ainda.</p>';
        }
        
        const history = this.sessionTracker.getUserSessionHistory(userId);
        
        if (history.length === 0) {
            return '<p class="no-sessions">Nenhuma sessão registrada ainda.</p>';
        }
        
        // Pegar últimas 5 sessões
        const recentSessions = history.slice(-5).reverse();
        
        return `
            <div class="session-history">
                <button class="toggle-history-btn" data-user-id="${userId}">
                    📖 Ver Últimas Sessões (${history.length})
                </button>
                <div class="history-table" style="display: none;">
                    <table>
                        <thead>
                            <tr>
                                <th>Data/Hora</th>
                                <th>Duração</th>
                                <th>Fases</th>
                                <th>XP</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${recentSessions.map(session => `
                                <tr>
                                    <td>${this.formatDateTime(session.startTime)}</td>
                                    <td>${this.formatDuration(session.duration)}</td>
                                    <td>${session.phasesCompleted.length}/3</td>
                                    <td>+${session.xpGained || 0}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    /**
     * 📊 Formata duração em segundos para texto legível
     */
    formatDuration(seconds) {
        if (!seconds || seconds === 0) return '0s';
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        const parts = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}min`);
        if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
        
        return parts.join(' ');
    }
    
    /**
     * 📊 Formata data/hora em português
     */
    formatDateTime(isoString) {
        if (!isoString) return '-';
        
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
     * Trata ações do usuário
     */
    handleUserAction(action, userId) {
        const user = this.users[userId];
        if (!user) return;
        
        switch (action) {
            case 'edit':
                this.editUser(userId);
                break;
            case 'extend':
                this.extendUserAccess(userId);
                break;
            case 'change-code':
                this.changeUserCode(userId);
                break;
            case 'toggle':
                this.toggleUserStatus(userId);
                break;
        }
    }
    
    /**
     * Cria novo usuário
     */
    createNewUser(formData) {
        const userId = 'user_' + Date.now();
        const codigo = this.generateUniqueCode();
        const duracao = parseInt(formData.get('duracao'));
        
        const expiraEm = new Date();
        expiraEm.setDate(expiraEm.getDate() + duracao);
        
        const newUser = {
            id: userId,
            codigo: codigo,
            tipo: 'comum',
            nome: formData.get('nome'),
            sobrenome: formData.get('sobrenome'),
            dataNascimento: formData.get('dataNascimento') || null,
            queixaPrincipal: formData.get('queixaPrincipal') || null,
            whatsapp: formData.get('whatsapp') || null,
            email: formData.get('email') || null,
            cidade: formData.get('cidade') || null,
            estado: formData.get('estado') || null,
            criadoEm: new Date().toISOString(),
            expiraEm: expiraEm.toISOString(),
            ativo: true
        };
        
        this.users[userId] = newUser;
        this.saveUsers();
        
        // Mostrar código ao usuário
        this.showUserCodeModal(newUser);
        
        // Voltar para aba de usuários
        this.switchMasterTab('users');
        this.renderUsersList();
        
        // Limpar form
        document.getElementById('new-user-form').reset();
        
        this.showNotification(`✅ Usuário ${newUser.nome} criado com sucesso!`, 'success');
    }
    
    /**
     * Mostra modal com código do usuário criado
     */
    showUserCodeModal(user) {
        const modal = document.createElement('div');
        modal.className = 'user-code-modal';
        modal.innerHTML = `
            <div class="user-code-content">
                <h2>✅ Usuário Criado!</h2>
                <p><strong>${user.nome} ${user.sobrenome}</strong></p>
                <p>Código de acesso:</p>
                <div class="code-display">${user.codigo}</div>
                <p class="expiration-info">
                    Válido até: ${new Date(user.expiraEm).toLocaleDateString('pt-BR')}
                </p>
                <div class="modal-actions">
                    <button id="copy-user-code" class="primary-button">📋 Copiar Código</button>
                    <button id="close-user-modal" class="secondary-button">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('copy-user-code').addEventListener('click', () => {
            navigator.clipboard.writeText(user.codigo).then(() => {
                this.showNotification('✅ Código copiado!', 'success');
            });
        });
        
        document.getElementById('close-user-modal').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    /**
     * Edita usuário
     */
    editUser(userId) {
        const user = this.users[userId];
        if (!user) {
            this.showNotification('❌ Usuário não encontrado', 'error');
            return;
        }
        
        // Não permitir editar usuário master
        if (user.tipo === 'master') {
            this.showNotification('❌ Não é possível editar o usuário Master', 'error');
            return;
        }
        
        // Criar modal de edição
        const modal = document.createElement('div');
        modal.className = 'edit-user-modal';
        modal.innerHTML = `
            <div class="edit-user-content">
                <div class="edit-user-header">
                    <h2>✏️ Editar Usuário</h2>
                    <button id="close-edit-modal" class="close-button">✕</button>
                </div>
                
                <form id="edit-user-form" class="edit-user-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nome *</label>
                            <input type="text" name="nome" value="${user.nome}" required />
                        </div>
                        <div class="form-group">
                            <label>Sobrenome *</label>
                            <input type="text" name="sobrenome" value="${user.sobrenome}" required />
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Data de Nascimento</label>
                            <input type="date" name="dataNascimento" value="${user.dataNascimento || ''}" />
                        </div>
                        <div class="form-group">
                            <label>WhatsApp</label>
                            <input type="tel" name="whatsapp" value="${user.whatsapp || ''}" placeholder="(00) 00000-0000" />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" name="email" value="${user.email || ''}" />
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Cidade</label>
                            <input type="text" name="cidade" value="${user.cidade || ''}" />
                        </div>
                        <div class="form-group">
                            <label>Estado</label>
                            <select name="estado">
                                <option value="">Selecione...</option>
                                <option value="AC" ${user.estado === 'AC' ? 'selected' : ''}>Acre</option>
                                <option value="AL" ${user.estado === 'AL' ? 'selected' : ''}>Alagoas</option>
                                <option value="AP" ${user.estado === 'AP' ? 'selected' : ''}>Amapá</option>
                                <option value="AM" ${user.estado === 'AM' ? 'selected' : ''}>Amazonas</option>
                                <option value="BA" ${user.estado === 'BA' ? 'selected' : ''}>Bahia</option>
                                <option value="CE" ${user.estado === 'CE' ? 'selected' : ''}>Ceará</option>
                                <option value="DF" ${user.estado === 'DF' ? 'selected' : ''}>Distrito Federal</option>
                                <option value="ES" ${user.estado === 'ES' ? 'selected' : ''}>Espírito Santo</option>
                                <option value="GO" ${user.estado === 'GO' ? 'selected' : ''}>Goiás</option>
                                <option value="MA" ${user.estado === 'MA' ? 'selected' : ''}>Maranhão</option>
                                <option value="MT" ${user.estado === 'MT' ? 'selected' : ''}>Mato Grosso</option>
                                <option value="MS" ${user.estado === 'MS' ? 'selected' : ''}>Mato Grosso do Sul</option>
                                <option value="MG" ${user.estado === 'MG' ? 'selected' : ''}>Minas Gerais</option>
                                <option value="PA" ${user.estado === 'PA' ? 'selected' : ''}>Pará</option>
                                <option value="PB" ${user.estado === 'PB' ? 'selected' : ''}>Paraíba</option>
                                <option value="PR" ${user.estado === 'PR' ? 'selected' : ''}>Paraná</option>
                                <option value="PE" ${user.estado === 'PE' ? 'selected' : ''}>Pernambuco</option>
                                <option value="PI" ${user.estado === 'PI' ? 'selected' : ''}>Piauí</option>
                                <option value="RJ" ${user.estado === 'RJ' ? 'selected' : ''}>Rio de Janeiro</option>
                                <option value="RN" ${user.estado === 'RN' ? 'selected' : ''}>Rio Grande do Norte</option>
                                <option value="RS" ${user.estado === 'RS' ? 'selected' : ''}>Rio Grande do Sul</option>
                                <option value="RO" ${user.estado === 'RO' ? 'selected' : ''}>Rondônia</option>
                                <option value="RR" ${user.estado === 'RR' ? 'selected' : ''}>Roraima</option>
                                <option value="SC" ${user.estado === 'SC' ? 'selected' : ''}>Santa Catarina</option>
                                <option value="SP" ${user.estado === 'SP' ? 'selected' : ''}>São Paulo</option>
                                <option value="SE" ${user.estado === 'SE' ? 'selected' : ''}>Sergipe</option>
                                <option value="TO" ${user.estado === 'TO' ? 'selected' : ''}>Tocantins</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Queixa Principal</label>
                        <textarea name="queixaPrincipal" rows="3" placeholder="Descreva a queixa principal...">${user.queixaPrincipal || ''}</textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" id="cancel-edit-btn" class="btn-secondary">Cancelar</button>
                        <button type="submit" class="btn-primary">💾 Salvar Alterações</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('close-edit-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('cancel-edit-btn').addEventListener('click', () => {
            modal.remove();
        });
        
        document.getElementById('edit-user-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            
            // Atualizar dados do usuário
            user.nome = formData.get('nome');
            user.sobrenome = formData.get('sobrenome');
            user.dataNascimento = formData.get('dataNascimento') || null;
            user.whatsapp = formData.get('whatsapp') || null;
            user.email = formData.get('email') || null;
            user.cidade = formData.get('cidade') || null;
            user.estado = formData.get('estado') || null;
            user.queixaPrincipal = formData.get('queixaPrincipal') || null;
            
            // Salvar alterações
            this.saveUsers();
            
            // Fechar modal
            modal.remove();
            
            // Atualizar lista
            this.renderUsersList();
            
            // Notificação de sucesso
            this.showNotification(`✅ Dados de ${user.nome} ${user.sobrenome} atualizados!`, 'success');
        });
        
        // Fazer modal aparecer
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    /**
     * Estende acesso do usuário
     */
    extendUserAccess(userId) {
        const user = this.users[userId];
        if (!user) return;
        
        const options = [
            { label: '30 dias', value: 30 },
            { label: '60 dias', value: 60 },
            { label: '90 dias', value: 90 }
        ];
        
        const modal = document.createElement('div');
        modal.className = 'extend-modal';
        modal.innerHTML = `
            <div class="extend-content">
                <h2>⏱️ Estender Acesso</h2>
                <p><strong>${user.nome} ${user.sobrenome}</strong></p>
                <p>Expira em: ${this.getExpirationText(user.expiraEm)}</p>
                <select id="extend-duration">
                    ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                </select>
                <div class="modal-actions">
                    <button id="confirm-extend" class="primary-button">✅ Confirmar</button>
                    <button id="cancel-extend" class="secondary-button">Cancelar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('confirm-extend').addEventListener('click', () => {
            const duration = parseInt(document.getElementById('extend-duration').value);
            const currentExpiration = new Date(user.expiraEm);
            const now = new Date();
            
            // Se já expirou, começar da data atual
            const baseDate = currentExpiration > now ? currentExpiration : now;
            
            baseDate.setDate(baseDate.getDate() + duration);
            user.expiraEm = baseDate.toISOString();
            user.ativo = true;
            
            this.saveUsers();
            this.renderUsersList();
            modal.remove();
            
            this.showNotification(`✅ Acesso estendido por ${duration} dias!`, 'success');
        });
        
        document.getElementById('cancel-extend').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    /**
     * Troca código do usuário
     */
    changeUserCode(userId) {
        const user = this.users[userId];
        if (!user) return;
        
        const newCode = this.generateUniqueCode();
        
        if (confirm(`Trocar código de ${user.nome} para: ${newCode}?`)) {
            user.codigo = newCode;
            this.saveUsers();
            this.renderUsersList();
            
            this.showNotification(`✅ Novo código: ${newCode}`, 'success');
            navigator.clipboard.writeText(newCode);
        }
    }
    
    /**
     * Ativa/desativa usuário
     */
    toggleUserStatus(userId) {
        const user = this.users[userId];
        if (!user) return;
        
        user.ativo = !user.ativo;
        this.saveUsers();
        this.renderUsersList();
        
        const status = user.ativo ? 'ativado' : 'desativado';
        this.showNotification(`✅ Usuário ${status}!`, 'success');
    }
    
    /**
     * Altera código master
     */
    changeMasterCode() {
        const newCode = this.generateUniqueCode();
        
        if (confirm(`Trocar código Master atual (${this.masterCode}) para: ${newCode}?\n\nATENÇÃO: O código antigo não funcionará mais!`)) {
            this.masterCode = newCode;
            this.users['master'].codigo = newCode;
            this.saveUsers();
            
            // Atualizar display
            document.querySelector('.code-display').textContent = newCode;
            
            this.showNotification(`✅ Código Master alterado: ${newCode}`, 'success');
            navigator.clipboard.writeText(newCode);
        }
    }
    
    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Aguardar DOM carregar completamente
        setTimeout(() => {
            // Login Terapeuta
            const terapeutaBtn = document.getElementById('terapeuta-login-btn');
            const terapeutaInput = document.getElementById('terapeuta-code-input');
            
            if (terapeutaBtn) {
                terapeutaBtn.addEventListener('click', () => this.attemptLogin('terapeuta'));
            }
            
            if (terapeutaInput) {
                terapeutaInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.attemptLogin('terapeuta');
                    }
                });
                
                terapeutaInput.addEventListener('input', (e) => {
                    e.target.value = e.target.value.toUpperCase();
                });
            }
            
            // Login Cliente
            const clienteBtn = document.getElementById('cliente-login-btn');
            const clienteInput = document.getElementById('cliente-code-input');
            
            if (clienteBtn) {
                clienteBtn.addEventListener('click', () => this.attemptLogin('cliente'));
            }
            
            if (clienteInput) {
                clienteInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.attemptLogin('cliente');
                    }
                });
                
                clienteInput.addEventListener('input', (e) => {
                    e.target.value = e.target.value.toUpperCase();
                });
            }
        }, 500);
    }
    
    /**
     * Tenta fazer login
     */
    attemptLogin(tipo) {
        const errorDiv = document.getElementById('login-error');
        let code, codeInput;
        
        if (tipo === 'terapeuta') {
            codeInput = document.getElementById('terapeuta-code-input');
            code = codeInput.value.trim().toUpperCase();
            
            // Verificar código terapeuta
            if (code !== this.masterCode) {
                errorDiv.textContent = '❌ Código de terapeuta inválido';
                errorDiv.style.display = 'block';
                setTimeout(() => { errorDiv.style.display = 'none'; }, 3000);
                return;
            }
            
            // Login como Master
            this.loginUser('master');
            return;
        }
        
        if (tipo === 'cliente') {
            codeInput = document.getElementById('cliente-code-input');
            code = codeInput.value.trim().toUpperCase();
            
            if (code.length < 6) {
                errorDiv.textContent = '❌ O código do cliente deve ter pelo menos 6 caracteres';
                errorDiv.style.display = 'block';
                setTimeout(() => { errorDiv.style.display = 'none'; }, 3000);
                return;
            }
            
            // Procurar usuário pelo código (exceto master)
            const user = Object.values(this.users).find(u => u.codigo === code && u.tipo !== 'master');
            
            if (!user) {
                errorDiv.textContent = '❌ Código de cliente inválido';
                errorDiv.style.display = 'block';
                setTimeout(() => { errorDiv.style.display = 'none'; }, 3000);
                return;
            }
            
            // Verificar se está ativo
            if (!user.ativo) {
                errorDiv.textContent = '❌ Acesso desativado. Entre em contato com seu terapeuta.';
                errorDiv.style.display = 'block';
                setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
                return;
            }
            
            // Verificar expiração
            if (user.expiraEm) {
                const expiresAt = new Date(user.expiraEm);
                const now = new Date();
                
                if (expiresAt < now) {
                    errorDiv.textContent = '❌ Acesso expirado. Entre em contato com seu terapeuta.';
                    errorDiv.style.display = 'block';
                    setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
                    user.ativo = false;
                    this.saveUsers();
                    return;
                }
            }
            
            // Login bem-sucedido!
            this.loginUser(user.id);
            return;
        }
    }
    
    /**
     * Faz login do usuário
     */
    loginUser(userId) {
        this.currentUser = this.users[userId];
        sessionStorage.setItem('guardiao_current_user', userId);
        
        console.log('✅ Login bem-sucedido:', this.currentUser.nome);
        
        // 📊 Iniciar rastreamento de sessão
        if (this.sessionTracker) {
            this.sessionTracker.startSession();
            console.log('📊 Sessão iniciada para:', this.currentUser.nome);
        }
        
        // 🔄 Recarregar sistemas que dependem do usuário logado
        this.reloadUserSystems();
        
        // Esconder login, mostrar app
        this.showMainApp();
        
        // Notificação de boas-vindas
        this.showNotification(`Bem-vindo(a), ${this.currentUser.nome}! 🌙`, 'success');
        
        // Se for master, adicionar botão de gerenciamento
        if (this.currentUser.tipo === 'master') {
            this.addMasterButton();
        }
    }
    
    /**
     * Logout
     */
    logout() {
        // 📊 Finalizar rastreamento de sessão
        if (this.sessionTracker) {
            this.sessionTracker.endSession('user_logout');
            console.log('📊 Sessão finalizada');
        }
        
        this.currentUser = null;
        sessionStorage.removeItem('guardiao_current_user');
        
        // Recarregar página
        window.location.reload();
    }
    
    /**
     * 🔄 Recarrega sistemas que dependem do usuário logado
     */
    reloadUserSystems() {
        console.log('🔄 Recarregando sistemas para usuário:', this.currentUser.nome);
        
        // Recarregar Evolution System
        if (window.evolutionSystem) {
            console.log('🔄 Recarregando Evolution System...');
            window.evolutionSystem.loadProgress();
            window.evolutionSystem.initializeUI();
        }
        
        // Recarregar Dream Incubator
        if (window.dreamIncubator) {
            console.log('🔄 Recarregando Dream Incubator...');
            window.dreamIncubator.loadHistory();
            window.dreamIncubator.initializeUI();
        }
        
        console.log('✅ Sistemas recarregados com dados do usuário');
    }
    
    /**
     * Retorna usuário atual
     */
    getCurrentUser() {
        return this.currentUser;
    }
    
    /**
     * Verifica se usuário é master
     */
    isMaster() {
        return this.currentUser && this.currentUser.tipo === 'master';
    }
    
    /**
     * Retorna chave de localStorage específica do usuário
     */
    getUserStorageKey(key) {
        if (!this.currentUser) return key;
        return `user_${this.currentUser.id}_${key}`;
    }
    
    /**
     * Salva dados no localStorage do usuário específico
     */
    saveUserData(key, data) {
        const storageKey = this.getUserStorageKey(key);
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
    
    /**
     * Carrega dados do localStorage do usuário específico
     */
    loadUserData(key) {
        const storageKey = this.getUserStorageKey(key);
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : null;
    }
    
    /**
     * Mostra notificação
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 10000;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            notification.style.color = 'white';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            notification.style.color = 'white';
        } else {
            notification.style.background = '#2d3748';
            notification.style.color = 'white';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Exportar
window.UserManagementSystem = UserManagementSystem;

console.log('👥 User Management System carregado');
