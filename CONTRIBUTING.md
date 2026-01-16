## How to get started?

Install the dependencies:

```sh
pnpm i
```

Start Supabase database:

```sh
pnpm exec supabase start
```

Start Convex (in a separate terminal):

```sh
pnpm convex:dev
```

For development purposes, you can choose the local instance of Convex.

This will provide you with an url. Add it to your `.env` file:

```sh
PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

Run the dev server:

```sh
pnpm dev
```
