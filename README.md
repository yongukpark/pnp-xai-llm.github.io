# pnp-xai-llm.github.io

## Local development

This project is a Docusaurus site located in the `website/` directory.

1. Install dependencies

```bash
cd website
npm ci
```

2. Start local server

```bash
npm run start
```

Default local URL: `http://localhost:3000`

3. Production build check

```bash
npm run build
```

## Deployment

GitHub Pages deploy runs automatically via GitHub Actions when you push to the `main` branch.

- Workflow file: `.github/workflows/deploy.yml`
- Manual deploy is also available from the Actions tab (`workflow_dispatch`).
