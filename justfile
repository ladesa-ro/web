set shell := ["bash", "-euo", "pipefail", "-c"]

COMMAND_TOOL_OCI_RUNTIME := env_var_or_default("OCI_RUNTIME", "docker")
COMMAND_COMPOSE_DEV := COMMAND_TOOL_OCI_RUNTIME + " compose --file .docker/compose.dev.yml -p ladesa-web-dev"

[doc("Mostra as receitas disponíveis")]
default:
    @just --list

[doc("Sobe o container de desenvolvimento")]
dev-up:
    {{COMMAND_COMPOSE_DEV}} up -d --build

[doc("Derruba o container de desenvolvimento")]
dev-down:
    {{COMMAND_COMPOSE_DEV}} down

[doc("Shell manual pra debug")]
dev-shell:
    {{COMMAND_COMPOSE_DEV}} exec web bash

[doc("Executa um comando arbitrário dentro do container de desenvolvimento")]
dev-exec +CMD:
    {{COMMAND_COMPOSE_DEV}} exec web bash -lc "{{CMD}}"

[doc("Roda o gate de qualidade; duplicação e lint do app seguem informativos")]
check:
    just dev-exec "cd /repo/src && pnpm install --frozen-lockfile && pnpm run -w ci:verify"
    -just dev-exec "cd /repo/src && pnpm run -w lint:duplication"
    -just dev-exec "cd /repo/src/apps/sisgha-sisgea && pnpm exec eslint ."
