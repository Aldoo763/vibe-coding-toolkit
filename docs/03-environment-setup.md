# Setup da máquina: como usar o prompt completo

Use o [prompt 10 — ambiente de desenvolvimento](prompts/10-development-environment-setup.md) para preparar uma máquina nova ou atualizar e corrigir um ambiente existente. Ele pede execução, backups, integração dos agentes e testes em novas sessões. Instalar os binários é apenas uma parte do trabalho.

O setup atua no ambiente global. Para **iniciar um projeto Next**, use depois o [bootstrap](04-project-bootstrap.md). Para adotar o fluxo num projeto existente, use o [playbook](02-playbook-onboarding.md) ou o [guia do Codex](tools/15-codex-workflow.md). Skills Vercel são instaladas no projeto, conforme o [catálogo](tools/16-vercel-skills.md).

## 1. Escolha onde executar

Use Codex ou Claude Code com acesso ao terminal e aos arquivos do computador que receberá o setup. Se a sessão estiver em um container, VM, WSL ou servidor remoto, é esse ambiente que ela consegue preparar. Declare o destino explicitamente quando houver mais de um.

Uma máquina sem nenhum agente precisa de uma primeira instalação para receber o prompt. Escolha **um** agente para começar; o prompt instala o outro durante o setup. Os exemplos abaixo vêm das [instruções oficiais do Codex CLI](https://learn.chatgpt.com/docs/codex/cli) e do [Claude Code](https://code.claude.com/docs/en/overview). Consulte essas páginas se o sistema ou método de instalação for diferente.

macOS, Linux ou WSL — escolha um dos comandos:

```bash
# Codex: instalador nativo
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# Claude Code: instalador nativo
curl -fsSL https://claude.ai/install.sh | bash
```

Windows nativo — escolha um dos comandos no PowerShell:

```powershell
# Codex: instalador nativo
irm https://chatgpt.com/codex/install.ps1 | iex

# Claude Code: instalador nativo
irm https://claude.ai/install.ps1 | iex
```

Esses instaladores não exigem Node.js como etapa anterior. Abra um novo terminal, rode `codex` ou `claude` e conclua a autenticação no fluxo oficial. Para o Codex, escolha login com ChatGPT conforme a preferência do prompt. Credenciais, códigos e senhas ficam no fluxo de login, nunca na conversa.

Se o agente já funciona, comece por ele. O prompt preserva o método existente quando suportado e evita uma segunda instalação concorrente.

## 2. Execute o prompt

Abra o [prompt 10](prompts/10-development-environment-setup.md) e cole **o bloco inteiro da seção “Prompt”** na conversa do agente. O texto já autoriza a base obrigatória, atualizações globais de desenvolvimento e correções necessárias.

Com este repositório aberto no agente, use o atalho:

```text
Leia docs/prompts/10-development-environment-setup.md e execute integralmente o bloco da seção “Prompt” neste computador.
Use templates/environment-manifest.json.example como formato inicial do manifesto e acrescente os componentes globais encontrados no inventário.
Grave relatório, manifesto e backups em um diretório de setup do usuário, fora dos projetos. Informe os caminhos e como restaurar as configurações.
```

Se estiver trabalhando em outro diretório, forneça o caminho real do arquivo. O atalho por URL está na página do prompt e depende de esta versão já estar publicada na branch `main`. O arquivo local permite usar as mudanças antes da publicação.

Antes de enviar, acrescente contexto que o agente não consegue descobrir sozinho, quando houver:

```text
Destino: [este computador / Windows nativo / WSL / servidor remoto identificado].
Projetos cujas versões devem ser preservadas: [caminhos locais, sem credenciais].
Manifesto anterior: [caminho, se existir].
Restrições da organização ou do sistema: [descreva, se houver].
```

## 3. Entenda o que é obrigatório

O toolkit pode ser adotado por partes. **Neste prompt específico**, todos os itens da base são obrigatórios: o agente deve instalar os ausentes e configurar as integrações suportadas. Uma incompatibilidade precisa de justificativa e alternativa registradas.

| Grupo | Base exigida |
|---|---|
| Sistema | Certificados, download, extração, compilação e gerenciador de pacotes adequado |
| Desenvolvimento | Git, GitHub CLI, gerenciador de versões Node.js, Node.js LTS, npm, pnpm, ripgrep, fd e jq |
| Containers | Cliente Docker, engine acessível, Compose v2 por `docker compose` e pré-requisitos do sistema |
| Agentes | Codex CLI e Claude Code CLI, inicialização e autenticação verificadas |
| Integrações | RTK, Ponytail `full`, Caveman, Superpowers, Context7 e Graphify em cada cliente compatível |

O gerenciador de Node.js preferido é [fnm](https://github.com/Schniz/fnm). A versão padrão deve ser a [LTS compatível na data da execução](https://nodejs.org/en/about/previous-releases), preservando versões específicas dos projetos. O método de instalação de [pnpm](https://pnpm.io/installation) também deve ser conferido na execução; não presuma que toda versão do Node.js inclui Corepack.

Para [Docker](https://docs.docker.com/get-started/get-docker/), um cliente instalado sem engine acessível continua sendo uma pendência. A escolha de Desktop ou Engine depende do sistema, dos requisitos e da licença aplicável.

### Origens das extensões

Essas referências ajudam a evitar pacotes com nomes parecidos. Confirme a documentação e a compatibilidade atuais antes de instalar.

| Ferramenta | Origem | Integração a conferir |
|---|---|---|
| RTK | [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | CLI e hooks nativos por agente; sem reescrita dupla |
| Ponytail | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | Plugin com hooks ou skill, conforme suporte do cliente |
| Caveman | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Skills de comunicação; recursos de proxy e roteamento têm escopo próprio |
| Superpowers | [obra/superpowers](https://github.com/obra/superpowers) | Plugin oficial do cliente ou mecanismo documentado de skills |
| Context7 | [upstash/context7](https://github.com/upstash/context7) | Plugin ou MCP; um servidor lógico por cliente |
| Graphify | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Pacote `graphifyy`, CLI `graphify` e skill descoberta pelo agente |

Para Caveman, comunicação concisa não exige ativar proxy, Cloud ou troca automática de modelos. Para trabalhos com LLM de Caveman e Graphify, preserve cliente nativo, autenticação e modelo autorizados na sessão. No Codex, mantenha login ChatGPT quando utilizado; no Claude, a modalidade vigente. Não deduza autorização para outro provedor a partir de uma opção disponível na ferramenta.

## 4. Acompanhe intervenções e retomadas

Você pode precisar concluir login no navegador, digitar senha no sistema, conceder uma permissão do sistema operacional, iniciar Docker Desktop ou reiniciar uma sessão. O agente deve identificar a intervenção exata e continuar as etapas independentes.

Extras novos, custos e migrações incompatíveis dependem da sua escolha. Instalações obrigatórias e atualizações globais já autorizadas continuam fazendo parte do trabalho.

Se a sessão terminar antes da validação, use:

```text
Retome o setup do prompt 10 a partir de [caminho do relatório] e [caminho do manifesto].
Confira o estado atual, continue as pendências e revalide em novas sessões.
Preserve os backups existentes e evite duplicar instalações, configurações e hooks.
```

Uma mudança em arquivo de configuração não altera necessariamente as permissões da sessão aberta. CLI, aplicativo desktop, sistema operacional e políticas da organização precisam de verificações próprias. Veja os detalhes no [guia do Codex](tools/15-codex-workflow.md).

## 5. Confira a entrega

O relatório deve cobrir todos os itens da seção 12 do prompt, com versões anteriores e finais, caminhos, fontes, integrações por cliente, limpeza, backups e restauração. Cada teste deve registrar o comando, o resultado e a sessão usada, com dados sensíveis removidos.

Para Docker, procure evidência dos sete passos da seção 11: cliente e servidor em `docker version`, `docker info`, versão do Compose, `hello-world`, projeto temporário funcionando e encerramento apenas dos recursos do teste. Para os agentes, procure carregamento real das skills e uma consulta ao Context7; presença no disco ou na configuração não prova funcionamento.

O [template de manifesto](../templates/environment-manifest.json.example) é JSON, sem instalador embutido. Ele começa com `template: true`, versões e caminhos `null` e status `pending`, porque ainda não representa um ambiente validado. Ao preenchê-lo:

- Use `ready` somente depois de instalação, configuração e validação; use `blocked` ou `unsupported` com motivo em `notes` quando necessário.
- Registre versão ou revisão, caminho observado, escopo, método de instalação e atualização de cada componente. Acrescente dependências necessárias e todas as ferramentas globais descobertas.
- Detalhe integrações em `integrations`: cliente, escopo, arquivo, comportamento e status. Se um plugin não funcionar em um cliente, registre esse cliente separadamente.
- Registre em `configuration` as definições necessárias de shell, PATH, runtime e permissões. Em `validation`, guarde evidências resumidas e sem segredos.
- Preencha `generated_at`, identifique o ambiente e mude `template` para `false`. Isso identifica um inventário preenchido, sem esconder itens ainda bloqueados.
- Mantenha caminhos de backups e instruções de restauração no relatório local. Na cópia compartilhável, normalize diretórios pessoais como `${USER_HOME}` e remova nomes privados, repositórios privados e dados de autenticação.

## 6. Reproduza em outra máquina

Leve o manifesto sanitizado junto do prompt completo e informe:

```text
Execute o prompt 10 neste computador usando [caminho do manifesto] como inventário de origem.
Reproduza a base obrigatória e os demais componentes registrados, adaptando sistema operacional, arquitetura, shell, caminhos e métodos de instalação.
Respeite as versões exigidas pelos projetos e registre divergências de compatibilidade.
Gere um novo relatório e um novo manifesto do destino. Não reutilize credenciais da origem.
```

As versões registradas são evidência do ambiente de origem. O prompt ainda pede versões estáveis compatíveis na data da execução; qualquer necessidade de manter uma revisão exata deve ser informada explicitamente. Um manifesto não transporta sessões, segredos, dados Docker ou ferramentas que não foram inventariadas.

## Depois da base

Para configurar ou atualizar um projeto já existente com o conjunto aplicável, use o [prompt 12](prompts/12-existing-project-setup.md). Ele reutiliza o ambiente preparado e mantém o escopo do projeto separado do setup da máquina.

Escolha extras pelo problema que resolvem. Para automação de fluxos no navegador, veja [agent-browser](tools/11-agent-browser.md); para investigar console, rede e desempenho, veja [Chrome DevTools MCP](tools/14-chrome-devtools-mcp.md). Para qualidade no projeto, use os [quality gates](tools/06-eslint-biome-quality-gates.md). Nenhum desses extras novos deve ser instalado automaticamente por aparecer como recomendação.
