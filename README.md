# ✨ Portfolio Template

A clean, modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion. Feel free to fork and customize it as your own.

> 🔗 **Live demo:** [Nasywa's Portfolio](https://portfolio-nasywafa.vercel.app/)

---

## Features

- Skills clock — animated orbital skill display
- Bento grid project showcase with modal detail view
- Contact form powered by Formspree
- Responsive & dark mode ready
- Smooth animations with Framer Motion

---

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Sonner](https://sonner.emilkowal.ski) — toast notifications
- [Formspree](https://formspree.io) — contact form

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/username/portfolio.git
cd portfolio
npm install
```

### 2. Setup environment

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xxxxxxxx
```

> Sign up at [formspree.io](https://formspree.io) to get your own endpoint.

### 3. Customize

| File | Description |
|------|-------------|
| `src/components/SkillsClock.tsx` | Edit skills list & icons |
| `src/components/ProjectsSection.tsx` | Edit projects list |
| `src/components/ContactSection.tsx` | Edit social links & info |
| `public/icons/` | Replace skill icons |

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy

Deploy to [Vercel](https://vercel.com) — connect your repo and add the `NEXT_PUBLIC_FORMSPREE_URL` environment variable in the Vercel dashboard.

---

## License

MIT — free to use and modify. Credit is appreciated but not required 🙏