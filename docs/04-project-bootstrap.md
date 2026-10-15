# Iniciar um projeto Next.js

Transforme uma descrição de produto numa base configurada. Para usar só uma peça, consulte [ferramentas](tools/README.md), [prompts](prompts/README.md) ou [templates](../templates/README.md). Este toolkit distribui a receita; a aplicação fica em outro diretório.

Se a aplicação já existe, use o [prompt 12 — configurar ou atualizar projeto existente](prompts/12-existing-project-setup.md), que preserva sua stack e concilia o toolkit com a base atual.

Funciona com um agente capaz de ler arquivos, editar e executar comandos. Claude Code e Codex usam os mesmos acordos em formatos próprios; outras LLMs seguem os requisitos com capacidades equivalentes. Um chat sem acesso ao ambiente não comprova execução.

## Prompt curto

Abra o agente no diretório de destino e cole:

```text
Leia https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/main/docs/prompts/11-next-project-bootstrap.md e execute o setup neste diretório.
Projeto: [nome, problema, público, fluxos principais e restrições].
```

Troque só a descrição. Exemplo: “CRM para pequenas imobiliárias; corretores registram contatos, negócios e tarefas, gestores acompanham o funil. Interface em português, acesso por equipe; MVP focado no cadastro e no funil.”

O setup gera `PRODUCT.md`, documentos úteis e o núcleo técnico. As funcionalidades seguem como próximas tarefas do MVP. O bootstrap não publica, contrata serviços nem implementa todo o produto.

## Resultado esperado

```text
meu-projeto/
├── README.md, PRODUCT.md         # entrada e escopo
├── AGENTS.md, CLAUDE.md          # acordos e ponte de uma linha
├── docs/
│   ├── architecture.md          # estrutura e decisões efetivas
│   ├── design.md                # direção visual e acessibilidade
│   ├── onboarding.md            # preparação local
│   ├── quality.md               # checks e limites
│   └── setup.md                 # fontes, versões e evidências
├── src/
│   ├── app/                     # App Router
│   ├── db/                      # conexão, schema e testes de ciclo de vida
│   └── lib/                     # ambiente, logger, cn e testes de fronteiras
├── drizzle/                     # SQL versionado quando houver schema
├── drizzle.config.ts
├── vitest.config.mts
├── eslint.config.mjs
├── eslint-rules/                # regras e baseline compartilhada
├── scripts/verify-quality-rules.mjs
├── .env.example                 # nomes, sem credenciais reais
├── .agents/skills/              # fontes oficiais locais
├── skills-lock.json
├── .claude/skills/              # links relativos/cópias, se esse cliente for usado
├── .graphifyignore
├── package.json
└── [lockfile do gerenciador]
```

Configurações MCP/cliente só entram quando necessárias. Não crie camadas, pastas opcionais ou arquivos vazios. Preserve e concilie instruções geradas pelo Next. Nunca copie o toolkit inteiro para a aplicação.

## Global e local

| Componente | Escopo e ação |
|---|---|
| Runtime, gerenciador, Git e agente | Máquina: conferir compatibilidade e reutilizar autenticação |
| RTK | Reutilizar binário/hook funcional; sem hook, usar comandos suportados explicitamente |
| Ponytail `full`, Caveman e Superpowers | Plugin/skill do cliente: conferir descoberta e guardar acordos no projeto |
| Context7 | Reutilizar conexão; configurar MCP local só se faltar integração ativa |
| Graphify | Reutilizar CLI/skill; exclusões e grafo determinístico pertencem ao projeto |
| Skills oficiais Vercel e `find-skills` | Projeto: fontes, links relativos/cópias e lockfile versionados |
| Next e núcleo servidor/testes | Projeto: dependências compatíveis, scripts e um lockfile |
| Produto, instruções e documentação | Projeto: conteúdo específico e atualizado junto do código |

O [setup da máquina](03-environment-setup.md) é separado. Não atualize todas as ferramentas globais nem altere permissões por efeito do bootstrap. Uma preferência escrita não instala plugin nem comprova descoberta. Registre ausências e continue etapas independentes.

## Sequência de execução

### 1. Inspecionar e definir o produto

Identifique diretório, instruções, cliente, runtime, gerenciador, arquivos e alterações locais. Obtenha uma revisão única do toolkit e use todos os arquivos dessa revisão. Se o destino for o toolkit, crie uma pasta irmã para o produto.

