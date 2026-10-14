# Skills Vercel por projeto

[agent-skills](https://github.com/vercel-labs/agent-skills) contém as skills. [skills](https://github.com/vercel-labs/skills) fornece a CLI `npx skills` e a skill `find-skills`. São funções diferentes; instalar a CLI não instala a coleção automaticamente.

Catálogo conferido em **14 de outubro de 2026**, usando os `SKILL.md` e a listagem da CLI. Nomes abaixo são os campos `name`, que podem diferir dos nomes das pastas ou dos títulos do README. Confira novamente antes de atualizar.

## Catálogo completo

| Skill instalável | Uso e momento do fluxo | Bootstrap Next web |
|---|---|---|
| [`vercel-react-best-practices`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md) | Ao escrever/revisar React e Next: dados, execução paralela, bundle, servidor e renderização | Instalar; aplicar desde a implementação |
| [`vercel-composition-patterns`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/SKILL.md) | Ao estruturar componentes e suas APIs; reutilizar composição quando existir necessidade concreta | Instalar; não criar biblioteca de componentes antecipadamente |
| [`web-design-guidelines`](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) | Revisão de interface: acessibilidade, teclado, foco, formulários, estados e desempenho | Instalar; revisar telas antes de concluir mudanças de UI |
| [`writing-guidelines`](https://github.com/vercel-labs/agent-skills/blob/main/skills/writing-guidelines/SKILL.md) | Revisão de documentação e prosa conforme o handbook; ajustar ao idioma e ao público do projeto | Instalar; revisar documentação entregue |
| [`vercel-react-view-transitions`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-view-transitions/SKILL.md) | Quando houver transições solicitadas; conferir versão React/Next e movimento reduzido | Instalar; não ativar API experimental ou animações automaticamente |
| [`vercel-optimize`](https://github.com/vercel-labs/agent-skills/blob/main/skills/vercel-optimize/SKILL.md) | Após existir projeto Vercel e métricas: custo, cache, funções e desempenho | Instalar; executar auditoria quando houver acesso e tarefa pertinente |
| [`deploy-to-vercel`](https://github.com/vercel-labs/agent-skills/blob/main/skills/deploy-to-vercel/SKILL.md) | Publicação ou preview solicitados pelo usuário; conferir método e conta de destino | Instalar; não executar durante o bootstrap |
| [`vercel-cli-with-tokens`](https://github.com/vercel-labs/agent-skills/blob/main/skills/vercel-cli-with-tokens/SKILL.md) | Operações Vercel que já utilizem autenticação por token | Instalar; usar apenas quando esse método for escolhido, sem gravar tokens no repo/chat |
| [`vercel-react-native-skills`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-native-skills/SKILL.md) | React Native e Expo: listas, gestos, animação e APIs nativas | Opcional; instalar somente para plataforma mobile |
| [`find-skills`](https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md) | Descobrir uma capacidade adicional quando a base instalada não atender a uma necessidade | Instalar; descoberta não autoriza instalar extras indiscriminadamente |

Este catálogo registra as **oito skills web de `agent-skills` mais `find-skills`** verificadas nesta revisão. Em cada bootstrap, confira o upstream: incorpore skills web oficiais novas pertinentes, ajuste nomes removidos/renomeados e registre a escolha. Não trate essa quantidade como contrato eterno. A skill mobile fica documentada, sem trazer recomendações de Expo para uma aplicação web. Skills de deploy ficam disponíveis para tarefas futuras; nenhum comando de publicação roda no setup.

## Instalação local

Na raiz do projeto, confira o catálogo atual:

```bash
npx --yes skills@latest add vercel-labs/agent-skills --list
npx --yes skills@latest add vercel-labs/skills --list
```

Para um projeto utilizado com Claude Code e Codex:

```bash
npx --yes skills@latest add vercel-labs/agent-skills --skill vercel-react-best-practices vercel-composition-patterns web-design-guidelines writing-guidelines vercel-react-view-transitions vercel-optimize deploy-to-vercel vercel-cli-with-tokens --agent codex claude-code --yes
npx --yes skills@latest add vercel-labs/skills --skill find-skills --agent codex claude-code --yes
```

Sem `--global`/`-g`: instalação pertence ao projeto. `--agent` seleciona clientes, não modelos. Se usar apenas um cliente, selecione apenas ele; para outro agente suportado, use seu identificador documentado pela CLI. Evite `--all`, que também seleciona plataformas e clientes não necessários.

Adicional para projetos React Native/Expo:

```bash
npx --yes skills@latest add vercel-labs/agent-skills --skill vercel-react-native-skills --agent codex claude-code --yes
```

O layout padrão usa `.agents/skills/` como conteúdo canônico e links nos caminhos dos clientes quando necessário. Confira os caminhos efetivos da versão instalada. Versione conteúdo, links **relativos** e `skills-lock.json`; preserve atribuição/licenças dos arquivos. Não use links absolutos para caches do computador. No Windows, acrescente `--copy` aos comandos para evitar junctions com destinos absolutos; use o mesmo modo em clientes sem suporte a links. Registre essa escolha e atualize as cópias pela CLI.

Antes de instalar, inventarie skills e plugins locais/globais. Uma skill com o mesmo `name` pode aparecer duplicada; no Codex, arquivos homônimos não são mesclados. Resolva sobreposição no escopo do projeto, sem apagar preferências globais de outros projetos. Fonte: [descoberta oficial do Codex](https://learn.chatgpt.com/docs/build-skills).

## Fluxo de uso

1. **Entender:** `PRODUCT.md`, Context7 para APIs atuais e Superpowers quando o pedido exigir design/plano.
2. **Construir:** Ponytail mantém escopo; `vercel-react-best-practices` orienta Next/React; `vercel-composition-patterns` entra em decisões de componentes.
3. **Revisar:** lint, tipos, testes pertinentes e build; `web-design-guidelines` para UI e `writing-guidelines` para documentação.
4. **Refinar quando solicitado:** `vercel-react-view-transitions` para animações compatíveis; `find-skills` se faltar uma capacidade concreta.
5. **Publicar quando solicitado:** `deploy-to-vercel` ou `vercel-cli-with-tokens`, conforme o método escolhido. Depois, `vercel-optimize` trabalha com métricas disponíveis.

Instruções explícitas do usuário prevalecem sobre padrões das skills. Nenhuma skill autoriza escolher outro modelo, exigir um agente específico, criar dependências preventivas ou publicar sem pedido.

## Verificar e atualizar

```bash
npx --yes skills@latest list --agent codex claude-code
```

Compare a lista com o catálogo, confira frontmatter e links, e registre o resultado em `docs/setup.md`. Abra uma nova sessão de cada cliente usado e confira descoberta quando o host permitir. Arquivos presentes comprovam instalação; não comprovam execução da skill pelo cliente.

Para uma atualização deliberada do projeto:

```bash
npx --yes skills@latest update --project --yes
```

Confira `--help` antes de usar opções em outra versão. Não presuma que comandos antigos, como `skills check`, existam na CLI atual. Revise diff e `skills-lock.json`, valide os fluxos afetados e mantenha a versão/revisão observada no relatório. Não atualize skills globais como efeito de uma atualização local.
