# Iniciar um projeto Next.js

Este é o caminho para transformar uma descrição de produto em um projeto inicial configurado. O toolkit também continua disponível por partes: [instalação](01-installation.md), [ferramentas](tools/) e [prompts](prompts/).

O fluxo funciona com qualquer agente que consiga ler arquivos, executar comandos e editar o projeto. Claude Code e Codex têm instruções específicas abaixo; outros clientes usam os mesmos requisitos, com seus formatos oficiais. Um chat sem acesso ao ambiente pode orientar, mas não comprovar a execução.

## Prompt curto

Abra o agente no diretório de destino e cole:

```text
Leia https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/main/docs/prompts/11-next-project-bootstrap.md e execute o setup neste diretório.
Projeto: [nome, problema, público, fluxos principais e restrições].
```

Troque apenas a descrição. Exemplo:

```text
Projeto: CRM para pequenas imobiliárias. Corretores registram contatos, negócios e tarefas; gestores acompanham o funil. Interface em português, acesso por equipe e versão inicial focada no cadastro e no funil.
```

O setup gera `product.md` e a base técnica. As funcionalidades do CRM seguem o escopo registrado nesse documento; a descrição não autoriza publicar, contratar serviços ou montar todo o produto durante o bootstrap.

Se o toolkit ainda não estiver publicado, use o arquivo local [prompt 11](prompts/11-next-project-bootstrap.md). Se executar com o toolkit aberto, crie o projeto em um diretório separado.

## Resultado esperado

```text
meu-projeto/
├── product.md
├── AGENTS.md
├── CLAUDE.md                    # ponte para AGENTS.md, se usar Claude
├── README.md                    # comandos e decisões reais do projeto
├── package.json
├── pnpm-lock.yaml               # ou o lockfile do gerenciador escolhido
├── eslint.config.mjs
├── eslint-rules/                # regras existentes deste toolkit
├── scripts/verify-quality-rules.mjs
├── .agents/skills/              # skills Vercel e find-skills locais
├── skills-lock.json
├── .claude/skills/              # links locais, se esse cliente for selecionado
├── .graphifyignore
├── .codex/config.toml           # apenas quando houver configuração local necessária
├── .mcp.json                    # apenas quando Claude precisar de MCP local
├── docs/setup.md                # inventário, validações e pendências
└── src/app/                     # App Router
```

Não crie arquivos opcionais vazios. Preserve instruções geradas pelo Next e integre os acordos do toolkit, sem sobrescrevê-las. Não copie o toolkit inteiro para dentro da aplicação.

## Global e local

| Componente | Escopo | Ação no bootstrap |
|---|---|---|
| Node.js, gerenciador de pacotes e Git | Máquina | Conferir compatibilidade e reutilizar |
| Codex, Claude Code ou outro agente | Máquina/cliente | Usar o cliente atual e sua autenticação |
| RTK | Binário e integração do cliente | Reutilizar hook funcional; sem hook, usar comandos suportados explicitamente |
| Ponytail `full`, Caveman e Superpowers | Plugin/skill do cliente | Conferir descoberta; persistir preferências em `AGENTS.md` |
| Context7 | MCP/plugin do cliente | Reutilizar conexão; configurar localmente somente se necessário |
| Graphify | CLI e skill do cliente | Reutilizar; criar exclusões e grafo inicial determinístico no projeto |
| Skills oficiais Vercel e `find-skills` | Projeto | Instalar localmente e versionar fontes/lockfile |
| Next, React, TypeScript, Tailwind e ESLint | Projeto | Instalar versões estáveis compatíveis e manter um lockfile |
| Instruções, produto e relatório | Projeto | Gerar conteúdo específico e conciso |

O [setup da máquina](03-environment-setup.md) é um fluxo separado. O bootstrap não atualiza todas as ferramentas globais nem altera permissões do computador. Se faltar uma ferramenta necessária, registre a pendência e continue o trabalho independente. Uma instrução em `AGENTS.md` não substitui instalação de plugin, descoberta de skill ou conexão MCP.

## Sequência de execução

### 1. Inspecionar e registrar o produto

