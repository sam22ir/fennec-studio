# Fennec portfolio refresh design

## Goal

Bring the Fennec Studio site up to date with the current Nabdh, Koupa, and Masroof product portfolio while preserving its Arabic-first bilingual experience and existing case-study routes.

## Audience and outcome

People discovering Fennec, potential collaborators, and product users should understand what the studio is building, why the products matter in Algeria, and where each product can be explored. The page should feel like an active studio portfolio rather than an early concept page.

## Design direction

- Keep the existing Fennec green, red, and paper palette, but use stronger surface contrast, more restrained borders, and clearer type hierarchy.
- Keep the animated mark as the hero identity signal, paired with the existing Algiers photo as a quiet visual texture instead of decorative gradients.
- Replace the stale “first products are taking shape” story with a current portfolio view: Nabdh, Koupa, and Masroof are the featured work.
- Use an asymmetric project layout: one lead product, then two supporting products with compact status and live-site links.
- Keep Arabic as the default locale, with a complete English translation and document direction on language toggle.
- Use direct links to the verified public product sites without inventing product metrics or release claims.

## Content model

The home page content object adds Masroof to both locales and updates the studio, work, principles, and closing copy. Each project has a case-study link, a public-site link where available, status, category, description, and technology details.

The project data adds `masroof` to the static slug list. Its case study uses a local-first personal-finance description and a compact dashboard-style preview. Existing Nabdh, Koupa, and Green Algeria routes remain valid.

## Interaction and accessibility

- Existing anchor navigation, mobile menu, language toggle, reduced-motion support, and keyboard focus behavior remain available.
- Live product links open in a new tab with `rel="noreferrer"` and are labeled as external.
- Buttons and links retain visible focus states and use icons from `lucide-react`.
- Responsive layout collapses to one column at the current mobile breakpoint without clipped text or horizontal scrolling.

## Verification

Run `npm run typecheck`, `npm run lint`, and `npm run build`. Start the Next.js dev server, inspect the home page at desktop and mobile widths with Playwright, verify the Arabic/English toggle, and check `/projects/nabdh`, `/projects/koupa`, `/projects/green-algeria`, and `/projects/masroof` return successfully.
