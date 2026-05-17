# InPost Coverage Explorer

## Author

- **Name:** Zyta Słowiańska
- **Email:** zyta.slowianska@gmail.com

## Overview

InPost Coverage Explorer is a web-based analytics tool built on top of the InPost Points API. It allows users to explore and analyze the distribution of InPost parcel points across Europe through an interactive table and dynamic metrics.

The goal of this project is to transform raw, paginated logistics data into a structured and filterable view that helps understand geographic coverage, density, and operational characteristics of the InPost network.

## Demo & Description

The application fetches all available parcel point data from the InPost API and presents it in a responsive table interface. Users can filter the dataset by country, city, point name, address, point type, and operational status.

All filters dynamically update the analytics displayed above the table:
- a per-country breakdown showing each country's point count relative to the filtered total
- a stacked status bar per country (Operating / Overloaded / Non-Operating / Created / Disabled)
- a result counter showing how many points match the current filters out of the total dataset

### Key design decisions

- **Client-side data processing:**
  All API data is fetched once and stored in memory. Filtering and aggregation are performed on the client to ensure fast and interactive exploration.

- **Pagination handling:**
  Since the API is paginated, the application loads all pages on initial startup and normalizes the dataset into a single structure.

- **Separation of concerns:**
  Data fetching, filtering logic, and UI rendering are kept modular to improve readability and maintainability.

- **IndexedDB caching:**
  The full dataset (~5 minutes to fetch from the API) is persisted in the browser's IndexedDB for 24 hours. Subsequent visits load in seconds. A manual refresh option is available to force a new fetch.

## Technologies

- React (Vite) — fast development environment and modern frontend structure
- TypeScript — type safety and better maintainability
- Vite — lightweight build tool with fast HMR
- TanStack React Table — headless table library powering client-side sorting and pagination
- Tailwind CSS v4 — utility-first styling for all components
- Fetch API — native HTTP requests to InPost REST API
- IndexedDB (via `cache.ts`) — browser-native persistence layer caching the full dataset for 24 hours

These tools were chosen to keep the project lightweight while maintaining scalability and clarity.

## How to run

### Prerequisites

- Node.js >= 20.19 or >= 22.12
- npm >= 9
- Internet connection (for API access)

### Build & run

```bash
# Clone repository
git clone <your-repo-url>

# Enter project directory
cd inpost-coverage-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:

http://localhost:5173

## What I would do with more time

If given more time, I would prioritize the following improvements:

1. Performance optimization<br>
Implement pagination + lazy loading instead of fetching all data at once
2. Geospatial visualization<br>
Add a map view (e.g. Leaflet) to visualize point distribution
3. Server-side aggregation<br>
Move filtering and aggregation logic to a backend service for scalability
4. Advanced analytics<br>
Heatmaps of coverage density<br>
Time-based availability analysis (if data supports it)

### Code quality fixes

1. **High** — Replace `as X` type assertions in `pointMapper.ts` with proper type guards or Zod schema validation
2. **High** — Fix unawaited `deleteCacheData()` call in `cache.ts` (silent async failure)
3. **High** — Remove dead code: unused `fetchPoints()`, `exploreDataset.ts`, and empty `App.css`
4. **Medium** — Fix `setloading` → `setLoading` naming inconsistency in `App.tsx`
5. **Medium** — Extract CV data to `data/cv.ts`; make `CVDisplay` a pure rendering component
6. **Medium** — Extract filter logic from `PointsTable` into a dedicated `useTableFilters` hook
7. **Medium** — Add Zod schema validation for `InPostPointApi` responses at the API boundary
8. **Low** — Extract column name formatter to `util/formatters.ts` to avoid duplication
9. **Low** — Add ARIA labels and semantic attributes for accessibility

## AI usage

AI tools were used throughout this project as development accelerators:

- **ChatGPT** — used for exploring architectural approaches and refining project scope
- **GitHub Copilot and Claude** — used as AI coding agents to assist with implementation

All AI-generated code and suggestions were reviewed, understood, and deliberately adapted. Every decision reflects intentional engineering choices rather than uncritical acceptance of generated output.

## Anything else?

The main design decision in this project was to prioritize data exploration clarity and user experience over feature richness. Instead of building a complex system, the focus was placed on making raw API data understandable and interactive through filtering and real-time aggregation.

This reflects an intentional tradeoff: simplicity and interpretability over engineering complexity.