Leia os [padrões](06-project-defaults.md). Gere `PRODUCT.md` pelo [template histórico](../templates/product.md.template): problema, público, objetivo, fluxos, MVP, requisitos, restrições e aceite. Hipóteses reversíveis ficam explícitas; informação externa indispensável fica pendente, sem inventar resultado. Preserve/consolide documentos existentes, inclusive `product.md`, conforme a regra de nomes dos padrões.

### 2. Gerar a base oficial e conferir compatibilidade

Consulte Context7 para APIs/setup e fontes oficiais quando necessário. Confira `create-next-app --help`, versões estáveis, runtime e peer dependencies. Uma página oficial pode exemplificar `@rc`: o canal estável do registry e os checks decidem o conjunto utilizado. Registre adaptações, fontes e data.

Padrão: App Router, TypeScript strict, Tailwind, ESLint, `src/` e alias `@/*`. Preserve o gerenciador existente; prefira pnpm em projeto novo quando disponível. Registre runtime e `packageManager`.

Exemplo para pasta nova:

```bash
npx --yes create-next-app@latest meu-projeto --typescript --tailwind --eslint --app --src-dir --import-alias '@/*' --use-pnpm --disable-git --no-react-compiler --no-cache-components --no-agent-feedback --yes
```

As flags negativas evitam preferências salvas. Confira suporte atual; React Compiler/cache entram conforme requisitos e documentação, sem exigir canary. Se houver arquivos no destino, gere em pasta temporária e incorpore sem sobrescrever. Não regenere uma aplicação existente. Inicialize Git se necessário, sem criar remoto ou publicar.

