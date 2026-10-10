# Deploying Overlap

Overlap is a static React application. It needs no application server, database,
environment variables, or secrets. The production output is independent of the
domain, so it can run on a hosting preview URL before you purchase overlap.io.

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

1. Purchase overlap.io if it is available and verify you can manage its DNS.
2. Add overlap.io as a custom domain in your hosting provider's dashboard.
3. Copy the exact DNS records supplied by that host into the domain's DNS
   settings. Required record types and destinations depend on the host;
   there are no placeholder DNS records to copy from this repository.
4. Optionally add www.overlap.io and configure it to redirect to
   https://overlap.io using your host's domain settings.
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
overlap.io.
