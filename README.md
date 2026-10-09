# Knowledge Base

A collection of my notes, code snippets and insights from my career as a developer, published in English and German.

**Live:** [knowledge.moritz-grimm.dev](https://knowledge.moritz-grimm.dev)

## Content

100+ articles, organised by topic:

- **Cloud:** Cloud service models
- **Commercial:** Business, labour law and economics fundamentals
- **Fundamentals:** Databases, UML, object-oriented programming, data formats, testing
- **Project management:** Process models, Scrum, Gantt charts and network plans, requirements, quality models
- **Tools:** Git, Linux, Tailscale, search operators
- **TypeScript:** Naming conventions, operators
- **Web:** HTML, HTTP status codes

## Stack

- **Framework:** [Docusaurus 3](https://docusaurus.io) with React 19 and TypeScript
- **Languages:** English (default) and German via Docusaurus i18n
- **Search:** Self-hosted [Typesense](https://typesense.org) with hybrid search
- **Analytics:** Self-hosted [Umami](https://umami.is)
- **Quality:** ESLint ([`@moritz-grimm/eslint-config`](https://github.com/moritz-grimm/eslint-config)), markdownlint, TypeScript type checking

## Self-Built Features

- **Homepage theme:** A third colour mode next to light and dark, styled after [moritz-grimm.dev](https://www.moritz-grimm.dev) with lime green on black. The navbar toggle is replaced by a dropdown with all three modes, and the choice is stored in `localStorage`.
- **Locale memory:** Visiting the start page redirects to the language last chosen in the locale dropdown. Direct links to other pages always open in the language of the link.
- **Translation notice:** A banner marks German pages that show the English original because no translation exists yet.
- **Last updated:** The footer shows the date of the last commit, fetched from my [personal API](https://github.com/moritz-grimm/personal-api).

## Search

The search index covers both locales and is built by the DocSearch scraper, which crawls the deployed site using [`typesense/docsearch.config.json`](typesense/docsearch.config.json).

After each deployment, a `docs-deployed` `repository_dispatch` event starts the [`scraper.yml`](.github/workflows/scraper.yml) workflow, which rebuilds the index.

## License

- **Code:** Everything outside `docs/` and `i18n/` is licensed under the [MIT License](LICENSE).
- **Content:** The articles in `docs/` and `i18n/` are licensed under [CC BY 4.0](LICENSE-docs).

The GitHub logo and the profile picture in `static/img/` are excluded from both licenses.
