<!-- Bloco comum, referenciado por todos os prompts de slice da issue #789. -->

## Isolamento (obrigatório)

Você está trabalhando num clone isolado do repositório, montado em `/repo` dentro de um container Docker que já tem `node`, `pnpm` e `git` instalados. Não existe `pnpm`/`git`/`node` no host de fora — o container é a única forma de executar qualquer coisa.

- **Edição de arquivo é local**: use `Edit`/`Write`/`Read` normalmente, direto no caminho do seu worktree no host (ex: `/Users/.../web-agent-<slice>/src/apps/...`). Isso é só texto, não executa nada.
- **Toda execução passa pelo `just exec <slice> "<comando>"`** rodado via `Bash`, nunca `pnpm`/`git`/`nx` direto no shell do host. Exemplos:
  - `just exec <slice> "cd /repo/src && pnpm install --frozen-lockfile"`
  - `just exec <slice> "cd /repo/src && pnpm --filter @ladesa-ro/web.service run lint"`
  - `just exec <slice> "cd /repo && git add -A && git commit -m '...'"`
- Ao terminar, rode `just check <slice>` (lint + `types:check` + `build:all`, tudo dentro do container) e só considere o trabalho pronto se ele passar limpo.
- Faça commits pequenos e no padrão Conventional Commits (`feat(calendario): ...`, `fix(calendario): ...`), só título, sem corpo, sem `Co-Authored-By`. **Não dê `git push`** — isso fica pro orquestrador/usuário decidir depois.
- Se em algum momento precisar tocar um arquivo fora do escopo listado no seu prompt (porque outro slice já mexeu lá, ou porque a mudança é genuinamente transversal), **pare e relate** em vez de simplesmente fazer — isso é sinal de conflito entre slices que o orquestrador precisa resolver manualmente.
