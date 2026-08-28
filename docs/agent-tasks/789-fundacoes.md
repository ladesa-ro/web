# Slice: fundacoes — issue web#789 (Onda 0, sequencial)

Este é o primeiro slice a rodar. Tudo que vem depois depende do que você entregar aqui — não há paralelismo nesta onda.

**Antes de começar, leia também `docs/agent-tasks/_convencoes.md` e `docs/agent-tasks/_isolamento.md` — fazem parte deste prompt.**

## Escopo

### 1. Regenerar o cliente de API

```
just exec fundacoes "cd /repo/src/packages/ladesa-api-client && pnpm fetch-spec && pnpm generate-client"
```

A spec nova traz ~30 operações novas (coleções, acessos, solicitações, indisponibilidades, matrículas, linha do tempo, ocupação, ICS, sessão de edição) e campos novos em DTOs existentes. Enums novos que o client vai expor:

```
CalendarioAgendamentoEscopoEdicaoSerie   ESTA_E_SEGUINTES | TODAS
CalendarioColecaoVisibilidade            PRIVADA | CAMPUS | PUBLICA
CalendarioColecaoAcessoEscopo            USUARIO | CAMPUS | PUBLICO
CalendarioColecaoAcessoPapel             OCUPACAO | LEITOR | EDITOR
CalendarioSolicitacaoMudancaTipoOperacao MOVER | REMOVER
CalendarioSolicitacaoMudancaStatus       ABERTA | APROVADA | RECUSADA
CalendarioIndisponibilidadeTipo          BLOQUEIO | PREFERENCIA
```

Confira no diff que as operações de `/cargos` (5 rotas) e `/enderecos` (5 rotas) também aparecem — o client commitado estava desatualizado além do calendário, isso é esperado e faz parte deste passo.

### 2. Campos novos no agendamento (find-one/list)

Todo lugar que renderiza um agendamento passa a receber:

| Campo | Tipo | Uso |
|---|---|---|
| `colecao` | `{ id } \| null` | badge de coleção com a cor dela no card do evento |
| `campus` | `{ id } \| null` | filtro e exibição |
| `autorId`, `motivo` | `string \| null` | tooltip/visualização, linha do tempo |
| `detalhesOcultos` | `boolean` | ver abaixo, tratamento obrigatório |
| `identificadorExternoSerieOrigem` | `string \| null` | preenchido = este registro é uma exceção de uma série |
| `dataOcorrenciaReferenciada` | `string \| null` | data da série que a exceção substitui/cancela; `null` numa exceção = data avulsa (RDATE) |
| `version` | `number` | validador do `If-Match` |

Só precisa dos tipos/plumbing aqui — os slices seguintes é que vão consumir cada campo na UI específica deles.

### 3. `detalhesOcultos: true` — o card "ocupado"

Quando o requisitante só tem papel `OCUPACAO` na coleção do evento, a API devolve o evento com `nome`, `motivo`, `autorId`, `turmas`, `perfis`, `calendariosLetivos`, `ofertasFormacao`, `modalidades` e `diarios` zerados, mantendo `dataInicio`, `horarioInicio`, `horarioFim`, `status` e `ambientes`, e marca `detalhesOcultos: true`.

Criar uma variante do card de evento (em `components/Section/Calendario/Event/`) que renderiza "Ocupado" com o horário e o ambiente, sem nome, com estilo visual distinto (hachurado/cinza). Aplicar em toda superfície que lista eventos: mês (`Section/Calendario/Month`), visualizações (`Section/Calendario/Views`), gestão de eventos, horário do professor/aluno.

### 4. Escrita condicional (`If-Match` → 412)

Todos os endpoints de escrita de agendamento (`update`, `editar-ocorrencia`, `editar-serie`, `cancelar-ocorrencia`, `adicionar-data-avulsa`) aceitam o header `If-Match` com o `version` lido no find-one. Se outra pessoa salvou no meio tempo, a API responde `412 Precondition Failed`.

- Guardar o `version` no estado do formulário ao abrir qualquer edição de evento.
- Enviar `If-Match: <version>` em toda escrita.
- Tratar `412` globalmente (no wrapper do client ou no `onError` das mutations): toast "Este evento foi alterado por outra pessoa. Recarregue antes de salvar de novo", com botão "Recarregar" que refaz o find-one e repovoa o formulário sem fechar o modal.

### 5. Novos erros que toda tela de escrita precisa tratar

| Status | Quando | UI |
|---|---|---|
| `403` | escrita em evento de coleção sem papel `EDITOR` | toast "Sem permissão de edição nesta coleção" e fechar modal |
| `404` em item que a lista mostrou | acesso revogado entre listar e abrir | toast "não encontrado", invalidar a query da lista |
| `412` | ver item 4 | ver item 4 |
| `400` com mensagem de capacidade/turno/carga/conflito | validações novas do servidor | exibir a mensagem do servidor literalmente, ela já vem legível |

O `400` de conflito/capacidade/turno deve aparecer **dentro do modal**, acima dos botões, não como toast.

Centralizar 4 e 5 num wrapper reutilizável (ex: composable/interceptor único) que os slices seguintes só precisam importar, não reimplementar.

## Escopo de arquivos

- `src/packages/ladesa-api-client/` (regeneração)
- `components/Section/Calendario/Event/` (variante "Ocupado")
- `components/Section/Calendario/Month/`, `components/Section/Calendario/Views/` (uso da variante)
- Composables de erro/If-Match compartilhados (local a definir por você, mas deixar claro no commit onde ficou, pros outros slices importarem)

