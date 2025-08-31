
# PITCHLY

A modern SAAS platform for AI-powered proposal generation.

## Project Structure

```
PITCHLY/
├── src/               # Next.js application source code
│   ├── components/    # React components (Navbar, ProposalForm, etc.)
│   ├── lib/          # Authentication & Supabase utilities
│   └── pages/        # Next.js pages & API routes
├── config/           # Configuration files (Next.js, Tailwind, etc.)
├── assets/           # Static assets (images, styles)
├── docs/             # Documentation & guides
├── tests/            # Unit & integration tests
├── data/             # Database schemas & migrations
├── logs/             # Application logs
├── scripts/          # Build & deployment scripts
├── package.json      # Dependencies & scripts
└── README.md         # This file
```

## Tech Stack

- **Frontend**: Next.js 13.5.6, React 18.2.0, Tailwind CSS
- **Authentication**: NextAuth.js
- **Backend**: Supabase
- **AI Integration**: OpenAI API
- **Styling**: Tailwind CSS with custom components

## Features

- 🤖 **AI-Powered Proposals**: Generate professional proposals using OpenAI
- 🔐 **User Authentication**: Secure login/signup with NextAuth
- 📊 **Dashboard**: Manage proposals and account settings
- 🎨 **Modern UI**: Clean, responsive design with dark mode support
- ⚡ **Real-time Updates**: Live proposal editing and updates

## Getting Started

### Prerequisites
- Node.js 16+ installed
- Supabase project set up
- OpenAI API key

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Environment Setup
Create a `.env.local` file with:
```
NEXTAUTH_SECRET=your_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🚀 Deployment Instructions

1. Push to your GitHub repository
2. Connect repo to Vercel
3. Set environment variables in Vercel:
   - `NEXTAUTH_SECRET` = your auth secret
   - `SUPABASE_URL` = your Supabase URL
   - `SUPABASE_ANON_KEY` = your Supabase anon key
   - `OPENAI_API_KEY` = your OpenAI API key
4. Deploy! ✅

---

*Built with ❤️ using Next.js and modern web technologies*
