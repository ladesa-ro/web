# Slice: pessoas-a — issue web#789 (Onda 2, paralelo)

**Antes de começar, leia também `docs/agent-tasks/_convencoes.md` e `docs/agent-tasks/_isolamento.md` — fazem parte deste prompt.**

Sua branch nasce a partir da branch de integração, já com o slice `fundacoes` mergeado.

## Escopo

### 1. Solicitações de mudança

**Rota**: `/sisgha/dape/calendario/solicitacoes` (admin) — a entrada pelo lado do professor é de outro slice (`pessoas-b`), não implementar aqui, só deixar o componente do modal de abertura reutilizável.

**Endpoints**: `GET /calendario/solicitacoes-mudanca` (filtros `status`, `autorId`), `GET .../:id`, `POST .../`, `POST .../:id/aprovar`, `POST .../:id/recusar`.

**Composição** (`components/Section/Calendario/SolicitacoesMudanca/`):
- **Lista** com abas por status (`ABERTA` default, `APROVADA`, `RECUSADA`). Cada item: evento alvo (nome, data/horário atual), tipo (`MOVER`/`REMOVER`), autor, justificativa (truncada, expande), data de abertura.
- **View/drawer da solicitação**: comparação lado a lado "Hoje" vs "Proposto" (data, horário, ambiente), justificativa completa, autor. Rodapé para admin com dois botões:
  - **Aprovar** → `DialogConfirm` explicando o efeito real: "Aprovar cria uma proposta numa sessão de edição. A mudança só entra no calendário quando a sessão for publicada." Após aprovar, a resposta referencia a sessão criada; oferecer link "Ir para a sessão de edição" (rota criada pelo slice `breaking-fix`: `/sisgha/dape/horarios-de-aula/sessao/[sessaoId]`).
  - **Recusar** → modal com `motivoRecusa` (TextField multiline, opcional).
- **Modal de abertura** (componente reutilizável, vai ser chamado pelo slice `pessoas-b` a partir da tela do professor): evento pré-selecionado, `tipoOperacao` (radio MOVER/REMOVER), se MOVER campos `data` (DateField) + `horário` (TimeRangeField) + `ambiente` (Autocomplete, opcional), `justificativa` (multiline, obrigatória).

### 2. Indisponibilidade do professor

**Rota**: `/sisgha/dape/calendario/indisponibilidades-professor` (admin gerencia qualquer professor). A aba de autoatendimento no perfil do professor é do slice `pessoas-b`, não implementar aqui — mas construa o componente parametrizável o bastante pra ser reusado lá.

**Endpoints**: `GET/POST /calendario/indisponibilidades-professor`, `GET .../por-periodo?perfilId&dateStart&dateEnd`, `DELETE .../:id`.

**Modelo** (padrão Cal.com, sem RRULE): uma linha com `data` nula é regra semanal (`diaSemana` 0-6 + `inicio` + `fim`); com `data` preenchida é exceção pontual daquele dia. `tipo` distingue `BLOQUEIO` (rígido, o gerador nunca aloca) de `PREFERENCIA` (brando, o gerador evita).

**Composição** (`components/Section/Calendario/IndisponibilidadeProfessor/`):
- Seletor de professor (Autocomplete de perfil) no topo.
- **Grade semanal** (reaproveitar o visual de `Section/Usuarios/Form/Availabilities`): 7 colunas, blocos de indisponibilidade pintados — `BLOQUEIO` sólido, `PREFERENCIA` hachurado. Clique num bloco abre edição; clique em área vazia abre criação com o dia pré-selecionado.
- **Lista de exceções pontuais** abaixo da grade (data, horário, tipo, motivo, excluir).
- **Modal criar/editar**: toggle "Semanal"/"Data específica" (controla `diaSemana` vs `data`), horário (TimeRangeField; a API valida `fim > inicio`), `tipo` (radio BLOQUEIO/PREFERENCIA com texto explicando a diferença), `motivo` (TextField, opcional).
- Excluir por linha com `DialogConfirm`.

### 3. Indisponibilidade de ambiente

**Rota**: aba "Indisponibilidade" dentro de `/sisgea/ambientes/[id]` (`Section/Ambientes/View`).

**Endpoints**: mesmos shapes do item 2 trocando `perfilId` por `ambienteId` (`/calendario/indisponibilidades-ambiente`).

**Composição**: idêntica ao item 2 (mesmo componente parametrizado, se possível), com o ambiente fixo pelo contexto da página.

## Escopo de arquivos

- `components/Section/Calendario/SolicitacoesMudanca/` (novo)
- `pages/sisgha/dape/calendario/solicitacoes/` (novo)
- `components/Section/Calendario/IndisponibilidadeProfessor/` (novo)
- `pages/sisgha/dape/calendario/indisponibilidades-professor/` (novo)
- `components/Section/Ambientes/View/` (só a aba nova de indisponibilidade — não mexer no resto da view)
