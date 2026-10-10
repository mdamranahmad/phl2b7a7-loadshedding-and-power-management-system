# ⚡ Load Shedding & Power Management System

A role-based web application for managing electricity **load-shedding schedules**, **prepaid meter token recharges**, **outage reporting & dispatch**, and **technician onboarding** on a single platform.

Built with the Next.js App Router, it serves four distinct user roles — **Customer**, **Technician**, **Zone Manager**, and **Substation Manager** — each with a dedicated dashboard, guarded routes, and tailored workflows.

> This is the frontend. It talks to a separate REST API (see [Backend API](#-backend-api)) and authenticates with HTTP-only JWT cookies.

**Live Demo:** [https://loadshedding-and-power-management-s.vercel.app/](https://loadshedding-and-power-management-s.vercel.app/)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Roles & Capabilities](#-roles--capabilities)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Routes](#-routes)
- [Project Structure](#-project-structure)
- [Architecture Notes](#-architecture-notes)
- [Backend API](#-backend-api)

---

## ✨ Features

- **Authentication & onboarding** — register with a meter number, email OTP verification, JWT-cookie login, protected routes, and role-based access control.
- **One-click demo login** — instantly sign in as any role from the login page for evaluation.
- **Load-shedding schedules** — customers view published schedules; managers generate per-area schedule batches from substation capacity, allocated load, and slot duration.
- **Prepaid meter tokens** — purchase token recharges through the bKash hosted checkout with success/cancel redirect flows, and view token history.
- **Outage reporting & dispatch** — customers report outages; zone managers approve them; substation managers assign available technicians; technicians resolve them.
- **Technician applications** — public multi-step application (with resume upload + email OTP verification) and a manager review/approval workflow.
- **Power allocation** — substation managers allocate kW across areas.
- **Analytics dashboards** — role-specific stats and Recharts visualizations (bar & donut charts).
- **Polished UX** — responsive layout, skeleton loaders, empty states, error boundaries, toast notifications, and URL-synced filters/pagination.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Compiler), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | [Base UI](https://base-ui.com/) primitives + shadcn-style components |
| **Icons** | Lucide React |
| **Server State** | TanStack Query v5 |
| **Forms** | TanStack Form + Zod |
| **Charts** | Recharts |
| **HTTP Client** | ofetch |
| **Linting / Formatting** | Biome |
| **Payments** | bKash hosted checkout |

---

## 👥 Roles & Capabilities

### 🧑 Customer
- View personal load-shedding schedule and filter by area/status.
- Recharge prepaid meter tokens via bKash and browse token history.
- Report outages (severity, address, time) and track ticket status.
- Manage profile & settings.

### 🔧 Technician
- Apply publicly with professional details and a resume; verify email via OTP.
- Sign in once a manager approves the application.
- View assigned outage reports and mark assignments resolved.
- Manage availability and profile.

### 🗂️ Zone Manager
- Overview dashboard with outage analytics.
- Review and approve or reject customer outage reports.
- Monitor published schedule batches across the zone.

### 🏭 Substation Manager
- Live overview of substation activity.
- Generate and publish load-shedding schedule batches; view batch details.
- Manage outage reports and dispatch technicians.
- Review technician applications (approve/reject with reason).
- Browse all technicians and allocate kW across areas.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+**
- **npm**
- A running instance of the backend API (see [Backend API](#-backend-api)).

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mdamranahmad/phl2b7a7-loadshedding-and-power-management-system.git
cd phl2b7a7-loadshedding-and-power-management-system

# 2. Install dependencies
npm install

# 3. Configure the environment (see below)
cp .env.example .env   # or create .env manually

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend REST API | `http://localhost:5000/api/v1` |

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

> Authentication uses HTTP-only cookies, so the API client sends requests with `credentials: "include"`. Make sure the backend CORS configuration allows the frontend origin.

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start the development server (Turbopack). |
| `build` | `next build` | Create a production build. |
| `start` | `next start` | Run the production build. |
| `lint` | `biome check` | Lint and check formatting across the project. |
| `format` | `biome format --write` | Auto-format files with Biome. |

---

## 🗺️ Routes

### Public

| Route | Description |
|-------|-------------|
| `/` | Landing page. |
| `/services` | Services / feature overview. |
| `/about` | About the platform. |
| `/faq` | Frequently asked questions. |
| `/contact` | Contact form. |
| `/login` | Login (with one-click demo login). |
| `/register` | Customer registration. |
| `/register/verify` | Email OTP verification for customers. |
| `/apply-as-technician` | Multi-step technician application + OTP verification. |

### Customer

| Route | Description |
|-------|-------------|
| `/customer` | Customer dashboard overview. |
| `/customer/schedule` | Load-shedding schedule. |
| `/customer/report-outage` | Report an outage. |
| `/dashboard/my-tokens` | Token recharge & history. |
| `/dashboard/profile` | Profile & settings. |

### Technician

| Route | Description |
|-------|-------------|
| `/technician` | Technician dashboard overview. |
| `/technician/assignments` | Assigned outage reports. |
| `/technician/profile` | Profile & availability. |

### Zone Manager

| Route | Description |
|-------|-------------|
| `/zone` | Zone dashboard overview. |
| `/zone/outage-reports` | Approve / reject outage reports. |
| `/zone/schedules` | Published schedule batches. |
| `/dashboard/profile` | Profile & settings. |

### Substation Manager

| Route | Description |
|-------|-------------|
| `/substation` | Substation dashboard overview. |
| `/substation/schedules` | Schedule batches. |
| `/substation/schedules/generate` | Generate a schedule batch. |
| `/substation/schedules/[id]` | Schedule batch details. |
| `/substation/outage-reports` | Outage reports & technician dispatch. |
| `/substation/technicians` | All technicians. |
| `/substation/technician-applications` | Review technician applications. |
| `/substation/allocate` | Allocate kW across areas. |
| `/dashboard/profile` | Profile & settings. |

### Payments & Utility

| Route | Description |
|-------|-------------|
| `/payment/success` | bKash payment success redirect. |
| `/payment/cancel` | Payment cancelled / failed redirect. |
| `not-found.tsx` | Custom 404 page. |
| `error.tsx` / `global-error.tsx` | Error boundaries. |

---

## 📂 Project Structure

```
src/
├── app/                      # App Router routes
│   ├── (public)/             # Public + auth routes
│   ├── (dashboard)/          # Protected, role-based dashboards
│   │   ├── customer/
│   │   ├── technician/
│   │   ├── zone/
│   │   ├── substation/
│   │   ├── dashboard/        # Shared customer/manager pages (tokens, profile)
│   │   └── payment/          # Payment success / cancel
│   ├── layout.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   └── not-found.tsx
├── api/                      # Typed API functions (ofetch), one module per domain
├── hooks/                    # TanStack Query hooks + custom hooks (debounce, url-state, …)
├── components/
│   ├── ui/                   # Base UI / shadcn-style primitives
│   ├── modules/              # Feature components (tables, charts, wizards, …)
│   ├── form/                 # Form components
│   ├── auth/                 # Auth guards, role guard, access denied
│   ├── dashboard/            # Dashboard shell + sidebar
│   └── layout/               # Public header / footer
├── routes/                   # Sidebar navigation definitions per role
├── types/                    # Shared TypeScript types
├── validation/               # Zod schemas
├── lib/                      # apiClient, error helpers, utils
└── providers/                # Query + tooltip providers
```

---

## 🧠 Architecture Notes

- **Server-first** — Pages are Server Components by default; `"use client"` is used only for interactive surfaces.
- **Type-safe data layer** — Each domain has an `api/` module built on a shared `ofetch` client (`src/lib/apiClient.ts`) with typed responses, and a corresponding `hooks/` module wrapping it in TanStack Query for caching and invalidation.
- **Auth & authorization** — The dashboard layout is wrapped in an `AuthGuard`; per-role folders additionally use a `RoleGuard` to show role-restricted UI and an `AccessDenied` fallback.
- **Forms & validation** — All forms use TanStack Form with Zod schemas from `src/validation`, surfacing inline field errors and toast notifications on API failure.
- **URL state** — Filtering, sorting, searching, and pagination are reflected in the URL via `useSearchParams`, so views are bookmarkable and shareable.
- **Feedback states** — Every data-fetching route ships a `loading.tsx` (skeletons), lists have empty states, and API failures surface via toasts and `error.tsx` boundaries.
- **URL construction** — `src/lib/params.ts` (`compactParams`) strips empty query params before requests.

---

## 🔌 Backend API

The frontend consumes a separate Express + Prisma REST API. Key endpoint groups include:

| Area | Endpoints |
|------|-----------|
| **Auth** | `/auth/register`, `/auth/email-verify`, `/auth/login`, `/auth/logout`, `/auth/get-me` |
| **Tokens** | Token purchase/init, bKash callbacks, token listing. |
| **Schedules** | Generate/publish batches, customer schedule lookups. |
| **Outage reports** | Create, approve, assign, resolve, reopen. |
| **Technicians** | `apply-as-technician`, `email-verify`, application review, assignments. |
| **Analytics** | Role-specific dashboard metrics. |

Configure the API location via `NEXT_PUBLIC_API_BASE_URL`.

---

## 📄 License

Released for educational and portfolio purposes.
