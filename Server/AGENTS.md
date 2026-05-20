# AGENTS.md — Server Backend Guide for AI Coders

## Tech Stack
| Layer | Choice |
|-------|--------|
| Runtime | Node.js (ES Modules — `"type": "module"`) |
| Framework | Express ^4.19.2 |
| Database | MongoDB via Mongoose ^8.5.2 |
| Auth | JWT (`jsonwebtoken` ^9.0.2) + Google OAuth |
| Passwords | `bcrypt` ^5.1.1 |
| AI | `openai` ^4.93.0 (stubbed, see below) |
| Other | `cors`, `body-parser`, `dotenv` |

## Project Structure
```
Server/
├── index.js                     # Express bootstrap: CORS, body-parser, routes, MongoDB connect
├── middleware/
│   └── auth.js                  # JWT verification + Google token handling
├── controllers/
│   ├── users.js                 # signin, signup, signupWithGoogleCheck
│   ├── post.js                  # getPosts, createPost, updatePost, deletePost, likePost
│   └── comments.js              # getComments, addComment, updateComment, deleteComment, getCommentRecommendation
├── models/
│   ├── users.js                 # User schema { name, email, password, id }
│   ├── postMessage.js           # Post schema { title, message, creator, tags, selectedFile, likes, comments, posterId }
│   └── comments.js              # Comment schema { postId, userId, name, comment }
├── routes/
│   ├── users.js                 # POST /signin, POST /signup
│   ├── posts.js                 # GET /, POST /, PATCH /:id, DELETE /:id, PATCH /:id/like
│   └── comments.js              # GET /getComments/:postId, POST /addComment/:postId, PATCH /updateComment/:id, DELETE /deleteComment/:id, GET /getRecommendation/:postId
├── .env                         # CONNECTION_URL, JWT_SECRET
└── package.json                 # start script: node index.js
```

## Entry Point (index.js)
- Loads `.env` via `dotenv.config()`
- Configures CORS with an allowlist: `localhost:5173` (Vite dev) + production Render URL
- Body parsing: JSON + URL-encoded, **50 MB limit** (for base64 image uploads)
- Mounts routes at `/posts`, `/users`, `/comments`
- Connects to MongoDB via `mongoose.connect(process.env.CONNECTION_URL)`, then starts Express on `PORT || 5555`

## Environment Variables (.env)
| Variable | Purpose |
|----------|---------|
| `CONNECTION_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for signing/verifying JWTs |
| `PORT` | (optional, defaults to `5555`) |

## Authentication Flow

### JWT Signing
- Payload: `{ email, id: user._id }`
- Secret: `process.env.JWT_SECRET`
- Expiry: `1d`
- Created on signin/signup, returned as `{ success, result, token }`

### Auth Middleware (`middleware/auth.js`)
1. Extracts `Bearer <token>` from `Authorization` header
2. **Custom JWT** (token length < 500 chars): `jwt.verify(token, JWT_SECRET)` → extracts `id` as `userId`
3. **Google OAuth** (token length >= 500 chars): `jwt.decode(token)` → extracts Google `sub`, `email`, `name` → calls `signupWithGoogleCheck()` to find-or-create user → sets `userId` to MongoDB `_id`
4. Sets `req.userId` for downstream controllers
5. **Protected routes** return 500 `"Unauthorized user"` on failure

### Route Protection
| Route | Auth Required |
|-------|---------------|
| `GET /posts` | **No** (public) |
| `POST /users/signin`, `POST /users/signup` | **No** |
| All other post/comment routes | **Yes** (`auth` middleware applied) |

## Controllers

### users.js
| Endpoint | Logic |
|----------|-------|
| `POST /signin` | Find user by email, bcrypt.compare password, return JWT |
| `POST /signup` | Validate length/match, bcrypt.hash (12 rounds), create user, return JWT |
| `signupWithGoogleCheck(id, email, name, password)` | Helper (not a route). Find-or-create user by Google `id`. Used by auth middleware. |

### post.js
| Endpoint | Logic |
|----------|-------|
| `GET /` | `postMessage.find()` — returns all posts (no pagination) |
| `POST /` | Set `posterId` from `req.userId`, create post |
| `PATCH /:id` | Ownership check (`posterId === req.userId`), `findByIdAndUpdate` |
| `DELETE /:id` | Ownership check, `findOneAndDelete` |
| `PATCH /:id/like` | Toggle: `$pull` if already liked, `$addToSet` if not |

### comments.js
| Endpoint | Logic |
|----------|-------|
| `GET /getComments/:postId` | Find comments by postId, populate `userId` with `name` |
| `POST /addComment/:postId` | Create comment + `$push` comment `_id` into parent post's `comments` array |
| `PATCH /updateComment/:id` | Ownership check, `findByIdAndUpdate` |
| `DELETE /deleteComment/:id` | Ownership check, delete + `$pull` from parent post's `comments` array |
| `GET /getRecommendation/:postId` | Returns post data. OpenAI API call is **stubbed/commented out** |

## Models

### User
```
name:       String (required)
email:      String (required, unique)
password:   String (required)
id:         String (optional — used for Google OAuth sub)
timestamps: true
```

### postMessage (Post)
```
title:        String
message:      String
creator:      String
tags:         [String]
selectedFile: String (base64 image)
likes:        [String] (user IDs, default [])
comments:     [ObjectId] (ref Comment, default [])
posterId:     ObjectId (ref User, required)
createdAt:    Date (default: Date.now)
```

### Comment
```
postId:   ObjectId (ref postMessage, required)
userId:   ObjectId (ref User, required)
name:     String (denormalized user name)
comment:  String
createdAt: Date (default: Date.now)
```

## Key Patterns & Conventions
1. **ES Modules** — All files use `import`/`export` (`"type": "module"` in package.json)
2. **No input validation library** — Manual checks only (e.g., `password.length < 8`)
3. **No pagination** — `getPosts` returns every document; may need optimization at scale
4. **Ownership enforced** — Posts and comments compare `req.userId` against the resource owner before update/delete
5. **Denormalized `name`** in comments — Stored as plain string for fast display
6. **50 MB body limit** — Accommodates base64-encoded image uploads
7. **OpenAI integration is incomplete** — `openai` package installed, `getCommentRecommendation` endpoint exists, but the actual API call is not active in the current code
8. **CORS is restrictive** — Only 2 origins allowed; add new ones in `index.js` as needed
9. **Error handling** — All controllers use `async`/`try-catch`, returning 4xx/5xx with message strings

## Adding a New Feature
1. **Model** — Create in `models/` with Mongoose schema
2. **Controller** — Create in `controllers/` with async functions
3. **Routes** — Create in `routes/` with Express router, apply `auth` middleware where needed
4. **Mount** — Add `app.use('/path', routeFile)` in `index.js`
5. **CORS** — If the frontend runs on a new origin, add it to the CORS allowlist in `index.js`
