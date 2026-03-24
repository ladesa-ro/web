---
description: Refinar código para aumentar qualidade, reduzir débito técnico e evitar overengineering
---

## Objetivo

Aumentar a qualidade do código, reduzir débito técnico e evitar overengineering. Cada decisão tomada neste comando deve passar por esse filtro:

- **Simples é melhor.** Não adicione abstrações, patterns ou camadas que o projeto não precisa *agora*.
- **Menos código é mais.** Se dá pra resolver com menos linhas sem perder clareza, resolva.
- **Não invente problema.** Só corrija o que está errado ou fora do padrão. Não refatore código funcional e limpo só por preferência estética.

## 1. Reler e aplicar CLAUDE.md

Releia o arquivo CLAUDE.md na raiz do projeto **por completo**. Internalize todas as diretrizes, convenções, padrões e regras descritas. Você **não pode ignorar** nenhuma instrução contida nele. Tudo que seguir neste comando deve estar em conformidade com o CLAUDE.md.

## 2. Pré-validação de lógica

Antes de qualquer refatoração, analise os arquivos modificados ou pendentes e valide:

- **Corretude** — a lógica faz o que deveria? Há bugs, condições erradas, nulls não tratados, estados inconsistentes na UI?
- **Coerência** — o fluxo faz sentido? Composables retornam dados consistentes? Componentes recebem props corretas?
- **Efeitos colaterais** — alguma mudança recente quebra comportamento existente, rotas, layouts ou reatividade?
- **Casos de borda** — cenários limítrofes estão cobertos (listas vazias, loading states, erros de API, permissões, responsividade)?

Se o problema for pontual e seguro de corrigir (ex: null não tratado, binding errado, import morto), **corrija**. Se exigir refactor mais amplo ou decisão de design, **não corrija** — apenas registre para o relatório final.

## 3. Refinar arquivos pendentes

Para cada arquivo modificado ou pendente, aplique as práticas do CLAUDE.md:

- **DRY** — elimine duplicações reais (não force DRY em coisas que só parecem iguais)
- **Clean Code** — clareza, legibilidade, responsabilidade única
- **Nomes** — variáveis, funções, composables, componentes e arquivos nas convenções do projeto
- **Caminhos** — organização de diretórios e imports conforme a estrutura definida
- **Tipagem** — elimine `as any`. Sempre tipar corretamente; se necessário, use tipos mais específicos (`unknown`, narrowing, generics simples). `as any` é débito técnico, não solução.
- **Resíduos** — remova código morto (funções, variáveis, imports não utilizados), comentários desatualizados ou obsoletos, TODOs já resolvidos, componentes órfãos e props não utilizadas. Não deixe lixo para trás.
- **Reatividade** — garanta uso correto de `ref`, `computed`, `watch`. Evite efeitos colaterais em `computed`. Não faça chamadas de API fora de composables/queries.
- **Componentes** — garanta que componentes são focados (SRP). Extraia lógica complexa para composables. Props tipadas, emits declarados.

**Não** introduza abstrações, wrappers ou indireções que não sejam justificados por uso concreto no código atual.

## 4. Code Fix

Execute lint e formatação do projeto. Corrija todos os erros e warnings:

```bash
cd sisgha-sisgea && pnpm run lint:fix
cd .. && pnpm run format:fix
```

Se houver erros que exijam decisão de design, sinalize-os em vez de aplicar um fix arbitrário.

## 5. Check

Rode type-check e lint. Tudo deve passar. Se algo quebrar, corrija antes de prosseguir:

```bash
cd sisgha-sisgea && pnpm run types:check
cd sisgha-sisgea && pnpm run lint
cd .. && pnpm run format:check
```

## 6. Verificar README

Atualize o README.md se as mudanças exigirem. Se estiver correto, não mexa.

## 7. Verificar CLAUDE.md

Atualize o CLAUDE.md se alguma convenção nova surgiu ou algo ficou desatualizado. Proponha alterações se necessário.

## 8. Relatório de auditoria

Ao final de tudo, apresente um relatório executivo com três seções:

### Corrigido
O que foi efetivamente alterado nesta sessão (com arquivo e descrição breve).

### Divergências
Problemas pré-existentes encontrados que **não foram corrigidos** por exigirem refactor mais amplo ou decisão de design. Para cada item, descrever:
- Onde está (arquivo/camada)
- O que foi observado
- Por que não foi corrigido agora

Exemplo:
> **Observação (pré-existente, não introduzida):** Composable `useAuth` faz fetch direto sem TanStack Query, perdendo cache e deduplicação. Corrigir exigiria migrar o fluxo de autenticação para o padrão de queries do projeto.

### Recomendações
Sugestões de próximos passos para resolver as divergências encontradas, priorizadas por impacto.
