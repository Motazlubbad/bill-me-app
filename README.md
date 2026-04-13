# BillTracker - Invoice & Billing Analytics

A personal invoice and billing analytics web application for tracking recurring monthly bills (electricity, water, internet, rent, subscriptions, etc.), managing categories, and visualizing spending trends.

## Features

- **Authentication** - Email/password and Google sign-in via Firebase Auth
- **Bill Management** - Create, view, edit, delete bills with full CRUD
- **Categories** - Custom bill categories with colors (seeded with defaults)
- **Filtering** - Filter bills by month, category, and payment status
- **Dashboard** - Summary cards, monthly spending bar chart, category pie chart, month-over-month comparison
- **CSV Export** - Export filtered bills to CSV
- **Responsive UI** - Mobile-friendly sidebar navigation
- **Per-user Data Isolation** - Firestore security rules enforce data privacy

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| UI | Tailwind CSS v4 + shadcn/ui + Lucide icons |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Testing | Jest + Playwright |
| Scripts | Python + Firebase Admin SDK |

## Prerequisites

- Node.js 20+ and npm
- A Firebase project with Firestore and Authentication enabled
- Python 3.10+ (for utility scripts only)

## Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd web
npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password + Google providers)
3. Enable **Cloud Firestore** in production mode
4. Get your web app config from Project Settings

### 3. Environment Variables

Copy the example env file and fill in your Firebase config:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Deploy Firestore Rules

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,firestore:indexes
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm test` | Run Jest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run format` | Format code with Prettier |

## Python Utility Scripts

Located in `scripts/`. Install dependencies first:

```bash
cd scripts
pip install -r requirements.txt
```

Place your Firebase service account JSON at `scripts/service-account.json`.

| Script | Usage |
|---|---|
| `seed_data.py` | `python seed_data.py <user-uid>` - Seed sample data |
| `export_bills.py` | `python export_bills.py <user-uid> [output.csv]` - Export to CSV |
| `monthly_report.py` | `python monthly_report.py <user-uid> [YYYY-MM]` - Generate report |

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    (auth)/               # Login, register (public)
    (app)/                # Dashboard, bills, categories, settings (protected)
  components/
    ui/                   # shadcn/ui primitives
    layout/               # Sidebar, topbar, auth guard
    dashboard/            # Chart and summary components
    bills/                # Bill form, table, filters
    categories/           # Category form, list
    shared/               # Reusable components
  lib/
    firebase/             # Firebase config, auth, firestore
    hooks/                # Custom React hooks
    context/              # Auth context provider
    types/                # TypeScript interfaces
    utils/                # Formatting, calculations
    validators/           # Zod schemas
```

## Firestore Data Model

```
users/{uid}                    # User profile
users/{uid}/bills/{billId}     # Bill records
users/{uid}/categories/{catId} # Custom categories
```

## Security

- Firestore security rules enforce per-user data isolation
- All Firebase config is in `.env.local` (gitignored)
- No secrets exposed in frontend code
- Input validation with Zod on client + Firestore rules on server

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Set environment variables in Vercel dashboard
3. Deploy Firestore rules separately: `firebase deploy --only firestore`

### Firebase App Hosting

1. `firebase init apphosting`
2. Follow the prompts to connect your GitHub repo
3. Push to deploy

## Future Improvements

- File/image/PDF invoice attachments (Firebase Storage)
- Recurring bill templates
- Budget tracking and alerts
- Email notifications for overdue bills
- Dark mode theme
- Multi-currency support with exchange rates
- Data export to PDF reports
- Progressive Web App (PWA) support
