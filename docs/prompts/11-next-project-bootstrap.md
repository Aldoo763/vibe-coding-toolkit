# Criar um projeto com o toolkit

Para uma aplicação já existente, use o [prompt 12](12-existing-project-setup.md): ele adota ou atualiza o conjunto aplicável sem gerar outra base.

## Atalho

Cole no agente com acesso ao diretório de destino:

```text
Leia https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/main/docs/prompts/11-next-project-bootstrap.md e execute o setup neste diretório.
Projeto: [nome, problema, público, fluxos principais e restrições].
```

Se estiver com o toolkit aberto, use o arquivo local e crie a aplicação fora dele. A publicação da receita não publica automaticamente os projetos gerados.

## Prompt

```text
Prepare a base de um novo projeto usando o Vibe Coding Toolkit:
https://github.com/soumatheusgomes/vibe-coding-toolkit

Use a descrição de projeto fornecida junto deste prompt. O destino é o diretório indicado pelo usuário ou o diretório atual do projeto. Se o diretório atual for o próprio toolkit, crie uma pasta irmã com nome derivado do projeto. Preserve arquivos e alterações existentes.

1. Se o toolkit não estiver disponível localmente, obtenha uma cópia em diretório temporário, fora da aplicação, e registre a revisão utilizada. Leia docs/04-project-bootstrap.md, docs/06-project-defaults.md, docs/tools/16-vercel-skills.md e templates/README.md. Siga templates/project-docs/manifest.json para a documentação. Use arquivos da mesma revisão; não misture versões nem copie o repositório inteiro para a aplicação.
2. Inspecione cliente, instruções, arquivos, runtime, gerenciador e ferramentas já disponíveis. Reutilize instalações globais; configure no projeto tudo que tiver escopo local suportado. Não altere permissões, provedores ou preferências globais durante este setup.
3. Gere PRODUCT.md a partir de templates/product.md.template. Registre problema, público, MVP, fluxos, requisitos, restrições, hipóteses e critérios de aceitação. Use hipóteses reversíveis para detalhes ausentes; marque decisões externas indispensáveis como pendentes. Não invente funcionalidades, integrações ou credenciais.
4. Gere a base pela versão estável do create-next-app, com App Router, TypeScript, Tailwind, ESLint, src/ e alias @/*. Consulte as APIs/setup pelo Context7 e fontes oficiais atuais; confira flags, canais estáveis e peer dependencies. Revise os defaults contra produto/runtime/host e aplique melhorias compatíveis no escopo autorizado, registrando motivo, fonte e data. Não copie prereleases de exemplos sem avaliar o canal. Preserve o gerenciador existente; prefira pnpm se for novo e ele estiver disponível. Em destino não vazio, use scaffold temporário e incorpore sem sobrescrever arquivos. Não regenere uma aplicação Next existente.
5. Instale o núcleo padrão conforme o guia: Drizzle ORM + PostgreSQL/pg para persistência nova, Zod, server-only, Pino, clsx/tailwind-merge e Vitest. Copie/adapte templates/next/, preservando .env.example; alinhe @types/node ao runtime e peers, e @next/env ao Next. Pool limitado, reutilizável e lazy; build/testes iniciais sem credenciais. Não invente tabelas; gere/revise SQL e aplique migrations só em destino autorizado. Preserve banco/ORM existente; omita persistência apenas quando o produto não precisar dela, com justificativa. Autenticação, serviços e bibliotecas adicionais dependem do produto.
6. Instale localmente as skills web de vercel-labs/agent-skills e find-skills de vercel-labs/skills, conforme o catálogo e o upstream atual. Ajuste nomes removidos/renomeados e skills novas pertinentes; não trate a lista como eterna. Use os nomes do frontmatter, confira --list e selecione os agentes em uso. Inclua todas as skills web do catálogo, mesmo as de uso posterior; instalar uma skill não executa suas ações. React Native/Expo só entra se o produto tiver essa plataforma. Versione skills locais e skills-lock.json; evite duplicatas globais/locais com o mesmo nome.
7. Gere/preencha os nove documentos do manifesto: README.md, PRODUCT.md, AGENTS.md e CLAUDE.md na raiz; docs/architecture.md, docs/design.md, docs/onboarding.md, docs/quality.md e docs/setup.md. Use fatos do produto/código, sem placeholders, duplicação ou alegações de checks inexistentes. Consolide product.md antigo em PRODUCT.md com segurança em filesystem indiferente a maiúsculas. Preserve instruções geradas pelo Next. CLAUDE.md importa AGENTS.md em uma linha. Em outros clientes, use o formato documentado; não copie settings do Claude para Codex ou vice-versa.
8. Confira Ponytail full, Caveman, Superpowers, RTK, Context7 e Graphify. Reutilize plugins/hooks funcionais do cliente. Se algum componente estiver ausente, registre a pendência e configure a alternativa local oficialmente suportada quando possível. Prefira escopo de projeto para plugins ausentes quando o cliente o suportar oficialmente; uma integração global funcional deve ser reutilizada. Não reinstale binários globais automaticamente nem copie caches pessoais.
9. Aplique templates/eslint/next-app.config.mjs.example e copie toda a pasta eslint-rules/ (inclusive next-base.mjs) e o self-check. Ative presets oficiais, teto de 350 linhas, logger, fronteira de dados e guardas Drizzle. Em adoção parcial/sem persistência, use o perfil leve apropriado, sem instalar ORM só para lint. Configure lint, typecheck, lint:rules, test, test:watch, build, check e, quando houver banco, db:generate/db:migrate. Não conecte nem migre no check/build.
10. Configure Context7 local somente se faltar conexão ativa, conciliando arquivos existentes sem segredos. Copie e adapte as exclusões Graphify; gere o grafo inicial com extração de código sem LLM externo quando a CLI suportar. Não instale hooks Git ou automações de refresh.
11. Execute os checks e auditorias de dependências, distinguindo produção de desenvolvimento e registrando advisories sem correção disponível. Não force downgrades nem declare segurança absoluta. Valide testes de fronteiras e geração SQL sem credenciais; distinga mocks, engine SQL embarcado e conexão real. Valide a aplicação em uma porta livre e registre docs/setup.md com versões, revisão, escopos, componentes e evidências. Confira descoberta de skills e consulta real ao Context7 quando o host permitir; diferencie arquivos presentes de integrações testadas. Encerre apenas processos e recursos temporários criados pelo setup. Adapte comandos ao shell real; no Windows use o modo --copy da CLI de skills para evitar junctions com caminhos absolutos.

Este pedido autoriza implementação do bootstrap e validações locais. Apresente decisões relevantes e avance sem novas aprovações de design/plano. Faça perguntas apenas quando faltar informação indispensável para evitar perda de dados ou uma implementação incorreta; continue etapas independentes. Uma escolha externa pendente não autoriza inventar seu resultado.

Ponytail full: menor solução completa. Caveman: conversa concisa no idioma do usuário, sem reduzir clareza; código, documentação e commits com redação normal. Superpowers: processo proporcional ao escopo e à autorização já concedida. Context7: documentação atual, sem segredos nas consultas. RTK: comandos suportados, sem wrapper duplicado. Graphify/Caveman: preserve cliente nativo, modelo e autenticação da sessão; não troque provedor nem ative cobrança por API ou proxy silenciosamente. Passe o modelo explicitamente se houver delegação suportada.

Não adicione bloqueios de push em main, exigência de branch/worktree, pre-commit/pre-push ou proteções Git. Não publique, faça push, contrate serviços, envie mensagens ou implemente todo o produto por efeito deste bootstrap. Atualize o documento responsável quando comportamento, comandos, schema ou decisões mudarem; recomendações antigas podem ser revistas com evidência atual. Entregue a base configurada, documentação preenchida, evidências, pendências, comando para rodar e próxima tarefa do MVP.
```

## Uso por partes

Para adotar apenas uma peça, use o catálogo e os templates correspondentes. Exemplos: [skills Vercel](../tools/16-vercel-skills.md), [quality gates](08-eslint-quality-gates-install.md), [ambiente global](10-development-environment-setup.md) e [instruções compartilhadas](../../templates/AGENTS.md.template).
