# 🔧 Configurar Supabase - 5 Minutos

## 📚 Navegação da Documentação

- **[⚡ QUICK-START.md](QUICK-START.md)** ← Voltar para início rápido
- **[📖 README.md](README.md)** - Visão geral do sistema
- **[📘 GUIA-COMPLETO-FINAL.md](GUIA-COMPLETO-FINAL.md)** - Guia completo
- **[🚀 DEPLOY.md](DEPLOY.md)** - Próximo passo: Deploy
- **[🎨 SHOWCASE-VISUAL.md](SHOWCASE-VISUAL.md)** - Elementos visuais

---

## Passo 1: Criar Conta (2 minutos)

1. **Acesse:** https://supabase.com/
2. **Clique em:** "Start your project" 
3. **Login com GitHub** (ou email)
4. É **100% grátis** - não pede cartão de crédito

## Passo 2: Criar Projeto (2 minutos)

1. **Clique:** "New Project"
2. **Nome:** `newdri-clinic`
3. **Database Password:** Crie uma senha forte (anote!)
4. **Region:** São Paulo (South America - São Paulo)
5. **Clique:** "Create new project"
6. **Aguarde:** ~2 minutos (preparando banco de dados)

## Passo 3: Copiar Credenciais (1 minuto)

No menu esquerdo, clique em **Settings** (⚙️) → **API**

Você verá:

```
Project URL: https://xxxxx.supabase.co
anon public: eyJhbGc...xxxxx
service_role: eyJhbGc...xxxxx (SECRET!)
```

**IMPORTANTE:** Anote esses 3 valores! Vamos usar no próximo passo.

## Passo 4: Criar Tabelas (1 minuto)

No menu esquerdo, clique em **SQL Editor**

Clique em **+ New query**

**Cole este SQL e clique em RUN:**

```sql
-- Tabela de códigos de acesso
CREATE TABLE codigos_acesso (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo VARCHAR(8) UNIQUE NOT NULL,
  nome_paciente VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT NOW(),
  usado_em TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days')
);

-- Tabela de respostas
CREATE TABLE respostas_questionario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo_id UUID REFERENCES codigos_acesso(id),
  codigo VARCHAR(8) NOT NULL,
  dados_demograficos JSONB NOT NULL,
  respostas JSONB NOT NULL,
  respondido_em TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_codigo ON codigos_acesso(codigo);
CREATE INDEX idx_status ON codigos_acesso(status);
CREATE INDEX idx_codigo_respostas ON respostas_questionario(codigo);

-- Habilitar Row Level Security (Segurança)
ALTER TABLE codigos_acesso ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas_questionario ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer um pode ler códigos válidos
CREATE POLICY "Permitir leitura de códigos válidos"
  ON codigos_acesso FOR SELECT
  USING (expires_at > NOW());

-- Política: Qualquer um pode inserir respostas com código válido
CREATE POLICY "Permitir inserir respostas"
  ON respostas_questionario FOR INSERT
  WITH CHECK (true);

-- Política: Service role pode fazer tudo
CREATE POLICY "Service role full access codigos"
  ON codigos_acesso FOR ALL
  USING (true);

CREATE POLICY "Service role full access respostas"
  ON respostas_questionario FOR ALL
  USING (true);
```

✅ Se aparecer "Success" está pronto!

## Passo 5: Configurar no Sistema

Agora, volte para mim e me passe essas 3 informações:

1. **Project URL:** https://xxxxx.supabase.co
2. **anon public key:** eyJhbGc...xxxxx
3. **service_role key:** eyJhbGc...xxxxx (mantenha secreto!)

Vou criar um arquivo de configuração para você.

---

## 📱 Resultado Final:

Depois de configurado, você terá:

✅ **Dashboard Dr. Newton:**
- Login simples (senha do sistema)
- Botão "Gerar Novo Código"
- Lista de todos os códigos gerados
- Status: Pendente / Respondido
- Visualizar resultados

✅ **Acesso Paciente:**
- Página simples: "Digite seu código"
- Valida o código
- Libera questionário
- Salva automaticamente no banco

✅ **Segurança:**
- Códigos expiram em 30 dias
- Cada código usado uma vez
- Dados criptografados
- LGPD compliant

---

## ⏱️ Tempo Total: 5 minutos

**Alguma dúvida?** Todo o processo é visual e simples!

Quando terminar, me avise e eu configuro o sistema! 🚀
