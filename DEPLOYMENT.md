# Deploying Overlap

Overlap is a static React application. It needs no application server, database,
environment variables, or secrets. The production output is independent of the
domain, so it can run on a hosting preview URL before you purchase overlap.run.

## Vercel deployment to overlap.run

One-time setup from the repository root:

```sh
npm ci
npx vercel login
npx vercel link
```

Choose your Vercel account/team and create or select the Overlap project.
The link is saved in .vercel/ (ignored by Git).

Run the deployment script:

```sh
npm run deploy
```

It checks formatting, runs tests, builds locally, and then publishes a production
deployment to the linked Vercel project. Vercel also builds the uploaded source
using vercel.json. Do not run this command unless you intend to publish.

After the first deployment, add overlap.run in that project's Settings → Domains.
Follow the exact DNS and ownership verification instructions Vercel supplies.
Once the domain is verified and assigned to production, subsequent npm run deploy
commands update overlap.run automatically. Until then, the deployment is served
at its Vercel URL. The script does not purchase a domain or edit your DNS.

Production deployments affect the project chosen during vercel link. To change
the destination account or project, run npx vercel link again before deploying.

See [Vercel deployment documentation](https://vercel.com/docs/cli/deploy) and
[custom domain assignment](https://vercel.com/docs/cli/alias).

## Build settings

| Setting                  | Value           |
| ------------------------ | --------------- |
| Project root             | Repository root |
| Node.js                  | 24 (see .nvmrc) |
| Install command          | npm ci          |
| Build command            | npm run build   |
| Publish/output directory | dist            |
| Environment variables    | None            |

For a Git-connected host, connect the repository and select the branch you want
to publish. Enter these settings and deploy to the host's temporary URL.
Do not use npm run dev or npm run preview as a production server.

## Validate and package locally

Run npm ci, then npm run package:deploy.

This checks formatting, runs tests, performs TypeScript checking, builds the
app, and creates overlap-site.tar.gz in the repository root. Packaging requires
the tar command. The archive contains the contents of dist/, with
index.html at its root. Build output and the archive are ignored by Git.

For hosts accepting a folder upload, upload dist/. For an existing static
web server, extract the archive into its document root. Do not upload source
files or node_modules/.

## Connect the domain after purchase

1. Purchase overlap.run if it is available and verify you can manage its DNS.
2. Add overlap.run as a custom domain in your hosting provider's dashboard.
3. Copy the exact DNS records supplied by that host into the domain's DNS
   settings. Required record types and destinations depend on the host;
   there are no placeholder DNS records to copy from this repository.
4. Optionally add www.overlap.run and configure it to redirect to
   https://overlap.run using your host's domain settings.
5. Wait for the host to verify DNS and issue an HTTPS certificate, then enable
   HTTP-to-HTTPS redirection.
6. Open the domain and verify that the page and its assets load successfully.

No source-code changes or rebuild are needed merely to change the domain.
The app currently has a single page at /; no client-side route fallback is
required. If routes are introduced later, configure a suitable fallback then.

## Production checks

- Start a round, select a passage, type, and replay.
- Switch themes and reload to confirm the preference persists.
- Check the layout on a narrow screen.
- Verify HTTPS and, if configured, the www redirect.
- Keep index.html revalidated on subsequent visits. Hashed files in assets/
  can use long-lived immutable caching if your host supports cache configuration.
- Keep a previous deployment available through your host's rollback feature,
  or retain the previous release archive.

Theme preferences and personal best scores belong to the browser origin.
Values saved on localhost or a temporary hosting URL will not transfer to
overlap.run.
