# 🍽️ Smart Chef (Food Recipes)

A modern **Next.js + TypeScript** recipe application for searching recipes, browsing by nutrition, saving favorites, and managing fridge ingredients — built with scalability and performance in mind.

🔗 **Live Demo:https://smart-chef-orpin.vercel.app/** 

---

## 🚀 Features

- 🔍 Search recipes with advanced filters  
- 📄 Recipe details pages (`/recipe/[id]`)
- ❤️ Save favorite recipes
- 🧊 Fridge view with personalized recipe suggestions
- 🥗 Nutrition information & filtering
- ✨ Smooth page transitions & animations
- ⚡ API key rotation to avoid rate limits

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **Data Fetching:** @tanstack/react-query
- **Styling:** Tailwind CSS + PostCSS
- **Animations:** Framer Motion

---

## ⚙️ Quick Start

### Prerequisites
- Node.js **18+** (recommended)

### Installation

```bash
# install dependencies
npm install

# run development server
npm run dev

# build for production
npm run build

# start production server
npm run start

# lint project
npm run lint

Open https://smart-chef-orpin.vercel.app/
in your browser.

🔐 Environment Variables

This project uses API key rotation to avoid hitting rate limits.

Create a .env.local file in the root directory:

API_KEY_1=your_key_here
API_KEY_2=your_key_here
API_KEY_3=your_key_here

These keys are consumed in:

lib/api/rotation.ts

⚠️ Important:
All keys must be present for proper rotation.

Deployment (Vercel)

Add the same environment variables in the Vercel Dashboard

Do NOT expose keys using NEXT_PUBLIC_

📦 Deployment

1.Recommended: Vercel (zero-config for Next.js)

2.Connect your GitHub repository to Vercel

3.Add API_KEY_* variables in project settings

4.Deploy the main branch

5.Replace the demo URL at the top of this README

🧪 Tests & Linting

ESLint configured → npm run lint

No unit tests included by default
(Jest / Vitest can be added later if needed)

📁 Project Structure (Simplified)

app/
 ├─ (site)/
 │   ├─ search/
 │   ├─ recipe/[id]/
 │   └─ filter/
 ├─ layout.tsx
 ├─ globals.css
 ├─ loading.tsx
 ├─ error.tsx
 └─ not-found.tsx

lib/
 └─ api/
     └─ rotation.ts

🤝 Contributing

Contributions are welcome!

1.Fork the repository

2.Create a feature branch

3.Commit with clear messages

4.Open a Pull Request with details

📝 Notes

Project name (from package.json): smart_chef

Built using Next.js App Router

Designed for scalability and clean architecture

📌 Update README Locally (Windows)

git add README.md
git commit -m "docs: improve README structure and clarity"
git push origin <your-branch>
