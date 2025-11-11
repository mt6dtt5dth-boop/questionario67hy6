// Motor de Análise - Newdri Clinic
// Cálculo de escalas, perfis e detecção de dissonâncias

class AnalisadorPsicossexual {
    constructor(dados) {
        this.dados = dados;
        this.resultados = {};
    }

    analisar() {
        this.calcularEscalas();
        this.identificarPerfil();
        this.detectarDissonancias();
        this.analisarContextoSocial();
        this.gerarRecomendacoes();
        
        return this.resultados;
    }

    calcularEscalas() {
        this.resultados.escalas = {
            aberturaSexual: this.calcularAberturaSexual(),
            autoconhecimento: this.calcularAutoconhecimento(),
            dominanciaSubmissao: this.calcularDominanciaSubmissao(),
            masoquismo: this.calcularMasoquismo(),
            dissonanciaContexto: this.calcularDissonanciaContexto()
        };
    }

    calcularAberturaSexual() {
        const r = this.dados.respostas;
        let pontos = 0;
        let maxPontos = 100;

        // Seção 6 (Exploração): até 30 pontos
        const secao6 = {
            q26: { a: 10, b: 7, c: 3, d: 0 },
            q27: { a: 10, b: 7, c: 3, d: 0 },
            q28: { a: 10, b: 7, c: 3, d: 0 }
        };

        for (let [q, valores] of Object.entries(secao6)) {
            pontos += valores[r[q]] || 0;
        }

        // Seção 9 (Estímulos): até 25 pontos
        if (r.q41 === 'a' || r.q41 === 'b' || r.q41 === 'c') pontos += 8;
        if (r.q42 === 'a' || r.q42 === 'c') pontos += 8;
        if (r.q44 === 'a') pontos += 5;
        else if (r.q44 === 'b') pontos += 3;

        // Questões específicas: até 20 pontos
        if (r.q19 === 'a') pontos += 5;
        else if (r.q19 === 'b') pontos += 3;

        if (r.q22 === 'a') pontos += 5;
        else if (r.q22 === 'b') pontos += 3;

        if (r.q55 === 'a') pontos += 5;
        else if (r.q55 === 'c') pontos += 3;

        // Experiências: até 15 pontos
        if (r.q37 === 'a') pontos += 10;
        else if (r.q37 === 'b') pontos += 5;

        if (r.q53 === 'a') pontos += 5;

        // Ajuste contextual
        const ajuste = this.calcularAjusteContextual();
        pontos += ajuste;

        return Math.min(Math.round((pontos / maxPontos) * 100), 100);
    }

    calcularAutoconhecimento() {
        const r = this.dados.respostas;
        let pontos = 0;

        // Q58, Q64: 30 pontos cada
        if (r.q58 === 'a') pontos += 30;
        else if (r.q58 === 'b') pontos += 20;
        else if (r.q58 === 'c') pontos += 10;

        if (r.q64 === 'a') pontos += 30;
        else if (r.q64 === 'b') pontos += 20;
        else if (r.q64 === 'c') pontos += 10;

        // Q56-57: 20 pontos
        if (r.q56 === 'a') pontos += 15;
        else if (r.q56 === 'b') pontos += 10;
        else if (r.q56 === 'c') pontos += 5;

        if (r.q57 !== 'd') pontos += 5;

        // Consistência: até 20 pontos
        const consistencia = this.calcularConsistenciaGeral();
        pontos += Math.round(consistencia * 20);

        return Math.min(pontos, 100);
    }

    calcularDominanciaSubmissao() {
        const r = this.dados.respostas;
        let pontuacao = 0; // -50 (submisso) a +50 (dominante)

        const questoes = {
            q2: { a: 5, b: 0, c: -5, d: 0 },
            q8: { a: 8, b: 0, c: -8, d: 0 },
            q10: { a: 8, b: 0, c: -8, d: 0 },
            q11: { a: 7, b: 0, c: -7, d: 0 },
            q13: { a: 6, b: -6, c: 0, d: 0 },
            q21: { a: 5, b: -5, c: 0, d: 0 },
            q43: { a: 6, b: 0, c: -6, d: 0 }
        };

        for (let [q, valores] of Object.entries(questoes)) {
            pontuacao += valores[r[q]] || 0;
        }

        return Math.max(-50, Math.min(50, pontuacao));
    }