Fontes: [instalação Next](https://nextjs.org/docs/app/getting-started/installation), [CLI](https://nextjs.org/docs/app/api-reference/cli/create-next-app) e [ESLint](https://nextjs.org/docs/app/api-reference/config/eslint).

### 3. Instalar o núcleo do projeto

Drizzle + PostgreSQL é o default de persistência nova; os [padrões](06-project-defaults.md) explicam exceções e critérios de adaptação. Não migre a stack existente automaticamente.

Exemplo npm, após conferir canais e compatibilidade:

```bash
npm install drizzle-orm pg server-only zod pino clsx tailwind-merge
npm install -D drizzle-kit @types/pg @next/env vitest eslint-plugin-drizzle @types/node@24
```

Adapte ao gerenciador e runtime. `@types/node@24` corresponde à base Node 24 validada; selecione tipos compatíveis com o runtime real e os peers do Vitest. Não use `--force`/`--legacy-peer-deps` para ocultar conflitos. Alinhe `@next/env` à versão do Next.

Copie a árvore [templates/next/](../templates/next/) no app, removendo só o sufixo `.example`; **mantenha `.env.example`**. Incorpore arquivos existentes. `vitest.config.mts` usa ESM explicitamente, inclusive num package sem `type: module`. Os testes incluídos cobrem validação sem vazamento, redação de logs e ciclo de vida do pool; não dependem de credenciais.

O schema começa sem tabelas fictícias. Derive entidades do produto quando forem implementadas. `getDb()` valida a URL e cria um pool sob demanda: o build inicial não precisa de banco. Ajuste pooling ao host; o driver `pg` exige Node. Sem persistência, omita os módulos/dependências de banco e use o perfil leve de lint, documentando a razão.

Crie `.env.local` ignorado somente quando houver valores autorizados. Garanta que `.env.example` possa ser versionado (`!.env.example`), sem expor credenciais. Gere SQL sem conectar; revise e só aplique migrations no destino correto. Não migre no build, import ou request; não adicione `db:push` ao padrão.

### 4. Instalar e rotear as skills

Confira o [catálogo Vercel](tools/16-vercel-skills.md) e o upstream atual. Esta revisão verifica oito skills web e `find-skills`; incorpore mudanças oficiais pertinentes, sem congelar nomes/quantidade. Use o `name` do frontmatter e selecione clientes em uso, sem `--all` indiscriminado.

Versione `.agents/skills/`, links relativos de cliente e `skills-lock.json`. No Windows ou host sem links portáveis, use `--copy`. Confira sobreposição local/global sem remover preferências de outros projetos. Instalar skills de deploy não publica; React Native/Expo entra apenas para essa plataforma.

### 5. Documentar e integrar os clientes

Preencha os nove destinos do [manifesto](../templates/project-docs/manifest.json) com fatos do produto e do código. Quatro arquivos ficam na raiz; os cinco de apoio ficam em `docs/`. Remova campos sem utilidade e placeholders. `CLAUDE.md` importa `AGENTS.md`, sem repetir políticas; é uma ponte pequena já pronta para adoção Claude. Outros clientes usam seus formatos oficiais.

Reutilize Ponytail `full`, Caveman, Superpowers e RTK funcionais. Se faltar plugin e o host suportar escopo de projeto, prefira-o. No Claude, confira `claude plugin install --help`/`--scope project`; no Codex, confira suporte vigente em vez de inventar flags. Nunca copie caches para simular instalação. Veja [instalação](01-installation.md).

Para Context7 ausente, incorpore o [TOML Codex](../templates/project/codex.config.toml.example) ou [MCP Claude](../templates/project/mcp.json.example), sem transportar tokens. Respeite confiança/configuração do host. Copie [exclusões Graphify](../templates/project/.graphifyignore.example) e ignore grafo, `.vercel/`, configuração pessoal e credenciais; skills e lockfiles permanecem versionáveis.

Preserve cliente nativo, modelo e autenticação da sessão, inclusive em Graphify/Caveman e delegação suportada. Não ative backend de API, proxy ou billing externo. Não registre hooks Git, bloqueios de `main` ou exigências de branch/worktree. Hooks próprios do cliente seguem sua integração suportada.

### 6. Aplicar ESLint e comandos

Para o núcleo completo, use [next-app.config.mjs.example](../templates/eslint/next-app.config.mjs.example) como `eslint.config.mjs`. Copie **toda** a pasta `templates/eslint/eslint-rules/` para `eslint-rules/` (inclui a baseline Next compartilhada) e o [self-check](../templates/eslint/verify.mjs) para `scripts/verify-quality-rules.mjs`.

O perfil reúne presets oficiais Next/TypeScript, teto de 350 linhas, logger, fronteira de dados e guardas de `update/delete` Drizzle. O logger é exclusivo do servidor; remova logs de debug do cliente sem importar Pino em Client Components. Os métodos de escrita devem usar a variável `db`, como configurado pelo plugin; aliases, SQL cru e exceções exigem revisão. A guarda de imports também depende dos caminhos configurados: ajuste-os ao layout efetivo. Não substitui autorização ou validação.

Para adoção parcial ou produto sem banco, o [perfil leve](../templates/eslint/next.config.mjs.example) continua sem exigir dependências do ORM/logger. [Perfil avançado](../templates/eslint/eslint.config.mjs.example) e [lint com tipos](../templates/eslint/eslint.typed.config.mjs.example) são opções separadas.

Scripts de referência para npm:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "lint:rules": "node scripts/verify-quality-rules.mjs ./eslint-rules/index.cjs",
    "test": "vitest run",
    "test:watch": "vitest",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "check": "npm run lint && npm run typecheck && npm run lint:rules && npm test && npm run build"
  }
}
```

Adapte o comando composto ao gerenciador; omita scripts de banco quando não houver persistência. `check` não conecta nem aplica migrations. ESLint roda pela própria CLI; não use `next lint` nem suponha que o build executa lint. Testes DOM/E2E entram junto dos fluxos que precisem deles.

### 7. Verificar e entregar

Execute lint, tipos, self-check, testes e build sem credenciais reais. Rode `db:generate` com schema presente e confira SQL. Quando houver conexão autorizada, teste migrations e fluxo de dados no banco, distinguindo isso de mock ou engine embarcado. Audite produção e desenvolvimento separadamente; investigue advisories, sem forçar downgrade incompatível ou declarar segurança absoluta.

Inicie a aplicação numa porta livre, confirme HTTP/página e encerre apenas processos/recursos criados pelo setup. Confira descoberta de skills em sessão nova quando possível; presença em disco é uma evidência diferente. Valide consulta Context7 real. Para grafo inicial sem LLM externo:

```bash
GRAPHIFY_NO_AUTO_REFRESH=1 graphify extract . --code-only --no-cluster
```

PowerShell:

```powershell
$env:GRAPHIFY_NO_AUTO_REFRESH = '1'
graphify extract . --code-only --no-cluster
```

Confira arquivos esperados em `graphify-out/graph.json`; esse modo não cobre requisitos de `PRODUCT.md` nem semântica dos documentos. Registre limitações da CLI/host. Não instale automações de refresh ou envie o grafo a serviços.

Finalize `docs/setup.md` com revisão, fontes/data, versões, escopos, skills, comandos/resultados e diferenças dos defaults. Use **validado**, **configurado sem execução** ou **pendente**, sem credenciais, caminhos pessoais ou evidências inventadas. Atualize os outros documentos com o estado efetivo.

O bootstrap termina com a base rodando, checks aprovados, pendências explícitas, comando de desenvolvimento e próxima tarefa do MVP. Melhorias compatíveis e atuais fazem parte do setup; migrações amplas, serviços pagos e publicação dependem da autorização pertinente.
