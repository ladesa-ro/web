# Slice: integracoes — issue web#789 (Onda 3, paralelo)

**Antes de começar, leia também `docs/agent-tasks/_convencoes.md` e `docs/agent-tasks/_isolamento.md` — fazem parte deste prompt.**

Sua branch nasce a partir da branch de integração, já com os slices `fundacoes`, `breaking-fix`, `colecoes`, `recorrencia` e `pessoas-a` mergeados.

## Escopo

### 1. Importar `.ics`

**Entrada**: botão "Importar" na gestão de eventos (`Section/Calendario/Gestao/Eventos`).

**Endpoint**: `POST /calendario/agendamentos/importar-ics` — o corpo é JSON com o campo `conteudo` (texto do arquivo), **não** multipart: ler o arquivo no cliente com `FileReader` e mandar a string.

**Composição** (modal em dois passos, `VV/Stepper` se couber):
1. Upload (drag-and-drop ou file picker, `.ics`), seletores opcionais de `campus` e `colecao` de destino.
2. Resultado: contadores (criados, pulados por UID duplicado) e tabela de rejeitados (`index`, `uid`, `motivo`) quando houver. Importação respeita `EXDATE` (ocorrências canceladas na origem não ressuscitam) — não precisa de UI, só não estranhar no teste.

### 2. Exportar / assinar agenda (`.ics`)

**Entrada**: botão "Exportar" nas telas de calendário e horário (gestão de eventos, horário do professor, horário do aluno).

**Endpoint**: `GET /calendario/consultas/ocorrencias/ics?dateStart&dateEnd[&campus][&turma][&professor][&tipo]` (responde `text/calendar` com `Content-Disposition`).

**Composição**: modal simples com período (dois DateField, default o intervalo visível) e os filtros do contexto pré-preenchidos, dois botões: "Baixar .ics" (navega para a URL, o browser baixa) e "Copiar link da agenda" (copia a URL pra colar no Google Calendar/Outlook como assinatura; a exportação respeita o ACL — quem tem `OCUPACAO` recebe eventos sem detalhe).

### 3. Reservas de verdade (hoje é mock estático)

`Section/Reservas/Reservas.vue` (sisgea) tem markup de exemplo hardcoded e zero chamadas de API. Construir de verdade:

- **Listagem**: `GET /calendario/agendamentos?filter.tipo=RESERVA` (+ filtro por ambiente/período), cards com ambiente, horário, autor.
- **Criar reserva** (modal): ambiente (Autocomplete — avaliar `ambienteListDisponiveis`/`ambienteGetDisponibilidade` pra sugerir só ambientes livres), data (DateField), horário (TimeRangeField), motivo. Submete `POST /calendario/agendamentos` com `tipo: RESERVA`.
- **Aviso de ocupação** (não bloqueia o envio, só avisa — a fonte de verdade do conflito é o servidor): usar `GET /calendario/consultas/ocupacao?campus&dateStart&dateEnd` (devolve `{data, horarioInicio, horarioFim, ambienteIds, perfilIds}` sem detalhes, por desenho).
- **Cancelar reserva**: `DELETE` com `DialogConfirm`.

### 4. Sino de notificações

`UI/Button/Notification/Notification.vue` é um ícone sem comportamento hoje. O REST já existe (`notificacaoFindAll`, `notificacaoContagemNaoLidas`, `notificacaoMarcarLida`). Implementar: badge com contagem de não lidas no sino, dropdown com a lista (título, corpo, quando), clique marca lida, "marcar todas".

### 5. Tempo real (opcional, se sobrar tempo)

WebSocket no namespace `/notificacoes`, sala dinâmica `calendario:{colecaoId}`:

```js
socket.emit('join_room', `calendario:${colecaoId}`)
// evento 'notificacao', payload: { colecaoId, agendamentoId, tipoOperacao, syncToken }
```

Nas telas de calendário, entrar nas salas das coleções visíveis e, ao receber payload, invalidar as queries TanStack do período. Para polling/recuperação existe `GET /calendario/consultas/colecao/mudancas-desde?colecaoId&desde=<syncToken>` (quando o token está velho demais o servidor devolve snapshot completo — tratar os dois formatos). Se não der tempo, deixar como TODO documentado, não é bloqueante pro resto.

## Escopo de arquivos

- `components/Section/Calendario/Gestao/Eventos/` (só o botão/modal de importar — não mexer no resto)
- `components/Section/Calendario/` e `components/Section/Horario/` (só os botões/modal de exportar, um por tela listada acima)
- `components/Section/Reservas/` (reescrever, hoje é mock)
- `components/UI/Button/Notification/` (novo comportamento)
- Socket client, local a definir (ex: `composables/useCalendarioSocket.ts`)