    calcularMasoquismo() {
        const r = this.dados.respostas;
        let pontos = 0;

        // Q17 + Q18: 40 pontos
        if (r.q17 === 'a') pontos += 25;
        else if (r.q17 === 'b') pontos += 10;

        if (r.q18 === 'a') pontos += 15;
        else if (r.q18 === 'b') pontos += 10;
        else if (r.q18 === 'c') pontos += 5;

        // Q41 + Q44: 30 pontos
        if (r.q41 === 'a') pontos += 15;
        else if (r.q41 === 'b' || r.q41 === 'c') pontos += 10;

        if (r.q44 === 'a') pontos += 15;
        else if (r.q44 === 'b') pontos += 10;

        // Q14: 15 pontos
        if (r.q14 === 'a') pontos += 15;
        else if (r.q14 === 'c') pontos += 10;

        // Q16: 15 pontos
        if (r.q16 === 'a') pontos += 15;
        else if (r.q16 === 'b') pontos += 10;
        else if (r.q16 === 'c') pontos += 5;

        return Math.min(pontos, 100);
    }

    calcularDissonanciaContexto() {
        const r = this.dados.respostas;
        let pontos = 0;

        // Q49: Dissonância explícita
        if (r.q49 === 'b' || r.q49 === 'c' || r.q49 === 'd') pontos += 30;

        // Q50: Diferença no anonimato
        if (r.q50 === 'c') pontos += 30;
        else if (r.q50 === 'd') pontos += 40;
        else if (r.q50 === 'b') pontos += 15;

        // Q61: Desejos não expressos
        if (r.q61 === 'c' || r.q61 === 'd') pontos += 20;
        else if (r.q61 === 'b') pontos += 10;

        // Q24: Não compartilhar fantasias
        if (r.q24 === 'c' || r.q24 === 'd') pontos += 10;
        else if (r.q24 === 'b') pontos += 5;

        return Math.min(pontos, 100);
    }

    calcularAjusteContextual() {
        const demo = this.dados.demograficos;
        let ajuste = 0;

        // Interior conservador
        if (demo.tipoLocalidade === 'pequena') {
            const r = this.dados.respostas;
            if (r.q47 === 'c' || r.q47 === 'd') {
                ajuste += 15; // Maior abertura considerando repressão
            }
        }

        return ajuste;
    }

    calcularConsistenciaGeral() {
        const inconsistencias = this.detectarDissonancias();
        const total = inconsistencias.length;
        
        if (total === 0) return 1.0;
        if (total <= 2) return 0.8;
        if (total <= 4) return 0.6;
        if (total <= 6) return 0.4;
        return 0.2;
    }

    identificarPerfil() {
        const escalas = this.resultados.escalas;
        const r = this.dados.respostas;
        
        let perfil = {
            principal: '',
            subtipo: '',
            confianca: 0,
            marcadores: []
        };

        // Identificar perfil principal
        if (escalas.dominanciaSubmissao > 20) {
            perfil.principal = 'Dominante';
            perfil.marcadores = this.identificarMarcadoresDominante(r);
        } else if (escalas.dominanciaSubmissao < -20) {
            perfil.principal = 'Submisso';
            perfil.marcadores = this.identificarMarcadoresSubmisso(r);
            
            // Identificar subtipo submisso
            if (escalas.masoquismo > 60) {
                perfil.subtipo = 'Masoquista';
            } else if (r.q11 === 'b' && r.q31 === 'b') {
                perfil.subtipo = 'Romântica';
            }
        } else if (Math.abs(escalas.dominanciaSubmissao) <= 20) {
            perfil.principal = 'Switch/Versátil';
            perfil.marcadores = ['Alternância entre papéis', 'Situacional'];
        }

        // Sobrepor com outros perfis
        if (escalas.aberturaSexual > 70) {
            perfil.secundario = 'Explorador/Experimental';
        }

        if (r.q31 === 'b' && r.q35 === 'b') {
            perfil.secundario = 'Romântico/Emocional';
        }

        if (escalas.aberturaSexual < 30 && escalas.autoconhecimento < 40) {
            perfil.principal = 'Conservador/Reprimido';
            perfil.tipoRepressao = this.identificarTipoRepressao();
        }

        perfil.confianca = this.calcularConfiancaPerfil();
        this.resultados.perfil = perfil;
    }

