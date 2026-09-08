# Notas de implementação

O código deste repositório não leva comentários — a regra `ladesa/no-comments`
falha o lint em `.vue`, `.ts`, `.js`, `.css` e `.yaml`. Só passam diretivas de
ferramenta (`@ts-expect-error`, `eslint-disable`, `prettier-ignore`) e o
shebang de scripts executáveis.

Contexto que não cabe num nome de variável ou função mora aqui. Cada entrada
aponta o arquivo, para que dê para chegar nela pelo `grep` a partir do código.

```bash
pnpm run -w lint
```

Um comando só: comentário é erro e derruba o lint; tamanho e complexidade são
avisos e não derrubam. `lint:strict` trata aviso como erro — é o que deve
virar o padrão quando o backlog abaixo zerar.

A regra vale também para os workflows em `.github/`. Como eles ficam fora do
workspace pnpm — e fora do bind mount do container de desenvolvimento, que
monta só `src/` —, quem cobre os dois de uma vez é o `eslint.config.mjs` da
raiz do repositório, que reexporta o de `src/` só para alargar o base path do
ESLint. É esse que o CI roda:

```bash
./src/node_modules/.bin/eslint .
```

O `pnpm run -w lint` continua sendo o caminho local, dentro do container, e
cobre só o workspace. A diferença entre os dois é o `.github`.

No `quality.yml` esse passo é bloqueante. O eslint do app segue informativo,
por causa dos 29 erros pré-existentes lá. O `justfile` (recipe `check`) repete
o arranjo, sem o `.github`, porque roda dentro do container.

## Ferramentas

São duas, e só duas: **ESLint** e **Prettier**.

Chegou a entrar um Biome para medir complexidade cognitiva, e ele saiu. Num
projeto Nuxt o Biome não substitui nenhum dos dois: ele abre o `.vue` mas
enxerga só o bloco `<script>` — não formata o `<template>` nem vê os
comentários `<!-- -->` dele — e não lê `.yaml`. Também não tem as regras
`vue/*` que o `@nuxt/eslint` já traz. A medida de complexidade veio para o
ESLint via `eslint-plugin-sonarjs`, que implementa a mesma métrica cognitiva
do SonarSource.

## Tamanho e complexidade

Todos os tetos abaixo valem para o app e para os pacotes, e todos são aviso.
Somados dão 29 avisos. A profundidade de template já foi zerada; o resto é
anterior à adoção das regras.

| Regra                          | Teto                                | Ocorrências |
| ------------------------------ | ----------------------------------- | ----------- |
| `vue/max-template-depth`       | 6                                   | 0           |
| `vue/max-lines-per-block`      | template 120, script 150, style 120 | 17 arquivos |
| `sonarjs/cognitive-complexity` | 15                                  | 9 funções   |
| `max-lines`                    | 300                                 | 2 arquivos  |
| `vue/max-props`                | 8                                   | 1 arquivo   |

Os tetos foram escolhidos medindo a base, não por convenção: o p95 de template
é 75 linhas, o de script 87, e a profundidade p95 é 6. Ou seja, escrever um
componente normal não encosta em nenhum deles — os limites só pegam a cauda.

`vue/max-template-depth` emite uma mensagem por elemento aninhado demais, então
o número de avisos dela é sempre maior que o de arquivos. Os 17 arquivos que
estouravam o teto foram achatados extraindo componentes filhos; ao mover um
bloco para um filho, as regras `scoped` do pai que valiam para o interior
daquele bloco vão junto, senão o estilo se perde silenciosamente — o CSS
`scoped` do pai só alcança a raiz do filho.

Fica de fora `max-lines-per-function`. Em 60 ela daria 31 violações, e as
maiores seriam composables — `useAgendamentosStateCore` tem 193 linhas e é
completamente plano, tanto que a complexidade cognitiva não o acusa. Comprimento
de função pune o idioma de composable sem dizer nada que a complexidade já não
diga melhor.

O barril `packages/*/src/index.ts` está isento de `max-lines`: são só reexports,
e quebrá-lo em vários arquivos pioraria.

### Complexidade cognitiva

Teto 15, via `sonarjs/cognitive-complexity`. Nove funções acima dele, todas
anteriores à adoção da regra.

| Função                                                                                   | Score |
| ---------------------------------------------------------------------------------------- | ----- |
| `app/composables/useGradeHorariaValidation.ts:60`                                        | 48    |
| `app/components/Section/Calendario/Form/Crud/Events.vue:110`                             | 46    |
| `app/components/UI/Breadcrumb/Breadcrumb.vue:23`                                         | 30    |
| `app/composables/useGradeHorariaState.ts:78`                                             | 22    |
| `app/components/UI/API/List/Results/Grid/Grid.vue:59`                                    | 22    |
| `packages/ui/src/components/calendar-month.ts:35`                                        | 19    |
| `server/api/auth/session.get.ts:9`                                                       | 19    |
| `app/components/Section/Diarios/Form/Geral/Disciplinas/useDisciplinasConfigSubmit.ts:99` | 17    |
| `app/components/Section/Calendario/Timeline/AgendamentoTimelineDrawer.vue:83`            | 16    |

