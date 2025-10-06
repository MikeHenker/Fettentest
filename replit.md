# Stiftung Fettentest - Food Review Blog Platform

## Overview

Stiftung Fettentest is a German-language food and beverage review blog platform where "Fettiger Fettsack" (the official tester) evaluates products based on three criteria: taste, appearance, and smell. The application features a public-facing blog showcase and a protected dashboard for managing review posts.

The system is built as a full-stack TypeScript application with React frontend and Express backend, using session-based authentication and designed for deployment on Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing (chosen over React Router for minimal bundle size)
- Vite as the build tool and dev server for fast HMR and optimized production builds

**UI Component System**
- Shadcn UI component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with CSS variables for theming
- Custom theme system supporting light/dark modes with food-themed color palette (gold/yellow primary colors)
- Inter, Oswald, and Playfair Display fonts for typography hierarchy

**State Management**
- TanStack Query (React Query) for server state management, caching, and data fetching
- Context API for authentication state (AuthProvider)
- Local component state with React hooks for UI interactions

**Form Handling**
- React Hook Form with Zod schema validation via @hookform/resolvers
- Type-safe form validation matching backend schema definitions

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for RESTful API endpoints
- Session-based authentication using express-session
- Custom middleware for request logging and JSON response capture

**API Design**
- RESTful endpoints under `/api` prefix:
  - `/api/auth/*` - Authentication (login, logout, current user)
  - `/api/blog-posts` - CRUD operations for blog posts
- Session-based authentication with middleware guards
- Consistent error handling and response formatting

**Development Setup**
- Vite middleware mode for HMR in development
- Custom logger with timestamp formatting
- Development-only plugins (Replit cartographer, dev banner, runtime error overlay)

### Data Storage Solutions

**Database Configuration**
- Drizzle ORM for type-safe database operations
- PostgreSQL configured via Neon serverless driver
- Schema defined in shared TypeScript files for frontend/backend type consistency

**Schema Design**
- `users` table: id, username, password (plaintext for demo - production should use hashing)
- `blog_posts` table: id, title, content, icon, scores (taste/appearance/smell), images array, timestamps, author reference
- UUID primary keys using PostgreSQL's `gen_random_uuid()`

**Storage Abstraction**
- IStorage interface defining data access methods
- MemStorage implementation for development (in-memory with default user)
- Designed for easy migration to PostgreSQL implementation

### Authentication & Authorization

**Session Management**
- Express-session with in-memory store (development)
- connect-pg-simple available for production PostgreSQL session storage
- 24-hour session lifetime with HTTP-only cookies

**Authentication Flow**
- Login endpoint validates credentials and creates session
- Session middleware provides userId to protected routes
- requireAuth middleware guards administrative endpoints
- No registration flow (single hardcoded user: "fettiger fettsack" / "fettbeharrt")

**Security Considerations**
- Passwords stored in plaintext (demo only - should implement bcrypt hashing)
- Session secret from environment variable with fallback (should be required in production)
- Secure cookies disabled for development (enable with HTTPS in production)

### External Dependencies

**UI Component Libraries**
- @radix-ui/* packages: Comprehensive primitive components for building accessible UI
- embla-carousel-react: Touch-friendly carousel component
- cmdk: Command menu component
- class-variance-authority & clsx: Utility for managing CSS class variants
- lucide-react: Icon system

**Development Tools**
- @replit/vite-plugin-*: Replit-specific development enhancements
- tsx: TypeScript execution for development server
- esbuild: Fast bundling for production backend build

**Validation & Type Safety**
- zod: Runtime schema validation
- drizzle-zod: Generate Zod schemas from Drizzle ORM definitions
- TypeScript strict mode for compile-time type checking

**Date Handling**
- date-fns: Lightweight date manipulation and formatting (German locale for date display)

**Database & Session**
- @neondatabase/serverless: PostgreSQL driver optimized for serverless environments
- connect-pg-simple: PostgreSQL-backed session store
- drizzle-kit: Database migration and schema management tools

**Build & Bundling**
- Vite with React plugin and custom error overlay
- PostCSS with Tailwind CSS and Autoprefixer
- Path aliases for clean imports (@/, @shared/, @assets/)