    identificarMarcadoresDominante(r) {
        const marcadores = [];
        if (r.q8 === 'a') marcadores.push('Liderança em role-play');
        if (r.q10 === 'a') marcadores.push('Fantasias de controle');
        if (r.q11 === 'a') marcadores.push('Atração por dominância');
        if (r.q13 === 'a') marcadores.push('Excitação em dar ordens');
        return marcadores;
    }

    identificarMarcadoresSubmisso(r) {
        const marcadores = [];
        if (r.q8 === 'c') marcadores.push('Guiada/protegida em role-play');
        if (r.q9 === 'a' || r.q9 === 'b') marcadores.push('Atração por vulnerabilidade');
        if (r.q10 === 'c') marcadores.push('Fantasias de entrega');
        if (r.q11 === 'c') marcadores.push('Desejo de entregar-se');
        if (r.q13 === 'b') marcadores.push('Excitação em receber ordens');
        if (r.q33 === 'c') marcadores.push('Necessidade de cuidado pós-ato');
        return marcadores;
    }

    identificarTipoRepressao() {
        const r = this.dados.respostas;
        const demo = this.dados.demograficos;

        // Repressão por trauma
        if (r.q40 === 'c' || (r.q40 === 'b' && r.q52 === 'c')) {
            return 'trauma';
        }

        // Repressão contextual
        if (r.q49 !== 'a' && r.q50 !== 'a' && (r.q47 === 'c' || r.q47 === 'd')) {
            return 'contextual';
        }

        // Conservador genuíno
        if (r.q50 === 'a' && r.q49 === 'a') {
            return 'genuino';
        }

        return 'indefinido';
    }

    calcularConfiancaPerfil() {
        const consistencia = this.calcularConsistenciaGeral();
        const autoconhecimento = this.resultados.escalas.autoconhecimento / 100;
        
        return Math.round((consistencia * 0.6 + autoconhecimento * 0.4) * 100);
    }

    detectarDissonancias() {
        const r = this.dados.respostas;
        const dissonancias = [];

        // Par A: Q4 ↔ Q6 (Comunicação vs Recepção)
        if ((r.q4 === 'a') && (r.q6 === 'c')) {
            dissonancias.push({
                tipo: 'Comunicação',
                par: 'Q4-Q6',
                descricao: 'Comunica bem mas desconfortável ao ser desejada',
                interpretacao: 'Possível insegurança profunda apesar de discurso assertivo'
            });
        }

        // Par B: Q8 ↔ Q10 (Role-play vs Fantasias)
        if ((r.q8 === 'd') && (r.q10 === 'a' || r.q10 === 'c')) {
            dissonancias.push({
                tipo: 'Controle',
                par: 'Q8-Q10',
                descricao: 'Rejeita role-play mas fantasia com dinâmicas de poder',
                interpretacao: 'Repressão de desejos reais'
            });
        }

        // Par E: Q17 ↔ Q18 (Experiência vs Abertura futura)
        if ((r.q17 === 'a') && (r.q18 === 'c' || r.q18 === 'd')) {
            dissonancias.push({
                tipo: 'Masoquismo',
                par: 'Q17-Q18',
                descricao: 'Sentiu prazer mas recusaria repetir',
                interpretacao: 'Culpa ou vergonha sobre experiências prazerosas'
            });
        }

        // Par F: Q22 ↔ Q24 (Fantasias vs Compartilhar)
        if ((r.q22 === 'a' || r.q22 === 'b') && (r.q24 === 'c' || r.q24 === 'd')) {
            dissonancias.push({
                tipo: 'Comunicação',
                par: 'Q22-Q24',
                descricao: 'Tem fantasias não convencionais mas não compartilha',
                interpretacao: 'Vergonha ou medo de julgamento'
            });
        }

        // Par G: Q26 ↔ Q27 (Abertura geral vs Reação específica)
        if ((r.q26 === 'a') && (r.q27 === 'c' || r.q27 === 'd')) {
            dissonancias.push({
                tipo: 'Abertura',
                par: 'Q26-Q27',
                descricao: 'Discurso aberto mas reação hesitante',
                interpretacao: 'Discurso não reflete comportamento real'
            });
        }

        // Par H: Q41 ↔ Q46 (Atração vs Fantasia)
        if ((r.q41 === 'a' || r.q41 === 'b') && (r.q46 === 'd')) {
            dissonancias.push({
                tipo: 'Estímulos',
                par: 'Q41-Q46',
                descricao: 'Atraída por elementos mas nunca fantasiou com eles',
                interpretacao: 'Dissociação ou negação de desejos'
            });
        }

        // Par I: Q49 ↔ Q50 (CRÍTICO - Desejo vs Permissão)
        if (r.q49 !== 'a' && r.q50 !== 'a') {
            const nivelDissonancia = r.q50 === 'c' || r.q50 === 'd' ? 'ALTA' : 'MODERADA';
            dissonancias.push({
                tipo: 'Repressão Contextual',
                par: 'Q49-Q50',
                descricao: 'Diferença significativa entre desejo e permissão',
                interpretacao: `Repressão social/contextual - Nível: ${nivelDissonancia}`,
                criticidade: 'ALTA'
            });
        }

        // Par J: Q60 ↔ Q61 (CRÍTICO - Satisfação vs Desejos ocultos)
        if ((r.q60 === 'a' || r.q60 === 'b') && (r.q61 === 'c' || r.q61 === 'd')) {
            dissonancias.push({
                tipo: 'Relacionamento',
                par: 'Q60-Q61',
                descricao: 'Satisfação declarada mas desejos não expressos',
                interpretacao: 'Conformidade resignada, não satisfação genuína',
                criticidade: 'ALTA'
            });
        }

        return dissonancias;
    }

