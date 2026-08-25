# Chat AI configuration

The chat UI uses the Expo Router endpoint at `/api/chat` and streams responses
from Anthropic. The API key remains server-side and must never use an
`EXPO_PUBLIC_` prefix.

Every real AI request includes the signed-in user's bearer token. Before calling
Anthropic, the server verifies that token against
`${API_URL}/api/Authorize/CurrentUser`. Deployments must therefore provide both
`API_URL` and `ANTHROPIC_API_KEY`; authentication failures and authentication
service outages fail closed and never invoke the paid model.

The route also applies these server-side safeguards:

- 24 MB maximum request body, enforced while streaming the request body.
- Four attachments per message and 4 MB per embedded attachment.
- A 90-second upstream AI timeout with sanitized production errors.

Request-rate and concurrent-stream limits belong in the application's backend
or API gateway so the policy is shared consistently across every client and
deployment instance. This Expo client does not implement those limits.

For local Web development, copy the example local environment file and set the
key there. Local environment files are ignored by Git:

```powershell
Copy-Item .env.local.example .env.development.local
# Edit .env.development.local and replace the placeholder key.
pnpm.cmd web
```

You can also set the key only for the current shell:

```powershell
$env:ANTHROPIC_API_KEY='your-key'
pnpm.cmd web
```

Real AI is the default. To run the deterministic offline demo instead:

```powershell
$env:EXPO_PUBLIC_MOCK_AI='1'
pnpm.cmd web
```

Native builds need a reachable deployed endpoint because `/api/chat` belongs to
the Web server. Configure it when building the app:

```powershell
$env:EXPO_PUBLIC_CHAT_API_URL='https://your-host.example/api/chat'
```

The Web export must be deployed to a host that supports the Expo server output;
static-only hosting cannot execute the API route.

Attachment data remains available for the active session but Base64 payloads are
not written to persisted chat history. This prevents browser and device storage
from growing by several megabytes per conversation; after an app restart, saved
chat text remains but old attachment chips are omitted.

For staging or production, inject `ANTHROPIC_API_KEY` as a server-side secret in
the deployment environment. Never add it to Expo `extra`, `ClientEnv`, or an
`EXPO_PUBLIC_` variable.
