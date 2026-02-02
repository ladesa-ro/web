# SISGHA & SISGEA - Aplicação Web

[![Repositório Aplicação Web][github-web-application-icon]][github-web-application-href]

O Sistema Gerador de Horário Acadêmico (SISGHA) e o Sistema de Gestão de Ambientes (SISGEA) são duas ferramentas desenvolvidas para automatizar processos manuais comuns na administração de uma instituição de ensino.

<!-- desenvolver mais sobre os dois sistemas -->

## Linguagens e ferramentas

### Frameworks

- Vue.js v3
- Nuxt.js v4
- Tailwind v4

### Principais Bibliotecas

- Auth.js
- Day.js
- Pragmatic Drag and Drop
- Reka UI
- Vee Validate
- VueUse

## Organização de pastas

<!-- seção pendente -->

## Ambientes

| Estágio         | Devops                                                      | URL                          |
| --------------- | ----------------------------------------------------------- | ---------------------------- |
| Desenvolvimento | [![CI: Development][action-ci-dev-src]][action-ci-dev-href] | <https://dev.ladesa.com.br/> |

## Configuração Local

### Obter o código fonte do projeto

```bash
git clone https://github.com/ladesa-ro/web.git
cd web
```

### Instalar as dependências do projeto

```bash
pnpm install
```

### Atualizar o fetch client

```bash
cd sisgha-sisgea
pnpm run generate-client
```

### Iniciar servidor de desenvolvimento local

Comece o servidor de desenvolvimento em [`http://localhost:3000`](http://localhost:3000):

```bash
pnpm run dev
```

## Colaboradores

Somos uma equipe de estudantes e servidores do Instituto Federal de Rondônia - _Campus_ Ji-Paraná.

- Anna Isabela Bianchini Pontuschka
- Ana Maria Brito Souza
- Danilo Pereira Escudero
- Gabriel Guedes Alves de Moura
- Gabriel Rodrigues Antunes
- Vitor Daniel Silva Melo

<!-- Badges -->

<!-- Badges / GitHub -->

[github-web-application-icon]: https://img.shields.io/badge/GitHub-Web-black?style=for-the-badge&logo=GitHub&logoColor=white&labelColor=black&color=white
[github-web-application-href]: https://github.com/ladesa-ro/web

<!-- Badges / Actions / Production  -->

[action-ci-prod-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/web/ci-cd.yml?style=flat&logo=github&logoColor=white&label=CI@production&branch=production&labelColor=18181B
[action-ci-prod-href]: https://github.com/ladesa-ro/web/actions/workflows/ci-cd.yml?query=branch%3Aproduction

<!-- Badges / Actions / Development  -->

[action-ci-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/web/ci-cd.yml?style=flat&logo=github&logoColor=white&label=CI@development&branch=main&labelColor=18181B
[action-ci-dev-href]: https://github.com/ladesa-ro/web/actions/workflows/ci-cd.yml?query=branch%3Amain

<!-- #endregion conteudo -->
