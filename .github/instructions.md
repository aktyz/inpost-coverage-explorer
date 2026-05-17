# InPost Coverage Explorer - Development Instructions

## ⚠️ Important: Development Server

**DO NOT run `npm run dev`** — the development server causes the website to load very slowly during hot reload cycles. Instead, use:

```bash
npm run build
npm run preview
```

The `preview` command loads the optimized production build locally, providing much better performance for development and testing.

---

## Project Overview

InPost Coverage Explorer is a **purely front-end React + TypeScript application** built with Vite. It's a recruitment assignment demonstrating modern web development practices.

**Key Features:**
- Interactive table of InPost parcel points across Europe
- Dynamic filtering by country, city, point type, and status
- Real-time computed metrics (total points, unique countries, locker percentages, etc.)
- Client-side data processing with pagination handling

---

## Styling & Tailwind CSS

**Tailwind CSS manages all stylesheets** for this project. Follow these guidelines:

- Use Tailwind utility classes for styling components
- Keep CSS classes in component files using inline Tailwind classes
- Avoid creating custom CSS files unless absolutely necessary
- Leverage Tailwind's responsive design utilities for layout adjustments
- Consult `tailwind.config.js` for custom theme extensions if needed

**Example:**
```tsx
export const FilterButton: React.FC = () => (
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    Filter
  </button>
);
```

---

## Code Quality & SOLID Principles

All code must follow **SOLID principles** to ensure maintainability and scalability:

### **Single Responsibility Principle (SRP)**
- Each component/function has one reason to change
- Separate concerns: data fetching, filtering logic, and UI rendering
- Example: Keep API calls in `api/`, business logic in utility functions, UI in components

### **Open/Closed Principle (OCP)**
- Code should be open for extension, closed for modification
- Use composition and props to customize behavior instead of modifying existing code
- Example: Make filter components configurable via props

### **Liskov Substitution Principle (LSP)**
- Derived types must be substitutable for base types
- If using component hierarchies, ensure interface contracts are honored
- Keep type compatibility consistent across component trees

### **Interface Segregation Principle (ISP)**
- Clients should not depend on interfaces they don't use
- Create focused, minimal interfaces/types in `types/`
- Example: Don't pass entire data objects when only a subset is needed

### **Dependency Inversion Principle (DIP)**
- Depend on abstractions, not concrete implementations
- Use dependency injection where appropriate
- Example: Pass filter functions or data sources as props rather than hardcoding them

---

## Project Structure & Best Practices

### Directory Organization
- `src/api/` — API calls and data fetching logic
- `src/components/` — React components (stateless, reusable)
- `src/mappers/` — Data transformation and normalization functions
- `src/types/` — TypeScript interfaces and type definitions
- `src/util/` — Utility functions (caching, data processing, helpers)

### Code Guidelines

1. **TypeScript Strict Mode**
   - Ensure all types are properly defined
   - Use strict type checking in `tsconfig.json`
   - Avoid `any` types — be explicit about data structures

2. **Component Design**
   - Keep components small and focused (SRP)
   - Use functional components with hooks
   - Prefer composition over inheritance
   - Memoize components if they receive complex props (`React.memo`)

3. **Data Processing**
   - Client-side filtering and aggregation should be efficient
   - Cache API data appropriately using utilities in `src/util/cache.ts`
   - Keep business logic separate from UI rendering

4. **Error Handling**
   - Handle API failures gracefully
   - Provide user feedback for data loading states
   - Log meaningful error messages for debugging

5. **Performance Considerations**
   - Minimize re-renders using `useMemo` and `useCallback`
   - Lazy-load components if necessary (code splitting)
   - Use table virtualization if displaying large datasets
   - Profile performance using browser DevTools

6. **Testing & Linting**
   - Run `npm run lint` before committing
   - Keep ESLint configuration aligned with project standards
   - Write maintainable code that's easy to test

---

## Development Workflow

### Build & Preview (Recommended)
```bash
npm run build      # Compile TypeScript and create optimized production build
npm run preview    # Serve the optimized build locally
```

### Linting
```bash
npm run lint       # Check for code quality issues
```

### Directory Structure Reference
```
src/
├── api/           # InPost API integration
├── components/    # React components (FilterPanel, PointsTable, etc.)
├── mappers/       # Data normalization (pointMapper)
├── types/         # TypeScript definitions
└── util/          # Utilities (caching, dataset exploration, helpers)
```

---

## Recruitment Assignment Focus

This project demonstrates:
- ✅ **Clean Architecture**: Well-organized folder structure, clear separation of concerns
- ✅ **TypeScript Mastery**: Strict typing, proper interfaces, reusable types
- ✅ **React Best Practices**: Functional components, hooks, performance optimization
- ✅ **SOLID Principles**: Maintainable, scalable, testable code
- ✅ **UX/UI Design**: Interactive filtering, real-time metrics, responsive table
- ✅ **API Integration**: Efficient pagination handling, client-side data processing
- ✅ **Code Quality**: ESLint compliance, meaningful variable names, clear logic flow
- ✅ **Performance**: Optimized builds, efficient rendering, smart caching

Focus on **code clarity, maintainability, and adherence to best practices** rather than flashy features.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run build` | Create production build |
| `npm run preview` | Serve production build locally ✅ **Use this** |
| `npm run dev` | Dev server with hot reload ❌ **Too slow** |
| `npm run lint` | Check code quality |

