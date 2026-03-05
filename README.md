# Advoloom Design System & Architecture

## Overview
This document outlines the core architectural and design decisions for Advoloom to ensure consistency, maintainability, and clarity.

## Design System

The application uses a custom Tailwind CSS configuration (`tailwind.config.js`) to enforce a specific identity:
*   **Palette:**
    *   `accent` (`#00f2ff`): Neon Cyan used for highlights, active states, and terminal outputs.
    *   `primary` (`#256af4`): Main branding blue.
    *   `background-dark` (`#0a0c10`): Obsidian Black used for main surfaces to give a deep, immersive terminal feel.
    *   `background-light` (`#f5f6f8`): Used sparingly for light mode equivalents (if supported).
*   **Typography:**
    *   `display` (Space Grotesk): Used for general UI, headers, and standard copy.
    *   `mono` (JetBrains Mono): Used extensively for technical readouts, logs, code, and technical data.

## Architecture Guidelines

*   **Component Modularity:** Avoid 'God Components'. Complex views are built by composing smaller, specialized widgets (e.g., `LiveTerminalWidget`, `ChannelHealthWidget`).
*   **Data Fetching:** PocketBase integration is abstracted through a custom hook (`usePocketBase`). This hook provides pagination, sorting, filtering, and real-time subscription capabilities to prevent boilerplate across views.
*   **Routing:** React Router handles application routing. Shared components like the `Header` dynamically respond to route changes rather than hardcoding static maps.
*   **Centralized UI Primitives:** Common visual elements, such as status indicators, are abstracted into design-system level components (like `Badge` and `StatusBadge`) to ensure visual consistency and ease of updates across the platform.

## Testing

Playwright is used for end-to-end testing and verification. Tests can be run using `npx playwright test`. Ensure that a final state screenshot (`evidence.png`) is captured at the end of critical flows.