# DataClarity — Messy Data In. Sharp Insights Out.

An interactive business intelligence tool that simulates the core problem analytics consultants solve: turning raw, messy business data into clean, actionable insights — powered by the Claude AI API.

Built by **Savanna Alexander** · BCom Information Systems, UCT

---

## What it does

1. **Load** — Choose from 4 real-world sample datasets (Sales, HR, Client Retention, Operations)
2. **Clean** — Automatically detects and resolves missing values, duplicates, inconsistent formats, and casing issues. Shows a side-by-side before/after view.
3. **Insights** — AI-generated business observations: Key Finding, Risk, Opportunity, and Process Improvement
4. **Visualise** — Auto-generated charts tailored to each dataset

---

## Tech stack

- Vanilla HTML/CSS/JS — no framework dependencies
- Chart.js for data visualisation
- PapaParse for CSV parsing
- Anthropic Claude API (claude-sonnet-4) for AI insights
- Netlify Functions (serverless) to keep the API key secure server-side

---

## Deploying to Netlify

### 1. Push this repo to GitHub

### 2. Connect to Netlify
- Go to [netlify.com](https://netlify.com) and sign up (free)
- Click **Add new site** → **Import an existing project** → connect your GitHub repo
- Netlify will auto-detect the `netlify.toml` config

### 3. Add your API key as an environment variable
- In Netlify dashboard → **Site configuration** → **Environment variables**
- Click **Add a variable**
- Key: `ANTHROPIC_API_KEY`
- Value: your Anthropic API key (`sk-ant-api03-...`)
- Click **Save**

### 4. Deploy
- Netlify will automatically build and deploy
- Your live URL will be something like `https://your-site-name.netlify.app`

---

## Folder structure

```
data-clarity/
├── netlify/
│   └── functions/
│       └── insights.js     ← serverless function (API key lives here, server-side)
├── public/
│   └── index.html          ← the full tool
└── netlify.toml            ← build config
```

---

## Security note
The Anthropic API key is stored as a Netlify environment variable and never exposed in the frontend code. All API calls are proxied through the serverless function.
