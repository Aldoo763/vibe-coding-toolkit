# Orquestração de subagentes

## O que é

Não é um plugin, nem algo que você instala — é um **padrão** (um jeito
recorrente de resolver um problema, que você reaplica sempre que ele
aparece) que você constrói dentro das próprias instruções do seu projeto (um
`CLAUDE.md`, um `AGENTS.md`, ou o arquivo equivalente que a sua ferramenta de
IA carrega automaticamente). Quando a delegação compensa, você define
**papéis** de agentes especialistas com escopo estreito e uma descrição
de uma linha dizendo quando usar cada um. Selecione os papéis por tarefa;
um elenco persistente só faz sentido para necessidades recorrentes
comprovadas. Tarefas delegáveis são roteadas para o especialista adequado,
quando o cliente e o fluxo escolhido suportarem essa execução.

Um subagente, aqui, é uma instância separada do agente de IA — despachada
(disparada) só pra cuidar de uma tarefa específica, com o próprio contexto,
que reporta de volta pra quem a despachou quando termina.

## Por que usar

Um agente generalista re-deriva o checklist certo pra cada domínio toda vez
que esbarra nele: o que checar numa *migration* (script que altera a
estrutura do banco de dados), quais classes de vulnerabilidade importam numa
mudança de autenticação, quais regras de *hooks* (funções especiais do
React, como `useState` e `useEffect`, que dão acesso a funcionalidades do
framework dentro de um componente) um componente pode quebrar. Um
especialista já sabe o checklist do próprio domínio, porque é só isso que
ele faz.

O ganho não é "mais agentes por vaidade" — é que cada despacho já chega com
o checklist certo pra aquele domínio, em vez de um generalista reinventando
a roda sob pressão de tempo, toda santa vez.

## Parte A — elenco de especialistas e tabela de roteamento

Dê a cada especialista um nome e uma frase de "quando usar". Essa frase faz
um papel duplo: ela também funciona como regra de roteamento. Não existe uma
tabela separada de "tipo de tarefa → especialista" pra manter sincronizada
com essa — as duas seriam o mesmo mapeamento, só lido em direções
diferentes. Um elenco representativo se parece com isto:

| Especialista | Quando usar |
|---|---|
| `orchestrator` | Coordena trabalho que cruza vários domínios, delegando pra outros especialistas — o primeiro a acionar quando uma tarefa atravessa camadas diferentes (ex.: back-end + front-end ao mesmo tempo). |
| `code-reviewer` | Revisão geral de qualquer mudança de código — bugs, tratamento de erro, cobertura de testes. |
| `security-reviewer` | Vulnerabilidades classe OWASP (a organização que mantém a lista de referência das falhas de segurança mais comuns em aplicações web), segredos gravados no código-fonte, falhas de autenticação, CVEs (identificadores públicos de vulnerabilidades já conhecidas) em dependências. |
| `typescript-reviewer` | Segurança de tipos, corretude de código assíncrono, risco de injeção, *prototype pollution* (falha em que um atacante consegue alterar propriedades compartilhadas por todo objeto JavaScript) em TS/JS. |
| `react-reviewer` | Regras de *hooks* do React, fronteira entre componente de servidor e de cliente, acessibilidade, performance de renderização. |
| `react-build-resolver` | *Build* (processo de empacotar o código pra rodar em produção) ou servidor de desenvolvimento quebrado — configuração de *bundler* (ferramenta que empacota o código pro navegador), erro de compilação, tipos faltando. |
| `test-engineer` | Testes unitários e de integração, escritos *test-first* (o teste antes da implementação), cobrindo casos de borda. |
| `qa-automation-engineer` | Testes ponta a ponta (*end-to-end*, que simulam o usuário real navegando) e *quality gates* (barreiras automáticas de qualidade) de CI/CD (integração e entrega contínuas — pipelines automatizados de build, teste e deploy) pra um fluxo crítico de usuário. |
| `database-architect` | Design de *schema* (estrutura das tabelas do banco), *migrations*, índices, estratégia de consultas (*queries*). |
| `devops-engineer` | Deploy, pipelines de CI/CD, infraestrutura, operação em produção. |
| `backend-specialist` | *Endpoints* de API (pontos de entrada, cada um associado a uma URL), lógica de negócio no servidor, persistência de dados. |
| `frontend-specialist` | Componentes de UI, layout, estilo, arquitetura de front-end. |
| `seo-specialist` | Metadados, dados estruturados (marcação especial no HTML que ajuda buscadores a entender o conteúdo da página), indexação por buscadores, visibilidade em buscas via IA. |
| `performance-optimizer` | Um gargalo já identificado por *profiling* (medição de performance) — *endpoint* lento, memória alta, Core Web Vitals ruins (métricas do Google pra experiência real de carregamento e resposta de uma página). |
| `product-manager` | Requisito indefinido ou ambíguo, antes mesmo de existir uma *story* (item de trabalho pequeno e entregável). |
| `product-owner` | Transformar um objetivo de negócio em critérios de aceite pra uma *story*. |
| `project-planner` | Quebrar uma *feature* ou *epic* (conjunto grande de features relacionadas) em tarefas ordenadas e executáveis. |
| `code-archaeologist` | Entender código legado ou sem documentação antes de mexer nele. |
| `debugger` | Encontrar a causa raiz de um bug, *crash* ou teste instável — antes de propor qualquer correção. |
| `explorer-agent` | Mapear uma base de código desconhecida ou complexa antes de planejar uma mudança. |
| `documentation-writer` | READMEs, documentação de API, *runbooks* (guias operacionais passo a passo) — escritos ou atualizados sob pedido. |
| `penetration-tester` | Técnicas simuladas de ataque contra um fluxo de autenticação real ou um lançamento (*release*). |
| `security-auditor` | Revisão de defesa em profundidade (várias camadas de proteção redundantes, pra que a falha de uma não derrube tudo) e modelagem de ameaças antes de um lançamento importante. |

