# Rolling Back to a Previous Netlify Deploy

If a recent deployment introduced issues or if new builds are failing, you can revert your site to a previous deploy directly from the Netlify dashboard.

## Steps

1. Sign in to [Netlify](https://app.netlify.com/) and navigate to the project dashboard for your site.
2. Click **Deploys** in the left navigation menu.
3. In the deploy list, locate the deploy you want to restore (for example, the deploy from `11:35 AM` Mountain time yesterday).
4. Click the **Publish Deploy** button beside that entry. Netlify will make that version live immediately.
5. If you want to prevent new (failing) builds from automatically publishing, click **Lock deploys** after publishing the desired version. You can unlock at any time.

This process restores the previous build without requiring a new successful build.
