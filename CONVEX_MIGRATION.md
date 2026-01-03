# Convex Migration Guide

This document describes the migration from Supabase+Prisma to Convex.

## What Was Created

### Convex Backend (`/convex/`)
- **`schema.ts`** - Database schema with all tables (users, posts, comments, votes, likes, etc.)
- **`users.ts`** - User queries and mutations
- **`posts.ts`** - Post queries and mutations with filtering and pagination
- **`comments.ts`** - Comment CRUD operations
- **`likes.ts`** - Like/unlike functionality
- **`votes.ts`** - Voting system for testers
- **`postDetails.ts`** - Post details with classifications
- **`gameRules.ts`** - Game rules management
- **`sessions.ts`** - Session management
- **`system.ts`** - System settings (stars count)
- **`http.ts`** - HTTP endpoints (GitHub webhook)
- **`tsconfig.json`** - TypeScript config for Convex

### Frontend Integration (`/src/`)
- **`lib/convex-client.ts`** - Convex client singleton
- **`db/convex/queries.ts`** - Server-side query helpers
- **`db/convex/mutations.ts`** - Server-side mutation helpers
- **`db/convex/types.ts`** - TypeScript type definitions
- **`components/comments/use-comments-convex.ts`** - Realtime comments hook
- **`components/likes/use-likes-convex.ts`** - Realtime likes hook
- **`components/AdminSettings/use-admin-settings-convex.ts`** - Admin settings hook
- **`components/AdminSettings/VotingToolConvex.tsx`** - Voting component

### Migration Script
- **`scripts/migrate-to-convex.ts`** - Data migration from PostgreSQL to Convex

## Setup Steps

### 1. Initialize Convex
```bash
fnm exec npx convex dev
```
This will:
- Prompt you to log in to Convex
- Create a new project or link to existing
- Generate the `convex/_generated/` folder with types
- Deploy your schema and functions

### 2. Add Environment Variables
Add to your `.env`:
```
PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### 3. Migrate Data
After Convex is running:
```bash
fnm exec pnpm migrate:to-convex
```

### 4. Update Components
Replace old hooks with Convex versions in your components:

**Comments:**
```typescript
// Old
import { useComments } from 'components/comments/use-comments'
// New
import { useCommentsConvex } from 'components/comments/use-comments-convex'
```

**Likes:**
```typescript
// Old
import { useLikes } from 'components/likes/use-likes'
// New
import { useLikesConvex } from 'components/likes/use-likes-convex'
```

**Admin Settings:**
```typescript
// Old
import { useAdminSettings } from 'components/AdminSettings/use-admin-settings'
// New
import { useAdminSettingsConvex } from 'components/AdminSettings/use-admin-settings-convex'
```

### 5. Update Server-Side Code
Replace Prisma queries with Convex queries:

```typescript
// Old
import { prisma } from 'db/prisma/prisma'
const post = await prisma.post.findFirst({ where: { id: postId } })

// New
import { getPostById } from 'db/convex/queries'
const post = await getPostById(postId)
```

## Files to Remove (After Migration Complete)

### Prisma
- `/prisma/` (entire directory)
- `/src/db/prisma/` (entire directory)

### Supabase
- `/supabase/` (entire directory)
- `/src/db/supabase/` (entire directory)

### Old Dependencies to Remove
```bash
fnm exec pnpm remove @prisma/client @prisma/extension-accelerate @supabase/supabase-js prisma supabase
```

## Key Differences

### IDs
- Prisma used auto-increment integers
- Convex uses string IDs (like `j57...abc`)
- We keep `visibleId` for backwards compatibility with URLs

### Realtime
- Supabase used `postgres_changes` subscriptions
- Convex uses `onUpdate()` which automatically subscribes to query results

### Timestamps
- Prisma used `DateTime` objects
- Convex uses `number` (Unix timestamps in milliseconds)

### Relations
- Prisma had implicit many-to-many relations
- Convex uses explicit junction tables (`postGameRules`, `postLikes`)

## Convex Dashboard
Access your dashboard at: https://dashboard.convex.dev

Features:
- View and edit data
- Monitor function logs
- Manage environment variables
- View deployment history
