# Fennec portfolio refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the Fennec Studio portfolio so its copy, project inventory, public links, and responsive visual hierarchy reflect the current Nabdh, Koupa, and Masroof products.

**Architecture:** Keep the existing Next.js App Router pages and bilingual content object. Extend the shared project data and case-study renderer with a Masroof entry and preview, then update the shared CSS in place so the home page and case-study pages share the same visual language.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Lucide React, static CSS, Cloudflare Pages export.

---

### Task 1: Update the portfolio content model

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/projects/project-data.ts`

- [ ] **Step 1: Replace stale home copy in both locales**

Update the English and Arabic content objects so the hero describes an active Algerian product studio, the work section names three current products, and the closing section invites product conversations instead of saying the first products are still being shaped. Add Masroof copy in both locales with no unverified metrics or release claims.

- [ ] **Step 2: Add public-site metadata to project entries**

Add optional `siteUrl` and `siteLabel` fields to the project data for Nabdh (`https://nabdh.uk`), Koupa (`https://koupa-website.pages.dev`), and Masroof (`https://masroof-legal.pages.dev`). Add Masroof to `projectSlugs` with status, category, headline, description, context, three approach steps, stack, preview label, and `masroof-case` theme.

- [ ] **Step 3: Run the type checker**

Run `npm run typecheck` and expect the existing app to typecheck before the renderer changes land.

### Task 2: Add Masroof to the home and case-study experiences

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Render the three-project home layout**

Keep Nabdh as the lead project, replace the old Green Algeria pair with Koupa and Masroof, and add each project’s public-site link beside its case-study link. Keep Green Algeria accessible through its existing route and data even though it is no longer the lead portfolio row.

- [ ] **Step 2: Add the Masroof preview**

Create a `MasroofPreview` component with a warm finance dashboard composition using CSS only: current balance, a small savings progress bar, and upcoming bills. Select it from `ProjectPreview` for the `masroof` slug.

- [ ] **Step 3: Render external links from project data**

Use the optional `siteUrl`/`siteLabel` fields in the case-study hero and home cards. External links must include `target="_blank"` and `rel="noreferrer"`; Green Algeria keeps its repository link.

- [ ] **Step 4: Verify route generation**

Run `npm run typecheck` and `npm run build`; expect static generation for all four case-study routes without a missing slug error.

### Task 3: Refresh the shared visual system

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Establish the refreshed surfaces and typography**

Keep the green/red identity but shift the page toward a paper-and-ink editorial system: stronger container rhythm, sentence-case labels, visible focus rings, balanced headings, and a quiet Algiers photo texture in the hero background.

- [ ] **Step 2: Style the current project states**

Add a distinct Masroof project treatment, shared external-link treatment, live-site badges, and compact status rails. Preserve the existing case-study preview styles and add matching Masroof dashboard rules.

- [ ] **Step 3: Harden responsive states**

Ensure the three project panels stack at the existing mobile breakpoint, Arabic text remains readable, buttons do not overflow, and reduced-motion media rules still disable animation.

- [ ] **Step 4: Run lint and typecheck**

Run `npm run lint` and `npm run typecheck`; fix only errors caused by this refresh.

### Task 4: Browser verification

**Files:**
- Create: `output/playwright/` artifacts only when the browser tool writes them

- [ ] **Step 1: Start the dev server**

Run `npm run dev -- --hostname 127.0.0.1 --port 3000` and wait for a real HTTP 200 response at `http://127.0.0.1:3000`.

- [ ] **Step 2: Inspect desktop and mobile renders**

Use the Playwright CLI wrapper to open the home page at desktop and mobile sizes, capture screenshots, and confirm the hero, three project panels, language switch, and mobile menu are visible without overlap.

- [ ] **Step 3: Check internal routes and external links**

Open each case-study route and verify the Masroof route renders its preview and public link. Confirm the live-site links are present in the DOM and use external-target attributes.

- [ ] **Step 4: Build the static export**

Run `npm run build` once more after browser checks and report the resulting route output and any remaining verification gap.
