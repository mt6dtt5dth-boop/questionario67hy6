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
        // Gerar código master aleatório
        this.masterCode = this.generateCode();
        
        const masterUser = {
            id: 'master',
            codigo: this.masterCode,
            tipo: 'master',
            nome: 'Usuário',
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
        
        // Mostrar código master ao usuário
        this.showMasterCodeModal(this.masterCode);
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
    }
    
    /**
     * Mostra tela de login
     */
    showLoginScreen() {
        const welcomeScreen = document.getElementById('welcome-screen');
        if (!welcomeScreen) return;
        
        // Criar ou encontrar área de login
        let loginArea = document.getElementById('login-area');
        if (!loginArea) {
            loginArea = document.createElement('div');
            loginArea.id = 'login-area';
            loginArea.className = 'login-container';
            
            loginArea.innerHTML = `
                <div class="login-card">
                    <h2>🔐 Acesso ao Guardião do Sono</h2>
                    <p>Digite seu código de acesso:</p>
                    <input 
                        type="text" 
                        id="access-code-input" 
                        maxlength="6" 
                        placeholder="ABC123"
                        style="text-transform: uppercase; text-align: center; font-size: 24px; letter-spacing: 4px;"
                    />
                    <button id="login-button" class="primary-button">Entrar</button>
                    <div id="login-error" class="error-message" style="display: none;"></div>
                </div>
            `;
            
            // Inserir no topo da welcome screen
            welcomeScreen.insertBefore(loginArea, welcomeScreen.firstChild);
        }
        
        loginArea.style.display = 'block';
    }
    
    /**
     * Esconde tela de login
     */
    hideLoginScreen() {
        const loginArea = document.getElementById('login-area');
        if (loginArea) {
            loginArea.style.display = 'none';
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
     * Adiciona botão de gerenciamento para Master
     */
    addMasterButton() {
        const hud = document.getElementById('hud');
        if (!hud || document.getElementById('master-panel-btn')) return;
        
        const btn = document.createElement('button');
        btn.id = 'master-panel-btn';
        btn.className = 'master-button';
        btn.innerHTML = '👥 Gerenciar Usuários';
        btn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
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
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.6)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        });
        
        btn.addEventListener('click', () => this.showMasterPanel());
        
        document.body.appendChild(btn);
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
        
        container.innerHTML = usersList.map(user => `
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
                <div class="user-actions">
                    <button class="action-btn edit-btn" data-action="edit" data-user-id="${user.id}">✏️ Editar</button>
                    <button class="action-btn extend-btn" data-action="extend" data-user-id="${user.id}">⏱️ Estender</button>
                    <button class="action-btn code-btn" data-action="change-code" data-user-id="${user.id}">🔑 Trocar Código</button>
                    <button class="action-btn ${user.ativo ? 'deactivate-btn' : 'activate-btn'}" data-action="toggle" data-user-id="${user.id}">
                        ${user.ativo ? '🔒 Desativar' : '🔓 Ativar'}
                    </button>
                </div>
            </div>
        `).join('');
        
        // Event listeners para ações
        container.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const userId = e.target.dataset.userId;
                this.handleUserAction(action, userId);
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
        // TODO: Implementar modal de edição
        console.log('Editar usuário:', userId);
        this.showNotification('🔧 Funcionalidade de edição em desenvolvimento', 'info');
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
        // Login button
        const loginBtn = document.getElementById('login-button');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.attemptLogin());
        }
        
        // Enter no input de código
        const codeInput = document.getElementById('access-code-input');
        if (codeInput) {
            codeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.attemptLogin();
                }
            });
            
            // Auto uppercase
            codeInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
        }
    }
    
    /**
     * Tenta fazer login
     */
    attemptLogin() {
        const codeInput = document.getElementById('access-code-input');
        const errorDiv = document.getElementById('login-error');
        const code = codeInput.value.trim().toUpperCase();
        
        if (code.length !== 6) {
            errorDiv.textContent = '❌ O código deve ter 6 caracteres';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Verificar se é código master
        if (code === this.masterCode) {
            this.loginUser('master');
            return;
        }
        
        // Procurar usuário pelo código
        const user = Object.values(this.users).find(u => u.codigo === code);
        
        if (!user) {
            errorDiv.textContent = '❌ Código inválido';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Verificar se está ativo
        if (!user.ativo) {
            errorDiv.textContent = '❌ Acesso desativado. Entre em contato com o administrador.';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Verificar expiração
        if (user.expiraEm) {
            const expiresAt = new Date(user.expiraEm);
            const now = new Date();
            
            if (expiresAt < now) {
                errorDiv.textContent = '❌ Acesso expirado. Entre em contato com o administrador.';
                errorDiv.style.display = 'block';
                user.ativo = false;
                this.saveUsers();
                return;
            }
        }
        
        // Login bem-sucedido!
        this.loginUser(user.id);
    }
    
    /**
     * Faz login do usuário
     */
    loginUser(userId) {
        this.currentUser = this.users[userId];
        sessionStorage.setItem('guardiao_current_user', userId);
        
        console.log('✅ Login bem-sucedido:', this.currentUser.nome);
        
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
        this.currentUser = null;
        sessionStorage.removeItem('guardiao_current_user');
        
        // Recarregar página
        window.location.reload();
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
