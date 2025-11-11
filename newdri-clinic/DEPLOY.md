# 🚀 Guia de Deploy - Newdri Clinic

## 📚 Navegação da Documentação

- **[⚡ QUICK-START.md](QUICK-START.md)** ← Voltar para início rápido
- **[📖 README.md](README.md)** - Visão geral do sistema
- **[📘 GUIA-COMPLETO-FINAL.md](GUIA-COMPLETO-FINAL.md)** - Guia completo
- **[🔧 CONFIGURAR-SUPABASE.md](CONFIGURAR-SUPABASE.md)** - Passo anterior: Supabase
- **[🎨 SHOWCASE-VISUAL.md](SHOWCASE-VISUAL.md)** - Elementos visuais

---

## Opção 1: Cloudflare Pages (RECOMENDADO - Grátis)

### Passo a Passo:

1. **Acesse Cloudflare Pages:**
   - Vá para: https://pages.cloudflare.com/
   - Faça login ou crie conta (grátis)

2. **Criar Novo Projeto:**
   - Clique em "Create a project"
   - Selecione "Connect to Git"
   - Autorize acesso ao GitHub

3. **Selecionar Repositório:**
   - Escolha o repositório: `questionario67hy6`
   - Branch: `main`

4. **Configurar Build:**
   - **Build command:** (deixe vazio)
   - **Build output directory:** `/`
   - **Root directory:** `/`

5. **Deploy:**
   - Clique em "Save and Deploy"
   - Aguarde conclusão (~2 minutos)

6. **Acessar Site:**
   - Cloudflare fornecerá URL: `https://newdri-clinic.pages.dev`
   - Ou configure domínio customizado

### Vantagens:
✅ Totalmente grátis
✅ HTTPS automático
✅ Deploy automático a cada push no GitHub
✅ CDN global (rápido em qualquer lugar)
✅ 99.9% uptime

---

## Opção 2: Netlify (Alternativa Grátis)

### Passo a Passo:

1. **Acesse Netlify:**
   - Vá para: https://www.netlify.com/
   - Faça login ou crie conta

2. **Criar Site:**
   - Clique em "Add new site"
   - Escolha "Import from Git"
   - Autorize GitHub

3. **Configurar:**
   - Selecione repositório `questionario67hy6`
   - Build command: (vazio)
   - Publish directory: `/`

4. **Deploy:**
   - Clique em "Deploy site"
   - URL gerado: `https://newdri-clinic.netlify.app`

---

## Opção 3: Deploy Manual (Sem GitHub)

Se preferir hospedar em servidor próprio ou compartilhado:

### Passo 1: Comprimir arquivos
```bash
cd /home/user/webapp
zip -r newdri-clinic.zip newdri-clinic/
```

### Passo 2: Upload via FTP/cPanel
1. Acesse seu servidor web
2. Vá para pasta `public_html` (ou equivalente)
3. Faça upload dos arquivos
4. Extraia o ZIP

### Passo 3: Acessar
- Seu site estará em: `https://seudominio.com/newdri-clinic/`
- Ou configure para ser a raiz: `https://seudominio.com/`

---

## Opção 4: Uso Local (Sem Internet)

Para usar apenas no consultório, sem internet:

### Opção A: Abrir Arquivo Direto
1. Navegue até a pasta `newdri-clinic`
2. Clique duas vezes em `index.html`
3. Abre no navegador padrão

### Opção B: Servidor Local Simples
```bash
cd /home/user/webapp/newdri-clinic
python3 -m http.server 8000
```
- Acesse: `http://localhost:8000`

**OU** (se tiver Node.js):
```bash
npx http-server
```

---

## 🌐 URLs do Sistema

Após deploy, você terá:

- **Página Inicial:** `https://seu-site.com/`
- **Questionário:** `https://seu-site.com/questionario.html`
- **Painel Admin:** `https://seu-site.com/admin.html`
- **Relatório:** `https://seu-site.com/relatorio.html`

---

## 🔗 Link para Pacientes