Os nomes são ilustrativos — chame do jeito que fizer sentido no seu projeto.
O que importa é o formato: escopo estreito, um gatilho de uso claro, e zero
sobreposição com os vizinhos da tabela. Se dois especialistas do seu elenco
cobrem o mesmo gatilho, um deles está sobrando.

Isto é sobre o **padrão** de uso — como montar o elenco e rotear tarefas
pra ele. O **mecanismo** técnico que declara um subagente de verdade (o
arquivo `.claude/agents/*.md`, a precedência de qual nível de modelo cada
despacho usa, o isolamento via `isolation: worktree`) é coberto pela
[documentação oficial de subagents do Claude Code](https://code.claude.com/docs/en/sub-agents) —
não é redundante com este documento, é a base técnica sobre a qual o padrão
aqui é construído.

<a id="parte-b--disciplina-de-escolha-de-modelo"></a>

## Parte B — modelo e autenticação

Preserve cliente nativo, modelo principal e autenticação autorizados. **Sem política de seleção autorizada, subagentes usam o modelo da sessão.** A instalação de uma ferramenta não concede permissão para trocar modelo, provedor ou modo de cobrança.

O usuário pode autorizar uma política de seleção por tarefa, sem precisar escolher o nome de cada modelo. O [prompt de projeto existente](../prompts/12-existing-project-setup.md) concede essa autorização dentro do provedor e autenticação vigentes, respeitando restrições explícitas. Isso não autoriza alterar o agente principal, instalar proxy, configurar billing de API ou contrariar uma limitação de modelo já definida.

### Escolher capacidade na hora

Descubra os modelos e esforços realmente disponíveis no host. Com seleção autorizada, prefira o modelo mais leve que consiga cumprir o aceite, considerando complexidade, ambiguidade, risco e esforço de revisão. Confira as recomendações atuais do cliente; não fixe nomes comerciais em instruções portáveis.

| Trabalho | Orientação de capacidade |
|---|---|
| Busca localizada, inventário, links, leitura de logs e mudança mecânica pequena | Capacidade leve, com saída verificável |
| Implementação delimitada, contratos e revisão de comportamento | Capacidade suficiente para raciocínio e checks do escopo |
| Arquitetura, autorização, segurança, migrations, concorrência ou causa ambígua | Capacidade maior quando o julgamento exigido justificar; não reduzir apenas pelo preço |

Selecione modelo e esforço explicitamente nos controles suportados. Se o host só permitir herança ou configuração de agente, siga o mecanismo documentado e registre a limitação; não invente parâmetros. Falta de compreensão ou baixa qualidade pede diagnóstico e possível escalonamento, não repetição indefinida no modelo barato. Respeite limites finitos de tempo, tentativas e recursos definidos para a tarefa.

Essa escolha segue a orientação de [modelos e raciocínio em subagentes do Codex](https://learn.chatgpt.com/docs/agent-configuration/subagents) e de [seleção de modelo para custos no Claude Code](https://code.claude.com/docs/en/costs). Os mecanismos concretos variam por cliente e versão. As tabelas deste toolkit são critérios de decisão, não benchmarks nem promessas de economia.

### Contexto, ferramentas e integração

Use execução direta ou ferramenta determinística quando resolverem a tarefa com menos coordenação. Delegue para isolar contexto, aproveitar especialização ou executar partes independentes. Os nomes da Parte A são papéis ilustrativos, não agentes automaticamente instalados.

Cada briefing inclui objetivo, contexto necessário, instruções aplicáveis, arquivos, dependências, aceite e checks. Prefira contexto limpo a copiar a conversa inteira. Peça um retorno curto com caminhos, achados, evidências e limitações. Conceda somente ferramentas/permissões necessárias; um revisor em leitura não vira escritor implicitamente. As [boas práticas de subagentes do Claude Code](https://code.claude.com/docs/en/sub-agents) documentam esse isolamento.

O coordenador confere diff e valida a integração. Lockfiles, configuração compartilhada, ledger e operações Git têm responsável único. Controle concorrência pelos recursos e limites reais do host; não crie árvores de agentes sem ganho claro. Registre modelos/esforços observados, sem estimar tokens ou economia quando não houver medição.

## Revisão após implementação ou correção

Como convenção deste toolkit, **sempre sugira ao usuário de 3 a 8 ciclos posteriores de code review** ao concluir um ciclo de implementação ou correção. A LLM escolhe quantidade e focos conforme o diff, o risco e a incerteza, com uma frase de justificativa. Essa faixa é preferência do fluxo, não recomendação universal dos fornecedores nem garantia de ausência de bugs.

Mudanças pequenas tendem ao início da faixa; alterações extensas ou críticas tendem ao final. Distribua focos complementares que existam na mudança: requisitos, comportamento, regressões, testes, segurança, dados, integrações, acessibilidade, desempenho medido e manutenção. Inclua verificação de integração ao final; não crie revisões vazias para preencher uma lista.

Entregue um prompt de continuação com o número escolhido, os focos e os comandos reais. **Sugerir não é executar:** novas rodadas precisam ser solicitadas. Dentro de uma rodada autorizada, cada ciclo inspeciona o estado atual e o código conectado, apresenta achados com severidade, local e evidência e reavalia correções autorizadas com os checks afetados. Correções internas não reiniciam a contagem; encerre na quantidade combinada com achados e riscos residuais explícitos.

Exemplo de sugestão para uma mudança pequena de documentação: “Recomendo 3 ciclos: coerência dos contratos, segurança das instruções e navegação/uso. Revise o diff atual nesses 3 ciclos, com achados por severidade e caminho; verifique links e execute `node scripts/validate-docs.mjs` e `git diff --check`. Apresente propostas de correção; implemente-as somente dentro da autorização vigente.” Adapte a quantidade, os focos e os comandos a cada projeto.

## Recuperar uma execução interrompida

Falha de trabalhador não conclui o escopo do coordenador. Confirme que o agente parou antes de assumir seus arquivos, examine alterações parciais e retome do ponto verificado. Se o estado continuar incerto, preserve a propriedade desses arquivos e avance apenas em trabalho independente. Não repita a mesma tentativa sem evidência nova; respeite gates e limites. O [playbook](../02-playbook-onboarding.md#continuidade-de-execução) reúne os acordos e cenários de avaliação, também disponíveis no template de instruções compartilhadas.

## Antes das ondas: como decidir a quebra de tarefas

Tudo que a Parte C ensina — marcar `Files:` e `Depends-on:`, agrupar em
ondas, serializar commits — parte de uma pergunta que ela mesma não
responde: quem decide, afinal, onde cortar o trabalho em tarefas? Essa
decisão acontece **antes** da mecânica de ondas, não depois de o plano já
estar montado.

O post oficial da Anthropic
[Multi-Agent Systems: When to Use Them](https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them)
(jan/2026) trata exatamente dessa pergunta, com um achado que vale citar
direto: rodar múltiplos agentes custa de **3 a 10 vezes mais tokens** do
que um agente só resolvendo a mesma tarefa sozinho. Esse custo só se paga
em três cenários — fora deles, multiagente é despesa sem retorno:

- **Proteção de contexto** — isolar algo que geraria muito ruído no
  contexto principal (uma investigação grande, uma saída verbosa) numa
  instância separada, em vez de poluir a janela de contexto de quem
  coordena.
- **Paralelização real** — trabalho genuinamente independente, que dá pra
  rodar ao mesmo tempo sem uma tarefa esperar o resultado da outra.
- **Especialização genuína** — a tarefa exige um checklist, um contexto ou
  um conjunto de instruções que um agente generalista não carrega por
  padrão.

O princípio central do post é este: decomponha por **fronteira de
contexto isolável** — o que cada tarefa *precisa saber* pra fazer o
próprio trabalho, sem depender do contexto completo de nenhuma outra
tarefa — e não por tipo de problema, nem por fase do trabalho.

O post nomeia explicitamente os anti-padrões mais comuns dessa decisão —
vale conhecer pelos nomes, porque são fáceis de cair sem perceber:

- **Decomposição centrada no problema** — dividir por área temática ("um
  agente pro banco, um pro front-end, um de segurança") em vez de por
  fronteira de contexto real.
- **Divisão sequencial por fase** — plano, implementação e teste como
  agentes **separados**, quando na prática os três compartilham o mesmo
  contexto de trabalho e deveriam ser uma unidade só — ou, no mínimo, não
  fingir uma independência que não existe.
- Separar **componentes fortemente acoplados** entre si, só porque são,
  tecnicamente, "duas partes".
- Trabalho que depende de **estado compartilhado mutável** — se uma
  tarefa precisa ler o que outra está escrevendo *enquanto* ela escreve,
  elas não são duas tarefas independentes, são uma tarefa só fingindo ser
  duas.

Isso é uma camada **anterior e complementar** à execução em ondas da
Parte C, não uma substituta dela: o post acima ajuda a decidir **como
quebrar** o trabalho em tarefas, o suficiente pra cada uma valer a pena
existir sozinha; a Parte C ensina **como executar** essas tarefas com
segurança, uma vez que elas já foram quebradas — arquivos disjuntos, sem
dependência cruzada, commit sempre serializado por quem orquestra. Uma
pergunta não substitui a outra; a segunda só faz sentido depois que a
primeira já foi respondida.

## Parte C — execução em ondas paralelas

Essa é a parte que vale a pena ler com calma, porque errar aqui é
exatamente como se cria o bug que esse padrão existe pra evitar.

### O problema

O padrão seguro pra executar um plano é o **despacho serial**: um
implementador, uma tarefa, um commit (o registro de uma mudança no
histórico do Git), depois a próxima. É correto — e é lento pra trabalho
genuinamente independente. Três correções de bug em três arquivos sem
relação nenhuma não precisam esperar uma pela outra.

A solução ingênua — despachar o implementador de toda tarefa ao mesmo tempo
— é rápida e arriscada: dois agentes podem editar o mesmo arquivo ao mesmo
tempo e um sobrescrever o trabalho do outro sem perceber, ou os dois podem
disputar corrida pra fazer o `git commit` primeiro.

### A solução

Três partes fecham os dois buracos sem abrir mão da velocidade:

1. **Marque cada tarefa planejada** com os caminhos de arquivo exatos que
   ela toca e de quais outras tarefas ela depende. Uma tarefa sem essa
   marcação — ou com qualquer incerteza real sobre o próprio escopo — é
   tratada, por padrão de segurança, como se dependesse de **tudo**. Essa é
   a rede de segurança do padrão: uma tarefa mal especificada não vira um
   risco de paralelismo falso, ela simplesmente degrada pra execução serial
   normal.
2. **Duas tarefas só entram na mesma onda se as duas condições valerem ao
   mesmo tempo**: nenhuma depende da outra, nem mesmo transitivamente (ou
   seja, nem por meio de uma terceira tarefa no meio do caminho); **e** os
   conjuntos de arquivos que elas tocam são totalmente disjuntos, sem nenhum
   arquivo em comum. Falhou uma condição — mesmo que seja só uma — as
   tarefas vão pra ondas diferentes.
3. **Implementadores dentro de uma onda nunca fazem commit sozinhos.** Eles
   editam os arquivos e reportam o que mudou; quem orquestra faz todos os
   commits depois, um por tarefa, na ordem da onda, capturando o `HEAD`
   atual (o ponteiro do Git pro commit mais recente do branch) bem antes de
   cada commit — nunca uma referência velha ou fixada de antemão. É isso
   que elimina o risco de disputa de commit por completo: existe só um
   agente fazendo commits, e ele age de forma serial mesmo quando a edição
   aconteceu em paralelo.

### Loop de execução por onda

1. Escreva um arquivo de instruções por tarefa da onda.
2. Despache todos os implementadores da onda **numa única mensagem** — esse
   é o único ponto em que o paralelismo de fato acontece.
3. Espere todos terminarem.
4. Faça os commits em ordem, um por tarefa, capturando o `HEAD` atual
   imediatamente antes de cada commit.
5. Só então despache os revisores daquela onda, também juntos — isso é
   seguro porque revisão é só leitura (*read-only*, ninguém escreve nada) —
   cada um cuidando do intervalo de commit (a diferença entre o estado antes
   e depois) da própria tarefa.
6. Faça exatamente **um** registro de acompanhamento por onda (um log, uma
   planilha de progresso), nunca um por tarefa — dois agentes disputando a
   escrita no mesmo arquivo de acompanhamento é a mesma classe de bug que
   dois agentes disputando um commit.

### Válvula de escape: isolamento em worktree

Às vezes duas tarefas genuinamente não dão pra separar — elas precisam
tocar o mesmo arquivo — e dividir ainda mais destruiria o sentido de
paralelizar. Só nesse caso, isole cada implementador na própria *worktree*
do Git (uma cópia paralela do repositório, numa pasta separada, sincronizada
com o mesmo histórico) e no próprio *branch*. Isso torna fazer commit
sozinho seguro de novo, porque não existe mais um índice compartilhado pra
disputar.

Deixe claro que isso é caro — tem custo real de configuração e disco por
agente — e deve ser o último recurso, nunca o padrão.

### O que muda (e o que não muda)

Esse padrão muda só a **orquestração**. O contrato entre implementador e
revisor continua sendo exatamente a mesma disciplina descrita em
[01-superpowers.md](01-superpowers.md) (especificamente na *skill*
`subagent-driven-development`): perguntar antes se a tarefa for ambígua,
TDD (*test-driven development* — escrever o teste antes da implementação),
autorrevisão antes de reportar, e um status final dentro de um pequeno
conjunto de opções explícitas. Ondas não afrouxam esse contrato — elas só
permitem rodar várias instâncias dele ao mesmo tempo, quando é
comprovadamente seguro fazer isso.

Veja
[`templates/rules/parallel-subagent-driven-development.md`](../../templates/rules/parallel-subagent-driven-development.md)
pra uma versão desse mesmo raciocínio já escrita como regra literal, pronta
pra colar nas instruções de um projeto. E veja [Parallel wave
dispatch](../prompts/05-parallel-wave-dispatch.md) pra um modelo de *prompt*
(texto de instrução que você dá pro agente) pronto, que aplica esse fluxo
inteiro num plano real.

## Tutorial — montando o padrão do zero

Isto é o passo a passo pra construir o padrão inteiro no seu próprio
projeto, começando do zero.

1. **Identifique o trabalho que merece delegação.** Não copie o elenco da
   Parte A palavra por palavra. Selecione papéis para tarefas reais que
   ganhem com isolamento, especialização ou paralelismo; ter banco ou
   front-end não exige criar um agente para cada domínio.
2. **Escreva a frase de "quando usar" pra cada um.** Uma linha, objetiva,
   sem sobreposição com as outras. Essa frase é a tabela de roteamento — não
   escreva uma tabela separada.
3. **Documente somente os papéis recorrentes comprovados.** Quando houver
   necessidade, mantenha uma tabela curta nas instruções ou em um documento
   referenciado por elas. Papéis pontuais ficam no briefing da tarefa;
   não carregue uma equipe inteira em toda sessão.
4. **Defina a política de capacidade.** Sem seleção autorizada, preserve o modelo da sessão; com autorização, escolha capacidade por tarefa e risco conforme a Parte B. Informe modelo e esforço nos controles suportados, preservando cliente, autenticação e restrições explícitas.

A partir daqui, o padrão já está montado — os passos 5 a 8 são sobre como
usá-lo num plano de verdade, aplicando a execução em ondas da Parte C:

5. **Liste as tarefas do plano atual.** Pra cada uma: um ID curto (`T01`,
   `T02`...), uma descrição de uma linha, o especialista responsável.
6. **Marque `Files:` e `Depends-on:` em cada tarefa.** Seja exato nos
   caminhos de arquivo — na dúvida, liste mais arquivos, não menos. Qualquer
   incerteza real vira `Depends-on: tudo que já foi listado`.
7. **Agrupe as tarefas em ondas**, aplicando as duas condições da seção
   anterior: sem dependência (nem transitiva) e arquivos totalmente
   disjuntos. Mostre o resultado como uma tabela: número da onda, tarefas
   dela, especialista de cada uma.
8. **Execute onda por onda**, seguindo o loop da Parte C: despache os
   implementadores da onda numa mensagem só, espere todos, faça os commits
   em ordem, despache os revisores da onda juntos, registre o progresso uma
   vez só, e siga pra próxima onda.

## Exemplos

### Exemplo 1 — cupom de desconto num app de e-commerce

Um time recebe o pedido de adicionar um cupom de desconto no carrinho, e
aproveita pra incluir dois bugs antigos, sem relação nenhuma, que já
estavam na fila:

| ID | Descrição | Files: | Depends-on: | Especialista |
|---|---|---|---|---|
| T01 | Criar a tabela `coupons` (migration + schema) | `db/schema/coupons.ts`, `db/migrations/0007_coupons.sql` | nenhuma | `database-architect` |
| T02 | Endpoint que valida e aplica o cupom no carrinho | `src/server/coupons/apply-coupon.ts`, `src/app/api/coupons/apply/route.ts` | T01 | `backend-specialist` |
| T03 | Campo de cupom na tela de checkout | `src/components/checkout/CouponField.tsx` | T02 | `frontend-specialist` |
| T04 | Corrigir formatação de data quebrada no histórico de pedidos | `src/components/orders/OrderDate.tsx` | nenhuma | `frontend-specialist` |
| T05 | Corrigir paginação quebrada na lista de usuários do admin | `src/app/admin/users/page.tsx` | nenhuma | `frontend-specialist` |

Aplicando as duas condições:

- **Onda 1 — T01, T04, T05.** Nenhuma das três depende de nada, e os três
  conjuntos de arquivos não têm nada em comum — mesmo T04 e T05 sendo do
  mesmo domínio (front-end) e do mesmo especialista, elas tocam arquivos
  diferentes, então entram juntas.
- **Onda 2 — T02, sozinha.** Depende de T01 já estar commitada — a tabela
  precisa existir antes do endpoint tentar usá-la. Não sobra nenhuma outra
  tarefa livre de dependência pra fazer companhia a ela, e tudo bem: uma
  onda de uma tarefa só é o resultado correto quando é isso que a regra dá,
  não uma falha do sistema.
- **Onda 3 — T03, sozinha.** Depende de T02 — o campo de checkout precisa
  saber o formato real da resposta da API antes de ser implementado contra
  ela de verdade.

Repare no que a marcação evitou: T04 e T05 parecem "só dois bugs de
front-end", o tipo de tarefa que dá vontade de já misturar direto com o
resto do trabalho de front-end (T03). Mas T03 tem uma dependência real
(T02), enquanto T04 e T05 não têm — e é a marcação, não a intuição de "são
do mesmo especialista", que decide onde cada uma entra.

### Exemplo 2 — três chamados de bug num blog

Três chamados chegam no mesmo dia pra uma plataforma de blog:

| ID | Descrição | Files: | Depends-on: |
|---|---|---|---|
| T01 | O spinner de carregamento não some na página de filtro por tag | `src/components/blog/TagFilter.tsx` | nenhuma |
| T02 | O avatar do autor aparece borrado na página do artigo | `src/components/blog/ArticleHeader.tsx` | nenhuma |
| T03 | Alinhar o botão de "compartilhar" ao novo design system (guia visual do produto) | `src/components/blog/ArticleHeader.tsx`, `src/styles/share-button.css` | nenhuma |

Nenhuma das três declara depender de outra — à primeira vista, parecem as
três candidatas perfeitas pra uma onda só. Mas T02 e T03 tocam o mesmo
arquivo, `ArticleHeader.tsx`. A ausência de dependência não é suficiente
sozinha; o conjunto de arquivos também precisa ser disjunto, e aqui não é.

- **Onda 1 — T01, T02.** Sem dependência entre elas, arquivos totalmente
  diferentes.
- **Onda 2 — T03, sozinha.** Compartilha arquivo com T02, que já rodou na
  onda anterior.

Uma alternativa igualmente válida aqui — e geralmente melhor, quando dois
chamados tocam o mesmo arquivo por coincidência — é simplesmente fundir T02
e T03 numa tarefa só antes de montar as ondas, já que um único implementador
vai mexer nesse arquivo de qualquer jeito. Ondas separadas e fusão de tarefa
resolvem o mesmo problema; fundir evita até o custo de um commit extra.

## Dicas e pegadinhas

- **`Files:` vago é a mesma coisa que não preencher.** "vários arquivos de
  front-end" não é uma marcação — é uma tarefa que vai (corretamente)
  degradar pra depender de tudo. Liste os caminhos de verdade.
- **Capturar o `HEAD` uma vez só, no início da onda, é o erro clássico.**
  Capture de novo, na hora, imediatamente antes de cada commit — depois do
  primeiro commit da onda, o `HEAD` antigo já está desatualizado.
- **"Mesmo arquivo" desqualifica a onda mesmo que sejam seções diferentes do
  arquivo.** Dois agentes editando partes diferentes do mesmo arquivo ainda
  podem gerar um *merge* quebrado ou uma sobrescrita silenciosa — a regra é
  por arquivo, não por linha.
- **Não abra exceção pro "só dessa vez o implementador comita sozinho."** É
  exatamente assim que a condição de corrida (*race condition* — quando duas
  operações concorrentes disputam o mesmo recurso e o resultado final
  depende de qual delas "vence") volta a existir; a regra só funciona se for
  absoluta.
- **Modelo e autenticação seguem a política autorizada.** Nome de especialista não autoriza troca de provedor ou billing. Seleção dinâmica de modelos exige política escolhida pelo usuário; sem ela, preserve o modelo da sessão.
- **Isolamento em worktree não é de graça.** Cada worktree usada geralmente
  precisa instalar dependências e configurar ambiente de novo — use só
  quando o paralelismo ganho realmente compensar esse custo.
- **Revisores em paralelo só são seguros enquanto revisão for só leitura.**
  Se o seu processo de revisão em algum momento escreve de volta no código
  (por exemplo, uma correção automática de lint aplicada sozinha), essa
  parte deixa de ser só leitura e volta a precisar de serialização.

## Perguntas frequentes

**Isso é um plugin que eu instalo?**
Não. É um padrão — um jeito de organizar as instruções que você já escreve
pro seu agente. Não tem pacote pra instalar; tem uma tabela e algumas regras
pra colocar no seu `CLAUDE.md` (ou equivalente).

**Preciso ter exatamente esses 23 especialistas?**
Não — o elenco da Parte A é ilustrativo. Adapte pros domínios reais do seu
projeto; um agente pra um domínio que você não tem é só peso morto na
tabela.

**E se eu errar a marcação de `Depends-on:`?**
O pior cenário é perder um pouco de paralelismo — a tarefa cai pra execução
serial. Não é uma condição de corrida; é exatamente esse o motivo da regra
ser "na dúvida, depende de tudo": o erro seguro é o único permitido.

**Dá pra usar isso sem Claude Code, com outra ferramenta de IA?**
Dá. O padrão não depende de ferramenta nenhuma — o que importa é ter um
arquivo de instruções que a ferramenta carrega automaticamente, e a
capacidade de despachar mais de um agente (ou sessão) ao mesmo tempo.

**Existe um limite máximo de tarefas por onda?**
Não há número universal. Primeiro selecione tarefas sem dependências e com
arquivos disjuntos; depois limite a concorrência aos slots, recursos e
orçamento autorizados no host. Uma onda estruturalmente válida pode precisar
ser executada em lotes menores.

**Os revisores de uma onda podem discordar sobre tarefas vizinhas?**
Cada revisor cuida só do intervalo de commit da própria tarefa, então isso
não devia acontecer — se acontecer (os dois reclamam do mesmo trecho de
código, por exemplo), é um sinal de que as tarefas não eram tão
independentes quanto a marcação assumiu, e vale revisar a marcação antes da
próxima onda parecida.
