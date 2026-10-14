# Setup completo do ambiente de desenvolvimento

Este prompt instala, configura, atualiza e valida o ambiente global de desenvolvimento. Serve para uma máquina nova ou para corrigir uma máquina que já tem ferramentas instaladas. Inclui Node.js, Docker, Codex, Claude Code e todas as extensões obrigatórias indicadas abaixo.

O escopo é o computador, incluindo configurações fora do projeto. Dependências locais, lockfiles, credenciais e dados existentes devem ser preservados. Leia o [guia de uso](../03-environment-setup.md) para escolher o agente, acompanhar intervenções, retomar uma execução e reproduzir o resultado em outra máquina.

## Como usar

Em um agente com terminal e acesso aos arquivos do computador, cole **todo o bloco da seção “Prompt”**. Não cole no terminal como se fosse um comando de shell. Uma conversa sem execução de comandos pode explicar o setup, mas não realizar as instalações.

Se o repositório estiver disponível localmente, cole no agente:

```text
Leia docs/prompts/10-development-environment-setup.md deste repositório e execute integralmente o bloco da seção “Prompt” neste computador.
Use templates/environment-manifest.json.example como formato inicial do manifesto, preenchendo os valores observados e acrescentando os demais componentes encontrados.
Grave o relatório e o manifesto fora dos projetos, em um diretório de setup do usuário, e informe os caminhos finais.
```

Para usar sem clonar, depois que esta versão estiver publicada na branch `main`:

```text
Leia https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/main/docs/prompts/10-development-environment-setup.md
e execute integralmente o bloco da seção “Prompt” neste computador. Grave relatório e manifesto em um diretório de setup do usuário, fora dos projetos, e informe os caminhos finais.
```

## Prompt

