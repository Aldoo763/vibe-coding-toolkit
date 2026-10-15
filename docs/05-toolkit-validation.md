# Validar o toolkit

O toolkit não mantém aplicação nem dependências Next na raiz. Valide documentos e templates em ambiente separado:

```bash
node scripts/validate-docs.mjs
node scripts/validate-next.mjs
```

Use Node.js 24, npm, Git e rede. O [check de documentos](../scripts/validate-docs.mjs) verifica links locais, âncoras, destinos do manifesto e JSON. O [check do app](../scripts/validate-next.mjs) cria e remove um projeto temporário; dependências e recursos de teste ficam nele. Os checks ESLint rodam em processo filho, liberando extensões nativas antes da limpeza no Windows; o resultado final só é aprovado após remover o temporário. Nenhum dos dois chama modelos, instala hooks Git ou altera configuração global.

O [workflow](../.github/workflows/validate.yml) executa os dois em Ubuntu e Windows, com ações oficiais fixadas por commit e permissão somente de leitura. Preservar nomes públicos é parte do contrato: atualize callers, índices e templates no mesmo trabalho.

## O que a validação prova

| Check | Evidência |
|---|---|
| Documentação | Nove fontes/destinos do manifesto e links relativos ao destino; a LLM ainda deve preencher conteúdo específico |
| Skills | Nove fontes locais, nomes do frontmatter, lockfile e conteúdo Claude/Codex; links relativos ou cópias no Windows |
| ESLint | Perfis completo, leve e avançado carregam; negativos de tamanho inclusive em `index/types/constants`, Next, TypeScript, console, dados e Drizzle; barrels/tipos puros e sufixos de teste têm casos positivos |
| Servidor | Oito testes Vitest de ambiente, redação de logs e ciclo de vida de pool; compilação rejeita ambiente servidor em Client Component |
| SQL | Drizzle Kit gera sem URL; SQL de uma tabela de teste migra/reaplica em PGlite, com CRUD parametrizado e rollback |
| Aplicação | Lint, tipos, self-checks, testes e build; servidor de produção responde HTTP 200 com conteúdo esperado |
| Dependências | Auditoria de produção obrigatória; auditoria completa mostra contagem e advisories de desenvolvimento |
| Limpeza | Schema de teste restaurado, banco embarcado fechado, servidor próprio encerrado e diretório temporário removido |

PGlite executa PostgreSQL embarcado; não comprova conexão TCP, SSL ou configuração de um provedor. O ciclo de vida do `pg.Pool` usa mocks, enquanto o SQL roda de fato no engine. O app de teste não recebe tabelas de negócio fictícias como parte do template.

A presença de skills não prova sua execução pelo host. Publicação, serviços com credenciais, cobertura E2E e tarefas completas por todas as LLMs também não são garantias destes checks.

## Execução em 14 de outubro de 2026

O núcleo completo passou em macOS com Node.js 24.21.0 e npm, sem `DATABASE_URL`. Versões observadas:

| Componente | Versão |
|---|---|
| Next.js / React | 16.4.1 / 19.3.0 |
| Drizzle ORM / Kit | 0.45.4 / 0.31.11 |
| pg | 8.23.1 |
| Zod / Pino | 4.6.7 / 10.4.0 |
| Vitest | 5.0.4 |

Os oito testes, os três self-checks, lint, tipos, SQL/rollback, build, produção HTTP e nove skills passaram. O conflito entre os tipos Node 20 do scaffold e os peers do Vitest 5 foi resolvido com tipos Node 24, sem forçar peers. A configuração Vitest usa `.mts` para ESM explícito.

Essas versões são evidência, não um pin eterno. Em outro setup, confira documentação oficial/Context7, CLI, canais estáveis e peers; valide o conjunto e registre fontes/data. O lockfile do projeto guarda as versões efetivas.

### Evidências anteriores dos clientes e sistemas

A [execução nativa anterior](https://github.com/soumatheusgomes/vibe-coding-toolkit/actions/runs/38517653505), em Ubuntu e Windows, aprovou a base Next 16.4.0, skills locais, lint, tipos, regras, build, auditoria de produção e HTTP. Essa execução antecede o núcleo Drizzle descrito acima; consulte o workflow da revisão atual para a validação ampliada.

No macOS, a base anterior também teve extração Graphify determinística e consulta ao grafo, além de consultas reais Context7. Sessões novas de Claude Code e Codex descobriram as nove skills por APIs nativas sem iniciar turno de modelo. Isso comprova descoberta naquele ambiente; outros hosts precisam da própria verificação.

## Auditoria de dependências

A amostra completa retornou **zero vulnerabilidades de produção** e **nove entradas de desenvolvimento** (cinco altas e quatro moderadas), provenientes de dois advisories:

- [Braces / GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): esgotamento de pilha com padrões profundamente aninhados, pela cadeia de lint Next. Sem versão corrigida publicada na verificação.
- [Esbuild / GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99): CORS do servidor de desenvolvimento em versões até 0.24.2, pela cadeia legada `@esbuild-kit` do Drizzle Kit estável. Esbuild tem correção desde 0.25.0; o caminho instalado pelo Kit ainda traz a versão afetada. O bootstrap usa geração/migration, sem iniciar o servidor `serve` do esbuild.

O audit sugeriu downgrades de `eslint-config-next` para 14.2.35 e Drizzle Kit para 0.18.1; não foram aplicados à stack atual. Não force downgrades ou overrides sem compatibilidade comprovada, nem oculte alertas. Reavalie atualizações upstream e registre a decisão no app. Build/lint aprovados não significam auditoria completa zerada.

## Manutenção antes da entrega

Confira também TOML, sintaxe dos executáveis, `git diff --check`, escopo dos arquivos incluídos e ausência de dados privados, caches ou saídas de validação. Mudanças nas regras precisam do self-check e de um caso real no app temporário. Testes extras entram quando a mudança ou um achado exigir nova evidência.

## Três ciclos de revisão desta atualização

As revisões abaixo se referem à padronização do bootstrap, com contexto separado e correções antes do commit.

| Ciclo | Foco | Resultado |
|---|---|---|
| 1 | Núcleo, segurança e testes | Isolado `LOG_LEVEL` no teste do logger; falha reproduzida e corrigida, com suíte aprovada também em `silent`/`warn` |
| 2 | Organização, manifesto e callers | Sem novos achados materiais; perfis leve/completo e quatro documentos de raiz coerentes |
| 3 | Funcionamento e portabilidade | Sem achados bloqueantes/importantes; logs finais, links e diff conferidos |

As execuções ampliadas de Ubuntu/Windows ficam no [workflow da main](https://github.com/soumatheusgomes/vibe-coding-toolkit/actions/workflows/validate.yml?query=branch%3Amain). PostgreSQL externo, produção e descoberta de todos os hosts continuam fora dos checks automáticos.
