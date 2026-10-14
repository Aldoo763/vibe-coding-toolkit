# Validar o toolkit

O toolkit não mantém uma aplicação ou dependências Next na raiz. Valide seus templates em um projeto temporário separado, seguindo o [bootstrap](04-project-bootstrap.md). Use versões estáveis compatíveis e registre o resultado observado.

## Validação reproduzível

Com Node.js 24, npm e acesso à rede, execute na cópia do toolkit:

```bash
node scripts/validate-next.mjs
```

O [validador](../scripts/validate-next.mjs) cria e remove uma aplicação temporária, verifica regras reais Next/TypeScript/tamanho, lint, tipos, self-checks, build, auditoria de produção, HTTP e nove skills locais. No Windows, usa `--copy` para manter os arquivos portáveis. Não instala dependências na raiz nem modifica configurações globais de agente.

O [workflow](../.github/workflows/validate.yml) executa os mesmos checks em Ubuntu e Windows. Ele tem permissão somente de leitura, usa ações oficiais fixadas por commit e não configura proteção de branch, hooks Git, deploy ou chamadas a modelos.

## Checks de manutenção

1. Confira links locais e âncoras dos documentos, inclusive as âncoras públicas antigas do README.
2. Confira sintaxe dos templates JSON/TOML e dos arquivos executáveis.
3. Gere um projeto pelo comando oficial do guia; incorpore o preset Next, regras existentes e scripts canônicos.
4. Execute instalação local das skills, conferindo nome, origem, escopo, lockfile e links relativos dos clientes.
5. Execute `lint`, `typecheck`, `lint:rules` e `build` no projeto gerado.
6. Confira que o preset rejeita arquivo acima de 350 linhas e mantém regras Next/TypeScript. Verifique layouts com `src/` e com `app/` na raiz.
7. Inicie a aplicação em porta livre, confira HTTP e conteúdo esperado. Encerre o processo e os filhos criados pela validação.
8. Execute Graphify com `--code-only --no-cluster`, confira arquivos/nós e faça uma consulta. Não habilite backend LLM externo para esse teste.
9. Verifique descoberta em novas sessões dos clientes quando possível; registre separadamente a verificação dos arquivos e a execução pelo host.
10. Antes de um commit autorizado, execute `git diff --check`, revise todos os arquivos incluídos e confirme ausência de material privado ou saídas temporárias.

Atualize receitas e callers quando um comando, caminho ou template mudar. Não transforme validações em bloqueios Git ou instale hooks de commit/push.

## Validação em 14 de outubro de 2026

Executada em macOS com um scaffold temporário. Versões observadas:

| Componente | Versão |
|---|---|
| Node.js | 24.21.0 |
| pnpm | 12.11.2 |
| Next.js | 16.4.0 |
| React | 19.3.0 |
| Tailwind CSS | 4.3.3 |
| TypeScript | 5.9.3 |
| ESLint | 9.39.5, fornecido pelo scaffold oficial |
| eslint-config-next | 16.4.0 |

Resultados observados:

- Comando `create-next-app` e opções do guia executados com sucesso.
- Lint, tipos, três self-checks das regras e build de produção aprovados.
- Preset testado com página válida, arquivo acima do teto e violações Next/TypeScript; regra de tamanho ativa nos dois layouts.
- Oito skills web Vercel e `find-skills` instalados localmente para Codex/Claude; nove entradas de lockfile e nove links relativos Claude verificados.
- Servidor de produção respondeu HTTP 200 com a página esperada; processos do teste encerrados.
- Graphify determinístico gerou 90 nós e 102 arestas; consulta ao grafo retornou símbolos do corpus.
- Templates JSON e TOML parseados; links locais, âncoras e whitespace verificados.
- Consulta real ao Context7 utilizada para Next e Skills CLI durante a preparação.

Essas versões são evidência da execução, não um pin permanente da receita. Confira documentação e flags novamente em outro setup; não force atualização principal do ESLint só por um aviso de depreciação quando o scaffold mantiver uma combinação compatível.