    analisarContextoSocial() {
        const demo = this.dados.demograficos;
        const r = this.dados.respostas;

        this.resultados.contexto = {
            localidade: this.analisarLocalidade(demo, r),
            idade: this.analisarIdade(demo, r),
            estadoCivil: this.analisarEstadoCivil(demo, r),
            profissao: this.analisarProfissao(demo, r),
            renda: this.analisarRenda(demo, r)
        };
    }

    analisarLocalidade(demo, r) {
        let analise = {
            tipo: demo.tipoLocalidade,
            pressaoSocial: '',
            ajustes: []
        };

        if (demo.tipoLocalidade === 'pequena') {
            analise.pressaoSocial = 'Alta';
            if (r.q47 === 'c' || r.q47 === 'd') {
                analise.ajustes.push('Ambiente conservador pode estar mascarando desejos reais');
            }
            if (this.resultados.escalas.dissonanciaContexto > 60) {
                analise.ajustes.push('Dissonância severa - Ambiente opressor');
            }
        } else if (demo.tipoLocalidade === 'capital') {
            analise.pressaoSocial = 'Baixa';
            analise.ajustes.push('Maior liberdade de expressão, respostas tendem a ser fidedignas');
        }

        return analise;
    }

    analisarIdade(demo, r) {
        const idade = demo.idade;
        let analise = {
            faixa: '',
            caracteristicas: [],
            observacoes: []
        };

        if (idade >= 18 && idade <= 25) {
            analise.faixa = '18-25 anos';
            analise.caracteristicas = ['Fase de descoberta', 'Maior abertura natural'];
            if (this.resultados.escalas.aberturaSexual < 40) {
                analise.observacoes.push('Conservadorismo incomum para idade - Investigar trauma ou repressão severa');
            }
        } else if (idade >= 26 && idade <= 35) {
            analise.faixa = '26-35 anos';
            analise.caracteristicas = ['Maior clareza sobre preferências', 'Pico de exploração feminina'];
            if (this.resultados.escalas.dissonanciaContexto > 60) {
                analise.observacoes.push('Possível conflito entre desejos e expectativas sociais');
            }
        } else if (idade >= 36 && idade <= 45) {
            analise.faixa = '36-45 anos';
            analise.caracteristicas = ['Redescobrimento sexual possível', 'Maior consciência corporal'];
            if (this.resultados.escalas.autoconhecimento < 50) {
                analise.observacoes.push('Possível despertar tardio ou desejos reprimidos por décadas');
            }
        } else if (idade >= 46) {
            analise.faixa = '46+ anos';
            analise.caracteristicas = ['Consolidação ou redescobrimento', 'Menor preocupação com julgamento'];
        }

        return analise;
    }

    analisarEstadoCivil(demo, r) {
        let analise = {
            status: demo.estadoCivil,
            dinamica: '',
            alertas: []
        };

        if (demo.estadoCivil === 'casada') {
            if (r.q60 === 'b' && (r.q61 === 'c' || r.q61 === 'd')) {
                analise.dinamica = 'Satisfação aparente com desejos ocultos significativos';
                analise.alertas.push('CRÍTICO: Comunicação falha severa no casamento');
            }
            if (r.q49 !== 'a' || r.q50 !== 'a') {
                analise.alertas.push('Dissonância entre desejo e expressão no relacionamento');
            }
        } else if (demo.estadoCivil === 'solteira') {
            if (r.q62 === 'b' || r.q62 === 'c') {
                analise.alertas.push('Limitações externas impedindo exploração');
            }
        }

        return analise;
    }

