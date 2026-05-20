# Backend Expansion Plan — Creator/Community SaaS Architecture

## 1. New Backend Architecture

The backend has been extended from a simple social app (posts, users, comments) into a scalable creator/community SaaS platform. The architecture follows a **modular route-controller-service-model** pattern, keeping each domain isolated and independently extensible.

```
Server/
├── index.js                        # Route mounting + middleware
├── middleware/auth.js               # JWT + Google OAuth (unchanged)
├── models/                         # Mongoose schemas
│   ├── users.js                    # Extended with profile fields
│   ├── postMessage.js              # Unchanged
│   ├── comments.js                 # Unchanged
│   ├── scheduledPost.js            # NEW
│   ├── socialAccount.js            # NEW
│   ├── creatorAnalytics.js         # NEW
│   ├── aiHistory.js                # NEW
│   └── notification.js             # NEW
├── controllers/                    # Route handlers (async/try-catch)
│   ├── users.js                    # Unchanged
│   ├── post.js                     # Unchanged
│   ├── comments.js                 # Unchanged
│   ├── dashboard.js                # NEW
│   ├── aiStudio.js                 # NEW
│   ├── schedule.js                 # NEW
│   ├── analytics.js                # NEW
│   ├── notifications.js            # NEW
│   ├── creatorProfile.js           # NEW
│   ├── settings.js                 # NEW
│   └── integrations.js             # NEW
├── routes/                         # Express routers
│   ├── users.js                    # Unchanged
│   ├── posts.js                    # Unchanged
│   ├── comments.js                 # Unchanged
│   ├── dashboard.js                # NEW — /api/dashboard
│   ├── aiStudio.js                 # NEW — /api/ai
│   ├── schedule.js                 # NEW — /api/schedule
│   ├── analytics.js                # NEW — /api/analytics
│   ├── notifications.js            # NEW — /api/notifications
│   ├── creatorProfile.js           # NEW — /api/profile
│   ├── settings.js                 # NEW — /api/settings
│   └── integrations.js             # NEW — /api/integrations
└── services/
    ├── ai/                         # NEW — AI service layer
    ├── integrations/               # NEW — Social platform adapters
    └── analytics/                  # NEW — Metrics and reports
```

## 2. Folder Structure

### Controllers (8 new files)
Each controller follows existing conventions: ES modules, async/try-catch, `res.status().json({ success, data/message })`.

### Routes (8 new files)
Each route file mounts under `/api/*` prefix with `auth` middleware on protected endpoints. Public endpoints like `/api/profile/:id` remain accessible without auth.

### Services Layer
A dedicated `services/` directory houses domain logic separate from controllers:

- **`services/ai/`** — AI prompt engineering, provider abstraction, generators
- **`services/integrations/`** — Platform-specific OAuth + publishing adapters
- **`services/analytics/`** — Metric calculations, report generation

### Jobs Layer
A `jobs/` directory prepares for async task processing:

- **`jobs/queues/`** — Queue definitions (placeholder for BullMQ)
- **`jobs/workers/`** — Worker processors for scheduled posts, notifications, analytics
- **`jobs/schedulers/`** — Scheduling logic for posts, retries, digests

## 3. Route Groups

| Prefix | Endpoints | Auth | Purpose |
|--------|-----------|------|---------|
| `/api/dashboard` | `GET /overview`, `GET /stats`, `GET /quick-actions` | Yes | Homepage aggregation |
| `/api/ai` | `POST /generate-caption`, `POST /rewrite`, `POST /generate-hashtags`, `GET /suggestions`, `GET /history` | Yes | AI content tools |
| `/api/schedule` | `GET /`, `POST /`, `PATCH /:id`, `DELETE /:id`, `GET /stats` | Yes | Post scheduling CRUD |
| `/api/analytics` | `GET /engagement`, `GET /insights`, `GET /content-performance`, `GET /overview`, `GET /breakdown` | Yes | Analytics data |
| `/api/notifications` | `GET /`, `GET /unread-count`, `PATCH /:id/read`, `PATCH /read-all`, `DELETE /:id` | Yes | Notification management |
| `/api/profile` | `GET /`, `PATCH /`, `GET /:id`, `GET /:id/posts` | Mixed | Creator profiles |
| `/api/settings` | `GET /`, `PATCH /`, `POST /change-password`, `PATCH /theme` | Yes | User settings |
| `/api/integrations` | `GET /`, `POST /connect/:platform`, `DELETE /disconnect/:platform`, `GET /auth/:platform/*` | Mixed | Social account linking |

## 4. Future AI Integration Strategy

### Architecture
The AI layer uses a **provider-agnostic adapter pattern**:

```
services/ai/
├── providers/           # OpenAI, Anthropic, etc. adapters
├── generators/          # Caption, hashtag, rewrite, suggestion generators
├── transformers/        # Content repurposing, SEO optimization
├── prompts/             # Template prompts per tone/platform
├── templates/           # Content structure templates
├── captionGenerator.js
├── hashtagGenerator.js
├── seoOptimizer.js
├── contentRepurposer.js
├── contentRewriter.js
└── contentSuggester.js
```

### Implementation Path
1. Add API keys to `.env` (e.g., `OPENAI_API_KEY`)
2. Implement `providers/openaiProvider.js` with actual OpenAI calls
3. Wire generators to use provider instead of returning placeholders
4. Add rate limiting, token tracking, and cost management via `AIHistory` model
5. Support multiple providers via the provider index

### Why This Works
- **Provider abstraction** allows swapping OpenAI for Anthropic/Llama without changing business logic
- **Generator separation** keeps each AI capability independently testable
- **Prompt templates** centralize prompt engineering for easy iteration
- **AIHistory model** enables usage tracking, cost analysis, and audit trails

## 5. Future Social Integration Strategy

### Architecture
Platform adapters follow a **unified interface pattern**:

```
services/integrations/
├── linkedin/index.js       # OAuth, publish, getProfile
├── twitter/index.js        # OAuth, publish, getProfile
├── instagram/index.js      # OAuth, publish, getProfile
├── facebook/index.js       # OAuth, publish, getProfile
├── platformAdapter.js      # Unified dispatcher
└── tokenHelper.js          # Token refresh logic
```

### Implementation Path
1. Register OAuth apps on each platform, get client IDs/secrets
2. Add platform credentials to `.env`
3. Implement real OAuth flows in each platform adapter
4. Use `tokenHelper.js` for automatic token refresh
5. Wire `integrations controller` to call real adapter methods
6. Add webhook handlers for platform callbacks

### Why This Works
- **Unified interface** (`getAuthUrl`, `exchangeCodeForToken`, `publishPost`, `getProfile`) means adding a new platform is one file
- **SocialAccount model** stores tokens per user per platform with expiry tracking
- **PlatformAdapter** dispatches to the correct adapter based on platform string
- **Token isolation** prevents cross-platform token leakage

## 6. Scheduling Architecture Plan

### Architecture
```
jobs/
├── queues/
│   └── index.js             # Queue definitions (BullMQ-ready)
├── workers/
│   ├── schedulerWorker.js   # Processes scheduled posts
│   ├── notificationWorker.js # Sends notifications
│   └── analyticsWorker.js   # Computes analytics
└── schedulers/
    ├── postScheduler.js     # Checks for due posts
    ├── retryScheduler.js    # Retry logic with backoff
    └── notificationScheduler.js # Digest scheduling
```

### Implementation Path
1. Install BullMQ and Redis
2. Replace placeholder queues with BullMQ queue instances
3. Implement `postScheduler` with cron job to check due posts every minute
4. Wire `schedulerWorker` to call `integrations/platformAdapter.publishToPlatform`
5. Add retry logic with exponential backoff via `retryScheduler`
6. Add notification scheduling for publishing confirmations

### Why This Works
- **Separation of concerns**: schedulers check, workers execute, queues buffer
- **Retry with backoff** prevents hammering APIs on transient failures
- **BullMQ** provides persistence, delayed jobs, and monitoring
- The structure is ready for Redis/BullMQ without refactoring

## 7. Analytics Architecture Plan

### Architecture
```
services/analytics/
├── metricsHelper.js         # Engagement rate, growth rate calculations
├── engagementCalculator.js  # Per-post and aggregate engagement
└── reportGenerator.js      # Weekly/monthly report generation
```

### Implementation Path
1. Implement `metricsHelper` with real formulas
2. Add webhook/event system to track post views, shares, follows
3. Implement daily aggregation via `schedulers/analyticsWorker`
4. Generate weekly/monthly reports via `reportGenerator`
5. Store computed metrics in `CreatorAnalytics` model per day
6. Add real-time analytics via WebSocket or polling

### Why This Works
- **Computed metrics** stored in DB avoid recomputation on every request
- **Daily granularity** in `CreatorAnalytics` supports time-series queries
- **Report generation** is decoupled from data collection
- The structure supports both real-time and historical analytics

## 8. Notification System Architecture

### Architecture
- **Model**: `Notification` with type, title, message, read status, metadata
- **Controller**: CRUD + mark-read + unread-count
- **Scheduler**: `notificationScheduler.js` for digests
- **Worker**: `notificationWorker.js` for sending

