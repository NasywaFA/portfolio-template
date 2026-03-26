# ✨ Portfolio Template

A clean, modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion. Feel free to fork and customize it as your own.

> 🔗 **Live demo:** [nasywa.dev](https://nasywa.dev) *(ganti dengan URL kamu)*

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

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xxxxxxxx
```

> Daftar di [formspree.io](https://formspree.io) untuk mendapatkan endpoint kamu.

### 3. Customize

| File | Isi |
|------|-----|
| `src/components/SkillsClock.tsx` | Edit daftar skills & icons |
| `src/components/ProjectsSection.tsx` | Edit daftar projects |
| `src/components/ContactSection.tsx` | Edit social links & info |
| `public/icons/` | Ganti icon skills |

### 4. Run dev server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Deploy

Deploy ke [Vercel](https://vercel.com) — tinggal connect repo dan tambah environment variable `NEXT_PUBLIC_FORMSPREE_URL` di dashboard Vercel.

---

## License

MIT — bebas dipakai dan dimodifikasi. Kredit diapresiasi tapi nggak wajib 🙏