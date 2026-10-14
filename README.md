<a id="topo"></a>
<a id="sobre-o-projeto"></a>

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="docs/assets/readme/hero-still.svg" />
    <img src="docs/assets/readme/hero.svg" alt="Vibe Coding Toolkit — da ideia ao primeiro commit. Abertura cinematográfica em carvão e âmbar." width="1600" />
  </picture>
</p>

# Vibe Coding Toolkit

**Sua próxima ideia começa com uma base bem preparada.**

Descreva o produto. Prepare o projeto. Comece a construir. O toolkit reúne o bootstrap Next.js, as skills e os acordos de desenvolvimento com IA — com caminhos para usar tudo ou adotar uma peça por vez.

<p align="center">
  <a href="#comece-por-aqui"><strong>INICIAR UM PROJETO →</strong></a>
  &nbsp; · &nbsp;
  <a href="docs/03-environment-setup.md">PREPARAR A MÁQUINA</a>
  &nbsp; · &nbsp;
  <a href="#documentacao-completa">EXPLORAR O TOOLKIT</a>
</p>

<p align="center">
  <strong>Next.js</strong> / TypeScript / Tailwind / ESLint
  <br />
  <strong>Claude Code + Codex</strong> / instruções portáveis / skills locais
</p>

O toolkit funciona com agentes que tenham acesso a arquivos e terminal. Os guias cobrem **Claude Code e Codex** separadamente; instruções compartilhadas também orientam outras LLMs e clientes compatíveis.

---

<a id="como-usar-este-repositorio"></a>

<a id="como-usar-este-repositório"></a>
<a id="setup-completo-com-o-projeto-aberto-no-agente"></a>

## Escolha seu ponto de entrada

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>01 / Um projeto novo</h3>
      <p>Da descrição do produto à base Next.js configurada, com skills locais e checks reais.</p>
      <p><a href="docs/04-project-bootstrap.md"><strong>Abrir o bootstrap →</strong></a> · <a href="docs/prompts/11-next-project-bootstrap.md">Prompt curto</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>02 / Sua máquina pronta</h3>
      <p>Prepare o ambiente global e reutilize ferramentas entre projetos, com o escopo de cada cliente.</p>
      <p><a href="docs/03-environment-setup.md"><strong>Configurar o ambiente →</strong></a> · <a href="docs/prompts/10-development-environment-setup.md">Prompt 10</a></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>03 / Uma peça de cada vez</h3>
      <p>Escolha lint, skills, contexto ou outra ferramenta para uma necessidade concreta.</p>
      <p><a href="docs/01-installation.md"><strong>Ver a instalação →</strong></a> · <a href="docs/tools/">Ferramentas</a> · <a href="docs/prompts/">Prompts</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>04 / Um projeto existente</h3>
      <p>Incorpore o fluxo e as instruções compartilhadas à base que você já tem.</p>
      <p><a href="docs/02-playbook-onboarding.md"><strong>Playbook Claude →</strong></a> · <a href="docs/tools/15-codex-workflow.md">Guia Codex</a> · <a href="templates/AGENTS.md.template">AGENTS</a></p>
    </td>
  </tr>
</table>

<a id="comece-por-aqui"></a>

## Comece um projeto com duas linhas

Abra o agente no diretório de destino e cole. Troque a segunda linha pelo seu projeto:

```text
Leia https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/main/docs/prompts/11-next-project-bootstrap.md e execute o setup neste diretório.
Projeto: [nome, problema, público, fluxos principais e restrições].
```

Exemplo: “CRM para pequenas imobiliárias, com contatos, negócios, tarefas e funil por equipe. Interface em português; primeira versão focada em cadastro e acompanhamento de oportunidades.”

O setup entrega:

- `product.md` com MVP, restrições, hipóteses e critérios de aceitação.
- Base oficial Next.js: App Router, TypeScript, Tailwind, ESLint, `src/` e alias `@/*`.
- Skills Vercel locais, catalogadas [uma por uma](docs/tools/16-vercel-skills.md), e `skills-lock.json`.
- `AGENTS.md` compartilhado, ponte `CLAUDE.md` quando necessária e configurações próprias de cada cliente.
- Ponytail, Caveman, Superpowers, RTK, Context7 e Graphify, reutilizando o que já está global.
- Lint, tipos, self-check das regras, build e `docs/setup.md` com evidências e pendências.