    analisarProfissao(demo, r) {
        const profissao = demo.profissao.toLowerCase();
        let analise = {
            area: demo.profissao,
            influencia: '',
            observacoes: []
        };

        if (profissao.includes('professor') || profissao.includes('educador')) {
            analise.influencia = 'Alta pressão por "comportamento exemplar"';
            if (this.resultados.escalas.dissonanciaContexto > 60) {
                analise.observacoes.push('Repressão significativa devido a papel social');
            }
        }

        if (profissao.includes('advogad') || profissao.includes('gestão') || profissao.includes('diret')) {
            if (this.resultados.perfil.principal === 'Submisso') {
                analise.observacoes.push('Possível compensação: controle profissional vs entrega sexual');
            }
        }

        return analise;
    }

    analisarRenda(demo, r) {
        let analise = {
            faixa: demo.renda,
            acesso: '',
            ajustes: []
        };

        if (demo.renda === 'ate2' || demo.renda === '2a5') {
            analise.acesso = 'Limitado a recursos e informação';
            if (r.q30 === 'b' && r.q59 === 'd') {
                analise.ajustes.push('Desejo sem acesso a recursos');
            }
        } else if (demo.renda === 'acima20') {
            analise.acesso = 'Amplo acesso a recursos, terapia, produtos';
        }

        return analise;
    }

    gerarRecomendacoes() {
        this.resultados.recomendacoes = {
            prioridade1: [],
            prioridade2: [],
            prioridade3: [],
            alertas: []
        };

        const escalas = this.resultados.escalas;
        const perfil = this.resultados.perfil;
        const dissonancias = this.detectarDissonancias();

        // ALERTAS CRÍTICOS
        const criticas = dissonancias.filter(d => d.criticidade === 'ALTA');
        if (criticas.length > 0) {
            this.resultados.recomendacoes.alertas.push({
                nivel: 'URGENTE',
                texto: 'Dissonância crítica detectada - Requer intervenção terapêutica imediata',
                acoes: ['Terapia individual focada em repressão', 'Avaliação de saúde mental']
            });
        }

        // Trauma detectado
        if (perfil.tipoRepressao === 'trauma') {
            this.resultados.recomendacoes.alertas.push({
                nivel: 'CRÍTICO',
                texto: 'Possível trauma sexual - Encaminhar para especialista',
                acoes: ['Avaliação psicológica completa', 'Terapia especializada em trauma']
            });
        }

        // PRIORIDADE 1: URGENTE
        if (escalas.dissonanciaContexto > 70) {
            this.resultados.recomendacoes.prioridade1.push({
                area: 'Dissonância Contextual',
                objetivo: 'Reconciliar desejos reais com expressão',
                acoes: [
                    'Terapia individual semanal',
                    'Trabalho em desconstrução de culpa',
                    'Desenvolvimento de comunicação assertiva'
                ],
                prazo: '3 meses'
            });
        }

        // PRIORIDADE 2: IMPORTANTE
        if (escalas.autoconhecimento < 50) {
            this.resultados.recomendacoes.prioridade2.push({
                area: 'Autoconhecimento',
                objetivo: 'Desenvolver consciência de desejos e limites',
                acoes: [
                    'Aumentar prática de autoerotismo',
                    'Mapeamento corporal',
                    'Diário sexual/emocional'
                ],
                prazo: '6 meses'
            });
        }

        // PRIORIDADE 3: DESEJÁVEL
        if (perfil.principal === 'Submisso' && escalas.aberturaSexual > 60) {
            this.resultados.recomendacoes.prioridade3.push({
                area: 'Exploração de Identidade',
                objetivo: 'Experimentar dinâmicas de submissão de forma segura',
                acoes: [
                    'Educação sobre BDSM seguro',
                    'Literatura especializada',
                    'Estabelecimento de limites claros'
                ],
                prazo: '12 meses'
            });
        }
    }
}

// Função helper para análise externa
function analisarQuestionario(dados) {
    const analisador = new AnalisadorPsicossexual(dados);
    return analisador.analisar();
}

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnalisadorPsicossexual, analisarQuestionario };
}
