# Web

<!-- #region conteudo -->

[![Repositório Aplicação Web][github-web-application-icon]][github-web-application-href]

A Aplicação Web é acessada diretamente no navegador e consiste na interação entre dois sistemas: SISGHA e SISGEA.

## Linguagens e ferramentas

> Talvez adicionar imagens ou uma tabela nesta seção.

### Frameworks

JavaScript

- Vue.js
- Nuxt
- ~Vuetify~

CSS

- Tailwind

### Bibliotecas

JavaScript

- Dayjs
- Entre outras.

## Organização de pastas

sla uaikkkkkkkkk

## Ambientes

| Estágio         | Devops                                                      | URL                                                      |
| --------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Desenvolvimento | [![CI: Development][action-ci-dev-src]][action-ci-dev-href] | <https://luna.sisgha.com/>; <https://dev.ladesa.com.br/> |

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

### Iniciar servidor de desenvolvimento local

Comece o servidor de desenvolvimento em [`http://localhost:3000`](http://localhost:3000):

```bash
pnpm run dev
```

## Colaboradores

- Anna Isabela Bianchini Pontuschka
- Danilo Pereira Escudero
- Gabriel Guedes Alves de Moura
- Gabriel Rodrigues Antunes
- Iury Fim da Silva
- Kauan Marques da Luz
- Vitor Daniel Silva Melo

<!-- Badges -->

<!-- Badges / GitHub -->

[github-web-application-icon]: https://img.shields.io/badge/GitHub-Web-black?style=for-the-badge&logo=GitHub&logoColor=white&labelColor=black&color=white
[github-web-application-href]: https://github.com/ladesa-ro/web

<!-- Badges / Actions / Production  -->

[action-ci-prod-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/web/cd.yml?style=flat&logo=github&logoColor=white&label=CI@production&branch=production&labelColor=18181B
[action-ci-prod-href]: https://github.com/ladesa-ro/web/actions/workflows/cd.yml?query=branch%3Aproduction

<!-- Badges / Actions / Development  -->

[action-ci-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/web/cd.yml?style=flat&logo=github&logoColor=white&label=CI@development&branch=main&labelColor=18181B
[action-ci-dev-href]: https://github.com/ladesa-ro/web/actions/workflows/cd.yml?query=branch%3Amain

<!-- #endregion conteudo -->
