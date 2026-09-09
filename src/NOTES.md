# Notas

Contexto que o código não consegue expressar, e o que está pendente. O código
não leva comentários, então o que não cabe num nome de função mora aqui.

## Convenções

Comentário em `.vue`, `.ts`, `.js`, `.css` ou `.yaml` derruba o lint. Passam só
diretivas de ferramenta (`@ts-expect-error`, `eslint-disable`,
`prettier-ignore`) e shebang.

```bash
pnpm run -w lint
```

```bash
pnpm run -w lint:duplication
```

Ferramentas: ESLint e Prettier. Biome não serve aqui — lê só o `<script>` do
`.vue`, ignora `<template>` e `.yaml`, e não tem as regras `vue/*`.

O `.github/` fica fora do workspace pnpm, então quem cobre workspace e
workflows de uma vez é o `eslint.config.mjs` da raiz do repositório, que
reexporta o de `src/` só para alargar o base path do ESLint. É o que o CI roda:

```bash
./src/node_modules/.bin/eslint .
```

## Limites

Comentário é erro. O resto é aviso; `lint:strict` transforma aviso em erro e
deve virar o padrão quando a tabela zerar.

| Regra                          | Teto            | Pendente    |
| ------------------------------ | --------------- | ----------- |
| `ladesa/no-comments`           | zero            | 0           |
| `vue/max-template-depth`       | 6               | 0           |
| `vue/max-lines-per-block`      | 120 / 150 / 120 | 17 arquivos |
| `sonarjs/cognitive-complexity` | 12              | 10 funções  |
| `vue/max-props`                | 6               | 6 arquivos  |
| `max-lines`                    | 300             | 2 arquivos  |
| duplicação (jscpd)             | 3,5%            | 3,39%       |

Os tetos vieram de medir a distribuição, não de convenção. Apertar mais só
depois de zerar o backlog: profundidade 5 custaria 35 arquivos, `max-lines` 200
custaria 32.

Duplicação depende de escopo: só `apps/sisgha-sisgea/app` dá 1,46%; o teto vale
para `apps` e `packages` inteiros.

`packages/*/src/index.ts` é isento de `max-lines`: são reexports.

## Pendências

### Duplicação a eliminar

- Vinte e dois composables em `composables/ladesa-api/` seguem o mesmo molde, e
  oito compartilham 43 linhas idênticas duas a duas. Uma fábrica de composable
  de entidade derruba o percentual de duplicação de vez.
- `Section/Calendario/Types.ts` e `packages/ui/src/components/calendar-types.ts`
  são idênticos. Apagar o do app e apontar os sete importadores para o pacote.
- `Week/dnd-monitor.ts` e `useDragAndDropSchedule.ts` — duas implementações de
  drag and drop convivendo, 65 linhas repetidas.
- `Section/Profile/RoleBadge.vue` é quase o `Badge` do pacote; falta um slot de
  ícone no `Badge` para poder apagá-lo.

### Integração com a API

- `packages/ladesa-api-client/src/LadesaApiClient.ts` — o token entra por
  interceptor porque o spec OpenAPI não declara `security` nas operações e o SDK
  nunca chama `setAuthParams`. Trocar pelo mecanismo nativo quando o spec
  declarar.
- `app/utils/schedule/classAndTempoDeAulaConverts.ts` e
  `app/utils/schedule/types.ts` — estender
  `Ladesa_ManagementService_Domain_Contracts_AulaFindOneOutput` ao integrar.
- Casts para `Record<string, unknown>` que somem quando o SDK for regerado:
  `situacao` em `Gestao/Calendarios/Card.vue` e `Calendario/View/View.vue`;
  `cor` em `DiasNaoLetivos/-Helpers/format.ts` e
  `DiasNaoLetivos/DiaEditDialog.vue`.

### Horário

- `Dape/Edit/-Helpers/turnGridPrettier.ts` — as duas funções deduzem o intervalo
  por heurística; refazer a partir dos tempos de aula.
- `composables/schedule/useWeekSchedule.ts` — `onlyAulas` está declarado mas não
  filtra nada; falta adaptar a conversão para a tipagem de `IdentifiedDays`.
- `composables/schedule/edit/useSelectedScheduleCells.ts` — número de tempos
  fixo no arquivo; deve vir do cálculo por tempos de aula.
- `utils/schedule/separateScheduleInShifts.ts` — considerar só os períodos do
  time slot.
- `Dape/Edit/GridCell/GridCellEditButtons.vue` — cada instância dispara a
  própria query; subir para um ancestral. Falta editar o diário da aula.
- `Dape/GeneralVisualization/Mesclado/Mesclado.vue` — falta a grade de horário.

### Telas

- `Section/Relatorios/Relatorios.vue` — tela e modal são maquete, aulas
  incluídas; não existe geração de PDF.
- `Section/Profile/Profile.vue` — dados fixos, precisam vir da API.
- `Turmas/Form/Fields/Periodo/-Helpers/verificar-modalidade.ts` — compara ids
  fixos de modalidade.
