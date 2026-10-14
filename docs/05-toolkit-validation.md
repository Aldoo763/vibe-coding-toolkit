# Validar o toolkit

O toolkit não mantém uma aplicação ou dependências Next na raiz. Valide seus templates em um projeto temporário separado, seguindo o [bootstrap](04-project-bootstrap.md). Use versões estáveis compatíveis e registre o resultado observado.

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

Não foram testados Windows/Linux, execução completa por outras LLMs ou descoberta numa nova sessão de cada cliente. Presença, frontmatter e links das skills foram verificados; isso não comprova ativação pelo host. Publicação de aplicações e integrações que exigem credenciais não fazem parte deste teste.

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
