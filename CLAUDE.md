# RetroDash — Project Context for Claude

## 🧠 What is RetroDash?

RetroDash is a **retrospective platform** for Scrum/Kanban teams. It allows teams to run structured retrospectives at the end of a sprint in real time, inside private password-protected rooms.

Think of it like [retro.io](https://retro.io) — but self-owned and built from scratch.

---

## Commits

When you build or change something for me — like a login page — always include a commit message at the end using Conventional Commits format (e.g. `feat:`, `fix:`, `refactor:`, `style:`).

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication (Google OAuth only) |
| Database | Firebase Firestore (realtime via `onSnapshot`) |
| Hosting | Vercel (free tier) |

---

## 🎨 Design Identity

### Personality
- **Aesthetic**: Clean, modern, dark-first. Calm and collaborative — not technical or cold.
- **Theme**: Dark mode as default. Light mode optional in the future.
- **Motion**: Subtle animations on card creation, voting, and page transitions. Nothing distracting.
- **Layout**: Clean column-based board layout (like Trello/retro.io). Cards stack vertically inside columns.

### Brand Archetype
**The Caregiver** — nurturing, safe, team-first. Creates the conditions for honest conversation.

### Tagline
> *Reflect Together. Improve Always.*

---

## 🎨 Colors

Define all colors as CSS variables in `app/globals.css`. **Never hardcode hex values in components — always use these variables.**

```css
:root {
  /* Accents */
  --color-accent-cyan:    #00E5CC;
  --color-accent-violet:  #7B61FF;
  --color-cta:            #F5A623;

  /* Backgrounds */
  --color-bg-base:        #0A0B0F;   /* page background */
  --color-bg-surface:     #0F1117;   /* component background */
  --color-bg-card:        #1C1E28;   /* cards, modals, panels */
  --color-bg-elevated:    #171921;   /* dropdowns, tooltips */

  /* Borders */
  --color-border:         #252836;

  /* Text */
  --color-text-primary:   #F0F2F5;   /* headlines, body */
  --color-text-secondary: #8B90A7;   /* descriptions, supporting */
  --color-text-muted:     #4A4F68;   /* placeholders, disabled */

  /* Gradient (use as background-image, not background-color) */
  --gradient-brand: linear-gradient(90deg, #00E5CC, #7B61FF);
}
```

Map these into `tailwind.config.ts` so they're available as Tailwind utilities:

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      accent: {
        cyan:   'var(--color-accent-cyan)',
        violet: 'var(--color-accent-violet)',
        cta:    'var(--color-cta)',
      },
      bg: {
        base:     'var(--color-bg-base)',
        surface:  'var(--color-bg-surface)',
        card:     'var(--color-bg-card)',
        elevated: 'var(--color-bg-elevated)',
      },
      border:  'var(--color-border)',
      text: {
        primary:   'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted:     'var(--color-text-muted)',
      },
    },
  },
}
```

### Color usage rules
- Use `--color-accent-cyan` for active states, links, focus rings, and key highlights.
- Use `--color-accent-violet` for secondary accents and gradient endpoints.
- Use `--color-cta` exclusively for primary CTA buttons and warning states.
- Use `--gradient-brand` on the logo DASH wordmark, CTA backgrounds, and key highlight elements.
- Never use accent colors as large background fills — dark backgrounds only.
- Ensure all text-on-background combinations meet WCAG AA contrast (4.5:1 minimum).

---

## 🔤 Typography

**Font family: `Plus Jakarta Sans`** — geometric sans-serif, friendly and precise.
Load via Google Fonts in `app/layout.tsx`.

```ts
// app/layout.tsx
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
})
```

Add the variable to `tailwind.config.ts`:

```ts
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
}
```

### Type scale

| Role | Weight | Size | Tracking | Usage |
|---|---|---|---|---|
| Display | 800 | 52–88px | -2px | Hero, brand headlines |
| H1 | 700 | 36px | -0.5px | Page titles |
| H2 | 600 | 24–28px | 0 | Section titles |
| H3 | 600 | 18–20px | 0 | Card headings, modal titles |
| Body | 400 | 15–16px | 0 | Paragraphs, descriptions |
| Body Strong | 600 | 15–16px | 0 | Emphasis within body |
| Label / UI | 600 | 11–12px | +2px | Chips, buttons, tags (uppercase) |
| Caption | 400 | 12px | 0 | Timestamps, metadata |

### Typography rules
- **Never use Inter, Roboto, or system-ui directly** — always go through `var(--font-sans)`.
- Labels and UI chips must be uppercase with `letter-spacing: 2px` and `font-weight: 600`.
- Keep body line-height at `1.65` for comfortable reading inside cards.

---

## 📐 Spacing & Radius

Base unit is `8px`. All spacing should be multiples of 8.

```css
:root {
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;

  --radius-sm: 8px;    /* tags, chips, small inputs */
  --radius-md: 14px;   /* inputs, small cards */
  --radius-lg: 22px;   /* main cards, modals, panels */
}
```

---

## 🖼️ Logo & Wordmark

The logo is a combination mark: **icon + stacked wordmark**.

### Wordmark structure
```
RETRO       ← font-weight: 700, letter-spacing: 1.5px, color: --color-text-primary
DASH        ← font-weight: 300, letter-spacing: 17.5px, fill: var(--gradient-brand)
```

The letter-spacing on `DASH` is intentionally wide so both lines share the same rendered width — `R` aligns with `D` on the left, and `O` aligns with `H` on the right.

### Icon concept
Three soft rounded figures (people) leaning slightly toward each other — representing team collaboration. Left figure is cyan, right figure is violet, center figure uses the full brand gradient. A gentle arc connects their bases. Illustrative and friendly, not geometric or technical.

### Logo usage rules
- On dark backgrounds: use the primary SVG (text in `#F0F2F5`, icon in brand colors).
- On light backgrounds: use the light variant (text in `#0F1117`, icon in dimmed brand colors `#00B8A3` → `#5B3FD9`).
- Never stretch, rotate, recolor, or add effects to the logo.
- Maintain clear space equal to the icon height on all sides.
- Minimum rendered width: 160px (combination mark), 32px (icon only).

