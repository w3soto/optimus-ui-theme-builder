# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Theme Studio: an Angular 21 app for visually editing design-token presets and exporting them as typed TypeScript presets. The UI library is **Optimus UI** (`@openng/optimus-ui`, `@openng/optimus-ui-themes`, `@openng/optimus-ui-tailwindcss`, `@openng/icons`), an OpenNG fork of PrimeNG. Older changelog entries still say "PrimeNG", but the code no longer imports `primeng` or `@primeuix/*`. Always import from `@openng/*`, e.g. `@openng/optimus-ui/button` and `@openng/optimus-ui-themes/aura`.

## Commands

```bash
npm start                                   # dev server at http://localhost:4200
npm run build                               # production build -> dist/prime-ng-theme-fe/browser
npm test -- --watch=false                   # full Vitest suite (via @angular/build:unit-test, jsdom)
npx ng test --watch=false --include src/app/features/designer/designer.spec.ts   # single spec file
```

- No lint script is configured. Formatting follows the Prettier config in `package.json` (100-column lines, single quotes, Angular parser for `.html`).
- `src/test-setup.ts` polyfills `ResizeObserver` and stubs `HTMLCanvasElement.getContext` for jsdom (the Optimus Tabs component and Chart.js need them).
- Component specs set up theming with `provideOptimus({ theme: { preset: Aura } })` and add `provideRouter([])` when the component uses the router.
- Deployment uses `nixpacks.toml`, which serves the static build from `dist/prime-ng-theme-fe/browser`.

## Architecture

- **App shell**: standalone components with signals. `app.config.ts` calls `provideOptimus` with the default preset (`Material`) and `darkModeSelector: '.p-dark'`. Dark mode means toggling the `p-dark` class on `<html>`, and Tailwind's `dark:` variant is bound to that same class in `src/styles.css`.
- **Routes** (`app.routes.ts`) lazy-load feature route files: `''` → `features/landing`, `designer` → `features/designer`, `changelog` → `features/changelog`. `features/blocks` exists with its own `blocks.routes.ts`, but the app routes do not register it at the moment.
- **Presets**:
  - `theme-presets.ts` maps the base preset names (Aura, Material, Lara, Nora) to `Preset` objects.
  - `material-preset.ts` is a large local Material preset.
  - `starter-themes.ts` defines the curated starter themes (shadcn, bootstrap, material, custom): a preset plus a font family and font size.
- **Runtime theming**: both services apply presets globally by calling `usePreset` / `updatePrimaryPalette` / `updateSurfacePalette` from `@openng/optimus-ui-themes`. Both services are root singletons, so the landing page and the designer share one global theme.
  - `ThemeStateService` (landing) holds the landing page's own preset, palette and dark-mode state.
  - `ThemeDesignerService` (designer) holds all designer state in one `designer` signal (`activeView: 'create' | 'editor'`, `activeTab`, `theme: {name, preset, config}`, `acTokens`).
- **Designer flow**:
  - `designer.ts` reads query params on init. `?theme=` is tried first as a gzip + base64url token (`importThemeFromUrl`), then as the legacy plain-base64 JSON token (`importTheme`). `?starter=<id>` creates a theme from a starter.
  - Editor components under `designer/components/` (primitive, semantic, component, custom tokens, settings) change `theme.preset` through the service. `applyTheme()` pushes the preset back through `usePreset`.
  - `acTokens` is a flattened list of token paths used for autocomplete in token fields. `generateACTokens` builds it and skips the `dark`, `components` and `directives` keys.
  - Export serializes the preset to a `.ts` file (`serializePreset`) and drops function values.
  - `designer/blocks/` holds full-screen preview pages (dashboard, login, sign-up, table, grid). `designer/components/preview.ts` switches between them.
- **Changelog**: user-facing release notes live in `features/changelog/changelog-data.ts` as a typed `CHANGELOG` array, newest entry first. Add an entry there for user-visible changes.

## Notes

- `design-qa.md` records design-QA passes made against reference visuals (the landing page against optimus.openng.org, the dark-mode tables).
- Portions of the landing page are adapted from `openng-org/optimus-ui` under MIT. Keep `THIRD_PARTY_NOTICES.md` in sync if more material is borrowed.