Identifique diretório, agente, comandos disponíveis, Node.js, gerenciador de pacotes, arquivos existentes e instruções carregadas. Preserve alterações locais. Registre a revisão do toolkit utilizada.

Gere `product.md` com o [template](../templates/product.md.template): problema, público, objetivo, fluxos, MVP, fora de escopo, requisitos, restrições, hipóteses e critérios de aceitação. Descreva o que a versão inicial precisa fazer; não invente requisitos a partir do gênero do app.

Informações ausentes viram hipóteses explícitas quando reversíveis. Uma decisão indispensável, como qual sistema existente integrar, fica pendente até existir informação suficiente. Não transforme essa lacuna em um serviço simulado apresentado como concluído.

### 2. Gerar a base oficial

Consulte Next pelo Context7 e confira `create-next-app --help` da versão estável em uso. Referências: [instalação oficial](https://nextjs.org/docs/app/getting-started/installation) e [CLI](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Padrão: App Router, TypeScript, Tailwind CSS, ESLint, `src/` e alias `@/*`. Prefira pnpm em projeto novo quando disponível; preserve o gerenciador de um projeto existente. Registre versão do runtime e do gerenciador, inclusive `packageManager` no `package.json`.

Exemplo para uma pasta nova:

```bash
npx --yes create-next-app@latest meu-projeto --typescript --tailwind --eslint --app --src-dir --import-alias '@/*' --use-pnpm --disable-git --no-react-compiler --no-cache-components --no-agent-feedback --yes
```

As opções negativas evitam ativar recursos por preferências salvas. Confira suporte na CLI instalada; não instale uma versão canary para conseguir uma flag. React Compiler e Cache Components entram quando o produto justificar e a documentação da versão confirmar a adoção.

Se `product.md` ou outros arquivos já ocuparem o destino, gere a base em uma pasta temporária e incorpore arquivo por arquivo. Não apague o diretório para satisfazer o scaffolder. Não substitua aplicação existente, configurações ou lockfile por outro scaffold. Inicialize Git se o novo projeto ainda não tiver repositório; não crie remoto nem publique.

### 3. Instalar e rotear as skills

Siga o [catálogo Vercel](tools/16-vercel-skills.md). Instale as oito skills web e `find-skills` no projeto. Os comandos desse catálogo usam os nomes reais de `SKILL.md` e selecionam Claude/Codex explicitamente; adapte a lista de agentes aos clientes em uso, sem instalar para todos indiscriminadamente.

Guarde `.agents/skills/`, os links relativos necessários ao cliente e `skills-lock.json` no controle de versão. Não copie skills de um cache pessoal nem duplique plugins globais como skills locais com o mesmo nome. Registre sobreposição preexistente e sua resolução sem remover instalações de outros projetos.

### 4. Configurar instruções e integrações

- Preencha [AGENTS.md](../templates/AGENTS.md.template) com stack, comandos, `product.md` e convenções reais. Preserve instruções específicas do Next.
- Se usar Claude Code, crie a [ponte CLAUDE.md](../templates/CLAUDE.md.template). Preferências compartilhadas ficam em um único lugar.
- Reutilize Ponytail `full`, Caveman e Superpowers instalados. O fluxo deve ser proporcional ao pedido e respeitar execução já autorizada. Se faltar um plugin e o cliente oferecer escopo de projeto, prefira esse escopo suportado. No Claude, confira `claude plugin install --help` e use `--scope project`; nomes e marketplaces vêm do [guia de instalação](01-installation.md). No Codex, não invente um `--scope` equivalente: confira suporte vigente e reutilize plugins do cliente. Não copie caches para simular instalação local. Fonte: [plugins Claude](https://code.claude.com/docs/en/plugins-reference).
- Reutilize RTK; não adicione um segundo hook ou proxy. A integração global funcional não precisa de uma cópia no projeto.
- Para Context7, primeiro procure plugin/MCP ativo. Se faltar conexão, use [TOML do Codex](../templates/project/codex.config.toml.example) ou [MCP do Claude](../templates/project/mcp.json.example), conforme o cliente. Incorpore ao arquivo existente; nunca transporte tokens para templates. Configuração local do Codex depende de confiança no projeto, conforme a [documentação oficial](https://learn.chatgpt.com/docs/config-file/config-advanced).
- Copie [as exclusões Graphify](../templates/project/.graphifyignore.example), conciliando regras existentes. Inclua no `.gitignore` saídas geradas, `.vercel/`, configurações pessoais e credenciais; skills locais e lockfiles permanecem versionáveis.

Não registre hooks Git, bloqueios de push em `main`, exigência de branch, worktree ou validação automática no commit. Os plugins podem ter hooks próprios do cliente: reutilize somente os suportados e já autorizados, sem copiar o harness de outro projeto.

LLMs e autenticação continuam os da sessão. No Codex, preserve o login ChatGPT quando utilizado; no Claude, preserve sua modalidade vigente. Para Graphify e Caveman, não ative backend de API, proxy ou troca de modelo por efeito colateral do setup. Outros agentes usam integração nativa suportada; se ela não existir, registre a limitação, sem inventar compatibilidade.

### 5. Aplicar ESLint e comandos

Use [o preset Next](../templates/eslint/next.config.mjs.example), incorporando-o à configuração gerada. Ele combina presets oficiais Next/TypeScript com `quality/max-lines=350` em arquivos de código, inclusive projetos sem `src/`. Preserve exclusões reais e adapte caminhos sem reorganizar a aplicação existente. Copie `templates/eslint/eslint-rules/` para `eslint-rules/` e `templates/eslint/verify.mjs` para `scripts/verify-quality-rules.mjs`.

Não crie um logger ou uma camada de banco só para habilitar regras. `no-direct-console` e `no-direct-data-access` ficam disponíveis para adoção quando essas decisões existirem. O [preset avançado](../templates/eslint/eslint.config.mjs.example) e o [lint com tipos](../templates/eslint/eslint.typed.config.mjs.example) continuam disponíveis separadamente.

Comandos canônicos mínimos:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "lint:rules": "node scripts/verify-quality-rules.mjs ./eslint-rules/index.cjs",
    "check": "pnpm lint && pnpm typecheck && pnpm lint:rules && pnpm build"
  }
}
```

Adapte `check` ao gerenciador efetivo. Não use `next lint`: nas versões atuais, ESLint roda pela própria CLI e `next build` não executa lint automaticamente. Fonte: [Next ESLint](https://nextjs.org/docs/app/api-reference/config/eslint).

Teste comportamento novo quando existir lógica relevante. Não adicione framework de testes ou um teste tautológico à página vazia. Banco, autenticação, UI kits e integrações entram por requisitos de `product.md`, com validação de suas fronteiras.

### 6. Verificar e entregar

Execute instalação, lint, tipos, self-check das regras e build. Inicie a aplicação, confirme resposta HTTP e a página renderizada; use uma porta livre e encerre apenas o processo criado. Confira descoberta das skills em nova sessão quando o host permitir; presença no disco é uma verificação diferente.

Valide uma consulta real de Context7 quando disponível. Gere o grafo inicial sem LLM externo:

```bash
GRAPHIFY_NO_AUTO_REFRESH=1 graphify extract . --code-only --no-cluster
```

Confira que `graphify-out/graph.json` contém os arquivos esperados. Se a CLI instalada não oferecer esse modo, registre a limitação. Extração semântica posterior usa o agente nativo autorizado; o grafo de código não cobre automaticamente `product.md`. Não instale hooks de atualização ou envie o grafo a um serviço.

Grave `docs/setup.md` com revisão do toolkit, versões, componentes reutilizados/instalados, escopos, nomes das skills, comandos e resultados. Diferencie **validado**, **configurado sem teste de execução** e **pendente**, com motivo e próximo passo. Não inclua credenciais, caminhos pessoais globais ou métricas inventadas.

O bootstrap está pronto quando a base roda, os checks passam e pendências externas ficam explícitas. Finalize indicando o comando de desenvolvimento e a primeira tarefa do MVP. Publicação é uma solicitação separada.
