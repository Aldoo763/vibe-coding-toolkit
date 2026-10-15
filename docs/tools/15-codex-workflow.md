# Codex: instalação, instruções e integrações

O Codex tem CLI, aplicativo e integrações próprias. Este guia mostra como usar o toolkit nele, com `AGENTS.md`, plugins, skills e MCPs. Para preparar o computador inteiro, use o [setup do ambiente](../03-environment-setup.md); para o fluxo narrado do Claude Code, use o [playbook](../02-playbook-onboarding.md).

Para configurar ou atualizar o toolkit aplicável em um projeto existente, use o [prompt 12](../prompts/12-existing-project-setup.md), com diagnóstico, brainstorming, harness e validação.

Referências conferidas em **14 de outubro de 2026**. Consulte as fontes novamente antes de instalar ou migrar: comandos e formatos podem mudar.

## Instale e autentique

A [documentação oficial da CLI](https://learn.chatgpt.com/docs/codex/cli) oferece instalador nativo, npm e Homebrew. Escolha um método e preserve o método já usado quando suportado.

```bash
# Alternativa para quem já usa Node.js/npm
npm install -g @openai/codex

# Verifique o executável disponível
codex --version

# Abra o agente no projeto
codex
```

Na primeira execução, escolha **Sign in with ChatGPT**. A [autenticação oficial](https://learn.chatgpt.com/docs/auth) também descreve outras modalidades; a preferência deste setup é preservar ChatGPT e não habilitar cobrança por API. Não grave credenciais em templates, instruções do projeto ou manifesto.

## Use `AGENTS.md` como instrução do projeto

O Codex [descobre instruções](https://learn.chatgpt.com/docs/agent-configuration/agents-md) em escopos diferentes: o diretório global de configuração e o caminho da raiz do projeto até o diretório de trabalho. Em cada diretório, `AGENTS.override.md` tem prioridade sobre `AGENTS.md`. Instruções mais próximas do diretório de trabalho refinam as anteriores.

Use o [template compartilhado](../../templates/AGENTS.md.template) para criar um `AGENTS.md` no projeto de destino. Preencha stack, comandos canônicos e convenções. Se o arquivo já existir, incorpore somente as partes úteis, sem sobrescrever preferências.

No Claude Code, você pode importar esse arquivo a partir do `CLAUDE.md`, conforme a [documentação de memória](https://code.claude.com/docs/en/memory):

```markdown
@AGENTS.md

## Claude Code

[Instruções específicas deste cliente, se necessárias.]
```

O Codex descobre `AGENTS.md` diretamente. Não presuma que toda sintaxe de importação do Claude seja interpretada da mesma maneira pelos outros clientes. Caminhos pessoais absolutos devem ficar em configurações do usuário, sem entrar no template compartilhado.

## Instale plugins e confira as skills

Plugins podem distribuir skills, MCPs e hooks. Para [Superpowers no Codex](https://github.com/obra/superpowers#codex-cli), abra `/plugins` na sessão, busque Superpowers e instale a distribuição oficial. No aplicativo, use a área de Plugins. Instalar o plugin do Claude Code não o instala no Codex.

Para os plugins que documentam marketplace próprio, os exemplos atuais são:

```bash
# Ponytail: terminal
codex plugin marketplace add DietrichGebert/ponytail
codex plugin add ponytail@ponytail

# Context7: escolha o plugin OU o MCP direto da próxima seção
codex plugin marketplace add upstash/context7
codex plugin add context7@context7-marketplace
```

Fontes: [Ponytail](https://github.com/DietrichGebert/ponytail#install) e [clientes do Context7](https://context7.com/docs/resources/all-clients). No Ponytail, abra `/hooks`, confira e confie nos hooks conforme o fluxo do cliente; depois inicie uma nova conversa. Mantenha intensidade `full` para programação.

Se uma ferramenta for distribuída como skill independente, use os caminhos de [descoberta de skills](https://learn.chatgpt.com/docs/build-skills): `.agents/skills/<nome>/SKILL.md` no projeto ou `~/.agents/skills/<nome>/SKILL.md` no usuário. Links simbólicos são suportados. Plugins cuidam dos próprios arquivos; copiar também as mesmas skills para esses diretórios pode criar entradas duplicadas.

No Codex, selecione a skill pelo nome mostrado no cliente ou invoque-a com `$nome`. Plugins podem acrescentar namespace, como `$ponytail:ponytail-review`. Não suponha que os comandos `/plugin` ou os nomes de subagentes do Claude Code existam no Codex.

Peça ao agente para listar as skills descobertas e conferir a origem antes de validar. Diretório existente sem skill descoberta continua sendo configuração incompleta.

## Continuidade do trabalho

Adote os [acordos de continuidade](../02-playbook-onboarding.md#continuidade-de-execução) e o bloco do [AGENTS compartilhado](../../templates/AGENTS.md.template). Perguntas de status não encerram trabalho autorizado; bloqueios afetam só dependências. Confirme a parada de um trabalhador antes de assumir arquivos, confira o checkout na retomada e preserve permissões/limites. Essas instruções não garantem execução após o turno nem substituem processos ativos verificáveis.

## Configuração e skills do projeto

Para iniciar Next com produto, lint e skills, siga o [bootstrap](../04-project-bootstrap.md). Instale a coleção Vercel localmente conforme o [catálogo](16-vercel-skills.md), selecionando `--agent codex`; se também usar Claude, selecione os dois clientes. Não copie um cache global nem duplique plugins já descobertos.

Configuração local pertence a `.codex/config.toml` e só é carregada em projeto confiável. O [template Context7](../../templates/project/codex.config.toml.example) é uma alternativa quando faltar conexão ativa; concilie-o com a configuração existente e preserve autenticação fora do repositório. Não acrescente opções de modelo, provedor ou permissões pessoais ao template. Fonte: [configuração oficial](https://learn.chatgpt.com/docs/config-file/config-advanced).

Plugins globais continuam globais. `AGENTS.md`, skills locais, produto, lint e exclusões Graphify pertencem ao projeto. O bootstrap não instala bloqueios Git ou hooks de commit/push.

## Conecte o Context7 por MCP

Use esta alternativa quando não estiver usando o plugin que já fornece o mesmo servidor. A [documentação do Context7](https://context7.com/docs/resources/all-clients) descreve clientes locais e remotos; o endpoint remoto dispensa instalar um pacote MCP local.

```bash
codex mcp add context7 --url https://mcp.context7.com/mcp
codex mcp list
```

Se o serviço exigir autenticação ou limitar o modo anônimo, siga o fluxo oficial e preserve segredos fora do repositório. Comece uma nova sessão e teste uma consulta de documentação. `codex mcp list` comprova o registro, mas não a resposta do servidor.

O fluxo de consulta é `resolve-library-id` com biblioteca e objetivo, seguido de `query-docs` com `libraryId` e `query`. Faça uma consulta por conceito e confira a versão usada pelo projeto. Não envie código privado, credenciais ou dados pessoais. Veja [Context7](12-context7.md) para os exemplos completos.

## Integre RTK e Graphify

O [RTK documenta hooks nativos para Codex](https://github.com/rtk-ai/rtk/blob/develop/docs/guide/getting-started/supported-agents.md). Depois de instalar o binário e fazer backup das configurações existentes:

```bash
rtk init --global --codex
```

Abra uma nova sessão e confirme a reescrita de um comando suportado. O hook altera o comando antes da execução; não deve executar uma cópia dele por conta própria. Se já houver integração equivalente, concilie as configurações e evite registrar outro hook para a mesma finalidade.

Sem hook ativo nessa superfície, use `rtk git status`, por exemplo. Para saída completa ou comandos não suportados, use `rtk proxy <comando>`. Mais detalhes: [RTK](03-rtk-token-proxy.md).

O [Graphify](https://github.com/Graphify-Labs/graphify) fornece instalação por `graphify install`, que detecta os agentes compatíveis. Confira a instalação da skill no Codex em uma nova sessão. Para extração semântica ou delegação, preserve Codex nativo, o modelo principal e login ChatGPT. Sem política de seleção autorizada, passe o modelo da sessão; com essa política, siga o [roteamento por tarefa](02-subagent-orchestration.md#parte-b--disciplina-de-escolha-de-modelo), respeitando restrições explícitas. Não configure um backend de API ou outra LLM como substituto silencioso. Veja [Graphify](07-graphify.md).

## Permissões e persistência

O prompt de setup pede acesso completo e ausência de aprovações rotineiras. Na CLI que usa as chaves documentadas de sandbox, o trecho correspondente em `~/.codex/config.toml` é:

```toml
approval_policy = "never"
sandbox_mode = "danger-full-access"
```

Essas opções dão acesso amplo ao sistema de arquivos e à rede, conforme a [referência de configuração](https://learn.chatgpt.com/docs/config-file/config-reference). Faça backup e incorpore o trecho ao arquivo existente; não substitua configurações de modelo, provedor ou MCP. Use esse modo somente no contexto em que foi autorizado, como o setup solicitado.

Versões e superfícies também podem expor perfis de permissões próprios. Confira o mecanismo suportado pela instalação atual e verifique o estado efetivo em uma nova sessão. Políticas da organização e permissões do sistema operacional podem limitar o resultado. A CLI configurada não prova que o aplicativo desktop ou uma sessão já aberta recebeu a mesma permissão.

## Valide sem depender da sessão antiga

- Abra terminal e conversa novos; confira executável, autenticação e modelo.
- Confirme quais arquivos de instruções foram carregados e a precedência de overrides.
- Descubra e use uma skill adequada a uma tarefa pequena, sem publicação ou chamadas pagas de teste.
- Faça uma consulta real ao Context7 e confira o resultado.
- Confira uma execução de comando com RTK, sem duplicação, e a saída completa via `rtk proxy`.
- Verifique a integração do Graphify sem iniciar uma extração semântica paga.
- Registre pendências de hooks, login, permissões ou políticas; não trate presença no disco como validação.
