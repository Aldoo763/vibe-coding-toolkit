# Padrões de um projeto novo

Esta é a referência de decisões para o [bootstrap](04-project-bootstrap.md). Os padrões dão uma base coerente; requisitos explícitos e evidências atuais podem justificar adaptações. Registre a escolha no projeto, sem instalar ferramentas apenas porque existem na referência.

Para adoção ou atualização em aplicação existente, siga o [prompt 12](prompts/12-existing-project-setup.md). Preserve stack e equivalentes funcionais; estes defaults de projeto novo não autorizam uma migração.

## Núcleo padrão

| Área | Escolha inicial | Limite |
|---|---|---|
| Aplicação | Next.js estável, App Router, TypeScript strict, Tailwind, ESLint, `src/`, `@/*` | Preserve a aplicação e o gerenciador existentes |
| Persistência | Drizzle ORM + PostgreSQL, driver `pg`, runtime Node.js | Produto explicitamente sem persistência pode omitir banco; registre o motivo em `PRODUCT.md` |
| Validação | Zod em ambiente, entradas e respostas externas | Não confunda tipos TypeScript com validação em runtime |
| Código servidor | `server-only` em ambiente, logger e cliente de banco | Segredos nunca entram em `NEXT_PUBLIC_*` ou componentes de cliente |
| Logs | Pino, campos estruturados e remoção de segredos conhecidos | Redação de campos não limpa segredos escritos numa mensagem livre |
| Testes | Vitest em Node para lógica e fronteiras do servidor | DOM, Testing Library e E2E entram com fluxos que precisem deles |
| UI | HTML acessível, mobile first, Tailwind e helper `cn` | UI kits, tabelas e bibliotecas de formulário dependem da interface real |
| Qualidade | Presets Next/TypeScript, teto de 350 linhas, logger e fronteira de dados | Regras Drizzle protegem `update/delete` sem `where`; não substituem revisão |
| Agentes | `AGENTS.md` compartilhado, ponte Claude, skills oficiais locais | Preserve cliente, modelo e autenticação; configure cada host no formato suportado |

