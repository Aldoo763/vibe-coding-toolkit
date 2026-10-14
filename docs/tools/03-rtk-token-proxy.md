# RTK — proxy de tokens para CLI

RTK significa **Rust Token Killer**. É uma ferramenta pública em [rtk-ai/rtk](https://github.com/rtk-ai/rtk), distribuída como binário de linha de comando. Ela executa comandos suportados e filtra a saída antes de o agente recebê-la, reduzindo texto repetitivo na janela de contexto.

Um **hook** é uma integração executada antes ou depois de uma ação do agente. No RTK, o hook pode reescrever o comando proposto para usar o binário. Isso permite usar comandos comuns sem depender de o modelo lembrar do prefixo em toda chamada.

Esta página substitui o antigo exemplo de proxy personalizado. Prefira a integração oficial: ela conhece os formatos de cada cliente e evita manter um parser de shell e um hook próprios. Veja [boas práticas para hooks](10-hooks-best-practices.md) quando precisar de uma integração adicional.

## Instale pelo método oficial

Com Homebrew disponível, a [documentação de instalação](https://github.com/rtk-ai/rtk/blob/develop/docs/guide/getting-started/installation.md) indica:

```bash
brew install rtk-ai/tap/rtk
rtk --version
```

Em outros ambientes, use o instalador ou binário de release indicado pelo projeto para o sistema e a arquitetura. Confirme a origem antes de instalar: um pacote chamado `rtk` em outro ecossistema pode ser uma ferramenta diferente.

Se já houver RTK instalado, identifique caminho, versão e gerenciador responsável antes de atualizar. Para uma instalação pelo tap acima, use `brew upgrade rtk-ai/tap/rtk`. Não instale outra cópia só para trocar o método.

## Configure cada agente

Faça backup das configurações existentes antes de inicializar a integração. A [lista oficial de agentes suportados](https://github.com/rtk-ai/rtk/blob/develop/docs/guide/getting-started/supported-agents.md) diferencia os mecanismos de cada cliente.

### Claude Code

```bash
rtk init --global
rtk init --show
```

Esse fluxo instala o hook e atualiza a configuração do Claude Code. Abra uma nova sessão e confira o registro. Se já houver um hook de proxy personalizado para a mesma finalidade, remova ou concilie apenas a integração redundante depois de confirmar suas referências.

### Codex CLI

```bash
rtk init --global --codex
```

O mecanismo atual registra o hook nativo de `PreToolUse` do Codex. O processador `rtk hook codex` devolve o comando reescrito por `updatedInput`; o Codex executa o comando e aplica suas próprias permissões. O hook não precisa executar uma cópia do comando antes disso.

A alternativa `rtk init --codex` instala no projeto atual. Escolha um escopo por necessidade: não registre o mesmo hook globalmente e no projeto sem conferir o efeito combinado. No setup da máquina, prefira o escopo global para preservar os projetos.

Reinicie o Codex e conclua a confiança de hooks quando o cliente pedir. Confira `rtk init --help` e a documentação da versão instalada se a opção não existir. O suporte da CLI não comprova que todas as superfícies desktop ou remotas executem o mesmo hook.

## Use comandos suportados ou saída completa

Sem hook ativo, prefixe os comandos suportados explicitamente:

```bash
rtk git status
rtk git diff
rtk git log -5 --oneline
```

Com um hook nativo ativo, proponha os comandos normais e deixe a integração reescrevê-los. Não acrescente um segundo wrapper ou outro hook de reescrita.

Para preservar a saída inteira ou usar um comando que não tem filtro específico, use `rtk proxy`:

```bash
rtk proxy git diff
rtk proxy git log -5 --oneline
```

Essa é a via de escape quando um resumo omite o detalhe necessário ao diagnóstico. Não use uma saída condensada como prova de que uma linha, aviso ou arquivo não existe sem conferir os dados completos quando a decisão depende disso.

Não prefixe cegamente pipelines, redirecionamentos, heredocs ou comandos compostos. O suporte de sintaxe varia; preserve a semântica do shell e consulte `rtk --help` para os comandos disponíveis.

## Meça e valide

```bash
rtk gain
rtk gain --history
```

As métricas mostram o histórico de uso observado pelo RTK. Elas descrevem redução de saída dos comandos, não o total de tokens da sessão, economia garantida na assinatura ou custo de todo o trabalho do modelo. Chamadas via `rtk proxy` preservam a saída e podem aparecer sem redução.

Para testar a integração:

1. Abra um terminal e uma sessão de agente novos.
2. Confirme `rtk --version` e o caminho do executável resolvido pelo shell.
3. Peça um `git status` em um repositório conhecido e confira que a chamada foi reescrita uma vez.
4. Confira o registro em `rtk gain --history`.
5. Execute `rtk proxy git status` e confira a saída completa.

Se o histórico não mostrar uso, investigue descoberta do binário, escopo do hook, confiança e suporte da superfície. Instalação no disco não comprova integração ativa.

## Pegadinhas que importam

- **Duplicação de hooks:** dois interceptadores podem aplicar wrappers duas vezes ou executar trabalho repetido. Inventarie configurações globais e do projeto antes de consolidar.
- **Saída incompleta:** filtros são úteis para leitura rotineira; diagnósticos, flags incomuns e verificações exatas podem exigir `rtk proxy`.
- **Permissões:** compactar saída não autoriza instalar, publicar, apagar ou acessar um recurso. O agente e o sistema continuam responsáveis pelas permissões.
- **Erro de comando:** preserve códigos de saída e evidência suficiente da falha. Um resumo aparentemente normal não transforma uma execução malsucedida em sucesso.
- **Atualização:** atualize o binário pelo gerenciador responsável e confira as instruções de integração da release. Preserve hooks personalizados com outra finalidade.

## Perguntas frequentes

**Preciso construir meu próprio proxy?**
Não. Instale o RTK público e use o mecanismo documentado para seu agente. Um hook personalizado só se justifica por uma necessidade que a integração oficial não cobre.

**Funciona sem hook?**
Sim. Use o prefixo explícito nos comandos suportados e `rtk proxy` quando precisar de saída completa.

**Instalar no Claude configura o Codex?**
Não. Configure e valide os dois clientes separadamente.

**Isso troca meu modelo ou provedor?**
O fluxo de CLI e hooks descrito aqui filtra saída de comandos. Não exige trocar o modelo, a autenticação ou o provedor do agente.

**Como entra no setup completo?**
RTK é obrigatório no [prompt de ambiente](../prompts/10-development-environment-setup.md). O agente deve instalar, integrar e validar, sem duplicar wrappers ou hooks.
