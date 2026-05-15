# InPost Coverage Explorer

## Author

- **Name:** Zyta Słowiańska
- **Email:** zyta.slowianska@gmail.com

## Overview

InPost Coverage Explorer is a web-based analytics tool built on top of the InPost Points API. It allows users to explore and analyze the distribution of InPost parcel points across Europe through an interactive table and dynamic metrics.

The goal of this project is to transform raw, paginated logistics data into a structured and filterable view that helps understand geographic coverage, density, and operational characteristics of the InPost network.

## Demo & Description

The application fetches all available parcel point data from the InPost API and presents it in a responsive table interface. Users can filter the dataset by country, city, point type, and operational status.

All filters dynamically update a set of computed metrics displayed above the table, such as:
- total number of points in the current selection
- number of unique countries and cities
- percentage of locker-enabled points
- active vs inactive distribution

### Key design decisions

- **Client-side data processing:**
  All API data is fetched once and stored in memory. Filtering and aggregation are performed on the client to ensure fast and interactive exploration.

- **Pagination handling:**
  Since the API is paginated, the application loads all pages on initial startup and normalizes the dataset into a single structure.

- **Separation of concerns:**
  Data fetching, filtering logic, and UI rendering are kept modular to improve readability and maintainability.

If applicable, include:
- a link to the deployed solution
- screenshots of the UI or key outputs
- a short screen recording or demo video

## Technologies

- React (Vite) — fast development environment and modern frontend structure
- TypeScript — type safety and better maintainability
- Vite — lightweight build tool with fast HMR
- Fetch API — native HTTP requests to InPost REST API

These tools were chosen to keep the project lightweight while maintaining scalability and clarity.

## How to run

### Prerequisites

- Node.js >= 18
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

## AI usage

AI tools (ChatGPT) were used to:
- explore possible architectural approaches
- refine project scope
- generate boilerplate setup instructions

All generated code and suggestions were reviewed, understood, and adapted manually. No code was used without comprehension.

## Anything else?

The main design decision in this project was to prioritize data exploration clarity over feature richness. Instead of building a complex system, the focus was placed on making raw API data understandable and interactive through filtering and real-time aggregation.

This reflects an intentional tradeoff: simplicity and interpretability over engineering complexity.