Alinhe os tipos Node ao runtime e aos peers das ferramentas; preserve combinações suportadas, sem forçar a instalação. O perfil completo de lint e os comandos estão no [guia de execução](04-project-bootstrap.md#6-aplicar-eslint-e-comandos).

Os [templates executáveis](../templates/next/) implementam o núcleo servidor. Use as versões estáveis compatíveis verificadas na execução; não selecione `@beta`, `@rc`, `@canary` ou versões principais só por serem mais recentes. Uma documentação oficial pode mostrar um exemplo de prerelease: confira o canal no registry antes de copiar o comando.

### Banco e arquitetura

- Drizzle é o ORM padrão de uma aplicação nova com dados. Outro ORM ou banco exige uma razão concreta do produto, registrada em `PRODUCT.md` e `docs/architecture.md`.
- Não migre um projeto existente para Drizzle por efeito deste bootstrap. Registre a stack atual e trate uma migração como trabalho próprio.
- Mantenha schema em `src/db/schema/`, SQL versionado em `drizzle/` e uma única entrada de conexão em `src/db/index.ts`.
- Inicialize um pool limitado e reutilizável somente quando o banco for usado. `lint`, tipos, testes sem I/O e o build inicial não precisam de credenciais reais.
- Valide `DATABASE_URL` antes da conexão, sem incluir seu valor nos erros. Use `.env.local` ignorado e `.env.example` sem credenciais reais.
- Para migrations, prefira a conexão direta quando o provedor a exigir. O template aceita `DATABASE_URL_UNPOOLED` e usa `DATABASE_URL` como fallback.
- Gere SQL com `db:generate`, revise o diff e só aplique em um destino conhecido e autorizado. Não execute migrations no import, no build ou em cada request. Não adicione `db:push` ao fluxo padrão.
- Prefira mudanças aditivas e preserve migrations aplicadas. Não reescreva SQL para parecer idempotente sem entender o histórico do banco.
- Derive tipos com `$inferSelect`/`$inferInsert`. Escolha chaves e timestamps conforme o modelo; não imponha um formato de ID a todo produto.
- Faça consultas parametrizadas, selecione colunas necessárias, limite listagens e evite N+1. Entregue DTOs que exponham apenas os campos permitidos.
- Use transações quando uma operação exigir atomicidade e o driver suportar. Uma limitação de um driver HTTP não vira proibição global.
- Separe acesso a dados da apresentação. Crie módulos por funcionalidade quando o primeiro fluxo existir; não gere camadas DDD vazias ou wrappers para cada chamada.

O driver `pg` usa Node.js. Se o destino exigir Edge ou um driver HTTP, adapte e teste o contrato. Em Vercel Functions, confira a orientação vigente de pooling e `attachDatabasePool`; em outros hosts, siga o ciclo de vida equivalente. Dimensione o pool pelo limite do banco e pela concorrência de instâncias.

Fontes: [Drizzle PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql), [migrations](https://orm.drizzle.team/docs/migrations), [ESLint Drizzle](https://orm.drizzle.team/docs/eslint-plugin), [pooling node-postgres](https://node-postgres.com/features/pooling) e [pooling Vercel](https://vercel.com/kb/guide/connection-pooling-with-functions).

### Validação, logs e interface

Valide dados recebidos de formulário, rota e serviço externo com Zod. Construa inputs e respostas com campos permitidos; não repasse um body inteiro ao banco. Mensagens de validação ficam junto do campo. Operações assíncronas oferecem estado de espera e protegem contra submissões duplicadas.

Use o logger do servidor com contexto útil e limitado. Não registre tokens, cookies, URL de conexão, corpo completo de requisição ou dados pessoais indiscriminadamente. A lista inicial de redação é uma defesa adicional; adapte-a aos nomes e estruturas efetivos. Erros públicos não expõem stack ou configuração interna.

Prefira Server Components e limites de cliente pequenos. Ative cache, React Compiler e outras opções de acordo com a documentação da versão, o comportamento exigido e os testes. Preserve semântica, teclado, foco visível, contraste, estados de erro e movimento reduzido.

Fontes: [Zod](https://zod.dev/), [Pino](https://github.com/pinojs/pino/blob/main/docs/redaction.md), [Vitest](https://vitest.dev/guide/) e as [skills Vercel](tools/16-vercel-skills.md).

## Documentação criada no bootstrap

Crie quatro arquivos na raiz e os cinco documentos de apoio em `docs/`. O [manifesto](../templates/project-docs/manifest.json) aponta suas fontes. Os templates orientam o conteúdo: a LLM deve preenchê-los com a descrição do produto, o código gerado, comandos executados e decisões efetivas. Não entregue apenas placeholders copiados.

| Arquivo | Fonte | Responsabilidade |
|---|---|---|
| `PRODUCT.md` | [Produto](../templates/product.md.template) | Problema, público, MVP, restrições, hipóteses e aceite |
| `README.md` | [README](../templates/project-docs/README.md.template) | Entrada do projeto, execução e mapa dos documentos |
| `AGENTS.md` | [Instruções](../templates/AGENTS.md.template) | Comandos, convenções e regras compartilhadas com agentes |
| `CLAUDE.md` | [Ponte](../templates/CLAUDE.md.template) | Importar `AGENTS.md`, sem duplicar políticas |
| `docs/architecture.md` | [Código](../templates/project-docs/architecture.md.template) | Estrutura observada, fronteiras, dados e decisões técnicas |
| `docs/design.md` | [Design](../templates/project-docs/design.md.template) | Direção visual, componentes existentes e acessibilidade |
| `docs/onboarding.md` | [Onboarding](../templates/project-docs/onboarding.md.template) | Preparação local, ambiente, banco e primeiro fluxo de trabalho |
| `docs/quality.md` | [Qualidade](../templates/project-docs/quality.md.template) | O que cada check prova e quando executá-lo |
| `docs/setup.md` | [Evidências](../templates/project-docs/setup.md.template) | Revisão do toolkit, fontes, versões, escopos e resultados |

`PRODUCT.md` é o nome canônico, inclusive nas referências. O caminho histórico `templates/product.md.template` permanece válido; o arquivo de destino usa maiúsculas.

Em projeto existente, preserve conteúdo útil. Se houver `product.md`, consolide-o em `PRODUCT.md`, com rename intermediário em filesystem indiferente a maiúsculas. Se existirem duas versões distintas, compare e incorpore conteúdo sem sobrescrever nenhuma às cegas. Atualize os links no mesmo trabalho.

Registre somente estrutura implementada em `docs/architecture.md`; planos ficam identificados como planos. `docs/design.md` pode começar com a direção visual e critérios de acessibilidade, sem inventar um catálogo de componentes. `docs/quality.md` não declara testes ou cobertura inexistentes. Outros documentos entram quando têm conteúdo e uma responsabilidade própria.

## Recursos conforme o produto

| Necessidade confirmada | Próxima escolha |
|---|---|
| Login, papéis, equipe ou multi-tenancy | Escolher autenticação e testar autorização no servidor |
| Estado remoto interativo ou tabela complexa | Avaliar TanStack Query/Table; preservar fetch servidor quando suficiente |
| Formulário complexo | Avaliar React Hook Form com Zod; formulário simples pode usar os recursos nativos |
| UI compartilhada | Avaliar componentes acessíveis e o sistema visual escolhido, sem instalar um catálogo inteiro |
| Cache, rate limit, tarefas ou eventos | Escolher serviço/driver após definir consistência, operação e custo |
| Valores monetários | Definir unidade, precisão, arredondamento e testes; evitar aritmética binária inexata |
| Internacionalização, analytics ou observabilidade externa | Definir público, dados enviados, privacidade e credenciais necessárias |

Não copie integrações, regras financeiras, hooks, filas locais de validação, métricas ou caches da aplicação usada como referência. O padrão útil é a intenção da regra, adaptada ao novo produto.

## Como manter a receita atual

A receita não se atualiza sozinha. Cada execução do bootstrap deve:

1. Obter uma revisão única do toolkit e inspecionar o projeto antes de decidir.
2. Consultar Context7 e documentação oficial dos componentes utilizados. Comparar exemplos com o canal estável do registry e a CLI instalada.
3. Revisar os defaults contra o produto, runtime, hospedagem e recomendações atuais. Sugerir e aplicar melhorias compatíveis dentro do setup autorizado, registrando motivo e fonte.
4. Resolver e testar um conjunto compatível; guardar versões efetivas no lockfile. Não substituir uma versão estável por prerelease apenas para seguir um exemplo.
5. Conferir o catálogo oficial de skills em vez de tratar nomes e quantidades deste toolkit como uma lista eterna. Registrar as instaladas e sua origem.
6. Criar os documentos a partir do estado efetivo. Registrar data, fontes e justificativas em `docs/setup.md`, com **validado**, **configurado sem execução** ou **pendente**.
7. Rodar checks e revisar auditorias. Uma sugestão do registry não autoriza downgrade incompatível ou correção com perda de dados.

Depois do bootstrap, uma alteração de comportamento, comando, schema ou fronteira atualiza o documento responsável no mesmo trabalho. Consulte evidências atuais ao modificar uma decisão; não transforme uma recomendação antiga em regra absoluta. Melhorias que exigem migração ampla, serviços pagos, publicação ou dados de produção precisam da autorização pertinente.

Em uma cópia do toolkit, uma descoberta pode virar atualização da receita e seus checks. Ao iniciar outra aplicação a partir do link público, registre a adaptação nessa aplicação; esse acesso não autoriza publicar mudanças no repositório de origem.