- `pages/sisgha/consulta/index.vue` — usa `UIContainer` sem a variante `mini`,
  que não existe no pacote.

## Armadilhas

- CSS `scoped` do pai só alcança a raiz do filho. Ao extrair um bloco para um
  componente, as regras que valiam para o interior dele têm de ir junto, senão
  o estilo some sem erro nem aviso.
- `classifyDayPeriod` devolve `Noturno` para entrada não numérica, porque
  `Number.parseInt` produz `NaN` e `NaN` falha nas duas comparações.
- `packages/utils` exporta a instância de dayjs já configurada, não só
  `configureDayjs()`. Importar `dayjs` de lá é o que garante locale pt-br;
  `import 'dayjs/locale/pt-br'` apenas registra, não ativa.
- `createIdempotencyKey` é a única função não pura de `packages/utils`.

## Decisões que o código não expressa

- `Diarios/Form/Geral/Contexto.ts` — `disciplinasConfig` é um `ref` fora do
  formulário porque carrega campos que só existem para a UI (`disciplina`,
  `accordionOpen`, `activeTab`). Um watcher sincroniza o subconjunto do schema.
- `Diarios/Form/Geral/-Helpers/schema.ts` — `dataInicio` e `dataFim` não são
  preenchidos pelo usuário; o fallback entra em `mapPreferencias()` antes do
  envio.
- `Cursos/Form/Form.vue` — `quantidadePeriodos` tem fallback porque o
  vee-validate ainda não hidratou no primeiro render.
- `Usuarios/Form/Profile/Roles/Roles.vue` — carga horária é gravada direto no
  perfil, fora do "Salvar" em lote, porque o schema não carrega o id do vínculo.
- `VV/Autocomplete/API/Campus/CampusContext.vue` — `useField` só é chamado com
  `functional` verdadeiro; a prop é estática, então não viola as regras de
  composables.
- `Diarios/Form/Geral/Disciplinas/DisciplinasConfig.vue` — busca diários
  existentes da turma e do calendário para não criar duplicata.
- `composables/ladesa-api/-helpers/crudHelpers.ts` — cada helper recebe o `api`
  e a função do SDK e devolve a assinatura que o composable espera: `create`
  envia `{ body }`, `update` `{ path: { id }, body }`, `remove`
  `{ path: { id } }`, `uploadImage` `{ path: { id }, body: { file } }`.
- `utils/schedule/types.ts` — mistura português e inglês e é reconhecidamente
  confuso; o autor original deixou aviso a quem viesse depois.

## Devcontainer

`.devcontainer/devcontainer.json` constrói o estágio `devcontainer` do
`.docker/Containerfile`. O CI usa o CLI do devcontainer (`devcontainer up` mais
um `exec` por passo), sem publicar imagem nenhuma — assim cada passo continua
com seu próprio pass/fail e o que é informativo segue informativo.

`/repo` é a raiz do repositório em todos os ambientes — devcontainer e container
local. O workspace pnpm fica em `/repo/src`, e é de lá
que sai quase todo comando; o eslint que cobre `.github/` e `.docker/` roda de
`/repo`. A montagem precisa ser da raiz justamente para alcançar esses dois.

`NPM_CONFIG_STORE_DIR=/pnpm/store` é `ENV` do `Containerfile`, não de cada
compose: sem ele o store do pnpm nasce dentro do workspace e o `git add -A`
leva junto. A versão do pnpm também vem da imagem, via `corepack prepare` lendo
o `packageManager` de `src/package.json` — sem isso, rodar `pnpm` de `/repo`
baixa a versão mais recente em vez da fixada.

Os builds usam contexto `src/`: `build-push.dev.yml`, o `devcontainer.json` e o
`compose.dev.yml`. É o que faz o `COPY package.json` do `Containerfile` resolver
igual nos três.

A sequência de verificação vive em `ci:verify`, no `package.json`. O workflow e
a receita `check` do justfile chamam esse script em vez de repetir a lista.

O container de desenvolvimento é declarado em `.docker/compose.dev.yml`:
`just dev-up`, `just dev-shell`, `just dev-exec "<cmd>"`.

O `COPY . /sources` saiu do estágio `base` para um estágio `sources` próprio.
Sem isso qualquer arquivo alterado invalidava a camada do `apt-get` e o
devcontainer era reconstruído do zero a cada commit.

## Renovate

Substituiu o Dependabot em `.github/renovate.json`. Cobre npm (o workspace em
`src/`), o `.docker/Containerfile` e os workflows; agrupa dev-dependencies
minor e patch num PR só, exceto `@hey-api/openapi-ts`, que gera o SDK e merece
PR próprio.

Precisa do GitHub App da Mend instalado no repositório — este é o primeiro
Renovate da organização, os outros repos ainda usam Dependabot. Enquanto o app
não for instalado, nada roda: não há PR de dependência automático.

## Referências

- Paleta: os tokens de `packages/styles/src/tokens/colors.css` seguem os nomes
  do protótipo no Figma —
  https://www.figma.com/design/gwJHnj5RVnjt05AdOQNMy5/SISGHA---V2.0?node-id=7660-18059
