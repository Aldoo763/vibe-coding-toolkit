<a id="o-que-é"></a>
<a id="por-que-usar"></a>

# Graphify

[Graphify](https://github.com/Graphify-Labs/graphify) transforma código e documentos em um grafo consultável. A CLI é `graphify`; o pacote Python é **`graphifyy`**, com dois “y”. Ele combina extração estrutural, relações semânticas e exportações para investigação do projeto.

<a id="como-instalar"></a>
<a id="1-instale"></a>

## Global e projeto

A CLI e a skill do agente pertencem ao ambiente/cliente. O projeto mantém `.graphifyignore` e a saída `graphify-out/`. No [bootstrap Next](../04-project-bootstrap.md), instalações globais funcionais são reutilizadas; não copie skills de um cache pessoal nem instale hooks Git.

Instalação isolada do pacote, quando solicitada:

```bash
uv tool install graphifyy
# Alternativa: pipx install graphifyy
```

Escolha um método. Confira a CLI antes de integrar:

```bash
GRAPHIFY_NO_AUTO_REFRESH=1 graphify --version
GRAPHIFY_NO_AUTO_REFRESH=1 graphify --help
```

A origem documenta `graphify install` para integrar clientes. Confira flags e efeitos da versão instalada antes de executar: instalações podem modificar instruções e hooks. No starter, prefira a integração global já descoberta e instruções compartilhadas concisas. Não use uma instalação automática para substituir adaptações locais ou acrescentar travas.

<a id="tutorial-passo-a-passo"></a>
<a id="2-rode-o-pipeline-completo"></a>
<a id="3-veja-o-que-foi-gerado"></a>

## Código sem chamada de modelo

Para o grafo inicial de uma aplicação:

```bash
GRAPHIFY_NO_AUTO_REFRESH=1 graphify extract . --code-only --no-cluster
```

Esse modo restringe a extração a código e evita a etapa de agrupamento. Confira os arquivos esperados em `graphify-out/graph.json`; ele não cobre automaticamente requisitos de `PRODUCT.md` ou relações semânticas dos documentos.

Copie e adapte [as exclusões](../../templates/project/.graphifyignore.example). Exclua credenciais, `.env*`, dependências, skills vendorizadas, caches e saída do próprio grafo. Ignore `graphify-out/` no Git por padrão; exportações deliberadamente compartilhadas precisam ser revisadas quanto ao conteúdo.

`GRAPHIFY_NO_AUTO_REFRESH=1` impede refresh automático da integração. Use-o quando houver adaptações locais que precisem ser preservadas. Confira suporte na versão instalada.

<a id="codex-modelo-e-autenticação"></a>

## Documentos e extração semântica

Use a skill descoberta pelo cliente, como `$graphify` no Codex ou a invocação equivalente documentada no outro agente. Preserve **cliente nativo, modelo principal e autenticação autorizados**. Sem política de seleção autorizada, passe o modelo da sessão na delegação suportada; com essa política, siga a [seleção por tarefa e risco](02-subagent-orchestration.md#parte-b--disciplina-de-escolha-de-modelo), respeitando restrições explícitas a modelos.

No Codex, preserve login ChatGPT quando utilizado; no Claude, preserve sua modalidade vigente. Não ative backend de API, proxy ou outro modelo por efeito do setup. A CLI `graphify extract` sozinha **não herda automaticamente a autenticação da conversa**. Uma opção `--backend openai` não equivale ao login ChatGPT.

Se não houver integração semântica nativa compatível, registre a limitação e continue com extração determinística. Não invente suporte para uma LLM apenas porque ela consegue executar a CLI.

<a id="comandos-principais"></a>
<a id="4-faça-uma-pergunta-ao-grafo"></a>
<a id="5-explore-um-conceito-específico"></a>
<a id="exemplos"></a>
<a id="exemplo-1--graphify-explain-olhando-um-nó-específico"></a>
<a id="exemplo-2--graphify-path-a-relação-entre-dois-conceitos"></a>
<a id="exemplo-3--atualização-incremental-depois-de-editar-código"></a>
<a id="automação-com-hooks-de-git"></a>
<a id="hook-de-orientação"></a>

## Consultar e manter

Com um grafo existente e pertinente:

```bash
GRAPHIFY_NO_AUTO_REFRESH=1 graphify query 'O que depende deste módulo?'
GRAPHIFY_NO_AUTO_REFRESH=1 graphify path 'AuthModule' 'Database'
GRAPHIFY_NO_AUTO_REFRESH=1 graphify explain 'AuthModule'
```

Troque nomes pelos nós reais. Relações extraídas, inferidas e ambíguas não têm a mesma força de evidência. Confirme achados importantes no código; registre se o grafo estiver desatualizado ou não incluir a parte necessária.

Após alterar código, confira os modos determinísticos de extração/atualização da versão instalada. Para um grafo só de código, repetir o comando com `--code-only --no-cluster` mantém o escopo explícito. Uma atualização sem flags não garante que documentos novos deixarão de disparar extração semântica.

A CLI oferece exportações, incluindo HTML, wiki, Obsidian, SVG, GraphML e formatos de bancos de grafos. Confira `graphify --help`; exportar um arquivo e enviar dados para um serviço são ações distintas. Não envie o grafo a um banco externo ou plataforma durante o bootstrap.

<a id="dicas-e-pegadinhas"></a>
<a id="perguntas-frequentes"></a>

## Validar

- Confira versão e executável efetivo.
- Confira descoberta da skill em cada cliente usado; diretório presente não comprova carregamento.
- Gere um corpus pequeno sem LLM externo e confira nós/arquivos na saída.
- Teste uma consulta ao grafo gerado.
- Registre escopo, evidências, limitações e atualização necessária em `docs/setup.md`.

Referências: [projeto oficial](https://github.com/Graphify-Labs/graphify), [guia Codex](15-codex-workflow.md), [setup da máquina](../03-environment-setup.md) e [bootstrap](../04-project-bootstrap.md). A CLI evolui; confira flags da versão em execução em vez de copiar comandos de outra instalação.
