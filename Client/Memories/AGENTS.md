# AGENTS.md — Codebase Guide for AI Coders

## Tech Stack
| Layer | Choice |
|-------|--------|
| UI Framework | React 18 (Vite) |
| Language | JavaScript (JSX) |
| UI Library | Material UI v5 (`@mui/material`) |
| Icons | `@mui/icons-material` |
| State | Redux (`redux`, `react-redux`, `redux-thunk`) |
| Routing | `react-router-dom` v7 |
| HTTP | Axios (with JWT interceptor) |
| Styling | 100% MUI `sx` prop. No CSS modules, no styled-components. |
| Auth | Google OAuth (via `react-google-login`) + JWT |

## Project Structure
```
Client/Memories/src/
├── api/index.jsx          # Axios instance, request/response interceptors, all API endpoint functions
├── actions/               # Redux action creators (auth, posts, comments)
├── reducers/              # Redux reducers (auth, posts, comment)
├── assets/                # Static images
├── components/
│   ├── Auth/              # Login/Signup page
│   ├── CommentBar/        # Comment overlay
│   ├── Common/            # Reusable UI components (see below)
│   ├── Form/              # Create/Edit post form overlay
│   ├── Home/              # Feed page (renders Posts, Form, CommentBar)
│   ├── Layout/            # Shell layout (Sidebar + TopHeader + content)
│   ├── LoadingSkeleton/   # Skeleton loaders
│   ├── NavBar/            # Top header bar
│   ├── NavBottom/         # Mobile bottom navigation
│   ├── Pages/             # Full-page components (Dashboard, AIStudio, etc.)
│   ├── Posts/             # Post list + Post card
│   └── Sidebar/           # Left navigation drawer
├── App.jsx                # Root component: routing + theme + skeleton provider
├── theme.jsx              # MUI theme customization
├── index.css              # Global reset, scrollbar, font smoothing
└── main.jsx               # Entry point (Redux store + Google OAuth)
```

## Routes (App.jsx)
| Path | Component | Layout |
|------|-----------|--------|
| `/` | Home (Feed) | Layout (maxWidth 720) |
| `/feed` | Home (Feed) | Layout (maxWidth 720) |
| `/dashboard` | Dashboard | Layout (maxWidth 1200) |
| `/ai-studio` | AIStudio | Layout (maxWidth 1200) |
| `/schedule` | Schedule | Layout (maxWidth 1200) |
| `/analytics` | Analytics | Layout (maxWidth 1200) |
| `/notifications` | Notifications | Layout (maxWidth 720) |
| `/profile` | Profile | Layout (maxWidth 720) |
| `/settings` | Settings | Layout (maxWidth 960) |
| `/auth` | Auth | None (standalone) |

Routes are defined as an array in `App.jsx` and rendered twice — once for page content, once for the mobile bottom nav (`NavBottom`).

## Layout System
`Layout.jsx` auto-detects the current route and selects:
- **`pageTitle`** (shown in TopHeader)
- **`maxWidth`** (content width constraint)

The Layout wraps every page. It manages `mobileOpen` state for the responsive sidebar drawer.

## Sidebar (Responsive Drawer)
- Two MUI `Drawer` components rendered simultaneously:
  - **Desktop** (`md+`): `variant="permanent"`, always visible, shifts content via `ml: 260px`
  - **Mobile** (`xs`, `sm`): `variant="temporary"`, overlay triggered by hamburger in TopHeader
- Clicking a nav item on mobile auto-closes the drawer
- `isActive(path)` uses `startsWith` for sub-route matching (except `/` which is exact)