### Compartilhar via:

**Email:**
```
Olá [Nome do Paciente],

Conforme conversamos, segue o link para o questionário de avaliação:

https://seu-site.com/questionario.html

O questionário leva aproximadamente 20-30 minutos.
Você pode salvar o progresso e continuar depois.
Todas as informações são confidenciais.

Após finalizar, discutiremos os resultados na próxima sessão.

Atenciosamente,
Dr. Newton Guimarães
Newdri Clinic
```

**WhatsApp/SMS:**
```
Olá! Segue o link do questionário que mencionei:
https://seu-site.com/questionario.html

Leva ~25min e você pode pausar se precisar.
Qualquer dúvida, estou à disposição.
```

**QR Code:**
- Gere um QR Code do link em: https://www.qr-code-generator.com/
- Imprima e deixe disponível no consultório

---

## ⚙️ Domínio Personalizado (Opcional)

Se quiser usar domínio próprio (ex: `questionario.newdriclinic.com.br`):

### No Cloudflare Pages:
1. Acesse projeto no Cloudflare Pages
2. Vá em "Custom domains"
3. Clique em "Set up a custom domain"
4. Adicione: `questionario.newdriclinic.com.br`
5. Siga instruções para configurar DNS

### Sugestões de Domínios:
- `avaliacao.newdriclinic.com.br`
- `questionario.newdriclinic.com.br`
- `intimidade.newdriclinic.com.br`

---

## 🔄 Atualizações Futuras

### Se hospedado no Cloudflare/Netlify (com GitHub):
1. Faça alterações nos arquivos locais
2. Commit e push para GitHub:
```bash
cd /home/user/webapp/newdri-clinic
git add .
git commit -m "Descrição da mudança"
git push origin main
```
3. Deploy automático acontece sozinho!

### Se hospedado manualmente:
1. Faça alterações nos arquivos
2. Re-upload via FTP/cPanel

---

## 📊 Estatísticas de Uso

### Cloudflare Analytics (grátis):
- Acesse dashboard do Cloudflare Pages
- Veja visitas, países, dispositivos
- Totalmente anônimo (sem identificar pacientes)

---

## 🔒 Segurança

### HTTPS Automático:
✅ Cloudflare e Netlify fornecem HTTPS grátis
✅ Certificado SSL automático
✅ Dados criptografados em trânsito

### Privacidade:
✅ Nenhum dado enviado para servidores
✅ Processamento 100% local (navegador do paciente)
✅ Você não tem acesso aos dados até o paciente mostrar o relatório

---

## 💰 Custos

### Cloudflare Pages:
- **Grátis:** Projetos ilimitados
- **Limite:** 500 builds/mês (muito mais que suficiente)
- **Bandwidth:** Ilimitado

### Netlify:
- **Grátis:** 100GB bandwidth/mês
- **Limite:** 300 minutos build/mês

### Resumo:
🎉 **CUSTO TOTAL: R$ 0,00**

---

## 📞 Suporte Técnico

Se tiver dificuldades no deploy:

1. **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
2. **Netlify Docs:** https://docs.netlify.com/
3. **Vídeos YouTube:** Busque "como hospedar site cloudflare pages"

---

## ✅ Checklist de Deploy

- [ ] Conta criada (Cloudflare ou Netlify)
- [ ] Repositório conectado ao GitHub
- [ ] Build configurado corretamente
- [ ] Deploy realizado com sucesso
- [ ] Site acessível via URL fornecida
- [ ] Teste: Preencher questionário completo
- [ ] Teste: Gerar relatório
- [ ] Teste: Imprimir relatório
- [ ] (Opcional) Domínio customizado configurado
- [ ] Link compartilhado com primeiro paciente

---

## 🎯 Recomendação Final

**Use Cloudflare Pages:**
- Mais fácil
- Mais rápido
- Melhor infraestrutura
- Deploy automático
- Analytics grátis

**Tempo total de setup:** 10-15 minutos

---

Bom deploy! 🚀