```markdown
# Instalar, configurar, atualizar e otimizar todo o ambiente de desenvolvimento

Prepare este computador para desenvolvimento, principalmente com Node.js, e uso do Codex e Claude Code.

Este prompt deve funcionar em dois cenários:

- **Ambiente novo, sem ferramentas:** instalar e configurar toda a base obrigatória, incluindo plugins, skills, MCPs e hooks.
- **Ambiente existente:** inventariar, atualizar, corrigir, limpar duplicatas e melhorar as integrações.

Execute o trabalho. Não entregue apenas um tutorial ou recomendações.

Adapte comandos, caminhos e métodos ao sistema operacional, arquitetura, shell e data da execução. Consulte documentação oficial atual.

## 1. Autorização e regras

Estão autorizados:

- Instalação de todos os componentes da lista obrigatória.
- Atualização de todos os componentes globais de desenvolvimento existentes.
- Configuração e ativação dos plugins, skills, MCPs e hooks obrigatórios.
- Remoção de duplicatas confirmadas e resíduos dispensáveis.
- Correção de PATH, inicialização do shell e integrações.
- Execução de comandos e leitura ou alteração de arquivos fora do projeto quando necessárias ao setup.

Preserve projetos, dependências locais, lockfiles, credenciais, sessões, históricos e configurações personalizadas.

Faça backup antes de alterar configurações ou remover componentes com dados relevantes. Registre como restaurar.

Não repita pedidos de autorização já concedida. Solicite minha intervenção somente para autenticação, exigências do sistema, custos, novos extras ou migrações com impacto incompatível.

Não publique conteúdo, envie mensagens, contrate serviços ou altere projetos como consequência do setup.

O processo deve ser repetível: novas execuções devem verificar, atualizar e corrigir sem duplicar instalações ou configurações.

## 2. Base obrigatória

**Todos os itens abaixo devem ser instalados quando ausentes, atualizados quando necessário e configurados para uso. Apenas verificar sua existência não atende ao objetivo.**

### Sistema e desenvolvimento

- Pré-requisitos necessários: certificados, download, extração e compilação.
- Git.
- GitHub CLI.
- Gerenciador de pacotes adequado ao sistema.
- Gerenciador de versões do Node.js, preferencialmente `fnm` quando compatível e adequado.
- Node.js LTS e npm.
- pnpm.
- ripgrep, fd e jq, ou equivalentes justificados quando houver incompatibilidade.

### Containers

- Docker, incluindo cliente e engine funcionais.
- Docker Compose disponível pelo comando `docker compose`.
- Componentes necessários ao funcionamento, conforme o sistema operacional.

### Agentes

- Codex CLI.
- Claude Code CLI.

### Produtividade e extensões dos agentes

- **RTK:** instalação e integração para os comandos suportados.
- **Ponytail:** plugin ou skills, com intensidade `full` como padrão para tarefas de programação.
- **Caveman:** skills e comunicação concisa como padrão, preservando clareza e redação normal em código, documentação e commits.
- **Superpowers:** instalação das skills e configuração nos agentes compatíveis.
- **Context7:** instalação ou conexão do servidor MCP e configuração nos clientes compatíveis.
- **Graphify:** instalação e configuração do mecanismo oficialmente suportado.

Resolva a identidade e origem corretas dessas ferramentas antes de instalar. Não instale um pacote apenas porque possui nome semelhante.

Use os mecanismos oficiais de cada projeto e plataforma. Quando um componente não for suportado, registre a incompatibilidade, continue os demais e apresente a alternativa adequada.

**Plugins obrigatórios não são extras opcionais e não devem ser ignorados porque ainda não existem na máquina.**

## 3. Diagnóstico e inventário

Antes de alterar o ambiente, identifique:

- Sistema operacional, versão, distribuição e arquitetura.
- Ambiente nativo, WSL, máquina virtual, container ou remoto.
- Shell, terminal, PATH, arquivos de inicialização e privilégios.
- Gerenciadores de pacotes e runtimes.
- Ferramentas globais por usuário, sistema, runtime e ambiente.
- Plugins, skills, MCPs, hooks e extensões dos agentes e editores.
- Configurações globais e por projeto, incluindo sua precedência.
- Componentes ativos, desativados, duplicados, incompatíveis ou descontinuados.
- Requisitos dos projetos relevantes.

Registre nome, finalidade, versão ou revisão, caminho, origem, método de atualização e integrações de cada componente.

Use os mecanismos de inventário de cada ecossistema. Não dependa apenas dos executáveis encontrados no PATH.

Diferencie duplicatas reais de links simbólicos, referências compartilhadas e instalações necessárias em ambientes distintos.

Se houver um inventário ou manifesto do ambiente de origem, inclua seus componentes na reprodução do ambiente novo. Sem esse inventário, instale toda a base obrigatória e informe que ferramentas não identificadas da máquina anterior não podem ser reproduzidas automaticamente.

## 4. Instalação e atualização

Execute na ordem adequada às dependências:

1. Diagnóstico e backups.
2. Pré-requisitos e gerenciador de pacotes.
3. Git, GitHub CLI e utilitários.
4. Gerenciador de versões, Node.js, npm e pnpm.
5. Codex CLI e Claude Code CLI.
6. Plugins, skills, MCPs e hooks obrigatórios.
7. Docker e Docker Compose.
8. Atualização dos demais componentes globais existentes.
9. Limpeza, validação e relatório.

Para cada componente:

- Consulte fontes oficiais atuais.
- Use versão estável compatível.
- Reaproveite instalações que já estejam adequadas.
- Preserve o método de instalação existente quando suportado.
- Evite instalar a mesma ferramenta por gerenciadores diferentes.
- Confirme versão, caminho e executável efetivamente utilizado.

Atualize também os componentes globais existentes que não aparecem na lista obrigatória: pacotes, CLIs, plugins, skills, MCPs locais, extensões e ferramentas utilizadas por hooks.

Preserve alterações locais em plugins ou skills personalizados. Não descarte trabalho do usuário para forçar uma atualização.

Para serviços MCP remotos, verifique compatibilidade e conexão; não trate o serviço como pacote local.

Atualizar um componente anteriormente desativado não autoriza ativá-lo. Essa restrição não se aplica aos componentes obrigatórios que precisam ser configurados neste setup.

Não atualize dependências locais dos projetos nem aplicativos sem relação com desenvolvimento.

## 5. Shell, Node.js e projetos

- Configure PATH e inicialização nos arquivos corretos do shell.
- Garanta funcionamento em novas sessões e nos terminais utilizados pelos agentes.
- Configure a versão LTS mais recente compatível do Node.js como padrão fora dos projetos.
- Configure seleção automática de versão por projeto quando suportada.
- Respeite `.node-version`, `.nvmrc`, `engines`, `packageManager` e lockfiles.
- Preserve versões específicas exigidas pelos projetos.
- Identifique conflitos entre requisitos e explique a resolução.
- Configure pnpm pelo mecanismo oficialmente suportado.
- Preserve os gerenciadores escolhidos pelos projetos.
- Não altere dependências, lockfiles ou versões declaradas como parte do setup.
- Corrija permissões na causa, sem permissões indiscriminadas ou uso de administrador por padrão.

No Windows, diferencie ambiente nativo e WSL. Não misture executáveis e dependências entre eles.

## 6. Plugins, skills, MCPs e hooks

Instale e configure cada componente obrigatório nos agentes em que houver suporte oficial.

- Verifique instalação, descoberta, carregamento e funcionamento.
- Use os formatos e caminhos documentados para cada cliente.
- Preserve instruções personalizadas e preferências existentes.
- Identifique hooks duplicados, execução repetida de comandos e integrações concorrentes.
- Não duplique instalações quando uma distribuição já incluir as mesmas skills.
- Não suponha que configuração no Codex também configure o Claude Code, ou vice-versa.

Configure as preferências:

- **Ponytail:** intensidade `full` para programação, preservando segurança, acessibilidade e requisitos explícitos.
- **Caveman:** respostas concisas em português; explicações completas quando solicitadas; código, documentação e commits com redação normal.
- **Context7:** documentação atual de bibliotecas, APIs e ferramentas quando pertinente; nunca enviar segredos nas consultas.
- **RTK:** integração com os mecanismos de execução suportados, evitando aplicação dupla de wrappers ou hooks.
- **Superpowers:** skills disponíveis e carregadas nos clientes compatíveis.
- **Graphify:** ferramenta e integração prontas para uso pelo mecanismo suportado.

Para trabalhos com LLM de Graphify e Caveman, preserve cliente nativo, modelo e autenticação autorizados na sessão. No Codex, mantenha login ChatGPT quando utilizado; no Claude, preserve a modalidade vigente. Passe o mesmo modelo explicitamente quando houver delegação suportada. Não troque silenciosamente provedor/modelo nem ative cobrança por API ou proxy. A CLI standalone não herda automaticamente a autenticação do agente; registre limitações em vez de inventar suporte.

As instruções deste prompt e minhas preferências explícitas prevalecem sobre fluxos de skills que repetiriam autorizações já concedidas.

## 7. Codex, Claude Code e permissões

- Garanta funcionamento de ambas as CLIs em terminais novos.
- Preserve modelos, provedores, sessões e configurações existentes.
- Em ambiente novo, use os fluxos oficiais de autenticação.
- Verifique autenticação sem revelar credenciais.
- Abra o fluxo de login quando necessário e informe exatamente minha intervenção.
- Não habilite cobrança por API ou troque modalidade de autenticação sem minha escolha.

### Codex

Configure acesso completo, rede e ausência de aprovações rotineiras pelos mecanismos oficiais suportados, com persistência quando disponível.

Diferencie permissões da CLI, aplicativo desktop, sistema operacional e organização. Verifique cada contexto utilizado.

Não presuma que mudar um arquivo altera automaticamente as permissões da sessão atual. Confirme em nova sessão.

### Sistema operacional

- Verifique as permissões necessárias às funcionalidades utilizadas.
- Confirme a identidade dos aplicativos e componentes.
- Abra as telas pertinentes quando possível.
- Oriente sobre elevação, senha no sistema, autenticação biométrica ou reinicialização.
- Nunca solicite senhas, tokens ou códigos de autenticação no chat.
- Não contorne proteções ou políticas administrativas.
- Se uma política impedir a configuração, registre a restrição e continue as etapas independentes.

## 8. Docker e Docker Compose

Instale e configure uma solução Docker funcional, incluindo engine, cliente e Compose.

- No macOS e Windows, utilize Docker Desktop quando adequado e configure os pré-requisitos oficiais.
- No Linux, utilize Docker Engine e o plugin Docker Compose compatíveis com a distribuição.
- Verifique arquitetura, virtualização, requisitos do sistema e licença.
- Se houver custo aplicável, peça minha escolha antes de contratar.
- Reutilize uma instalação funcional e evite engines ou serviços concorrentes.
- Configure contexto correto, acesso do usuário e inicialização persistente quando suportada.
- Preserve containers, imagens, volumes, redes e configurações existentes.
- Informe intervenções necessárias e reinicializações.

Docker só está pronto quando o cliente consegue acessar a engine e executar containers e projetos Compose.

## 9. Faxina e remoção de duplicatas

- Identifique qual instalação está em uso antes de remover outra.
- Verifique referências no PATH, shell, agentes, editores e hooks.
- Remova duplicatas confirmadas pelo gerenciador responsável.
- Preserve ou consolide configurações necessárias.
- Elimine entradas repetidas, links quebrados e referências obsoletas.
- Remova resíduos comprovadamente dispensáveis.
- Limpe caches pelos mecanismos oficiais quando houver benefício concreto.
- Não remova ferramentas apenas por serem antigas ou semelhantes.
- Não trate versões exigidas por projetos como duplicatas.
- Preserve arquivos de finalidade desconhecida.
- Não execute limpeza indiscriminada de volumes ou outros dados do Docker.
- Confirme funcionamento após cada remoção.

Se houver dúvida sobre dependência ou impacto, preserve o componente e registre a pendência.

## 10. Melhorias adicionais

Depois da base completa, avalie melhorias relevantes para:

- Terminal e navegação.
- Git e colaboração.
- Documentação e contexto dos agentes.
- Automação de navegador.
- Testes, formatação, análise de código e acessibilidade.
- Containers e ambientes reproduzíveis.
- Diagnóstico, desempenho e consumo de recursos.

Considere ferramentas atuais e alternativas melhores, sem instalar por novidade ou popularidade.

Para cada recomendação, informe problema resolvido, benefício, compatibilidade, manutenção, sobreposição, custos e escopo de instalação.

Priorize poucas melhorias de alto impacto. Prefira recursos nativos ou soluções existentes quando suficientes.

Instale novos extras após minha escolha. A base obrigatória e a atualização dos componentes existentes não dependem dessa escolha.

## 11. Validação

Teste em nova sessão, sem depender de variáveis temporárias:

- Git, GitHub CLI e gerenciadores utilizados.
- Node.js LTS padrão, npm e pnpm.
- Acesso HTTPS ao registro configurado.
- Troca de versão por projeto e retorno ao padrão.
- Inicialização e autenticação de Codex e Claude Code.
- Instalação e funcionamento de RTK.
- Descoberta e carregamento de Ponytail, Caveman e Superpowers.
- Conexão do Context7 e dos demais MCPs habilitados.
- Funcionamento do Graphify.
- Execução dos hooks sem duplicação.
- Persistência das configurações e permissões verificáveis.
- Ausência de conflitos relevantes e referências quebradas.

Para Docker:

1. Execute `docker version` e confirme cliente e servidor.
2. Execute `docker info`.
3. Execute `docker compose version`.
4. Execute `docker run --rm hello-world`.
5. Crie um projeto Compose mínimo em diretório temporário.
6. Execute `docker compose up -d` e confirme o serviço funcionando.
7. Encerre com `docker compose down` e remova apenas recursos criados pelo teste.

Use diretórios temporários para testes. Preserve projetos existentes.

Execute diagnósticos oficiais pertinentes, como `brew doctor` quando aplicável. Investigue avisos relevantes.

Não execute chamadas pagas apenas para validar sem autorização.

## 12. Entrega e reprodução

Entregue um relatório em Markdown com:

- Ambiente identificado.
- Checklist de toda a base obrigatória.
- Componentes instalados, atualizados ou reaproveitados.
- Versões anteriores e finais quando aplicável.
- Origens, caminhos e métodos de instalação.
- Plugins, skills, MCPs e hooks configurados.
- Duplicatas removidas e limpeza realizada.
- Configurações alteradas, backups e restauração.
- Testes e resultados.
- Pendências, incompatibilidades e bloqueios.
- Melhorias adicionais recomendadas.

Gere também um manifesto reutilizável do ambiente final, com componentes, fontes, versões ou revisões, escopos e configurações necessárias. Não inclua segredos ou dados privados.

Esse manifesto deve permitir reproduzir o ambiente em outra máquina, adaptando caminhos e requisitos ao sistema de destino.

Não considere o trabalho concluído apenas porque as instalações terminaram. Confirme configuração e funcionamento de cada componente obrigatório e deixe explícito o que ainda depende de mim.
```
