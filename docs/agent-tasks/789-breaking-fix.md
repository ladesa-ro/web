# Slice: breaking-fix — issue web#789 (Onda 1, sequencial, urgente)

**Antes de começar, leia também `docs/agent-tasks/_convencoes.md` e `docs/agent-tasks/_isolamento.md` — fazem parte deste prompt.**

Roda depois do slice `fundacoes` já mergeado na branch de integração — sua branch deve nascer a partir dela (o orquestrador já cuida disso ao criar seu worktree). É o item mais urgente da issue: sem isso, um fluxo existente do produto está quebrado hoje.

## O problema

**Antes**: `POST /gerar-horario/:id/aceitar` mudava o status e o fluxo acabava ali.

**Agora**: aceitar abre uma **sessão de edição** com uma mudança `CRIAR` por aula da grade, como proposta. **Nada vira agendamento real até `POST /horarios/edicao/:sessaoId/publicar`**. A resposta do aceitar ganhou o campo `sessaoEdicaoId`.

O fluxo em `components/Section/Horario/Dape/Generate` fica sem efeito visível nenhum se isso não for corrigido: o usuário aceita, a tela diz que deu certo, e nenhuma aula aparece no calendário.

## Escopo

### 1. Revisão de sessão de edição (tela nova)

**Rota**: `/sisgha/dape/horarios-de-aula/sessao/[sessaoId]` (ou integrada em `Section/Horario/Dape/Edit`, que já lida com sessões).

**Endpoints**: `GET /horarios/edicao/:sessaoId/diferenca`, `POST /horarios/edicao/:sessaoId/publicar` (aceita header `Idempotency-Key`), `POST /horarios/edicao/:sessaoId/mudancas/:mudancaId/desfazer`, `POST /horarios/edicao/:sessaoId/cancelar`.

**Composição** (`components/Section/Horario/Dape/Sessao/`):
- Cabeçalho: status da sessão (`ABERTA`/`SALVA`/`CANCELADA`), autor, data.
- Corpo: resultado da `diferenca` em três grupos com contagem: **Entram** (verde), **Saem** (vermelho), **Mudam** (âmbar, com antes → depois por campo). Cada item mostra a aula (disciplina/turma/professor/ambiente/dia/horário) e botão "Desfazer esta mudança" (chama o desfazer individual e refaz a query da diferença).
- Rodapé: **"Publicar"** (botão primário; `DialogConfirm`: "Aplicar N mudanças ao calendário oficial?"; enviar `Idempotency-Key` gerado por sessão para retry seguro) e **"Cancelar sessão"** (`DialogConfirm` destrutivo).
- Estado vazio: "Nenhuma mudança pendente nesta sessão."

### 2. Ajustar o fluxo de aceitar (`Section/Horario/Dape/Generate`)

Depois do `POST /gerar-horario/:id/aceitar`, ler `sessaoEdicaoId` da resposta e **navegar para a tela do item 1** em vez de encerrar o fluxo. Ajustar o texto de sucesso: "Grade aceita. Revise as mudanças e publique para aplicar ao calendário."

### 3. Geração de horário ponta a ponta (hoje é fachada)

`Section/Horario/Dape/Generate/GenerateModal.vue` renderiza o formulário (oferta, permanente/temporário, datas — hoje em `TextField` com TODO de datepicker), mas o submit **não chama endpoint nenhum**. Implementar de ponta a ponta:

1. Submit → `POST /gerar-horario` (aceita `Idempotency-Key`; gerar uma por abertura do modal para retry seguro).
2. Tela/estado de acompanhamento → poll de `GET /gerar-horario/:id` até o status sair de processando; exibir erro do gerador quando falhar.
3. Resultado pronto → apresentar a grade proposta com **Aceitar** / **Rejeitar**.
4. Aceitar → segue o fluxo do item 2 (navega pra tela de sessão, publica).
5. Trocar os `TextField` de data por `DateField` (o TODO já existe no código).

### 4. Decisão: editor DAPE grava direto, sem sessão

O editor drag-and-drop (`Section/Horario/Dape/Edit`) hoje escreve direto via `useCalendarioAgendamento` (create/update/delete) — cada arrasto vira escrita imediata, sem rascunho, sem desfazer, sem revisão. Isso está **fora do escopo obrigatório** deste slice (é uma migração maior, registrada na issue como recomendação, não requisito). Não precisa migrar o editor agora — só não regredir nada dele.

## Escopo de arquivos

- `components/Section/Horario/Dape/Generate/` (fluxo de aceitar + geração ponta a ponta)
- `components/Section/Horario/Dape/Sessao/` (novo, revisão de sessão)
- `pages/sisgha/dape/horarios-de-aula/` (rota nova, se necessário)
