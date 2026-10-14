# Visão geral

O toolkit tem dois usos: consultar ferramentas e práticas separadamente, ou iniciar uma base Next.js a partir da descrição do produto. Ambos reutilizam a mesma coleção de templates e acordos.

## Três caminhos

- **Máquina:** [setup global](03-environment-setup.md), com instalação, integração dos clientes, backups e manifesto.
- **Projeto novo:** [bootstrap Next](04-project-bootstrap.md), com `product.md`, scaffold oficial, skills locais, lint e evidências.
- **Adoção parcial:** [instalação](01-installation.md), [ferramentas](tools/) e [prompts](prompts/), escolhendo somente o necessário.

O agente precisa de acesso ao ambiente para executar e validar. Claude Code e Codex usam configurações próprias; outras LLMs podem seguir os requisitos com capacidades equivalentes, sem assumir compatibilidade de formatos.

## Produto antes da base

A descrição define problema, público, fluxos essenciais e restrições. `product.md` registra MVP, hipóteses e critérios de aceitação. A stack serve esse escopo: Next/App Router, TypeScript, Tailwind e ESLint formam a base; banco, autenticação e serviços entram quando existir necessidade definida.

O scaffold vem da versão estável de `create-next-app`, consultada no momento do setup. O toolkit mantém a receita e os complementos, evitando carregar uma aplicação de exemplo com domínio, credenciais ou dependências particulares.

<a id="2-brainstorm--plano--implementação--revisão"></a>
<a id="4-duas-camadas-de-personalidade-compostas"></a>
<a id="por-que-isso-importa"></a>

## Processo proporcional

[Superpowers](tools/01-superpowers.md) fornece skills de design, planejamento, execução e verificação. Use o caminho adequado ao tamanho do pedido. Se o usuário autorizar execução direta, respeite essa instrução; não repita aprovações já concedidas.

[Ponytail](tools/04-ponytail.md) mantém a menor solução completa: reutilização, escopo explícito e checks pertinentes. Segurança, validação, acessibilidade e requisitos pedidos permanecem. [Caveman](tools/05-caveman.md) reduz ruído da conversa, preservando o idioma e a clareza; documentos e código usam redação normal.

<a id="1-orquestração-não-implementação-solo"></a>

## Delegação quando compensa

O agente principal pode implementar mudanças pequenas. Subagentes ajudam em investigação ampla, tarefas independentes e revisão especializada. Use somente ferramentas e papéis realmente disponíveis.

Ondas paralelas exigem responsabilidade por arquivo e ausência de dependência entre tarefas da mesma onda. O [guia de orquestração](tools/02-subagent-orchestration.md) detalha esse protocolo. Preserve modelo e autenticação autorizados na sessão; alternativas de modelo precisam de escolha explícita.

<a id="6-um-grafo-de-conhecimento-do-código"></a>
<a id="7-um-sistema-de-memória-em-duas-camadas"></a>

## Conhecimento e contexto

[Context7](tools/12-context7.md) consulta documentação atual de bibliotecas. Resolva o identificador correto e faça uma consulta por conceito, sem enviar segredos ou código privado.

[Graphify](tools/07-graphify.md) oferece um grafo consultável de estrutura e relações. Extração de código pode ser determinística; semântica de documentos utiliza a integração nativa autorizada quando disponível. Um grafo incompleto ou antigo precisa ser tratado como tal.

Memória externa, como [Obsidian](tools/08-obsidian-memory.md), e o [sistema de memória Claude](tools/09-claude-memory-system.md) continuam opcionais. Comece com contexto curto e útil; não instale um sistema de memória inteiro apenas para uma aplicação vazia.

## Skills Vercel

O [catálogo](tools/16-vercel-skills.md) identifica cada skill pelo nome instalável, define seu momento de uso e instala localmente as oito skills web mais `find-skills`. Composição e boas práticas React/Next apoiam implementação; UI e escrita apoiam revisão.

Transições, operação Vercel, deploy e otimização dependem de tarefa pertinente. A skill mobile entra para React Native/Expo. Disponibilidade de uma skill não exige criar a funcionalidade nem autoriza publicação.

<a id="3-uma-camada-de-economia-de-tokens"></a>
<a id="5-gates-de-qualidade-como-migração-rastreada"></a>

## Checks explícitos

[ESLint e quality gates](tools/06-eslint-biome-quality-gates.md) verificam código e contratos relevantes. O starter Next combina os presets oficiais com teto de 350 linhas; regras de logger e acesso a dados são adotadas quando essas decisões existirem.

Lint, tipos, regras e build rodam por comandos canônicos. Testes cobrem comportamento relevante e regressões. O toolkit não instala bloqueios de push em `main`, nem exige branch/worktree, nem adiciona hooks de commit/push. Hooks próprios do cliente, como [RTK](tools/03-rtk-token-proxy.md), usam integrações suportadas sem duplicação.

## Global não precisa ser copiado

Binários, plugins e autenticação existentes são reutilizados. Produto, instruções, skills Vercel, lint e exclusões do grafo ficam no projeto. Uma conexão MCP local só é acrescentada se faltar integração ativa.

O [manifesto global](../templates/environment-manifest.json.example) registra o ambiente da máquina. `docs/setup.md` no projeto registra revisão do toolkit, versões, escopos, validações e pendências. Arquivo instalado e integração testada são estados diferentes.

<a id="leitura-complementar-oficial"></a>

## Próximo passo

Use o [prompt curto de projeto](prompts/11-next-project-bootstrap.md) para começar Next, o [prompt de ambiente](prompts/10-development-environment-setup.md) para preparar a máquina ou o [playbook Claude](02-playbook-onboarding.md) e o [guia Codex](tools/15-codex-workflow.md) para uma base existente.