---

## 📁 Project Structure

```
retrodash/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx        # Login with Google
│   ├── (app)/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # List of user's rooms
│   │   ├── room/
│   │   │   ├── new/
│   │   │   │   └── page.tsx    # Create a new room
│   │   │   └── [roomId]/
│   │   │       ├── page.tsx    # The retro board (main screen)
│   │   │       └── summary/
│   │   │           └── page.tsx
│   │   └── layout.tsx          # Protected layout (auth guard)
│   ├── layout.tsx
│   └── page.tsx                # Landing / redirect
├── components/
│   ├── board/
│   │   ├── Board.tsx
│   │   ├── Column.tsx
│   │   ├── Card.tsx
│   │   └── ActionItems.tsx
│   ├── room/
│   │   ├── JoinRoom.tsx
│   │   └── RoomSettings.tsx
│   └── ui/                     # Shared UI: buttons, inputs, modals, badges
├── lib/
│   ├── firebase.ts
│   ├── auth.ts
│   └── firestore.ts
├── hooks/
│   ├── useRoom.ts
│   ├── useCards.ts
│   └── useAuth.ts
├── types/
│   └── index.ts
└── middleware.ts
```

---

## 🔥 Firestore Data Model

```
firestore/
│
├── users/{userId}
│   ├── displayName: string
│   ├── email: string
│   ├── photoURL: string
│   └── createdAt: timestamp
│
├── rooms/{roomId}
│   ├── name: string
│   ├── password: string         # hashed
│   ├── ownerId: string
│   ├── isAnonymous: boolean
│   ├── status: "waiting" | "active" | "ended"
│   ├── createdAt: timestamp
│   │
│   ├── columns/{columnId}
│   │   ├── title: string
│   │   ├── order: number
│   │   └── isActionItems: boolean   # exactly one must be true
│   │
│   ├── cards/{cardId}
│   │   ├── columnId: string
│   │   ├── text: string
│   │   ├── authorId: string
│   │   ├── votes: number
│   │   ├── votedBy: string[]
│   │   └── createdAt: timestamp
│   │
│   └── participants/{userId}
│       ├── joinedAt: timestamp
│       └── role: "facilitator" | "member"
```

