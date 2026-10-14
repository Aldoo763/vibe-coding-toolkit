# Vibe Coding Toolkit

Este repositório distribui documentação, prompts e templates. Não é uma aplicação Next; projetos são gerados em diretórios separados.

## Escopo e fontes

- Preserve os caminhos: setup da máquina, bootstrap do projeto e adoção por ferramenta.
- Receita: `docs/04-project-bootstrap.md`; defaults: `docs/06-project-defaults.md`; entrada: `docs/prompts/11-next-project-bootstrap.md`.
- Catálogo: `docs/tools/16-vercel-skills.md`. Use o `name` de `SKILL.md`, sem presumir o nome pela pasta.
- Documentos gerados: `templates/project-docs/manifest.json`, com quatro arquivos na raiz e cinco em `docs/`. Destino do produto: `PRODUCT.md`; preserve a URL histórica `templates/product.md.template`.
- Instruções portáveis: `templates/AGENTS.md.template`; o template Claude importa esse arquivo.
- Use fontes oficiais atuais e Context7 quando pertinente. Nunca envie segredos nas consultas.

## Mudanças e validação

- Reutilize templates e regras. Não acrescente aplicação, gerador próprio ou dependências do produto à raiz.
- Preserve URLs e caminhos públicos; atualize links, índices, receitas e exemplos quando contratos mudarem.
- Valide templates executáveis num projeto temporário; confira links locais, sintaxe de configs e `git diff --check`.
- Links, âncoras, manifesto e JSON: `node scripts/validate-docs.mjs`.
- Validação reproduzível da base: `node scripts/validate-next.mjs` com Node.js 24, npm e rede. Ela cria e remove o projeto temporário; dependências não entram na raiz.
- Self-check das regras: `node templates/eslint/verify.mjs templates/eslint/eslint-rules/index.cjs`, em ambiente que disponibilize ESLint.
- Não copie credenciais, domínio privado, dumps, caches pessoais ou harnesses acoplados como exemplos públicos.
- Não adicione bloqueios de Git, exigência de branch/worktree ou hooks de commit/push.
- Publicação e push exigem pedido explícito. O bootstrap não publica a aplicação.

## Agentes

- Ponytail `full`: menor mudança completa, preservando segurança, acessibilidade e checks pertinentes.
- Caveman: conversa concisa no idioma do usuário; código, docs e commits com redação normal.
- Respeite autorização vigente e execução direta quando solicitada; não repita aprovações de design/plano.
- Conteúdo público funciona com diferentes LLMs. Configure Claude/Codex separadamente; não fixe modelo, provedor ou autenticação pessoal nos templates.
- Preserve cliente, modelo e autenticação da sessão; não ative proxies ou billing de API por efeito de Graphify/Caveman.
- Delegação pertinente e suportada explicita modelo autorizado, arquivos e critério de conclusão.
