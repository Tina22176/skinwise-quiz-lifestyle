# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/124d9cea-9859-4918-9296-6957c8a505d6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/124d9cea-9859-4918-9296-6957c8a505d6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/124d9cea-9859-4918-9296-6957c8a505d6) and click on Share -> Publish.

### Secure lead capture on Netlify

The quiz submits leads to the serverless function in `netlify/functions/quiz-leads.mjs`.
Before deploying the custom domain, configure these environment variables in Netlify:

- `BREVO_API_KEY`: a server-only Brevo API key; never prefix it with `VITE_`.
- `BREVO_LIST_ID`: the quiz list, used only to send the guide the person asked for (defaults to `9`, « Quiz majoliepeau »).
- `BREVO_MARKETING_LIST_ID`: the marketing list (defaults to `10`, « Newsletters MJP »). A contact joins it only when the optional « conseils et offres » box is ticked (`marketingConsent === true`); the contact then also gets `CONSENT_MARKETING = yes`.
- `BREVO_QUIZ_ATTRIBUTES`: set to `true` once the attributes below exist in Brevo. Until then only `PRENOM`, `SKIN_TYPE` and `CONSENT_MARKETING` are sent.

`SKIN_TYPE` (category attribute already in Brevo) routes the « Ton profil peau » automation: one email per profile. Its ids are mapped in `SKIN_TYPE_IDS` (`quiz-leads.mjs`); a test checks they match the five quiz profiles. The follow-up emails of that automation (offers, newsletter) must only go to contacts with `CONSENT_MARKETING = yes`.

Consent rules (guarded by `tests/quizLeads.test.ts`):
- giving an email gets the guide; it never subscribes to marketing;
- never send campaigns to the quiz list, only the guide;
- the function never sends `emailBlacklisted`: an unsubscribed person stays unsubscribed.

Brevo contact attributes to create (text, except `PROFILE_CONFIDENCE` and `CYCLE_RELEVANCE`: number, `QUIZ_COMPLETED`: boolean, `QUIZ_DATE`: date):
`SKIN_PROFILE`, `RECOMMENDED_PROGRAM`, `SECONDARY_PROGRAM`, `LEAD_TEMPERATURE`,
`PROFILE_CONFIDENCE`, `CYCLE_RELEVANCE`, `QUIZ_SOURCE`, `UTM_SOURCE`,
`UTM_MEDIUM`, `UTM_CAMPAIGN`, `UTM_CONTENT`, `QUIZ_ANSWERS`,
`QUIZ_COMPLETED`, `QUIZ_DATE`, and `ORIGIN`.

If an API key has ever been committed to Git, revoke it in Brevo before deployment;
removing it from the current source does not invalidate copies in Git history.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