> **Ideia → produto → base → skills → checks → MVP.**
>
> O toolkit é uma receita com templates. `create-next-app` fornece a base estável na execução. Banco, autenticação e integrações são escolhidos pelo produto; o bootstrap prepara a base antes de implementar o MVP.

Não instala travas de push em `main`, não exige branch e não adiciona hooks de commit/push. Instalar skills de deploy não publica a aplicação. Veja [o fluxo completo](docs/04-project-bootstrap.md) para escopos e validação.

**Base verificada em macOS, Linux e Windows.** Lint, tipos, regras, build e HTTP fazem parte da [validação reproduzível](docs/05-toolkit-validation.md); o relatório também registra limites e riscos conhecidos.

---

## Global e local

| Máquina e cliente | Projeto |
|---|---|
| Runtime, Git e gerenciador | Next, React, TypeScript, Tailwind e ESLint |
| Agente, autenticação e plugins | Produto, comandos e instruções compartilhadas |
| RTK e integração funcional | Skills Vercel, `find-skills` e lockfile |
| Ponytail, Caveman e Superpowers | Regras de lint e exclusões Graphify |
| Graphify e conexão Context7 existente | Configuração MCP local, se faltar conexão |

Cada cliente tem formatos e descoberta próprios. Não copie configurações Claude para Codex. O [setup da máquina](docs/03-environment-setup.md) cuida da instalação global; o [bootstrap](docs/04-project-bootstrap.md) evita refazê-la por projeto.

<a id="ou-só-o-eslint-numa-linha"></a>

## Adote uma peça por vez

Para instalar somente o teto de 350 linhas e os quality gates:

```text
Leia https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/main/docs/prompts/08-eslint-quality-gates-install.md e execute o prompt neste projeto. Use MAX_LINES=350.
```

Depois da medição, use [o prompt 09](docs/prompts/09-file-size-refactor.md) para refatorar arquivos grandes. Para instalar apenas skills Vercel, use [o catálogo](docs/tools/16-vercel-skills.md). Esses caminhos não exigem todo o bootstrap.

<a id="o-fluxo-completo"></a>

## Fluxo

```mermaid
flowchart LR
    Ideia[Descrição do projeto] --> Produto[product.md]
    Produto --> Base[create-next-app e templates]
    Base --> Local[Skills e configuração local]
    Local --> Checks[Lint, tipos, regras e build]
    Checks --> MVP[Próxima tarefa do MVP]
    Global[Ferramentas globais existentes] --> Local
    Docs[Context7 e fontes oficiais] --> Base
```

<a id="superpowers-primeiro"></a>

Superpowers orienta o processo. Ponytail limita escopo e código desnecessário. Caveman mantém conversa concisa. RTK reduz saídas suportadas. Context7 consulta APIs atuais; Graphify ajuda a navegar a estrutura. Skills Vercel orientam React/Next, componentes, UI, escrita e operações específicas.

Delegue quando houver benefício e suporte, com tarefas independentes e responsabilidade por arquivo. Mudanças pequenas podem seguir no agente principal. Preserve cliente, modelo e autenticação da sessão; ferramentas não autorizam troca de provedor ou billing de API silencioso.

<a id="documentacao-completa"></a>

<a id="documentação-completa"></a>
<a id="índice"></a>

## Referências

O mapa completo para entrar em qualquer parte do toolkit. Cada guia e prompt funciona como uma porta de entrada independente.

<a id="fundamentos"></a>

### Guias

| Documento | Uso |
|---|---|
| [Visão geral](docs/00-overview.md) | Princípios |
| [Instalação](docs/01-installation.md) | Comandos e escopos |
| [Playbook Claude](docs/02-playbook-onboarding.md) | Projeto existente |
| [Ambiente global](docs/03-environment-setup.md) | Preparação e reprodução da máquina |
| [Bootstrap Next](docs/04-project-bootstrap.md) | Produto até base configurada |
| [Validação do toolkit](docs/05-toolkit-validation.md) | Checks de manutenção e evidências do scaffold real |

### Ferramentas

