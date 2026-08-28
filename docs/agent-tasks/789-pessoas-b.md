# Slice: pessoas-b — issue web#789 (Onda 3, paralelo)

**Antes de começar, leia também `docs/agent-tasks/_convencoes.md` e `docs/agent-tasks/_isolamento.md` — fazem parte deste prompt.**

Sua branch nasce a partir da branch de integração, já com os slices `fundacoes`, `breaking-fix`, `colecoes`, `recorrencia` e `pessoas-a` mergeados. O modal de "solicitar mudança" e o componente de indisponibilidade do slice `pessoas-a` já existem — reuse-os, não reimplemente.

## Escopo

### 1. Matrícula de aluno na turma

**Entrada**: aba "Alunos" em `Section/Turmas/View` (`/sisgha/dape/turmas/[id]`).

**Endpoints**: `GET /matriculas?filter.turma.id=`, `POST /matriculas` (`{turma: {id}, perfil: {id}}`), `DELETE /matriculas/:id`.

**Composição**: tabela de alunos matriculados (nome, matrícula, data de vínculo), botão "Matricular aluno" (modal com Autocomplete de perfil), desvincular por linha (`DialogConfirm`). Vínculo duplicado ativo → `400`, mensagem do servidor.

### 2. Meu horário (aluno) — papel novo no sistema

**Rota**: `/sisgha/aluno/horario`, layout novo `sisgha-aluno` espelhando o `sisgha-professor`.

**Endpoint**: `GET /calendario/consultas/ocorrencias?dateStart&dateEnd&turma=<turmaDoAluno>`.

A API já garante: aluno com matrícula ativa na turma enxerga a grade completa da turma mesmo quando a coleção tem ACL restrito.

**Composição**: reaproveitar `Section/Horario/ProfessorEAluno` — visões semana/dia/turnos, somente leitura, sem nenhuma ação de edição. Seletor de turma quando o aluno tem mais de uma matrícula. Guard de rota pelo cargo "Aluno".

### 3. Campos novos em turma e perfil

- `Section/Turmas/Form`: campo `numeroEstimadoAlunos` (number, opcional) — alimenta a validação de capacidade de sala do servidor.
- `Section/Usuarios/Form`: campo `cargaMaximaSemanal` (number, opcional, horas semanais) no perfil de professor — o servidor bloqueia vínculo de diários que estoure o limite (o `400` chega com nome do professor e números).

### 4. Ações do professor na própria agenda

Hoje o professor só visualiza (`/sisgha/professor/*`). Ganha duas ações no evento da própria agenda:
- **Cancelar minha ocorrência**: professor participante pode cancelar uma ocorrência própria sem papel EDITOR (`POST .../cancelar-ocorrencia`) — reusar o fluxo de escopo do slice `recorrencia`, restrito à opção "esta ocorrência".
- **Solicitar mudança**: abre o modal de abertura de solicitação que o slice `pessoas-a` já construiu, com o evento pré-selecionado.

E a tela de autoatendimento de indisponibilidade do professor: mesma composição do slice `pessoas-a` (`IndisponibilidadeProfessor`), variante com o perfil fixo no próprio usuário logado, dentro de `Section/Profile/Availability`.

## Escopo de arquivos

- `components/Section/Turmas/View/` (só a aba "Alunos" — não mexer no resto da view)
- `components/Section/Turmas/Form/` (só o campo `numeroEstimadoAlunos`)
- `components/Section/Usuarios/Form/` (só o campo `cargaMaximaSemanal`)
- `pages/sisgha/aluno/` (novo)
- `layouts/sisgha-aluno` (novo, espelhando `sisgha-professor`)
- `pages/sisgha/professor/` (só as duas ações novas no evento — não mexer no resto)
- `components/Section/Profile/Availability/` (ligar na API nova de indisponibilidade)
