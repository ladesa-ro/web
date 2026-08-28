# justfile

set shell := ["bash", "-euo", "pipefail", "-c"]

COMMAND_TOOL_OCI_RUNTIME := env_var_or_default("OCI_RUNTIME", "docker")
COMMAND_COMPOSE_AGENTS := COMMAND_TOOL_OCI_RUNTIME + " compose --file .docker/compose.agents.yml -p ladesa-web-agents"

ISSUE_BRANCH := "feat/789-calendario-institucional"
WORKTREE_DIR := "../"

# Mostra as receitas disponíveis
default:
    @just --list

# Builda as imagens dos agentes (só se o Containerfile mudou)
agents-build:
    {{COMMAND_COMPOSE_AGENTS}} build

# Cria o clone isolado do slice "fundacoes", na branch de integração, a partir de origin/main
worktree-init:
    #!/usr/bin/env bash
    set -euo pipefail
    git fetch origin main
    rm -rf {{WORKTREE_DIR}}web-agent-fundacoes
    git clone --local . {{WORKTREE_DIR}}web-agent-fundacoes
    cd {{WORKTREE_DIR}}web-agent-fundacoes && git checkout -B {{ISSUE_BRANCH}} origin/main
    echo "[WORKTREE] fundacoes pronto em {{ISSUE_BRANCH}} ✅"

# Cria o clone isolado de um slice, numa sub-branch a partir de BASE (normalmente a branch de integração)
worktree-branch SLICE BASE:
    #!/usr/bin/env bash
    set -euo pipefail
    rm -rf {{WORKTREE_DIR}}web-agent-{{SLICE}}
    git clone --local . {{WORKTREE_DIR}}web-agent-{{SLICE}}
    cd {{WORKTREE_DIR}}web-agent-{{SLICE}} && git checkout -B feat/789-{{SLICE}} {{BASE}}
    echo "[WORKTREE] {{SLICE}} pronto em feat/789-{{SLICE}} (base: {{BASE}}) ✅"

# Remove o clone de um slice depois do merge (a branch já vive mergeada na integração, não precisa preservar)
worktree-done SLICE:
    rm -rf {{WORKTREE_DIR}}web-agent-{{SLICE}}

# Sobe o container de um slice
agents-up SLICE:
    {{COMMAND_COMPOSE_AGENTS}} up -d {{SLICE}}

# Derruba todos os containers de agente
agents-down:
    {{COMMAND_COMPOSE_AGENTS}} down --remove-orphans

# Logs de um slice
agents-logs SLICE:
    {{COMMAND_COMPOSE_AGENTS}} logs -f {{SLICE}}

# Executa um comando arbitrário dentro do container de um slice (única porta de execução pros subagentes)
exec SLICE *ARGS:
    {{COMMAND_COMPOSE_AGENTS}} exec {{SLICE}} bash -c "{{ARGS}}"

# Shell manual pra debug
agents-shell SLICE:
    {{COMMAND_COMPOSE_AGENTS}} exec {{SLICE}} bash

# Roda o gate de qualidade (build:all + lint + types:check) dentro do container do slice
check SLICE:
    just exec {{SLICE}} "cd /repo/src && pnpm install --frozen-lockfile && pnpm run -w build:all && pnpm --filter @ladesa-ro/web.service run lint && pnpm --filter @ladesa-ro/web.service run types:check"

# Faz merge normal (sem squash) da branch do slice pra branch de integração
# Roda no container "fundacoes", que enxerga o clone de todos os slices (read-only) em /mnt/<slice>
merge SLICE:
    just exec fundacoes "cd /repo && git fetch /mnt/{{SLICE}} feat/789-{{SLICE}} && git merge --no-ff FETCH_HEAD -m 'merge: integrar slice {{SLICE}} da issue web#789'"
