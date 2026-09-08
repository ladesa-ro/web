# Notas de implementação

O código deste repositório não leva comentários — a regra `ladesa/no-comments`
falha o lint em `.vue`, `.ts`, `.js`, `.css` e `.yaml`. Só passam diretivas de
ferramenta (`@ts-expect-error`, `eslint-disable`, `prettier-ignore`,
`biome-ignore`) e o shebang de scripts executáveis.

Contexto que não cabe num nome de variável ou função mora aqui. Cada entrada
aponta o arquivo, para que dê para chegar nela pelo `grep` a partir do código.

```bash
pnpm run -w lint:comments
```

```bash
pnpm run -w lint:complexity
```

## Complexidade cognitiva

O Biome mede complexidade cognitiva com teto 15 (`biome.json`). Hoje está como
aviso, não como erro: são treze funções acima do teto, todas anteriores à
adoção da regra. `lint:complexity:strict` roda a mesma checagem falhando em
aviso — é o que deve virar o padrão quando a lista abaixo zerar.

| Função                                                                                   | Score |
| ---------------------------------------------------------------------------------------- | ----- |
| `app/composables/useGradeHorariaValidation.ts:60`                                        | 62    |
| `app/components/Section/Calendario/Form/Crud/Events.vue:110`                             | 56    |
| `app/components/UI/Breadcrumb/Breadcrumb.vue:23`                                         | 38    |
| `app/composables/useGradeHorariaState.ts:78`                                             | 35    |
| `app/components/Section/Diarios/Form/Geral/Disciplinas/useDisciplinasConfigSubmit.ts:99` | 24    |
| `app/components/UI/API/List/Results/Grid/Grid.vue:59`                                    | 22    |
| `server/api/auth/session.get.ts:9`                                                       | 22    |
| `packages/ui/src/components/calendar-month.ts:35` (`MonthDays`)                          | 21    |
| `app/composables/turma-availability/useTurmaSyncLogic.ts:78`                             | 20    |
| `packages/ui/src/components/rrule-editor-state.ts:179` (`buildRRuleString`)              | 18    |
| `app/components/Section/Calendario/Timeline/AgendamentoTimelineDrawer.vue:83`            | 17    |
| `app/composables/useModalManager.ts:69`                                                  | 17    |
| `packages/ui/src/components/rrule-editor-state.ts:118` (`parseModelValue`)               | 17    |

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

## Referências

- Paleta de cores: os tokens de `packages/styles/src/tokens/colors.css` seguem
  os nomes do protótipo no Figma —
  https://www.figma.com/design/gwJHnj5RVnjt05AdOQNMy5/SISGHA---V2.0?node-id=7660-18059