| Documento | Uso |
|---|---|
| [01 — Superpowers](docs/tools/01-superpowers.md) | Design, plano, execução e revisão |
| [02 — Subagentes](docs/tools/02-subagent-orchestration.md) | Delegação e ondas independentes |
| [03 — RTK](docs/tools/03-rtk-token-proxy.md) | Comandos com saída enxuta |
| [04 — Ponytail](docs/tools/04-ponytail.md) | Menor solução completa |
| [05 — Caveman](docs/tools/05-caveman.md) | Comunicação concisa |
| [06 — ESLint/Biome](docs/tools/06-eslint-biome-quality-gates.md) | Lint e evolução de regras |
| [07 — Graphify](docs/tools/07-graphify.md) | Grafo do projeto |
| [08 — Obsidian](docs/tools/08-obsidian-memory.md) | Memória externa opcional |
| [09 — Memória Claude](docs/tools/09-claude-memory-system.md) | Contexto persistente |
| [10 — Hooks](docs/tools/10-hooks-best-practices.md) | Referência opcional para o cliente |
| [11 — agent-browser](docs/tools/11-agent-browser.md) | Automação de navegador |
| [12 — Context7](docs/tools/12-context7.md) | Documentação atual |
| [13 — Anthropic Skills](docs/tools/13-anthropics-skills.md) | Artefatos e criação de skills |
| [14 — Chrome DevTools MCP](docs/tools/14-chrome-devtools-mcp.md) | Console, rede e desempenho |
| [15 — Codex](docs/tools/15-codex-workflow.md) | Instruções, plugins, MCPs e descoberta |
| [16 — Skills Vercel](docs/tools/16-vercel-skills.md) | Catálogo, instalação local e fluxo |

<a id="prompts-prontos"></a>

### Prompts

| Prompt | Uso |
|---|---|
| [01 — Sanitização](docs/prompts/01-project-sanitation.md) | Medir e organizar código |
| [02 — Warnings](docs/prompts/02-eslint-warning-burndown.md) | Reduzir avisos |
| [03 — Code review](docs/prompts/03-multi-agent-code-review.md) | Revisão por especialistas |
| [04 — Brainstorm até plano](docs/prompts/04-brainstorm-to-plan.md) | Refinar um pedido |
| [05 — Ondas](docs/prompts/05-parallel-wave-dispatch.md) | Tarefas paralelas |
| [06 — Memória](docs/prompts/06-memory-bootstrap.md) | Contexto persistente |
| [07 — ESLint completo](docs/prompts/07-eslint-complete-setup.md) | Configuração avançada |
| [08 — Quality gates](docs/prompts/08-eslint-quality-gates-install.md) | Copiar regras e medir |
| [09 — Arquivos grandes](docs/prompts/09-file-size-refactor.md) | Refatorar por responsabilidade |
| [10 — Máquina](docs/prompts/10-development-environment-setup.md) | Ambiente global |
| [11 — Projeto Next](docs/prompts/11-next-project-bootstrap.md) | Produto e base configurada |

### Templates

- [Produto](templates/product.md.template), [AGENTS](templates/AGENTS.md.template) e [ponte Claude](templates/CLAUDE.md.template).
- [ESLint Next](templates/eslint/next.config.mjs.example), [avançado](templates/eslint/eslint.config.mjs.example), [com tipos](templates/eslint/eslint.typed.config.mjs.example) e [self-check](templates/eslint/verify.mjs).
- [Context7 Codex](templates/project/codex.config.toml.example), [Context7 Claude](templates/project/mcp.json.example) e [exclusões Graphify](templates/project/.graphifyignore.example).
- [Manifesto global](templates/environment-manifest.json.example), [hooks ilustrativos](templates/settings.json.example) e [regra de ondas](templates/rules/parallel-subagent-driven-development.md).

Templates são pontos de partida. Incorpore configurações, preencha campos e valide os clientes usados; exemplos não são instalados automaticamente.

<a id="creditos"></a>
<a id="licenca"></a>
<a id="vamos-juntos"></a>

<a id="créditos"></a>
<a id="licença"></a>

## Créditos e licença

Fontes: [Superpowers](https://github.com/obra/superpowers), [RTK](https://github.com/rtk-ai/rtk), [Ponytail](https://github.com/DietrichGebert/ponytail), [Caveman](https://github.com/JuliusBrussee/caveman), [Graphify](https://github.com/Graphify-Labs/graphify), [Context7](https://github.com/upstash/context7), [agent-browser](https://github.com/vercel-labs/agent-browser), [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) e [Skills CLI](https://github.com/vercel-labs/skills). Cada ferramenta mantém sua licença e distribuição.

Toolkit sob [MIT](LICENSE). Por [Matheus Gomes](https://instagram.com/matheusgomes). [Issues e PRs](https://github.com/soumatheusgomes/vibe-coding-toolkit).

<p align="center">
  <strong>BUILD WITH INTENT. SHIP WITH FLOW.</strong>
  <br />
  <a href="#topo">Voltar ao topo ↑</a>
</p>