---

## 🗺️ Pages & Application Flow

```
/ (root)
 └─► if authenticated → /dashboard
 └─► if not          → /login

/login
 └─► Google OAuth via Firebase
 └─► on success → /dashboard

/dashboard
 ├─► List rooms (created or joined)
 ├─► "Create Room" → /room/new
 └─► "Join Room"  → password modal → /room/[roomId]

/room/new
 └─► Form: room name, password, anonymous toggle, column names
 └─► One column must be flagged as isActionItems: true
 └─► On submit → creates Firestore doc → redirect to /room/[roomId]

/room/[roomId]  ← MAIN BOARD
 ├─► Columns rendered dynamically from Firestore
 ├─► Fixed "Action Items" column (isActionItems: true)
 ├─► Add / edit / delete cards (realtime)
 ├─► Vote on cards
 ├─► Facilitator controls: change room status
 └─► "End Retro" → status = "ended" → redirect to summary

/room/[roomId]/summary
 ├─► All action items listed
 ├─► Cards grouped by column
 └─► (future) Export to PDF or Notion
```

---

## 👤 Auth & Roles

- **Authentication**: Google OAuth only via Firebase Auth.
- **Any authenticated user** can create a room.
- **Room creator** is automatically the `facilitator`.
- **Others** join via password → get the `member` role.
- Route protection handled by `middleware.ts`.

---

## 🃏 Cards & Voting Rules

- Cards belong to a specific column via `columnId`.
- Each card has a `votes` counter and a `votedBy` array (user IDs).
- A user **cannot vote on their own card**.
- A user **cannot vote on the same card twice**.
- If `isAnonymous: true`, `authorId` is hidden in the UI (data is still stored).

---

## 🧩 Coding Conventions

- Use `"use client"` **only when necessary** (event handlers, hooks, browser APIs).
- All Firestore queries and mutations go in `lib/firestore.ts` — never inline in components.
- All Firebase auth helpers go in `lib/auth.ts`.
- Realtime listeners always use `onSnapshot`, wrapped in custom hooks (`hooks/`).
- TypeScript interfaces are defined in `types/index.ts` and imported from there.
- Tailwind only — no external CSS-in-JS libraries.
- Components in `components/ui/` must be generic and reusable (no business logic).
- **Always use CSS variables for colors** — never hardcode hex values in components.
- **Always use `var(--font-sans)`** — never reference font names directly in components.

---

## 🚧 Current Phase

> **Phase 1 — MVP (in progress)**

- [x] Project scaffolded with Next.js + TypeScript + Tailwind
- [ ] Firebase setup (`lib/firebase.ts`, env vars)
- [ ] Google Auth flow (`/login` page + `useAuth` hook)
- [ ] Middleware route protection
- [ ] Dashboard page
- [ ] Create Room flow
- [ ] Join Room flow
- [ ] Retro Board (realtime columns + cards)
- [ ] Voting system
- [ ] Action Items column
- [ ] Summary page

---

## 🔜 Future Features (Phase 2+)

- Room invites via link or email
- Public/discoverable rooms
- Email notifications
- Export summary (PDF, Notion, Slack)
- Multiple retrospective formats (Mad/Sad/Glad, Start/Stop/Continue, etc.)
- Mobile-responsive improvements

---

## 🌍 Environment Variables

Create a `.env.local` file at the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> Never commit `.env.local` to Git. It is already in `.gitignore` by default in Next.js.
