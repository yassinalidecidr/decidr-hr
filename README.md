# AI Chat Assistant

A modern AI chat application built with Next.js 14, featuring real-time conversations, user authentication, and organization management.

## Features

- 🤖 Advanced AI Chat Interface
- 🔐 Secure Authentication System
- 👥 Organization & Team Management
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Real-time Updates
- 🌙 Dark Mode Support

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **UI Components:** Shadcn/ui
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/pnpm/yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/decidr-io/decidr-hr.git
cd decidr-hr
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your environment variables in the `.env` file.

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── api/
│   ├── chat/
│   ├── dashboard/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── Chat/
│   └── Dashboard/
├── lib/
├── prisma/
└── public/
```

## Environment Variables

The following environment variables are required:

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
OPENAI_API_KEY=
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@yourdomain.com or join our Discord community.
