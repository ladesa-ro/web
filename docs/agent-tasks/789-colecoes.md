# Slice: colecoes — issue web#789 (Onda 2, paralelo)

**Antes de começar, leia também `docs/agent-tasks/_convencoes.md` e `docs/agent-tasks/_isolamento.md` — fazem parte deste prompt.**

Sua branch nasce a partir da branch de integração, já com o slice `fundacoes` mergeado (o wrapper de erro/`If-Match` e a variante "Ocupado" do card já existem — reuse-os, não reimplemente).

## Escopo

### 1. Telas de coleções de calendário

**Rota**: `/sisgha/dape/calendario/colecoes` (+ `[id]` para view). **Papel**: administração.

**Endpoints**: `GET/POST /calendario/colecoes`, `GET/PATCH/DELETE /calendario/colecoes/:id`, `POST /calendario/colecoes/:id/transferir-dono`, `GET/POST /calendario/colecoes/:colecaoId/acessos`, `DELETE /calendario/colecoes/:colecaoId/acessos/:id`.

**Composição** (`components/Section/Calendario/Colecoes/`):
- **Grid**: cards com faixa na cor da coleção, nome, badge de visibilidade (`PRIVADA`/`CAMPUS`/`PUBLICA`), campus quando houver, contagem de acessos concedidos. Busca por nome, filtro por campus e visibilidade. Botão "Nova coleção".
- **Modal criar/editar** (`EditOrCreateModal`):
  - `nome` (TextField, obrigatório)
  - `cor` (ColorPalette, mesma paleta dos eventos)
  - `visibilidade` (SelectField com as 3 opções; texto de apoio: Privada = só quem recebeu acesso; Campus = todo mundo do campus enxerga; Pública = todos)
  - `campus` (Autocomplete; **obrigatório quando visibilidade = CAMPUS**, a API rejeita sem ele — validar no cliente também)
- **View da coleção** (`[id]`): cabeçalho com nome/cor/dono, duas áreas:
  1. **Acessos**: tabela com colunas Escopo (`USUARIO`/`CAMPUS`/`PUBLICO`), Alvo (nome do usuário ou do campus; vazio para PUBLICO), Papel (`OCUPACAO`/`LEITOR`/`EDITOR` com tooltip explicando cada um: Ocupação = vê só que o horário está ocupado; Leitor = vê tudo, não edita; Editor = edita), botão revogar por linha (`DialogConfirm`: "Revogar o acesso de X?"). Botão "Conceder acesso" abre modal:
     - `escopo` (SelectField) — controla os campos seguintes
     - escopo USUARIO → `usuario` (Autocomplete de usuários)
     - escopo CAMPUS → `campus` (Autocomplete de campi)
     - escopo PUBLICO → nenhum alvo
     - `papel` (SelectField)
  2. **Ações**: "Transferir dono" (modal com Autocomplete de usuário + `DialogConfirm` reforçando que o dono atual perde o controle implícito), "Excluir coleção" (`DialogConfirm` avisando: os eventos não são apagados, só ficam sem coleção).

Erro esperado: conceder acesso duplicado pro mesmo alvo → `400`, exibir mensagem do servidor no modal (usar o wrapper de erro do slice `fundacoes`).

### 2. Campos de coleção no form/badges de evento

Em `components/Section/Calendario/Form/Crud` (gestão de eventos):
- Adicionar campo **coleção** (Autocomplete das coleções visíveis, opcional, com a cor de cada uma no item) e **campus** (Autocomplete, opcional).
- Adicionar campo **motivo** (TextField opcional, "por que esta mudança" — alimenta a linha do tempo, que é outro slice).

Em `components/Section/Calendario/Event` (visualização de evento):
- Badge da coleção com a cor dela.

## Escopo de arquivos

- `components/Section/Calendario/Colecoes/` (novo)
- `pages/sisgha/dape/calendario/colecoes/` (novo)
- `components/Section/Calendario/Form/Crud/` (só os campos `colecao`/`campus`/`motivo` — não mexer no resto do form, isso é de outro slice)
- `components/Section/Calendario/Event/` (só a badge de coleção — a variante "Ocupado" já existe do slice `fundacoes`, não recriar)
