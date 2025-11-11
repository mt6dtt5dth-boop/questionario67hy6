// Dados Completos do Questionário - Newdri Clinic
// 66 Questões Organizadas por Seção

const questoesData = {
    secoes: [
        {
            id: 'secao1',
            titulo: 'Seção 1: Autopercepção e Autoestima',
            questoes: [
                {
                    id: 'q1',
                    numero: 1,
                    texto: 'Como você se sente em relação à sua imagem corporal?',
                    opcoes: [
                        { valor: 'a', texto: 'Muito confortável e confiante' },
                        { valor: 'b', texto: 'Geralmente confortável, com algumas inseguranças' },
                        { valor: 'c', texto: 'Insegura em várias situações' },
                        { valor: 'd', texto: 'Muito desconfortável' }
                    ]
                },
                {
                    id: 'q2',
                    numero: 2,
                    texto: 'Em situações íntimas, você prefere:',
                    opcoes: [
                        { valor: 'a', texto: 'Tomar a iniciativa e conduzir' },
                        { valor: 'b', texto: 'Dividir o controle igualmente' },
                        { valor: 'c', texto: 'Deixar a outra pessoa liderar' },
                        { valor: 'd', texto: 'Depende do momento e da conexão' }
                    ]
                },
                {
                    id: 'q3',
                    numero: 3,
                    texto: 'Quando olha no espelho, você:',
                    opcoes: [
                        { valor: 'a', texto: 'Sente orgulho e aprecia seu corpo' },
                        { valor: 'b', texto: 'Foca nas partes que considera bonitas' },
                        { valor: 'c', texto: 'Tende a criticar mais do que elogiar' },
                        { valor: 'd', texto: 'Evita se olhar com atenção' }
                    ]
                }
            ]
        },
        {
            id: 'secao2',
            titulo: 'Seção 2: Comunicação e Expressão',
            questoes: [
                {
                    id: 'q4',
                    numero: 4,
                    texto: 'Quando se trata de expressar seus desejos sexuais:',
                    opcoes: [
                        { valor: 'a', texto: 'Comunico abertamente e sem dificuldades' },
                        { valor: 'b', texto: 'Consigo expressar, mas com algum constrangimento' },
                        { valor: 'c', texto: 'Tenho muita dificuldade em verbalizar' },
                        { valor: 'd', texto: 'Prefiro demonstrar através de ações' }
                    ]
                },
                {
                    id: 'q5',
                    numero: 5,
                    texto: 'Se pudesse escolher, você preferiria:',
                    opcoes: [
                        { valor: 'a', texto: 'Planejar encontros íntimos com antecedência' },
                        { valor: 'b', texto: 'Deixar acontecer espontaneamente' },
                        { valor: 'c', texto: 'Seguir rituais ou cenários específicos' },
                        { valor: 'd', texto: 'Explorar o inesperado' }
                    ]
                },
                {
                    id: 'q6',
                    numero: 6,
                    validador: true,
                    texto: '(VALIDADOR) Como você reage quando alguém expressa desejo por você de forma direta?',
                    opcoes: [
                        { valor: 'a', texto: 'Fico excitada e receptiva' },
                        { valor: 'b', texto: 'Fico lisonjeada mas tímida' },
                        { valor: 'c', texto: 'Sinto-me desconfortável' },
                        { valor: 'd', texto: 'Prefiro abordagens mais sutis' }
                    ]
                },
                {
                    id: 'q7',
                    numero: 7,
                    texto: 'Você já fingiu prazer ou satisfação para:',
                    opcoes: [
                        { valor: 'a', texto: 'Nunca fingi, sou sempre honesta' },
                        { valor: 'b', texto: 'Sim, para não magoar o parceiro' },
                        { valor: 'c', texto: 'Sim, para terminar o ato mais rapidamente' },
                        { valor: 'd', texto: 'Sim, porque não sabia como comunicar o que queria' }
                    ]
                }
            ]
        },
        {
            id: 'secao3',
            titulo: 'Seção 3: Dinâmicas de Poder e Controle',
            questoes: [
                {
                    id: 'q8',
                    numero: 8,
                    texto: 'Em um jogo de interpretação de papéis, você se veria mais como:',
                    opcoes: [
                        { valor: 'a', texto: 'Uma líder/comandante' },
                        { valor: 'b', texto: 'Uma igual/parceira' },
                        { valor: 'c', texto: 'Alguém sendo guiada/protegida' },
                        { valor: 'd', texto: 'Não me interessa esse tipo de jogo' }
                    ]
                },
                {
                    id: 'q9',
                    numero: 9,
                    texto: 'A ideia de estar em uma situação de vulnerabilidade consensual (física ou emocional) te causa:',
                    opcoes: [
                        { valor: 'a', texto: 'Excitação e curiosidade' },
                        { valor: 'b', texto: 'Interesse moderado' },
                        { valor: 'c', texto: 'Ansiedade ou desconforto' },
                        { valor: 'd', texto: 'Completa rejeição' }
                    ]
                },
                {
                    id: 'q10',
                    numero: 10,
                    validador: true,
                    texto: '(VALIDADOR) Você já fantasiou com cenários onde:',
                    opcoes: [
                        { valor: 'a', texto: 'Você tinha controle total sobre o parceiro' },
                        { valor: 'b', texto: 'Vocês tinham controle mútuo e equilibrado' },
                        { valor: 'c', texto: 'O parceiro tinha controle sobre você' },
                        { valor: 'd', texto: 'Nunca fantasiei com dinâmicas de controle' }
                    ]
                },
                {
                    id: 'q11',
                    numero: 11,
                    texto: 'O que mais te atrai em uma experiência íntima intensa?',
                    opcoes: [
                        { valor: 'a', texto: 'Estabelecer dominância e ver reações' },
                        { valor: 'b', texto: 'A conexão emocional profunda' },
                        { valor: 'c', texto: 'Entregar-se completamente' },
                        { valor: 'd', texto: 'A experimentação física' }
                    ]
                },
                {
                    id: 'q12',
                    numero: 12,
                    texto: 'Em conflitos do dia a dia (não sexuais), você geralmente:',
                    opcoes: [
                        { valor: 'a', texto: 'Toma a frente e resolve assertivamente' },
                        { valor: 'b', texto: 'Busca consenso e diálogo' },
                        { valor: 'c', texto: 'Tende a ceder para evitar confronto' },
                        { valor: 'd', texto: 'Depende muito da situação' }
                    ]
                },
                {
                    id: 'q13',
                    numero: 13,
                    texto: 'A ideia de dar ou receber ordens no contexto íntimo:',
                    opcoes: [
                        { valor: 'a', texto: 'Me excita dar ordens' },
                        { valor: 'b', texto: 'Me excita receber ordens' },
                        { valor: 'c', texto: 'Ambos me excitam igualmente' },
                        { valor: 'd', texto: 'Não me interessa' }
                    ]
                }
            ]
        },
        {
            id: 'secao4',
            titulo: 'Seção 4: Sensações e Estímulos',
            questoes: [
                {
                    id: 'q14',
                    numero: 14,
                    texto: 'Qual destas sensações você acha mais estimulante:',
                    opcoes: [
                        { valor: 'a', texto: 'Pressão, aperto ou contenção' },
                        { valor: 'b', texto: 'Toques suaves e prolongados' },
                        { valor: 'c', texto: 'Alternância entre intensidades' },
                        { valor: 'd', texto: 'Estímulos inesperados' }
                    ]
                },
                {
                    id: 'q15',
                    numero: 15,
                    validador: true,
                    texto: '(VALIDADOR) Se você pudesse adicionar um elemento a um encontro íntimo:',
                    opcoes: [
                        { valor: 'a', texto: 'Acessórios ou objetos específicos' },
                        { valor: 'b', texto: 'Mudança de ambiente' },
                        { valor: 'c', texto: 'Elementos de surpresa ou imprevisibilidade' },
                        { valor: 'd', texto: 'Nada, prefiro simplicidade' }
                    ]
                },
                {
                    id: 'q16',
                    numero: 16,
                    texto: 'A ideia de experimentar sensações mais intensas (dentro de limites seguros) te:',
                    opcoes: [
                        { valor: 'a', texto: 'Interessa muito, quero explorar' },
                        { valor: 'b', texto: 'Interessa com a pessoa certa' },
                        { valor: 'c', texto: 'Deixa curiosa mas hesitante' },
                        { valor: 'd', texto: 'Não me atrai' }
                    ]
                },
                {
                    id: 'q17',
                    numero: 17,
                    texto: 'Você já sentiu prazer em experiências que envolveram leve desconforto físico?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, e foi surpreendentemente excitante' },
                        { valor: 'b', texto: 'Talvez, mas não tenho certeza' },
                        { valor: 'c', texto: 'Não, isso me desagrada' },
                        { valor: 'd', texto: 'Nunca experimentei' }
                    ]
                },
                {
                    id: 'q18',
                    numero: 18,
                    validador: true,
                    texto: '(VALIDADOR - Dissonância) Como você reagiria se um parceiro sugerisse incorporar elementos de leve dor consensual?',
                    opcoes: [
                        { valor: 'a', texto: 'Estaria disposta a experimentar' },
                        { valor: 'b', texto: 'Precisaria de muita conversa antes' },
                        { valor: 'c', texto: 'Provavelmente recusaria' },
                        { valor: 'd', texto: 'Recusaria completamente' }
                    ]
                }
            ]
        },
        {
            id: 'secao5',
            titulo: 'Seção 5: Fantasias e Imaginação',
            questoes: [
                {
                    id: 'q19',
                    numero: 19,
                    texto: 'Com que frequência você fantasia sobre experiências sexuais?',
                    opcoes: [
                        { valor: 'a', texto: 'Diariamente ou várias vezes por semana' },
                        { valor: 'b', texto: 'Algumas vezes por semana' },
                        { valor: 'c', texto: 'Ocasionalmente' },
                        { valor: 'd', texto: 'Raramente ou nunca' }
                    ]
                },
                {
                    id: 'q20',
                    numero: 20,
                    texto: 'Suas fantasias geralmente envolvem:',
                    opcoes: [
                        { valor: 'a', texto: 'Cenários específicos e detalhados' },
                        { valor: 'b', texto: 'Pessoas conhecidas em situações diferentes' },
                        { valor: 'c', texto: 'Situações abstratas ou emoções' },
                        { valor: 'd', texto: 'Prefiro não fantasiar' }
                    ]
                },
                {
                    id: 'q21',
                    numero: 21,
                    validador: true,
                    texto: '(VALIDADOR) Quando você fantasia, você geralmente:',
                    opcoes: [
                        { valor: 'a', texto: 'É a protagonista ativa das ações' },
                        { valor: 'b', texto: 'Observa ou é o foco da atenção' },
                        { valor: 'c', texto: 'Alterna entre papéis diferentes' },
                        { valor: 'd', texto: 'Não tenho fantasias definidas' }
                    ]
                },
                {
                    id: 'q22',
                    numero: 22,
                    texto: 'Alguma das suas fantasias envolve elementos que você considera "não convencionais"?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, e me sinto confortável com isso' },
                        { valor: 'b', texto: 'Sim, mas sinto algum conflito interno' },
                        { valor: 'c', texto: 'Não, minhas fantasias são convencionais' },
                        { valor: 'd', texto: 'Prefiro não responder' }
                    ]
                },
                {
                    id: 'q23',
                    numero: 23,
                    texto: 'Suas fantasias mais recorrentes incluem:',
                    opcoes: [
                        { valor: 'a', texto: 'Múltiplas pessoas ou observadores' },
                        { valor: 'b', texto: 'Locais públicos ou semi-públicos' },
                        { valor: 'c', texto: 'Dinâmicas de poder explícitas' },
                        { valor: 'd', texto: 'Cenários românticos tradicionais' },
                        { valor: 'e', texto: 'Elementos de transgressão ou "proibido"' }
                    ]
                },
                {
                    id: 'q24',
                    numero: 24,
                    validador: true,
                    texto: '(VALIDADOR - Dissonância) Você compartilharia suas fantasias mais íntimas com um parceiro?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, sem problemas' },
                        { valor: 'b', texto: 'Apenas as mais "aceitáveis"' },
                        { valor: 'c', texto: 'Provavelmente não' },
                        { valor: 'd', texto: 'Definitivamente não' }
                    ]
                },
                {
                    id: 'q25',
                    numero: 25,
                    texto: 'Quando fantasia, você costuma sentir:',
                    opcoes: [
                        { valor: 'a', texto: 'Empoderamento e liberdade' },
                        { valor: 'b', texto: 'Culpa ou vergonha depois' },
                        { valor: 'c', texto: 'Ambos, dependendo da fantasia' },
                        { valor: 'd', texto: 'Neutro, é apenas imaginação' }
                    ]
                }
            ]
        },
        {
            id: 'secao6',
            titulo: 'Seção 6: Exploração e Abertura',
            questoes: [
                {
                    id: 'q26',
                    numero: 26,
                    texto: 'Como você se sente sobre experimentar coisas novas na intimidade?',
                    opcoes: [
                        { valor: 'a', texto: 'Muito aberta, adoro explorar' },
                        { valor: 'b', texto: 'Aberta com a pessoa certa' },
                        { valor: 'c', texto: 'Cautelosa, preciso de muita confiança' },
                        { valor: 'd', texto: 'Prefiro manter na zona de conforto' }
                    ]
                },
                {
                    id: 'q27',
                    numero: 27,
                    validador: true,
                    texto: '(VALIDADOR) Se um parceiro sugerisse experimentar algo novo, sua primeira reação seria:',
                    opcoes: [
                        { valor: 'a', texto: 'Empolgação e curiosidade' },
                        { valor: 'b', texto: 'Interesse em saber mais detalhes' },
                        { valor: 'c', texto: 'Hesitação e necessidade de pensar' },
                        { valor: 'd', texto: 'Provável recusa' }
                    ]
                },
                {
                    id: 'q28',
                    numero: 28,
                    texto: 'Você já pesquisou ou leu sobre práticas sexuais alternativas?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, frequentemente e com interesse' },
                        { valor: 'b', texto: 'Ocasionalmente, por curiosidade' },
                        { valor: 'c', texto: 'Raramente, apenas por acaso' },
                        { valor: 'd', texto: 'Nunca' }
                    ]
                },
                {
                    id: 'q29',
                    numero: 29,
                    texto: 'Qual destas afirmações melhor te descreve:',
                    opcoes: [
                        { valor: 'a', texto: 'Busco ativamente novas experiências' },
                        { valor: 'b', texto: 'Estou aberta mas não procuro ativamente' },
                        { valor: 'c', texto: 'Prefiro o familiar e confortável' },
                        { valor: 'd', texto: 'Evito mudanças nessa área' }
                    ]
                },
                {
                    id: 'q30',
                    numero: 30,
                    texto: 'Você já visitou ou teria curiosidade de visitar lojas especializadas em produtos eróticos?',
                    opcoes: [
                        { valor: 'a', texto: 'Já visitei e me senti confortável' },
                        { valor: 'b', texto: 'Não visitei, mas tenho curiosidade' },
                        { valor: 'c', texto: 'Talvez online, mas não presencialmente' },
                        { valor: 'd', texto: 'Não me interessa' }
                    ]
                }
            ]
        },
        {
            id: 'secao7',
            titulo: 'Seção 7: Aspectos Emocionais',
            questoes: [
                {
                    id: 'q31',
                    numero: 31,
                    texto: 'Para você, o sexo ideal envolve:',
                    opcoes: [
                        { valor: 'a', texto: 'Intensidade física e adrenalina' },
                        { valor: 'b', texto: 'Conexão emocional profunda' },
                        { valor: 'c', texto: 'Ambos em equilíbrio' },
                        { valor: 'd', texto: 'Varia conforme meu estado emocional' }
                    ]
                },
                {
                    id: 'q32',
                    numero: 32,
                    texto: 'Você já sentiu excitação em situações de:',
                    opcoes: [
                        { valor: 'a', texto: 'Leve tensão ou "perigo" controlado' },
                        { valor: 'b', texto: 'Romantismo e ternura extrema' },
                        { valor: 'c', texto: 'Ambas, dependendo do contexto' },
                        { valor: 'd', texto: 'Nenhuma das opções' }
                    ]
                },
                {
                    id: 'q33',
                    numero: 33,
                    validador: true,
                    texto: '(VALIDADOR) Após uma experiência íntima intensa, você geralmente sente:',
                    opcoes: [
                        { valor: 'a', texto: 'Energizada e satisfeita' },
                        { valor: 'b', texto: 'Conectada emocionalmente' },
                        { valor: 'c', texto: 'Necessidade de cuidado e acolhimento' },
                        { valor: 'd', texto: 'Varia muito' }
                    ]
                },
                {
                    id: 'q34',
                    numero: 34,
                    texto: 'O que você valoriza mais depois do sexo:',
                    opcoes: [
                        { valor: 'a', texto: 'Conversa e conexão emocional' },
                        { valor: 'b', texto: 'Carinho físico silencioso' },
                        { valor: 'c', texto: 'Espaço pessoal para processar' },
                        { valor: 'd', texto: 'Não tenho preferência específica' }
                    ]
                },
                {
                    id: 'q35',
                    numero: 35,
                    texto: 'Você associa prazer sexual com:',
                    opcoes: [
                        { valor: 'a', texto: 'Liberdade e expressão' },
                        { valor: 'b', texto: 'Intimidade e amor' },
                        { valor: 'c', texto: 'Poder e controle' },
                        { valor: 'd', texto: 'Escapismo ou relaxamento' }
                    ]
                }
            ]
        },
        {
            id: 'secao8',
            titulo: 'Seção 8: Limites e Conforto',
            questoes: [
                {
                    id: 'q36',
                    numero: 36,
                    texto: 'Como você definiria seus limites sexuais?',
                    opcoes: [
                        { valor: 'a', texto: 'Bem definidos mas flexíveis' },
                        { valor: 'b', texto: 'Ainda estou descobrindo' },
                        { valor: 'c', texto: 'Conservadores e firmes' },
                        { valor: 'd', texto: 'Amplos e experimentais' }
                    ]
                },
                {
                    id: 'q37',
                    numero: 37,
                    validador: true,
                    texto: '(VALIDADOR) Você já ultrapassou voluntariamente uma zona de conforto na intimidade?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, várias vezes e foi positivo' },
                        { valor: 'b', texto: 'Sim, algumas vezes com resultados mistos' },
                        { valor: 'c', texto: 'Raramente, prefiro segurança' },
                        { valor: 'd', texto: 'Nunca' }
                    ]
                },
                {
                    id: 'q38',
                    numero: 38,
                    texto: 'A ideia de estabelecer "regras" ou "acordos" para encontros íntimos te parece:',
                    opcoes: [
                        { valor: 'a', texto: 'Excitante e estruturante' },
                        { valor: 'b', texto: 'Interessante para explorar certos aspectos' },
                        { valor: 'c', texto: 'Desnecessário e artificial' },
                        { valor: 'd', texto: 'Desconfortável' }
                    ]
                },
                {
                    id: 'q39',
                    numero: 39,
                    texto: 'Se você pudesse usar uma "palavra de segurança" (safe word) em qualquer situação:',
                    opcoes: [
                        { valor: 'a', texto: 'Acharia útil e tranquilizador' },
                        { valor: 'b', texto: 'Entendo o conceito mas não sinto necessidade' },
                        { valor: 'c', texto: 'Me parece exagerado' },
                        { valor: 'd', texto: 'Não sei o que é isso' }
                    ]
                },
                {
                    id: 'q40',
                    numero: 40,
                    texto: 'Você já se sentiu pressionada a fazer algo íntimo que não queria?',
                    opcoes: [
                        { valor: 'a', texto: 'Não, sempre respeitaram meus limites' },
                        { valor: 'b', texto: 'Sim, mas cedi por insegurança própria' },
                        { valor: 'c', texto: 'Sim, por pressão externa' },
                        { valor: 'd', texto: 'Prefiro não responder' }
                    ]
                }
            ]
        },
        {
            id: 'secao9',
            titulo: 'Seção 9: Estímulos Específicos',
            questoes: [
                {
                    id: 'q41',
                    numero: 41,
                    texto: 'Qual destes elementos você encontra mais atraente (pode não ter experimentado):',
                    opcoes: [
                        { valor: 'a', texto: 'Restrições físicas consensuais' },
                        { valor: 'b', texto: 'Jogos de poder verbal' },
                        { valor: 'c', texto: 'Estímulos sensoriais variados (texturas, temperaturas)' },
                        { valor: 'd', texto: 'Nenhum me atrai' }
                    ]
                },
                {
                    id: 'q42',
                    numero: 42,
                    texto: 'Você sente atração por:',
                    opcoes: [
                        { valor: 'a', texto: 'Contraste de sensações (prazer/desconforto leve)' },
                        { valor: 'b', texto: 'Uniformidade e previsibilidade' },
                        { valor: 'c', texto: 'Surpresas e o inesperado' },
                        { valor: 'd', texto: 'Depende muito do contexto' }
                    ]
                },
                {
                    id: 'q43',
                    numero: 43,
                    validador: true,
                    texto: '(VALIDADOR) Se pudesse escolher um cenário ideal:',
                    opcoes: [
                        { valor: 'a', texto: 'Você no controle total da situação' },
                        { valor: 'b', texto: 'Reciprocidade completa' },
                        { valor: 'c', texto: 'Ser o foco da atenção do parceiro' },
                        { valor: 'd', texto: 'Algo completamente espontâneo' }
                    ]
                },
                {
                    id: 'q44',
                    numero: 44,
                    texto: 'O uso de acessórios (vendas, algemas, etc.) te parece:',
                    opcoes: [
                        { valor: 'a', texto: 'Excitante e atraente' },
                        { valor: 'b', texto: 'Interessante para experimentar' },
                        { valor: 'c', texto: 'Indiferente' },
                        { valor: 'd', texto: 'Desconfortável ou ameaçador' }
                    ]
                },
                {
                    id: 'q45',
                    numero: 45,
                    texto: 'Linguagem explícita durante o ato:',
                    opcoes: [
                        { valor: 'a', texto: 'Me excita muito' },
                        { valor: 'b', texto: 'Depende do que é dito' },
                        { valor: 'c', texto: 'Me deixa desconfortável' },
                        { valor: 'd', texto: 'Nunca experimentei' }
                    ]
                },
                {
                    id: 'q46',
                    numero: 46,
                    validador: true,
                    texto: '(VALIDADOR - Dissonância) Você já imaginou cenários envolvendo os elementos que marcou como atraentes nas questões anteriores?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, frequentemente' },
                        { valor: 'b', texto: 'Ocasionalmente' },
                        { valor: 'c', texto: 'Raramente' },
                        { valor: 'd', texto: 'Nunca fantasiei com isso' }
                    ]
                }
            ]
        },
        {
            id: 'secao10',
            titulo: 'Seção 10: Contexto Social e Influências',
            questoes: [
                {
                    id: 'q47',
                    numero: 47,
                    texto: 'Como você descreveria o ambiente sexual/cultural da sua comunidade?',
                    opcoes: [
                        { valor: 'a', texto: 'Liberal e aberto' },
                        { valor: 'b', texto: 'Moderado' },
                        { valor: 'c', texto: 'Conservador' },
                        { valor: 'd', texto: 'Muito conservador/religioso' }
                    ]
                },
                {
                    id: 'q48',
                    numero: 48,
                    texto: 'Suas crenças religiosas ou valores familiares influenciam sua vida sexual?',
                    opcoes: [
                        { valor: 'a', texto: 'Não, sou completamente independente' },
                        { valor: 'b', texto: 'Um pouco, mas não decisivamente' },
                        { valor: 'c', texto: 'Sim, de forma significativa' },
                        { valor: 'd', texto: 'Totalmente, guiam minhas escolhas' }
                    ]
                },
                {
                    id: 'q49',
                    numero: 49,
                    validador: true,
                    texto: '(VALIDADOR - Dissonância) Existe diferença entre o que você deseja e o que você se permite fazer?',
                    opcoes: [
                        { valor: 'a', texto: 'Não, faço o que desejo' },
                        { valor: 'b', texto: 'Sim, por medo de julgamento' },
                        { valor: 'c', texto: 'Sim, por valores pessoais' },
                        { valor: 'd', texto: 'Sim, por falta de oportunidade/parceiro adequado' }
                    ]
                },
                {
                    id: 'q50',
                    numero: 50,
                    texto: 'Se você pudesse ser completamente anônima, suas escolhas sexuais seriam:',
                    opcoes: [
                        { valor: 'a', texto: 'Exatamente as mesmas' },
                        { valor: 'b', texto: 'Um pouco mais ousadas' },
                        { valor: 'c', texto: 'Muito mais ousadas' },
                        { valor: 'd', texto: 'Completamente diferentes' }
                    ]
                },
                {
                    id: 'q51',
                    numero: 51,
                    texto: 'Como você acha que seus amigos descreveriam sua personalidade sexual?',
                    opcoes: [
                        { valor: 'a', texto: 'Desinibida e exploradora' },
                        { valor: 'b', texto: 'Equilibrada e saudável' },
                        { valor: 'c', texto: 'Discreta e reservada' },
                        { valor: 'd', texto: 'Eles não sabem nada sobre isso' }
                    ]
                }
            ]
        },
        {
            id: 'secao11',
            titulo: 'Seção 11: Experiências Passadas',
            questoes: [
                {
                    id: 'q52',
                    numero: 52,
                    texto: 'Em relacionamentos anteriores, você sentiu:',
                    opcoes: [
                        { valor: 'a', texto: 'Total liberdade para se expressar' },
                        { valor: 'b', texto: 'Liberdade moderada, com algumas restrições' },
                        { valor: 'c', texto: 'Bastante reprimida' },
                        { valor: 'd', texto: 'Completamente reprimida ou sem experiências' }
                    ]
                },
                {
                    id: 'q53',
                    numero: 53,
                    texto: 'Você já experimentou algo sexualmente que:',
                    opcoes: [
                        { valor: 'a', texto: 'Superou suas expectativas positivamente' },
                        { valor: 'b', texto: 'Confirmou suas expectativas' },
                        { valor: 'c', texto: 'Decepcionou suas expectativas' },
                        { valor: 'd', texto: 'Te fez questionar suas preferências' }
                    ]
                },
                {
                    id: 'q54',
                    numero: 54,
                    validador: true,
                    texto: '(VALIDADOR) A melhor experiência sexual da sua vida envolveu:',
                    opcoes: [
                        { valor: 'a', texto: 'Experimentação e novidade' },
                        { valor: 'b', texto: 'Conexão emocional profunda' },
                        { valor: 'c', texto: 'Intensidade física' },
                        { valor: 'd', texto: 'Espontaneidade perfeita' },
                        { valor: 'e', texto: 'Ainda não tive uma experiência memorável' }
                    ]
                },
                {
                    id: 'q55',
                    numero: 55,
                    texto: 'Você já teve uma experiência que considerou "transgressora" ou "fora do comum"?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, e quero repetir' },
                        { valor: 'b', texto: 'Sim, mas foi suficiente' },
                        { valor: 'c', texto: 'Não, mas tenho curiosidade' },
                        { valor: 'd', texto: 'Não, e não me interessa' }
                    ]
                }
            ]
        },
        {
            id: 'secao12',
            titulo: 'Seção 12: Autoconhecimento e Autoerotismo',
            questoes: [
                {
                    id: 'q56',
                    numero: 56,
                    texto: 'Você pratica autoerotismo (masturbação)?',
                    opcoes: [
                        { valor: 'a', texto: 'Regularmente, é parte saudável da minha sexualidade' },
                        { valor: 'b', texto: 'Ocasionalmente' },
                        { valor: 'c', texto: 'Raramente' },
                        { valor: 'd', texto: 'Nunca ou quase nunca' }
                    ]
                },
                {
                    id: 'q57',
                    numero: 57,
                    validador: true,
                    texto: '(VALIDADOR) Quando pratica autoerotismo, você:',
                    opcoes: [
                        { valor: 'a', texto: 'Usa fantasias elaboradas' },
                        { valor: 'b', texto: 'Foca em sensações físicas' },
                        { valor: 'c', texto: 'Usa recursos visuais/áudios' },
                        { valor: 'd', texto: 'Não se aplica (não pratico)' }
                    ]
                },
                {
                    id: 'q58',
                    numero: 58,
                    texto: 'Você conhece bem seu próprio corpo e o que te proporciona prazer?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, muito bem' },
                        { valor: 'b', texto: 'Razoavelmente' },
                        { valor: 'c', texto: 'Estou descobrindo' },
                        { valor: 'd', texto: 'Não muito' }
                    ]
                },
                {
                    id: 'q59',
                    numero: 59,
                    texto: 'Você já utilizou brinquedos eróticos sozinha?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, regularmente' },
                        { valor: 'b', texto: 'Sim, ocasionalmente' },
                        { valor: 'c', texto: 'Tentei mas não gostei' },
                        { valor: 'd', texto: 'Nunca utilizei' }
                    ]
                }
            ]
        },
        {
            id: 'secao13',
            titulo: 'Seção 13: Relacionamento e Dinâmicas Atuais',
            questoes: [
                {
                    id: 'q60',
                    numero: 60,
                    texto: 'Se você está em um relacionamento, você diria que sua vida sexual é:',
                    opcoes: [
                        { valor: 'a', texto: 'Muito satisfatória' },
                        { valor: 'b', texto: 'Satisfatória' },
                        { valor: 'c', texto: 'Necessita melhorias' },
                        { valor: 'd', texto: 'Insatisfatória' },
                        { valor: 'e', texto: 'Não estou em relacionamento' }
                    ]
                },
                {
                    id: 'q61',
                    numero: 61,
                    validador: true,
                    texto: '(VALIDADOR - Dissonância) Existe algo que você gostaria de experimentar mas não falou com seu parceiro?',
                    opcoes: [
                        { valor: 'a', texto: 'Não, comunico tudo' },
                        { valor: 'b', texto: 'Sim, mas pretendo conversar' },
                        { valor: 'c', texto: 'Sim, mas tenho medo da reação' },
                        { valor: 'd', texto: 'Sim, e não pretendo falar' },
                        { valor: 'e', texto: 'Não se aplica' }
                    ]
                },
                {
                    id: 'q62',
                    numero: 62,
                    texto: 'Se solteira, o que te impede de explorar mais sua sexualidade?',
                    opcoes: [
                        { valor: 'a', texto: 'Nada, exploro livremente' },
                        { valor: 'b', texto: 'Falta de parceiros adequados' },
                        { valor: 'c', texto: 'Medo de julgamento' },
                        { valor: 'd', texto: 'Valores pessoais' },
                        { valor: 'e', texto: 'Não se aplica (estou em relacionamento)' }
                    ]
                }
            ]
        },
        {
            id: 'secao14',
            titulo: 'Seção 14: Projeção Futura',
            questoes: [
                {
                    id: 'q63',
                    numero: 63,
                    texto: 'Daqui a 5 anos, você se vê:',
                    opcoes: [
                        { valor: 'a', texto: 'Explorando ainda mais sua sexualidade' },
                        { valor: 'b', texto: 'Estabelecida em uma dinâmica confortável' },
                        { valor: 'c', texto: 'Mais conservadora do que hoje' },
                        { valor: 'd', texto: 'Não penso nisso' }
                    ]
                },
                {
                    id: 'q64',
                    numero: 64,
                    texto: 'Você diria que conhece bem seus próprios desejos e limites?',
                    opcoes: [
                        { valor: 'a', texto: 'Sim, muito bem' },
                        { valor: 'b', texto: 'Razoavelmente bem' },
                        { valor: 'c', texto: 'Ainda estou descobrindo' },
                        { valor: 'd', texto: 'Não muito' }
                    ]
                },
                {
                    id: 'q65',
                    numero: 65,
                    validador: true,
                    texto: '(VALIDADOR FINAL) O que te motivou a responder este questionário com honestidade?',
                    opcoes: [
                        { valor: 'a', texto: 'Autoconhecimento e crescimento pessoal' },
                        { valor: 'b', texto: 'Curiosidade sobre os resultados' },
                        { valor: 'c', texto: 'Necessidade de validação externa' },
                        { valor: 'd', texto: 'Obrigação ou solicitação de terceiros' }
                    ]
                },
                {
                    id: 'q66',
                    numero: 66,
                    texto: 'Após responder este questionário, você:',
                    opcoes: [
                        { valor: 'a', texto: 'Se sente mais consciente de seus desejos' },
                        { valor: 'b', texto: 'Descobriu aspectos que não tinha percebido' },
                        { valor: 'c', texto: 'Confirmou o que já sabia' },
                        { valor: 'd', texto: 'Sentiu desconforto com algumas questões' }
                    ]
                }
            ]
        }
    ]
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questoesData;
}
