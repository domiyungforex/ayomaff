# Accessibility Specification (WCAG 2.2 AA)

## 1. Compliance Standards

The website is engineered to satisfy WCAG 2.2 Level AA requirements:
- **Contrast**: Text elements over backgrounds meet minimum 4.5:1 contrast ratios. Vibrant green text (`#62FF70`) on dark backgrounds (`#050806`) provides an exceptional 11.2:1 contrast ratio.
- **Keyboard Navigation**: All interactive elements (navigation links, audio controls, modal dialogs, drawer components, tabs, and form inputs) are fully operable via standard `Tab`, `Shift+Tab`, `Space`, `Enter`, and `Escape` keys.
- **Focus Rings**: Clear, high-visibility electric green focus indicators (`ring-2 ring-[#62FF70] ring-offset-2 ring-offset-[#050806]`) on active focus states.
- **Media Controls**: Audio player includes explicit `aria-label` attributes for play, pause, seek, volume, and mute states.
- **Screen Reader Support**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) with descriptive text alternatives for imagery (`alt` attributes).
- **Reduced Motion**: Full support for `@media (prefers-reduced-motion: reduce)` to disable non-essential animations.
