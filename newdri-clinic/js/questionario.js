// Questionário - Newdri Clinic
// Script para gerenciamento do formulário e progresso

document.addEventListener('DOMContentLoaded', function() {
    // VERIFICAR CÓDIGO DE ACESSO
    const codigoAcesso = sessionStorage.getItem('codigo_acesso');
    const codigoValidado = sessionStorage.getItem('codigo_validado');

    if (!codigoAcesso || !codigoValidado) {
        alert('❌ Acesso não autorizado!\n\nPor favor, acesse via página de código.');
        window.location.href = 'acesso.html';
        return;
    }

    // Elementos do DOM
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const form = document.getElementById('questionarioForm');
    const saveButton = document.getElementById('saveProgress');

    // Variáveis de controle
    let totalQuestoes = 66;
    let questoesRespondidas = new Set();

    // Carregar progresso salvo (se existir)
    carregarProgresso();

    // Adicionar event listeners para todas as questões
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            const nomeQuestao = this.name;
            questoesRespondidas.add(nomeQuestao);
            atualizarProgresso();
            salvarNoLocalStorage();
        });
    });

    // Event listener para campos demográficos
    const camposDemograficos = ['idade', 'estadoCivil', 'cidade', 'tipoLocalidade', 'profissao', 'renda', 'escolaridade'];
    camposDemograficos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.addEventListener('change', salvarNoLocalStorage);
        }
    });

    // Botão de salvar progresso
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            salvarNoLocalStorage();
            mostrarMensagem('✅ Progresso salvo com sucesso!', 'success');
        });
    }

    // Submissão do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validarFormulario()) {
            mostrarMensagem('⚠️ Por favor, responda todas as questões obrigatórias.', 'warning');
            rolarParaPrimeiraQuestaoNaoRespondida();
            return;
        }

        // Coletar todos os dados
        const dados = coletarDados();
        
        // Salvar no localStorage (backup)
        localStorage.setItem('questionario_dados', JSON.stringify(dados));

        // Salvar no Supabase
        mostrarMensagem('💾 Salvando respostas...', 'info');
        
        // Verificar se Supabase está inicializado
        if (typeof initSupabase === 'function') {
            initSupabase();
            
            if (typeof salvarRespostas === 'function') {
                const resultado = await salvarRespostas(
                    codigoAcesso,
                    dados.demograficos,
                    dados.respostas
                );

                if (!resultado.sucesso) {
                    alert('⚠️ Erro ao salvar no banco de dados: ' + resultado.erro + '\n\nMas suas respostas foram salvas localmente.');
                }
            }
        }
        
        // Redirecionar para página de relatório
        window.location.href = 'relatorio.html';
    });

    function atualizarProgresso() {
        const progresso = (questoesRespondidas.size / totalQuestoes) * 100;
        progressFill.style.width = progresso + '%';
        progressFill.textContent = Math.round(progresso) + '%';
        progressText.textContent = `${questoesRespondidas.size} de ${totalQuestoes} questões respondidas`;
    }

    function validarFormulario() {
        // Validar dados demográficos
        const camposObrigatorios = ['idade', 'estadoCivil', 'cidade', 'tipoLocalidade', 'profissao', 'renda', 'escolaridade'];
        for (let campo of camposObrigatorios) {
            const elemento = document.getElementById(campo);
            if (!elemento || !elemento.value) {
                return false;
            }
        }

        // Validar todas as 66 questões
        for (let i = 1; i <= 66; i++) {
            const questao = document.querySelector(`input[name="q${i}"]:checked`);
            if (!questao) {
                return false;
            }
        }

        return true;
    }

    function coletarDados() {
        const dados = {
            timestamp: new Date().toISOString(),
            demograficos: {
                nome: document.getElementById('nome')?.value || 'Anônimo',
                idade: parseInt(document.getElementById('idade').value),
                estadoCivil: document.getElementById('estadoCivil').value,
                cidade: document.getElementById('cidade').value,
                tipoLocalidade: document.getElementById('tipoLocalidade').value,
                profissao: document.getElementById('profissao').value,
                renda: document.getElementById('renda').value,
                escolaridade: document.getElementById('escolaridade').value
            },
            respostas: {}
        };

        // Coletar respostas das questões
        for (let i = 1; i <= 66; i++) {
            const questao = document.querySelector(`input[name="q${i}"]:checked`);
            if (questao) {
                dados.respostas[`q${i}`] = questao.value;
            }
        }

        return dados;
    }

    function salvarNoLocalStorage() {
        try {
            const dados = coletarDadosParciais();
            localStorage.setItem('questionario_progresso', JSON.stringify(dados));
        } catch (e) {
            console.error('Erro ao salvar progresso:', e);
        }
    }

    function coletarDadosParciais() {
        const dados = {
            timestamp: new Date().toISOString(),
            demograficos: {},
            respostas: {}
        };

        // Coletar dados demográficos (se preenchidos)
        const camposDemograficos = {
            nome: 'nome',
            idade: 'idade',
            estadoCivil: 'estadoCivil',
            cidade: 'cidade',
            tipoLocalidade: 'tipoLocalidade',
            profissao: 'profissao',
            renda: 'renda',
            escolaridade: 'escolaridade'
        };

        for (let [key, id] of Object.entries(camposDemograficos)) {
            const elemento = document.getElementById(id);
            if (elemento && elemento.value) {
                dados.demograficos[key] = elemento.value;
            }
        }

        // Coletar respostas já marcadas
        for (let i = 1; i <= 66; i++) {
            const questao = document.querySelector(`input[name="q${i}"]:checked`);
            if (questao) {
                dados.respostas[`q${i}`] = questao.value;
            }
        }

        return dados;
    }

    function carregarProgresso() {
        try {
            const progressoSalvo = localStorage.getItem('questionario_progresso');
            if (!progressoSalvo) return;

            const dados = JSON.parse(progressoSalvo);

            // Restaurar dados demográficos
            if (dados.demograficos) {
                Object.entries(dados.demograficos).forEach(([key, value]) => {
                    const elemento = document.getElementById(key);
                    if (elemento) {
                        elemento.value = value;
                    }
                });
            }

            // Restaurar respostas
            if (dados.respostas) {
                Object.entries(dados.respostas).forEach(([questao, resposta]) => {
                    const radio = document.querySelector(`input[name="${questao}"][value="${resposta}"]`);
                    if (radio) {
                        radio.checked = true;
                        questoesRespondidas.add(questao);
                    }
                });
            }

            atualizarProgresso();
            mostrarMensagem('📋 Progresso anterior restaurado!', 'info');
        } catch (e) {
            console.error('Erro ao carregar progresso:', e);
        }
    }

    function rolarParaPrimeiraQuestaoNaoRespondida() {
        for (let i = 1; i <= 66; i++) {
            const questao = document.querySelector(`input[name="q${i}"]:checked`);
            if (!questao) {
                const elemento = document.querySelector(`[data-question="${i}"]`);
                if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    elemento.style.border = '2px solid #ff9800';
                    setTimeout(() => {
                        elemento.style.border = '';
                    }, 3000);
                }
                return;
            }
        }

        // Se todas as questões estão respondidas, verificar dados demográficos
        const camposObrigatorios = ['idade', 'estadoCivil', 'cidade', 'tipoLocalidade', 'profissao', 'renda', 'escolaridade'];
        for (let campo of camposObrigatorios) {
            const elemento = document.getElementById(campo);
            if (!elemento || !elemento.value) {
                elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
                elemento.style.border = '2px solid #ff9800';
                setTimeout(() => {
                    elemento.style.border = '';
                }, 3000);
                return;
            }
        }
    }

    function mostrarMensagem(texto, tipo) {
        // Criar elemento de mensagem
        const mensagem = document.createElement('div');
        mensagem.className = `alert alert-${tipo}`;
        mensagem.textContent = texto;
        mensagem.style.position = 'fixed';
        mensagem.style.top = '20px';
        mensagem.style.right = '20px';
        mensagem.style.zIndex = '10000';
        mensagem.style.minWidth = '300px';
        mensagem.style.animation = 'fadeIn 0.3s ease-out';

        document.body.appendChild(mensagem);

        // Remover após 3 segundos
        setTimeout(() => {
            mensagem.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(mensagem);
            }, 300);
        }, 3000);
    }

    // Inicializar progresso
    atualizarProgresso();

    // Adicionar suavização de scroll para questões validadoras
    const validadores = document.querySelectorAll('.validator');
    validadores.forEach(validador => {
        validador.style.transition = 'all 0.3s ease';
    });

    // Auto-scroll suave ao mudar de seção
    const secoes = document.querySelectorAll('.section-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease-out';
            }
        });
    }, { threshold: 0.5 });

    secoes.forEach(secao => observer.observe(secao));
});

// Confirmação ao sair da página sem salvar
window.addEventListener('beforeunload', function(e) {
    const formPreenchido = document.querySelectorAll('input[type="radio"]:checked').length > 0;
    const dadosSalvos = localStorage.getItem('questionario_progresso');
    
    if (formPreenchido && !dadosSalvos) {
        e.preventDefault();
        e.returnValue = 'Você tem progresso não salvo. Tem certeza que deseja sair?';
        return e.returnValue;
    }
});