## Reusable Components (`components/Common/`)
| Component | Purpose |
|-----------|---------|
| `DashboardStatCard` | Icon + value + label + trend indicator |
| `AnalyticsCard` | Title + value + trend + optional bar chart |
| `AIActionCard` | Left-accent-bordered card with icon + title + description + CTA |
| `NotificationCard` | Icon + title + message + timestamp + unread dot |
| `CreatorProfileHeader` | Full profile: banner, avatar, name, bio, stats row, social links |
| `ScheduleCard` | Platform badge + status chip + content + date + action buttons |
| `PlatformBadge` | Colored chip for LinkedIn/Twitter/Instagram/Facebook/YouTube |
| `EmptyState` | Centered icon + title + description + optional CTA button |
| `GenericSkeleton` | Card/stat/chart skeleton variants with `count` and `grid` props |
| `ActivityTimeline` | Vertical timeline with dot connector lines |
| `QuickActionButton` | Icon grid card with hover lift effect |
| `ModernSectionHeader` | Title + optional subtitle + optional action button |
| `AIRecommendationCard` | Purple-accented suggestion card with apply button |

### Component Patterns
- All use MUI `sx` prop exclusively for styling
- No prop-types (plain JS)
- Named exports not used — all `export default`
- Color tokens from the theme (primary `#6366f1`, secondary `#8b5cf6`)

## Theme (theme.jsx)
| Token | Value |
|-------|-------|
| Primary | `#6366f1` (indigo) |
| Secondary | `#8b5cf6` (violet) |
| Background default | `#f8fafc` |
| Background paper | `#ffffff` |
| Text primary | `#1e293b` |
| Text secondary | `#64748b` |
| Border radius | `12px` (cards), `8px` (buttons) |
| Font | `'Inter', sans-serif` |

MUI component overrides exist for: Button, TextField, Card, Paper, Chip, Avatar, Divider, Dialog, Tooltip.

## Redux State Shape
```js
{
  posts: [],              // Array of post objects from API
  auth: { authData: ... }, // User object from localStorage ('profile')
  commentsReducer: [],    // Array of comments
}
```

## Global CSS (index.css)
- Box-sizing reset
- Custom scrollbar (6px, slate-300, transparent track)
- Font smoothing (antialiased)

## Mobile Responsiveness
- **Sidebar**: Desktop permanent drawer → Mobile temporary drawer (hamburger toggle)
- **TopHeader**: Hamburger icon visible on mobile, "Create Post" label shortens to "Post"
- **NavBottom**: Fixed bottom nav visible only on mobile (`display: { xs: 'flex', md: 'none' }`)
- **Pages**: All grids use MUI breakpoints (`xs`/`sm`/`md`/`lg`). Charts scale height responsively
- **Settings**: Sidebar nav on desktop → horizontal chip list on mobile
- **Content padding**: `px: { xs: 1.5, md: 6 }`, `pb: { xs: 10, md: 3 }` (accounts for NavBottom)

## Important Conventions
1. **No backend logic** in frontend pages — all API calls go through `api/index.jsx`
2. **Redux untouched** — pages only `useSelector` for reading user auth data
3. **No real AI** — AI features use `setTimeout` mock delays
4. **No real scheduling** — Schedule page is pure UI with static mock data
5. **File extension**: All `.jsx` (not `.tsx`)
6. **MUI Grid** uses classic Grid v1 (`<Grid container>`), not Grid2
7. For 5-item stat rows, use CSS `display: grid` instead of `<Grid>` (which can't do 5 columns)

## Creating a New Page
1. Create `components/Pages/YourPage/YourPage.jsx`
2. Add route to `pageRoutes` array in `App.jsx`
3. Add entry to `pageConfig` object in `Layout.jsx` (for title + maxWidth)
4. Import and compose from `components/Common/*` components
5. Use MUI `Grid`, `Box`, and `sx` prop for layout — no external CSS

## Design Aesthetic
- **Vibe**: Linear × Notion × Buffer — minimal, premium, creator-focused
- **Cards**: White background, `border: 1px solid rgba(0,0,0,0.06)`, subtle shadow on hover
- **Typography**: Inter font, strong weight hierarchy (800/700/600/500)
- **Spacing**: 2-3rem between sections, 1.5-2.5rem card padding
- **Accents**: Indigo/violet gradient for banners, platform-specific colors for badges