### Implementation Path
1. Implement in-app notifications via React context polling `/api/notifications/unread-count`
2. Add email notifications via nodemailer or SendGrid
3. Add push notifications via WebSocket or Firebase
4. Implement digest scheduling (daily/weekly summaries)
5. Add notification preferences to user settings

### Notification Types
- `publishing` — Post published/failed
- `ai_suggestion` — AI content recommendations
- `reminder` — Scheduled post reminders
- `system` — Account/feature updates
- `engagement` — Likes, comments, follows
- `alert` — Errors, warnings

### Why This Works
- **Typed notifications** enable different UI rendering per type
- **Metadata field** supports flexible payloads without schema changes
- **Unread count endpoint** enables badge UI with minimal overhead
- **Scheduler + Worker pattern** scales to email/push without changing the notification model

## 9. Scalability Reasoning

### Database
- **Indexes** on frequently queried fields (`userId + date`, `userId + isRead`)
- **Compound indexes** prevent full collection scans on dashboard queries
- **Denormalized counts** in controllers reduce aggregation overhead

### API
- **Modular routes** prevent merge conflicts and enable independent scaling
- **Auth middleware** is applied per-route, not globally, allowing public endpoints
- **Async controllers** with try-catch ensure errors don't crash the process

### Services Layer
- **Separation of concerns** means controllers only handle HTTP, services handle logic
- **Provider pattern** allows swapping external dependencies without touching routes
- **Placeholder implementations** mean the architecture is ready but not coupled to any vendor

### Jobs Layer
- **Queue abstraction** supports in-memory (dev) and Redis/BullMQ (prod) without code changes
- **Worker isolation** means a failing notification worker doesn't affect post scheduling
- **Scheduler separation** allows independent scaling of different job types

## 10. Why This Structure Was Chosen

### Alignment with Existing Conventions
- ES modules (`import`/`export`) match the existing codebase
- Async/try-catch controller pattern is identical to existing controllers
- Auth middleware is applied identically to existing protected routes
- Response format `{ success, data/message }` matches existing API

### Creator SaaS Domain Fit
- **8 frontend pages** (Dashboard, AI Studio, Schedule, Analytics, Notifications, Profile, Settings, Integrations) each have a dedicated backend module
- **Controllers** handle HTTP concerns (parsing, responding)
- **Services** handle business logic (AI calls, platform publishing, metric calculations)
- **Models** store domain data with appropriate indexes

### Future-Proof
- AI provider abstraction supports any LLM API
- Platform adapter pattern supports any social network
- Queue abstraction supports any message broker
- Notification type system supports any delivery channel

### Minimal Bloat
- All new files are placeholders with minimal logic
- No real API keys required to run
- No new npm dependencies required
- Existing routes, controllers, and middleware are completely untouched

## New/Modified Files Summary

### New Models (5)
- `models/scheduledPost.js` — Scheduled content with platform targeting
- `models/socialAccount.js` — Connected social platform accounts with tokens
- `models/creatorAnalytics.js` — Daily creator metrics per platform
- `models/aiHistory.js` — AI usage history and token tracking
- `models/notification.js` — Typed notifications with read status

### New Controllers (8)
- `controllers/dashboard.js` — Overview aggregation, stats, quick actions
- `controllers/aiStudio.js` — AI content generation, rewriting, suggestions
- `controllers/schedule.js` — Scheduled post CRUD with stats
- `controllers/analytics.js` — Engagement, insights, performance, breakdown
- `controllers/notifications.js` — Notification CRUD with read/unread management
- `controllers/creatorProfile.js` — Profile viewing and editing
- `controllers/settings.js` — User settings, password change, theme
- `controllers/integrations.js` — Social account connect/disconnect, OAuth

### New Routes (8)
- `routes/dashboard.js` — `/api/dashboard/*`
- `routes/aiStudio.js` — `/api/ai/*`
- `routes/schedule.js` — `/api/schedule/*`
- `routes/analytics.js` — `/api/analytics/*`
- `routes/notifications.js` — `/api/notifications/*`
- `routes/creatorProfile.js` — `/api/profile/*`
- `routes/settings.js` — `/api/settings/*`
- `routes/integrations.js` — `/api/integrations/*`

### Modified Files (2)
- `index.js` — Added 8 route imports and mounts
- `models/users.js` — Added bio, avatar, website, location, theme, preferences fields

### Services (18 new files)
- `services/ai/` — 12 files (generators, providers, transformers, templates, prompts)
- `services/integrations/` — 6 files (platform adapters, token helpers)
- `services/analytics/` — 3 files (metrics, engagement, reports)

### Jobs (7 new files)
- `jobs/queues/index.js` — Queue definitions
- `jobs/workers/` — 3 worker files
- `jobs/schedulers/` — 3 scheduler files
