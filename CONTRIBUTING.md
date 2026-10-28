# Contributing Guidelines

Thank you for your interest in contributing to the **Ayo Maff Cinematic Artist Website Concept**.

## Code Standards & Workflow

1. **Strict TypeScript**: All code must pass `tsc --noEmit` without type errors or `any` casts.
2. **Component Architecture**: Prefer React Server Components (`RSC`). Mark components as `"use client"` only when managing browser-specific state, Web Audio nodes, or user event listeners.
3. **Design System Adherence**: Use the designated color tokens (`bg-background`, `text-electric-green`, `border-emerald-border`). Do not introduce arbitrary hex colors without documenting them in `docs/DESIGN_SYSTEM.md`.
4. **Accessibility (WCAG 2.2 AA)**:
   - Provide meaningful `alt` text for images.
   - Ensure all interactive elements have visible focus rings and accessible labels (`aria-label`).
   - Honor `prefers-reduced-motion`.
5. **Testing**: Write unit/component tests for new business logic, form schemas, or media player utilities. Run `npm test` before committing.
6. **Integrity Mandate**: Never fabricate artist announcements, awards, or false official endorsements.
