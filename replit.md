# PreferredStockHub - Replit Project Guide

## Overview

PreferredStockHub is a full-stack web application that provides real-time preferred stock data, analysis, and education. The application follows a modern monorepo structure with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with JSON responses
- **Database**: PostgreSQL with Drizzle ORM
- **Development**: Hot reload with tsx and Vite middleware integration

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: Neon Database serverless connection
- **Schema**: Type-safe schema definitions in `shared/schema.ts`
- **Migrations**: Drizzle-kit for database migrations

## Key Components

### Data Models
The application manages three primary data entities:

1. **Preferred Stocks** (`preferredStocks` table)
   - Ticker symbols, names, pricing data
   - Dividend yields, market cap, trading volume
   - Sector classification and descriptions
   - Real-time price changes and percentages

2. **News Articles** (`newsArticles` table)
   - Title, excerpt, and full content
   - Source attribution and publication dates
   - Related ticker associations
   - Category-based organization

3. **Market Data** (`marketData` table)
   - Major market indices (S&P 500, Dow, NASDAQ)
   - Treasury rates and VIX data
   - Preferred stock average yields
   - Historical change tracking

### API Endpoints
- **GET /api/stocks** - Retrieve all stocks with optional search
- **GET /api/stocks/featured** - Get highlighted preferred stocks
- **GET /api/stocks/top-performers** - Get best performing stocks
- **GET /api/stocks/:ticker** - Get specific stock details
- **GET /api/news** - Retrieve news articles with filtering
- **GET /api/market-data** - Get current market overview data

### Frontend Pages
- **Home Page** - Market overview, featured stocks, latest news
- **Stocks Page** - Searchable stock listing with filters and sorting
- **Stock Detail Page** - Individual stock analysis and related news
- **News Page** - Filterable news articles with categorization
- **404 Page** - Error handling for invalid routes

## Data Flow

1. **Client Requests**: Frontend makes API calls using React Query
2. **Server Processing**: Express routes handle requests and validate data
3. **Database Operations**: Drizzle ORM executes type-safe database queries
4. **Response Formation**: JSON responses sent back to client
5. **State Updates**: React Query manages caching and UI updates
6. **Real-time Updates**: Periodic refetching for market data freshness

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Via `@neondatabase/serverless` driver
- **Environment**: Requires `DATABASE_URL` environment variable

### Development Tools
- **Replit Integration**: Cartographer plugin for development environment
- **Error Handling**: Runtime error overlay for development
- **Build Process**: Vite for frontend, esbuild for backend production

### UI Components
- **Radix UI**: Accessible primitive components
- **Tailwind CSS**: Utility-first styling framework
- **Lucide Icons**: Consistent icon library
- **Date Handling**: date-fns for date formatting

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with Express middleware
- **Type Checking**: TypeScript compilation with strict mode
- **Database**: Direct connection to Neon Database
- **Asset Serving**: Vite handles static assets and HMR

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: Same Neon Database connection for production

### Key Configuration
- **TypeScript**: Shared types between frontend and backend
- **Path Aliases**: Simplified imports with `@` and `@shared` prefixes
- **Environment Variables**: Database URL required for deployment
- **Build Commands**: `npm run build` creates production-ready application

The application emphasizes type safety, real-time data presentation, and responsive design, making it suitable for both desktop and mobile users interested in preferred stock investments.