# Emtech Developers

Premium digital courses for developers, built with React, Vite, Express, and Firebase.

## Local development

**Prerequisites:** Node.js 20 or newer

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env` and configure the server-side values before enabling checkout:

```bash
APP_URL=http://localhost:3000
WHOPS_API_KEY=your_server_side_key
```

For a separately deployed frontend, set `VITE_API_URL` to the Render API URL:

```bash
VITE_API_URL=https://lksfsksaf.onrender.com
```

For Netlify, use `npm run build:client` as the build command and `dist` as the publish directory. `netlify.toml` contains these settings and the SPA fallback automatically.

Never commit `.env` or any real payment credentials. `.env.example` is safe to commit.

The npm lockfile is committed and should be installed with `npm ci` in CI environments such as Netlify.

## Production

Render should use:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment: `NODE_ENV=production`, `WHOPS_API_KEY`, and `APP_URL`

The server binds to Render's `PORT` value and serves both the API and the built single-page application.
