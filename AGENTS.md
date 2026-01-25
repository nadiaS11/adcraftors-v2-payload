# Agent Guidelines for adcraftors-v2

This is a Payload CMS 3.x + Next.js 15 project using TypeScript, pnpm, and PostgreSQL.

## Build/Lint/Test Commands

```bash
# Development
pnpm dev                 # Start dev server at localhost:3000
pnpm build               # Production build
pnpm start               # Start production server

# Type Checking & Linting
tsc --noEmit             # Validate TypeScript (run after code changes)
pnpm lint                # Run ESLint
pnpm lint:fix            # Auto-fix lint issues

# Payload Type Generation (REQUIRED after schema changes)
pnpm generate:types      # Regenerate payload-types.ts
pnpm generate:importmap  # Regenerate import map after component changes

# Testing - Integration (Vitest)
pnpm test:int                                    # Run all integration tests
pnpm exec vitest run tests/int/api.int.spec.ts   # Run single integration test
pnpm exec vitest run -t "fetches users"          # Run test by name pattern

# Testing - E2E (Playwright)
pnpm test:e2e                                    # Run all E2E tests
pnpm exec playwright test frontend.e2e.spec.ts   # Run single E2E test
pnpm exec playwright test -g "homepage"          # Run tests matching pattern

# All Tests
pnpm test                # Run integration + E2E tests
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Frontend routes (Next.js App Router)
│   └── (payload)/           # Payload admin routes
├── collections/             # Payload collection configs
├── globals/                 # Payload global configs
├── blocks/                  # Lexical editor blocks
├── fields/                  # Reusable field definitions
├── access/                  # Access control functions
├── hooks/                   # Payload lifecycle hooks
├── components/              # React components
├── utilities/               # Helper functions
├── providers/               # React context providers
└── payload.config.ts        # Main Payload config
tests/
├── int/                     # Integration tests (*.int.spec.ts)
└── e2e/                     # E2E tests (*.e2e.spec.ts)
```

## Code Style Guidelines

### Formatting (Prettier)

- Single quotes, no semicolons
- Trailing commas (all)
- 100 character line width
- Run: `npx prettier --write <file>`

### TypeScript

- Strict mode enabled
- Use `type` imports: `import type { CollectionConfig } from 'payload'`
- Use path aliases: `@/*` maps to `src/*`, `@payload-config` for config
- Prefix unused variables with `_`: `const _unused = value`

### Naming Conventions

- Collections: PascalCase export, lowercase slug (`export const Posts`, `slug: 'posts'`)
- Components: PascalCase (`MediaBlock.tsx`)
- Hooks: camelCase (`revalidatePost.ts`)
- Access functions: camelCase (`authenticated`, `authenticatedOrPublished`)
- Types: PascalCase, import from `@/payload-types`

### Imports Order

1. Node built-ins
2. External packages (`payload`, `@payloadcms/*`, `next`, `react`)
3. Internal absolute imports (`@/`, `@payload-config`)
4. Relative imports (`./`, `../`)

### Error Handling

- Use Payload's `APIError` for custom endpoints: `throw new APIError('message', 401)`
- Always check `req.user` in protected endpoints
- Handle async errors with try/catch in hooks

## Critical Payload CMS Patterns

### Local API Access Control (SECURITY CRITICAL)

```typescript
// WRONG - Access control bypassed!
await payload.find({ collection: 'posts', user: someUser })

// CORRECT - Enforces permissions
await payload.find({ collection: 'posts', user: someUser, overrideAccess: false })
```

### Transaction Safety in Hooks

```typescript
// ALWAYS pass `req` to nested operations
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        req,  // Required for transaction atomicity
      })
    },
  ],
}
```

### Prevent Infinite Hook Loops

```typescript
hooks: {
  afterChange: [
    async ({ doc, req, context }) => {
      if (context.skipHooks) return
      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { views: doc.views + 1 },
        context: { skipHooks: true },
        req,
      })
    },
  ],
}
```

### Access Control Patterns

```typescript
// Collection access returns boolean OR query constraint
const ownPosts: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  return { author: { equals: user.id } }
}

// Field access returns boolean ONLY
access: {
  read: ({ req: { user }, doc }) => user?.id === doc?.id,
}
```

## Component Development

- Server Components by default (can use Local API directly)
- Client Components: add `'use client'` directive
- Define components via file paths in config: `'/components/MyComponent'`
- Named exports: use `#ExportName` suffix
- Run `pnpm generate:importmap` after creating/modifying components

## Workflow Checklist

After modifying code:

1. `tsc --noEmit` - Validate TypeScript
2. `pnpm lint` - Check for lint errors

After schema changes (collections/globals/fields):

1. `pnpm generate:types` - Update payload-types.ts
2. `tsc --noEmit` - Verify type compatibility

After component changes:

1. `pnpm generate:importmap` - Update component paths

Before committing:

1. Run relevant tests
2. Ensure no TypeScript errors
3. Ensure no lint errors

## Additional Resources

For detailed Payload CMS patterns, see `.cursor/rules/`:

- `security-critical.mdc` - Critical security patterns
- `collections.md` - Collection configurations
- `fields.md` - Field types and patterns
- `access-control.md` - Permission patterns
- `hooks.md` - Lifecycle hooks
- `components.md` - Custom components
- `queries.md` - Database operations
- `endpoints.md` - Custom API endpoints

Payload CMS Docs: https://payloadcms.com/docs
