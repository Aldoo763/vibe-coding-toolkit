# Instalação

Referência rápida para instalar os agentes e as peças do toolkit. Para **preparar ou atualizar o computador inteiro**, use o [guia de setup](03-environment-setup.md) e o [prompt 10](prompts/10-development-environment-setup.md): ele inclui a base de sistema, Node.js, Docker, todas as integrações obrigatórias, backups e validação.

Para **configurar ou atualizar um projeto existente**, use o [prompt 12](prompts/12-existing-project-setup.md): diagnóstico, brainstorming, harness e integração de todo o toolkit aplicável, preservando a stack e as personalizações.

Comandos conferidos em **14 de outubro de 2026**. Confirme a documentação da versão e do sistema usados. Escolha um método por ferramenta e preserve instalações existentes quando suportadas.

## 1. Codex e Claude Code

Os dois agentes oferecem instaladores nativos que não exigem Node.js previamente. Em macOS, Linux ou WSL, escolha o comando do agente que deseja instalar:

```bash
# Codex
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# Claude Code
curl -fsSL https://claude.ai/install.sh | bash
```

No Windows nativo, use as instruções de PowerShell das páginas oficiais. Para Homebrew ou uma instalação npm já existente, confira os métodos suportados antes de migrar. Fontes: [Codex CLI](https://learn.chatgpt.com/docs/codex/cli) e [Claude Code](https://code.claude.com/docs/en/setup).

Depois, em terminal novo:

```bash
codex --version
claude --version
```

Abra `codex` ou `claude` e conclua a autenticação no fluxo oficial. No Codex, a preferência do prompt de setup é login com ChatGPT. Credenciais não entram no chat nem em arquivos do projeto.

`claude doctor` ajuda a verificar instalação e atualização do Claude Code. Atualize cada CLI pelo método responsável; por exemplo, uma instalação Homebrew exige atualização pelo Homebrew, enquanto o instalador nativo do Claude gerencia atualizações próprias.

## 2. Plugins e CLIs independentes

### Claude Code: comandos dentro da sessão

`/plugin` é comando do Claude Code, **não do shell**. Abra `claude` antes de usar:

```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin install superpowers@claude-plugins-official

/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail

/plugin marketplace add JuliusBrussee/caveman
/plugin install caveman@caveman
```

Fontes: [Superpowers](https://github.com/obra/superpowers#claude-code), [Ponytail](https://github.com/DietrichGebert/ponytail#install) e [Caveman](https://github.com/JuliusBrussee/caveman). Confira carregamento em uma nova conversa; diretório instalado não comprova ativação.

### Codex: plugins próprios

Para Superpowers, abra `/plugins` na sessão e instale a distribuição oficial. Para Ponytail, os comandos de terminal documentados são:

```bash
codex plugin marketplace add DietrichGebert/ponytail
codex plugin add ponytail@ponytail
```

Confira os hooks pelo fluxo do cliente e abra uma nova conversa. Para Caveman, use a distribuição de skills documentada e a descoberta do Codex, mantendo a preferência por comunicação concisa sem ativar proxy ou roteamento de modelos. Veja o [guia do Codex](tools/15-codex-workflow.md) para os caminhos, comandos e precedência das instruções.

### RTK, Context7 e Graphify

| Ferramenta | Instalação ou conexão | Integração |
|---|---|---|
| [RTK](tools/03-rtk-token-proxy.md) | Com Homebrew: `brew install rtk-ai/tap/rtk`; outros sistemas seguem as releases oficiais | Claude: `rtk init --global`; Codex: `rtk init --global --codex` |
| [Context7](tools/12-context7.md) | Plugin do cliente ou MCP remoto em `https://mcp.context7.com/mcp` | Configure em cada cliente e faça uma consulta real; evite servidor duplicado |
| [Graphify](tools/07-graphify.md) | `uv tool install graphifyy` **ou** `pipx install graphifyy` | `graphify install`, depois confira descoberta da skill no agente |

Graphify exige Python e um mecanismo de instalação compatível; configure essas dependências se ausentes. O pacote é `graphifyy`, com dois “y”; a CLI é `graphify`. Escolha um dos métodos isolados, sem instalar ambos. RTK e Graphify são CLIs; não são pacotes npm com o mesmo nome.

Context7 remoto é um serviço, não um pacote local a atualizar. O plugin pode já incluir MCP e skill de consulta. Instalar também uma segunda conexão para a mesma finalidade cria sobreposição.

### Extras do fluxo de projeto

No toolkit modular, você pode escolher peças. No **prompt 10**, RTK, Ponytail, Caveman, Superpowers, Context7 e Graphify são obrigatórios. Os itens abaixo continuam sendo extras novos sujeitos à sua escolha:

| Ferramenta | Referência | Uso |
|---|---|---|
| agent-browser | [Guia](tools/11-agent-browser.md) | Automatizar fluxos de navegador |
| Chrome DevTools MCP | [Guia](tools/14-chrome-devtools-mcp.md) | Investigar rede, console e performance |
| Anthropic Skills | [Guia](tools/13-anthropics-skills.md) | Trabalhar com artefatos e criar skills |
| aia-harness | [Marketplace](https://github.com/leandrosilvaferreira/claude-plugins-registry) | Onboarding de projeto; confirme opções e suporte no próprio marketplace |
| Plugins oficiais do Claude | [Marketplace](https://github.com/anthropics/claude-plugins-official) | Escolha ferramentas de revisão, commits ou hooks conforme a necessidade |

## 3. Skills Vercel locais

Para Next/React, siga o [catálogo completo](tools/16-vercel-skills.md): oito skills web de `vercel-labs/agent-skills` e `find-skills` de `vercel-labs/skills`. Use instalação local, nomes reais do frontmatter e somente os clientes necessários. React Native/Expo é uma extensão opcional.

Para gerar produto, base oficial e configurações em conjunto, use o [bootstrap Next](04-project-bootstrap.md) e o [prompt 11](prompts/11-next-project-bootstrap.md). Não reinstale plugins globais a cada projeto.

<a id="3-instruções-do-projeto"></a>

## 4. Instruções do projeto

Use [AGENTS.md.template](../templates/AGENTS.md.template) para instruções compartilhadas e [CLAUDE.md.template](../templates/CLAUDE.md.template) como ponte do cliente Claude para `AGENTS.md`. Preencha comandos e convenções no arquivo compartilhado; incorpore aos existentes sem sobrescrevê-los.

O [settings.json.example](../templates/settings.json.example) mostra o formato de hooks personalizados. Os scripts citados são exemplos: só registre hooks cujos arquivos existam e cujo comportamento tenha sido verificado. RTK e plugins devem usar sua instalação oficial, sem duplicar interceptadores.

## Quer o passo a passo completo?

- [Setup da máquina](03-environment-setup.md): execução, retomada, relatório e reprodução.
- [Setup de projeto existente](prompts/12-existing-project-setup.md): adoção completa, atualização e validação.
- [Playbook do Claude Code](02-playbook-onboarding.md): fluxo de projeto narrado.
- [Fluxo do Codex](tools/15-codex-workflow.md): instruções, skills, MCP e permissões.