Publicação de aplicações e integrações que exigem credenciais não fazem parte deste teste. A execução de tarefas completas por todas as LLMs não é uma garantia: a receita exige capacidades de arquivos/terminal e integrações oficialmente suportadas pelo cliente.

## Windows e Linux

A [execução nativa do workflow](https://github.com/soumatheusgomes/vibe-coding-toolkit/actions/runs/38517653505), no commit `6d4e5c09a313df0d10a8a633d773ef16c0785d41`, concluiu os dois jobs com sucesso em 14 de outubro de 2026.

| Runner | Node.js | npm | Next.js | Resultado |
|---|---|---|---|---|
| `ubuntu-latest` | 24.21.0 | 11.19.0 | 16.4.0 | Aprovado |
| `windows-latest` | 24.21.0 | 11.19.0 | 16.4.0 | Aprovado |

Ambos executaram o validador completo: nove skills locais e lockfile, preset Next/TypeScript/tamanho, lint, tipos, três self-checks, build, auditoria de produção e HTTP 200. No Linux, os links Claude são relativos; no Windows, as cópias possuem o mesmo conteúdo canônico. A validação removeu os projetos temporários e encerrou o servidor criado.

Esses jobs comprovam a base Next e os arquivos de skills nesses sistemas. A descoberta pelos hosts Claude/Codex e a execução Graphify descritas neste relatório foram verificadas separadamente em macOS.

## Descoberta em sessões novas

Em 14 de outubro de 2026, uma nova sessão nativa Claude Code retornou as nove skills pelo `supportedCommands()` do Agent SDK, com fontes `user`, `project` e `local`. Nenhum prompt foi enviado. Um processo novo do app-server Codex retornou as nove skills do projeto habilitadas por `skills/list`, com recarga do disco e sem iniciar um turno de modelo.

Isso comprova descoberta pelo host, além da presença dos arquivos. Não equivale a executar todas as tarefas descritas por cada skill; deploy e serviços externos continuam dependendo de solicitação e acesso pertinentes.

## Auditoria de dependências

Na amostra Next 16.4.0, a auditoria de produção (`npm audit --omit=dev`) retornou zero vulnerabilidades. A auditoria completa identificou cinco entradas na cadeia de lint `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`.

O advisory [GHSA-vfj7-8cjw-p6xm / CVE-2026-93687](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) afeta `braces` até 3.0.3 e não registra versão corrigida. O registry também informa 3.0.3 como versão mais recente. O `npm audit fix --force` sugeriu downgrade do `eslint-config-next` para 14.2.35; essa alteração não foi aplicada à base Next 16.4.0.

O risco conhecido fica explícito: processamento de padrões profundamente aninhados pode derrubar o processo que usa essa dependência. Não apresente lint/build aprovados como auditoria completa zerada. Reavalie a cadeia quando houver correção upstream e valide a atualização antes de incorporá-la. O workflow verifica a auditoria de produção e mantém os alertas da instalação visíveis nos logs.

## Cinco ciclos de revisão

Cada ciclo utilizou um revisor com contexto separado; os achados materiais foram corrigidos antes da publicação do toolkit.

| Ciclo | Foco | Correção |
|---|---|---|
| 1 | Escopo e contratos públicos | Preservação das dez âncoras antigas do README |
| 2 | Execução e configuração | Teto de linhas também em projetos sem `src/` |
| 3 | Portabilidade e instruções | Política de modelos uniforme; checklist e FAQ alinhados ao AGENTS compartilhado |
| 4 | Consistência dos callers | Caminhos do playbook manual e criação da pasta de regras |
| 5 | Revisão completa | Hooks Git opcionais também no setup modular de ESLint |

A integração real também encontrou e corrigiu a regra TypeScript que rejeitava `require()` nos arquivos CommonJS das regras locais. A exceção permanece restrita a esses arquivos.
