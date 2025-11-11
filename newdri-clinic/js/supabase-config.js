// Configuração do Supabase - Newdri Clinic
// INSTRUÇÕES: Siga o guia CONFIGURAR-SUPABASE.md e preencha abaixo

const SUPABASE_CONFIG = {
    // Cole aqui a URL do seu projeto Supabase
    // Exemplo: https://xxxxx.supabase.co
    url: 'SEU_PROJECT_URL_AQUI',
    
    // Cole aqui a chave anon public
    // Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    anonKey: 'SUA_ANON_KEY_AQUI',
    
    // Cole aqui a chave service_role (MANTENHA SECRETO!)
    // Esta chave só deve ser usada no dashboard do Dr. Newton
    // Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    serviceRoleKey: 'SUA_SERVICE_ROLE_KEY_AQUI'
};

// Senha do dashboard do Dr. Newton (ALTERE ISTO!)
const DASHBOARD_PASSWORD = 'newdri2025';

// Inicializar cliente Supabase
let supabaseClient = null;
let supabaseAdmin = null;

function initSupabase() {
    if (!SUPABASE_CONFIG.url || SUPABASE_CONFIG.url === 'SEU_PROJECT_URL_AQUI') {
        console.error('❌ Supabase não configurado! Siga o guia CONFIGURAR-SUPABASE.md');
        return false;
    }

    try {
        // Cliente normal (para pacientes - anon key)
        supabaseClient = supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );

        // Cliente admin (para dashboard - service role key)
        supabaseAdmin = supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.serviceRoleKey
        );

        console.log('✅ Supabase inicializado com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao inicializar Supabase:', error);
        return false;
    }
}

// Funções auxiliares para o sistema

// Gerar código alfanumérico de 8 caracteres
function gerarCodigo() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sem caracteres ambíguos (I, O, 0, 1)
    let codigo = '';
    for (let i = 0; i < 8; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
}

// Validar código (verifica se existe e está válido)
async function validarCodigo(codigo) {
    try {
        const { data, error } = await supabaseClient
            .from('codigos_acesso')
            .select('*')
            .eq('codigo', codigo.toUpperCase())
            .gt('expires_at', new Date().toISOString())
            .single();

        if (error) {
            console.error('Erro ao validar código:', error);
            return { valido: false, erro: 'Código inválido ou expirado' };
        }

        if (data.status === 'usado') {
            return { valido: false, erro: 'Este código já foi utilizado' };
        }

        return { valido: true, dados: data };
    } catch (error) {
        console.error('Erro:', error);
        return { valido: false, erro: 'Erro ao validar código' };
    }
}

// Criar novo código de acesso (apenas dashboard)
async function criarNovoCodigo(nomePaciente = null) {
    try {
        const codigo = gerarCodigo();
        
        const { data, error } = await supabaseAdmin
            .from('codigos_acesso')
            .insert([
                {
                    codigo: codigo,
                    nome_paciente: nomePaciente,
                    status: 'pendente'
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Erro ao criar código:', error);
            return { sucesso: false, erro: error.message };
        }

        return { sucesso: true, codigo: data.codigo, dados: data };
    } catch (error) {
        console.error('Erro:', error);
        return { sucesso: false, erro: 'Erro ao criar código' };
    }
}

// Salvar respostas do questionário
async function salvarRespostas(codigo, dadosDemograficos, respostas) {
    try {
        // Primeiro, buscar o ID do código
        const { data: codigoData, error: codigoError } = await supabaseClient
            .from('codigos_acesso')
            .select('id')
            .eq('codigo', codigo.toUpperCase())
            .single();

        if (codigoError) {
            return { sucesso: false, erro: 'Código não encontrado' };
        }

        // Salvar respostas
        const { data, error } = await supabaseClient
            .from('respostas_questionario')
            .insert([
                {
                    codigo_id: codigoData.id,
                    codigo: codigo.toUpperCase(),
                    dados_demograficos: dadosDemograficos,
                    respostas: respostas
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Erro ao salvar respostas:', error);
            return { sucesso: false, erro: error.message };
        }

        // Atualizar status do código para "usado"
        await supabaseAdmin
            .from('codigos_acesso')
            .update({ 
                status: 'usado',
                usado_em: new Date().toISOString()
            })
            .eq('codigo', codigo.toUpperCase());

        return { sucesso: true, dados: data };
    } catch (error) {
        console.error('Erro:', error);
        return { sucesso: false, erro: 'Erro ao salvar respostas' };
    }
}

// Listar todos os códigos (apenas dashboard)
async function listarCodigos() {
    try {
        const { data, error } = await supabaseAdmin
            .from('codigos_acesso')
            .select('*')
            .order('criado_em', { ascending: false });

        if (error) {
            console.error('Erro ao listar códigos:', error);
            return { sucesso: false, erro: error.message };
        }

        return { sucesso: true, codigos: data };
    } catch (error) {
        console.error('Erro:', error);
        return { sucesso: false, erro: 'Erro ao listar códigos' };
    }
}

// Buscar respostas de um código (apenas dashboard)
async function buscarRespostas(codigo) {
    try {
        const { data, error } = await supabaseAdmin
            .from('respostas_questionario')
            .select('*')
            .eq('codigo', codigo.toUpperCase())
            .single();

        if (error) {
            console.error('Erro ao buscar respostas:', error);
            return { sucesso: false, erro: error.message };
        }

        return { sucesso: true, dados: data };
    } catch (error) {
        console.error('Erro:', error);
        return { sucesso: false, erro: 'Erro ao buscar respostas' };
    }
}

// Verificar autenticação do dashboard
function verificarAutenticacaoDashboard() {
    const auth = sessionStorage.getItem('dashboard_auth');
    return auth === 'autenticado';
}

function autenticarDashboard(senha) {
    if (senha === DASHBOARD_PASSWORD) {
        sessionStorage.setItem('dashboard_auth', 'autenticado');
        return true;
    }
    return false;
}

function desautenticarDashboard() {
    sessionStorage.removeItem('dashboard_auth');
}

// Exportar funções
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSupabase,
        gerarCodigo,
        validarCodigo,
        criarNovoCodigo,
        salvarRespostas,
        listarCodigos,
        buscarRespostas,
        verificarAutenticacaoDashboard,
        autenticarDashboard,
        desautenticarDashboard
    };
}