O Biome pontuava as mesmas funções mais alto e pegava quatro a mais, na faixa
de 17 a 20 — `useTurmaSyncLogic.ts`, `useModalManager.ts` e as duas de
`rrule-editor-state.ts`. As duas ferramentas dizem implementar a métrica do
SonarSource; o ranking bate, os números não. Vale saber disso se um dia se
comparar com relatório de outra origem.

## Pendências

Migradas dos `TODO` que existiam no código.

### Integração com a API

- `packages/ladesa-api-client/src/LadesaApiClient.ts` — o token é injetado por
  interceptor em vez do `auth` do client porque o spec OpenAPI não declara
  `security` nas operações, então o SDK gerado nunca chama `setAuthParams`.
  Quando o spec passar a declarar, trocar pelo mecanismo nativo.
- `app/utils/schedule/classAndTempoDeAulaConverts.ts` e
  `app/utils/schedule/types.ts` — as estruturas de aula são locais; ao integrar
  de vez, estender `Ladesa_ManagementService_Domain_Contracts_AulaFindOneOutput`.
- Casts para `Record<string, unknown>` que somem quando o SDK for regerado com
  os campos que faltam: `situacao` em
  `app/components/Section/Calendario/Gestao/Calendarios/Card.vue` e
  `app/components/Section/Calendario/View/View.vue`; `cor` em
  `.../DiasNaoLetivos/-Helpers/format.ts` e `.../DiasNaoLetivos/DiaEditDialog.vue`.

### Horário

- `app/components/Section/Horario/Dape/Edit/-Helpers/turnGridPrettier.ts` — as
  duas funções deduzem o intervalo por heurística. Refazer a partir dos tempos
  de aula dá um resultado mais preciso.
- `app/composables/schedule/useWeekSchedule.ts` — o parâmetro `onlyAulas` está
  declarado mas não filtra nada; falta também adaptar a conversão para a
  tipagem nova de `IdentifiedDays`.
- `app/composables/schedule/edit/useSelectedScheduleCells.ts` — o número de
  tempos está fixo no arquivo; deve vir da função que calcula isso a partir dos
  tempos de aula.
- `app/utils/schedule/separateScheduleInShifts.ts` — considerar só os períodos
  calculados no time slot.
- `app/components/Section/Horario/Dape/Edit/GridCell/GridCellEditButtons.vue` —
  cada instância dispara a própria query; subir para um ancestral e fazer uma só.
  Falta também permitir editar o diário da aula.
- `app/components/Section/Horario/Dape/GeneralVisualization/Mesclado/Mesclado.vue`
  — falta a grade de horário.

### Infraestrutura

- `.github/dependabot.yml` — os três ecossistemas tinham um `cooldown` de 14
  dias escrito e comentado. Se a ideia era segurar atualizações recém-lançadas,
  a opção existe e basta habilitar; enquanto não se decide, ela não está ativa.

### Telas

- `app/components/Section/Relatorios/Relatorios.vue` — a geração de PDF não
  existe; a tela e o modal são maquete, inclusive as aulas listadas.
- `app/components/Section/Profile/Profile.vue` — os dados exibidos são fixos,
  precisam vir da API.
- `app/components/Section/Turmas/Form/Fields/Periodo/-Helpers/verificar-modalidade.ts`
  — a verificação compara ids fixos de modalidade.
- `app/pages/sisgha/consulta/index.vue` — usa `UIContainer` sem a variante
  `mini`, que ainda não existe no pacote.

## Decisões e armadilhas

### Formulários

- `app/components/Section/Diarios/Form/Geral/Contexto.ts` — `disciplinasConfig`
  é um `ref` separado do formulário porque carrega campos que só existem para a
  UI (`disciplina`, `accordionOpen`, `activeTab`) e não pertencem ao schema. Um
  watcher sincroniza para o formulário apenas o subconjunto relevante.
- `app/components/Section/Diarios/Form/Geral/-Helpers/schema.ts` — `dataInicio`
  e `dataFim` não são preenchidos pelo usuário; o fallback entra em
  `mapPreferencias()` logo antes do envio.
- `app/components/Section/Cursos/Form/Form.vue` — o campo de
  `quantidadePeriodos` tem fallback porque o vee-validate ainda não hidratou no
  primeiro render e o valor chegaria `undefined`.
- `app/components/Section/Usuarios/Form/Profile/Roles/Roles.vue` — a carga
  horária é lida e gravada direto contra o perfil existente, fora do "Salvar"
  em lote, porque o schema do formulário não carrega o id real do vínculo.
- `app/components/VV/Autocomplete/API/Campus/CampusContext.vue` — o `useField`
  só é chamado quando `functional` é verdadeiro; como a prop é estática, isso
  não viola as regras de composables.
