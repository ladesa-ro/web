# Slice: recorrencia — issue web#789 (Onda 2, paralelo)

**Antes de começar, leia também `docs/agent-tasks/_convencoes.md` e `docs/agent-tasks/_isolamento.md` — fazem parte deste prompt.**

Sua branch nasce a partir da branch de integração, já com o slice `fundacoes` mergeado.

## Escopo

### 1. Editar evento recorrente: o modal de escopo (padrão Google Calendar)

Ao salvar edição ou disparar exclusão de um evento **com `repeticao`**, interceptar com um modal de escolha (radio):

| Opção | Chamada |
|---|---|
| **Esta ocorrência** | `POST /calendario/agendamentos/:id/editar-ocorrencia` com `dataOcorrencia` da ocorrência clicada + campos alterados |
| **Esta e as seguintes** | `POST .../editar-serie` com `escopo: ESTA_E_SEGUINTES` + `dataOcorrencia` (a API divide a série na data de corte) |
| **Todas** | `POST .../editar-serie` com `escopo: TODAS` |

Importante: a ocorrência clicada numa grade expandida é uma data derivada da RRULE, e o `id` alvo é o da **série**; guardar ambos ao abrir o modal. Exceções que ainda cabem na regra nova sobrevivem à edição da série (comportamento Google, decidido na API) — não precisa avisar o usuário disso.

### 2. Cancelar/excluir em evento recorrente

O botão excluir de um evento com `repeticao` abre o mesmo modal de escopo com duas opções:
- **Esta ocorrência** → `POST .../cancelar-ocorrencia` com `dataOcorrencia` e `motivo` opcional (TextField no próprio modal). A ocorrência some da grade (vira exceção INATIVO), a série continua.
- **Toda a série** → `DELETE /calendario/agendamentos/:id` (comportamento atual).

Extra do mesmo domínio: ação "Adicionar data avulsa" no menu do evento recorrente → modal com `dataOcorrencia` (DateField) + horário opcional → `POST .../adicionar-data-avulsa`. O servidor rejeita com `400` se a data já é gerada pela regra.

### 3. Linha do tempo do agendamento

**Entrada**: botão/ícone "Histórico" na visualização de qualquer evento (`Section/Calendario/Event` e no modal de visualização da gestão de eventos).

**Endpoint**: `GET /calendario/agendamentos/identificador-externo/:identificadorExterno/linha-do-tempo`.

**Composição**: drawer lateral (ou `ModalBaseLayout` largo) com timeline vertical, versão mais recente no topo. Cada entrada:
- versão (`v3`, `v2`...), autor (`autorNome`, fallback "sistema"), quando (`validFrom` relativo: "há 2 dias"), `motivo` quando preenchido
- diff campo a campo (`mudancas: [{campo, de, para}]`): renderizar "Horário de início: ~~08:00~~ → 09:00" por linha
- primeira versão marca "Criado"

Erros: `403` = o papel `OCUPACAO` não pode ver histórico, esconder o botão quando `detalhesOcultos: true`; `404` = tratar como evento sem histórico visível.

## Escopo de arquivos

- `components/Section/Calendario/Event/` (modal de escopo, botão "Histórico" — a variante "Ocupado" já existe do slice `fundacoes`, não recriar; a badge de coleção é do slice `colecoes`, não mexer nela)
- `components/Section/Calendario/Form/Crud/` (integração com o modal de escopo na submissão — coordenar com o slice `colecoes` que também mexe neste diretório: só toque na lógica de submit/interceptação, não nos campos novos de coleção/campus/motivo)
- Novo componente de linha do tempo, local a definir (ex: `components/Section/Calendario/Timeline/`)
