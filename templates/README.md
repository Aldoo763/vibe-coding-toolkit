# Templates

Copie apenas a peça necessária. Os arquivos são fontes para adaptação, não uma aplicação pronta nem um instalador independente. O [bootstrap](../docs/04-project-bootstrap.md) define a ordem; os [padrões](../docs/06-project-defaults.md), as decisões.

Em projeto existente, o [prompt 12](../docs/prompts/12-existing-project-setup.md) concilia estes templates com a estrutura, as ferramentas e os documentos já adotados.

| Pasta ou arquivo | Uso | Destino |
|---|---|---|
| [project-docs/manifest.json](project-docs/manifest.json) | Mapa único da documentação inicial | Quatro arquivos na raiz e cinco em `docs/` |
| [product.md.template](product.md.template) | Produto, MVP, hipóteses e aceite | `PRODUCT.md`; caminho da fonte preservado por compatibilidade |
| [AGENTS.md.template](AGENTS.md.template) e [CLAUDE.md.template](CLAUDE.md.template) | Instruções compartilhadas e ponte Claude | Raiz, conciliando instruções existentes |
| [next/](next/) | Ambiente, logger, conexão Drizzle, helper UI e testes | Mesma árvore no app; remover apenas o sufixo `.example`, preservando `.env.example` |
| [eslint/next-app.config.mjs.example](eslint/next-app.config.mjs.example) | Perfil completo para o núcleo com Drizzle | `eslint.config.mjs` e pasta `eslint-rules/` |
| [eslint/next.config.mjs.example](eslint/next.config.mjs.example) | Perfil Next leve, sem exigir logger/banco | `eslint.config.mjs` e pasta `eslint-rules/` |
| [eslint/eslint.config.mjs.example](eslint/eslint.config.mjs.example) e [perfil com tipos](eslint/eslint.typed.config.mjs.example) | Adoção avançada em base existente | Incorporar ao lint existente |
| [eslint/verify.mjs](eslint/verify.mjs) | Self-check das regras locais | `scripts/verify-quality-rules.mjs` |
| [project/](project/) | Context7 por cliente e exclusões Graphify | `.codex/config.toml`, `.mcp.json` ou `.graphifyignore`, quando necessários |
| [environment-manifest.json.example](environment-manifest.json.example) | Inventário do setup da máquina | Conforme o [guia global](../docs/03-environment-setup.md) |
| [settings.json.example](settings.json.example) e [hooks/](hooks/) | Exemplos opcionais de hooks do cliente | Somente na integração escolhida; não são hooks Git |
| [rules/](rules/) | Protocolo de delegação quando utilizado | Instruções pertinentes do projeto |

Preencha documentos com fatos do projeto; remova instruções e placeholders. Os links nos templates de documentos são relativos ao **destino**, definido no manifesto. Os módulos Next precisam das dependências e scripts do guia; não os copie para a raiz deste toolkit.
