# Criar um projeto com o toolkit

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

1. Se o toolkit não estiver disponível localmente, obtenha uma cópia em diretório temporário, fora da aplicação, e registre a revisão utilizada. Leia docs/04-project-bootstrap.md, docs/tools/16-vercel-skills.md e os templates referenciados. Use arquivos da mesma revisão; não misture versões nem copie o repositório inteiro para a aplicação.
2. Inspecione cliente, instruções, arquivos, runtime, gerenciador e ferramentas já disponíveis. Reutilize instalações globais; configure no projeto tudo que tiver escopo local suportado. Não altere permissões, provedores ou preferências globais durante este setup.
3. Gere product.md a partir de templates/product.md.template. Registre problema, público, MVP, fluxos, requisitos, restrições, hipóteses e critérios de aceitação. Use hipóteses reversíveis para detalhes ausentes; marque decisões externas indispensáveis como pendentes. Não invente funcionalidades, integrações ou credenciais.
4. Gere a base pela versão estável do create-next-app, com App Router, TypeScript, Tailwind, ESLint, src/ e alias @/*. Consulte Next pelo Context7 e confira flags da CLI. Preserve o gerenciador existente; prefira pnpm se for novo e ele estiver disponível. Em destino não vazio, use scaffold temporário e incorpore sem sobrescrever arquivos. Não regenere uma aplicação Next existente.
5. Instale localmente as oito skills web de vercel-labs/agent-skills e find-skills de vercel-labs/skills, conforme o catálogo. Use os nomes do frontmatter, confira --list e selecione os agentes em uso. Inclua todas as skills web do catálogo, mesmo as de uso posterior; instalar uma skill não executa suas ações. React Native/Expo só entra se o produto tiver essa plataforma. Versione skills locais e skills-lock.json; evite duplicatas globais/locais com o mesmo nome.
6. Preencha AGENTS.md com produto, stack, comandos e convenções. Preserve instruções geradas pelo Next. No Claude Code, CLAUDE.md importa AGENTS.md. Em outros clientes, use o formato documentado; não copie settings do Claude para Codex ou vice-versa.
7. Confira Ponytail full, Caveman, Superpowers, RTK, Context7 e Graphify. Reutilize plugins/hooks funcionais do cliente. Se algum componente estiver ausente, registre a pendência e configure a alternativa local oficialmente suportada quando possível. Prefira escopo de projeto para plugins ausentes quando o cliente o suportar oficialmente; uma integração global funcional deve ser reutilizada. Não reinstale binários globais automaticamente nem copie caches pessoais.
8. Aplique templates/eslint/next.config.mjs.example sobre os presets oficiais; copie eslint-rules/ e o self-check existente. Ative o teto de 350 linhas. Configure lint, typecheck, lint:rules, build e check com o gerenciador real. Não crie logger, banco ou arquitetura apenas para ligar regras opcionais.
9. Configure Context7 local somente se faltar conexão ativa, conciliando arquivos existentes sem segredos. Copie e adapte as exclusões Graphify; gere o grafo inicial com extração de código sem LLM externo quando a CLI suportar. Não instale hooks Git ou automações de refresh.
10. Execute os checks e auditorias de dependências, distinguindo produção de desenvolvimento e registrando advisories sem correção disponível. Não force downgrades nem declare segurança absoluta. Valide a aplicação em uma porta livre e registre docs/setup.md com versões, revisão, escopos, componentes e evidências. Confira descoberta de skills e consulta real ao Context7 quando o host permitir; diferencie arquivos presentes de integrações testadas. Encerre apenas processos e recursos temporários criados pelo setup. Adapte comandos ao shell real; no Windows use o modo --copy da CLI de skills para evitar junctions com caminhos absolutos.

Este pedido autoriza implementação do bootstrap e validações locais. Apresente decisões relevantes e avance sem novas aprovações de design/plano. Faça perguntas apenas quando faltar informação indispensável para evitar perda de dados ou uma implementação incorreta; continue etapas independentes. Uma escolha externa pendente não autoriza inventar seu resultado.

Ponytail full: menor solução completa. Caveman: conversa concisa no idioma do usuário, sem reduzir clareza; código, documentação e commits com redação normal. Superpowers: processo proporcional ao escopo e à autorização já concedida. Context7: documentação atual, sem segredos nas consultas. RTK: comandos suportados, sem wrapper duplicado. Graphify/Caveman: preserve cliente nativo, modelo e autenticação da sessão; não troque provedor nem ative cobrança por API ou proxy silenciosamente. Passe o modelo explicitamente se houver delegação suportada.

Não adicione bloqueios de push em main, exigência de branch/worktree, pre-commit/pre-push ou proteções Git. Não publique, faça push, contrate serviços, envie mensagens ou implemente todo o produto por efeito deste bootstrap. Entregue a base configurada, evidências, pendências, comando para rodar e próxima tarefa do MVP.
```

## Uso por partes

Para adotar apenas uma peça, use o catálogo e os templates correspondentes. Exemplos: [skills Vercel](../tools/16-vercel-skills.md), [quality gates](08-eslint-quality-gates-install.md), [ambiente global](10-development-environment-setup.md) e [instruções compartilhadas](../../templates/AGENTS.md.template).
