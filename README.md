# Consultation Lead Magnet

A bilingual, conversion-focused Next.js landing page and thank-you flow for Rohan Pathak's free one-hour AI marketing consultation.

## Local setup

1. Install Node.js 18.17 or newer.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` only if you want to override local demo mode.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

This project currently uses a local demonstration flow. A locally validated form stores only a temporary completion flag in `sessionStorage` and navigates to `/thank-you`; it does not send personal information to an email service, API, or backend.

Direct visits to `/thank-you` show the complete demonstration page while `NEXT_PUBLIC_LOCAL_DEMO` is enabled. A future verified production flow can set that variable to `false` and use the existing session-gated fallback structure.

## Production build

```bash
npm run build
npm start
```

## Local form behavior

Required fields and WhatsApp numbers are validated in the browser. After valid completion, the page navigates directly to the local demonstration thank-you page. No form payload leaves the browser.

## Localization and video

- The **EN | नेपाली** switcher persists the selected language in browser storage across `/` and `/thank-you`.
- The responsive native video player uses `public/demo-consultation.mp4`, a temporary MDN CC0 demonstration clip that can be replaced with Rohan's final recording later.