- `app/components/VV/Autocomplete/API/-Base/createAutocompleteComponent.ts` —
  monta o `options` (`IUIAutocompleteApiRetrieverOptions`) que todo wrapper de
  autocomplete por entidade repetiria à mão. Uso: `const { options } =
createAutocompleteComponent(...)` dentro do `<script setup>`.
- `app/components/Section/Profile/Teaching/carouselItem.vue` — quando o item é
  um `CourseOption` o valor está em `sel.value`; caso contrário a própria
  variável já é o valor.
- `app/components/Section/Diarios/Form/Geral/Disciplinas/DisciplinasConfig.vue`
  — busca os diários que já existem para a turma e o calendário para não criar
  duplicata.

### API e composables

- `app/composables/ladesa-api/-helpers/crudHelpers.ts` — cada helper recebe o
  `api` e a função gerada pelo SDK e devolve a função com a assinatura que o
  composable espera: `create` envia `{ body }`, `update` envia
  `{ path: { id }, body }`, `remove` envia `{ path: { id } }` e `uploadImage`
  envia `{ path: { id }, body: { file } }`.
- `app/composables/api-context/setup.ts` — `useAPIContext` é o ponto de acesso
  às informações do usuário logado a partir de qualquer componente.

### Horário (utilitários)

- `app/utils/schedule/types.ts` — o módulo mistura português e inglês e é
  reconhecidamente confuso. O autor original deixou registrado um pedido de
  desculpas a quem viesse depois, dizendo que não teve condições de melhorá-lo
  na época. Quem for mexer aqui, conte com isso.
- `app/composables/schedule/useWeekSchedule.ts` — devolve o horário completo
  com aulas ordenadas, horas vagas, intervalos, quebras de turno e quebras de
  dia.
- `app/utils/schedule/nonTeachingPeriods.ts` — recebe um horário só com aulas e
  tempos vagos e insere intervalos, quebras de turno e, se pedido, a transição
  entre dias.
- `app/utils/schedule/separateScheduleInDays.ts` — agrupa por dia a partir das
  marcações `TransicaoDia`. Quando não há transição identificada, devolve o
  horário sem dividir.

## Helpers compartilhados

`packages/utils` guarda função pura e reaproveitável, sem Vue, sem Nuxt e sem
conhecer a API. Hoje tem formatação de horário (`ensureSeconds`,
`stripSeconds`), classificação de período do dia (`classifyDayPeriod`,
`groupIntervalsByDayPeriod`) e construção de header HTTP
(`buildIdempotencyKeyHeaders`, `buildIfMatchHeaders`, `createIdempotencyKey`).

Também mora ali a configuração do dayjs. `configureDayjs()` estende os quatro
plugins usados no projeto, ativa o locale pt-br e sobrescreve os nomes dos dias
da semana; o módulo exporta a instância já configurada como `dayjs`, e é ela
que os componentes importam.

Isso corrigiu um bug real. `import 'dayjs/locale/pt-br'` apenas registra o
locale, quem ativa é `dayjs.locale()` — e essa chamada só existia no app. Os
componentes de calendário do pacote importavam o locale sem nunca ativá-lo, e
funcionavam no app por acidente de ordem de carregamento, porque o composable
do app mutava a instância global do dayjs antes. Fora do app, em Storybook ou
nos testes do pacote, o `CalendarMonth` escrevia "September" no lugar de
"setembro". Há teste cobrindo isso agora.

Por isso o módulo exporta a instância em vez de só a função: quem importa
`dayjs` do pacote recebe algo já configurado, sem depender de alguém ter
chamado `configureDayjs()` antes.

Duas arestas herdadas da versão que morava no app, mantidas de propósito para
não mudar comportamento junto com a mudança de lugar:

`classifyDayPeriod` devolve `Noturno` para qualquer entrada que não comece com
hora numérica, porque `Number.parseInt` produz `NaN` e `NaN` falha nas duas
comparações. Quem chamar com dado não validado recebe noturno em silêncio.

`createIdempotencyKey` é a única função não pura do pacote, já que depende de
`crypto.randomUUID()`. Está ali por ficar ao lado dos construtores de header
que a acompanham.

O que ficou de fora na migração: `achatarPeriodos` e `validarIntervalos`
existiam em `utils/horarios.ts` sem nenhuma chamada em todo o repositório,
desde o commit que as criou. Foram apagadas em vez de migradas — levar código
morto para um pacote compartilhado é pior do que deixá-lo onde estava. Estão
recuperáveis no histórico se a validação de sobreposição de intervalos voltar a
ser necessária.

## Referências

- Paleta de cores: os tokens de `packages/styles/src/tokens/colors.css` seguem
  os nomes do protótipo no Figma —
  https://www.figma.com/design/gwJHnj5RVnjt05AdOQNMy5/SISGHA---V2.0?node-id=7660-18059
