# Technical Architecture Documentation 🏗️

## Overview

Sentinel Shield is built using modern web technologies with a focus on security, performance, and scalability. The application follows a full-stack architecture with Next.js as the primary framework, PostgreSQL for data persistence, and a comprehensive security layer.

## Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile Browser]
    end
    
    subgraph "Frontend Layer"
        C[Next.js App Router]
        D[React Components]
        E[Tailwind CSS]
        F[Radix UI]
    end
    
    subgraph "Middleware Layer"
        G[Authentication Middleware]
        H[Route Protection]
        I[Request Validation]
    end
    
    subgraph "API Layer"
        J[Next.js API Routes]
        K[Authentication APIs]
        L[Data APIs]
        M[File Upload APIs]
    end
    
    subgraph "Business Logic Layer"
        N[Password Management]
        O[Notes Management]
        P[Shopping Lists]
        Q[User Management]
    end
    
    subgraph "Data Layer"
        R[PostgreSQL Database]
        S[Neon Database]
        T[Connection Pooling]
    end
    
    subgraph "Security Layer"
        U[JWT Authentication]
        V[Password Encryption]
        W[Input Sanitization]
        X[HTTPS/TLS]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
    D --> F
    C --> G
    G --> H
    H --> I
    I --> J
    J --> K
    J --> L
    J --> M
    K --> N
    L --> O
    L --> P
    M --> Q
    N --> R
    O --> R
    P --> R
    Q --> R
    R --> S
    S --> T
    U --> G
    V --> N
    W --> I
    X --> A
```

## Technology Stack

### Frontend Technologies

#### Core Framework
- **Next.js 15.3.3**: React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - Middleware support
  - Image optimization

#### UI Framework
- **React 18.3.1**: Component-based UI library
  - Functional components with hooks
  - Context API for state management
  - Concurrent features
  - Suspense boundaries

#### Styling & Design System
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
  - Custom design tokens
  - Dark mode support
  - Responsive design utilities
  - Custom animations

- **Radix UI**: Headless UI components
  - Accessibility-first design
  - Keyboard navigation
  - Screen reader support
  - Customizable styling

#### UI Components
- **Shadcn/ui**: Pre-built component library
  - Consistent design patterns
  - TypeScript support
  - Customizable themes
  - Accessibility compliance

#### Data Visualization
- **Recharts 2.13.3**: React charting library
  - Interactive charts
  - Responsive design
  - Custom styling
  - Animation support

#### Icons & Assets
- **Lucide React 0.468.0**: Icon library
  - Consistent icon set
  - Tree-shakable imports
  - Customizable styling

### Backend Technologies

#### Database
- **PostgreSQL**: Primary database
  - ACID compliance
  - Advanced indexing
  - JSON support
  - Full-text search

- **Neon Database**: Serverless PostgreSQL
  - Automatic scaling
  - Branching capabilities
  - Connection pooling
  - Global distribution

#### Authentication & Security
- **JWT (JSON Web Tokens)**: Authentication mechanism
  - Stateless authentication
  - Secure token signing
  - Expiration handling

- **bcrypt**: Password hashing
  - Salt-based hashing
  - Configurable rounds
  - Timing attack protection

#### Validation & Type Safety
- **Zod 3.24.1**: Schema validation
  - Runtime type checking
  - Form validation
  - API input validation
  - TypeScript integration

### Development Tools

#### Language & Runtime
- **TypeScript 5**: Strongly typed JavaScript
  - Static type checking
  - Enhanced IDE support
  - Better refactoring
  - Compile-time error detection

- **Node.js**: JavaScript runtime
  - V8 engine performance
  - NPM ecosystem
  - Async/await support

#### Build Tools
- **Next.js Compiler**: Built-in build system
  - SWC-based compilation
  - Tree shaking
  - Code splitting
  - Bundle optimization

#### Code Quality
- **ESLint**: Code linting
  - Code style enforcement
  - Error detection
  - Best practices

- **Prettier**: Code formatting
  - Consistent formatting
  - Automatic formatting
  - IDE integration

## Project Structure

```
sentinel-shield/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── notes/         # Notes CRUD operations
│   │   │   ├── passwords/     # Password management
│   │   │   ├── shopping-items/ # Shopping items API
│   │   │   └── shopping-lists/ # Shopping lists API
│   │   ├── dashboard/         # Protected dashboard
│   │   │   ├── notes/         # Notes management
│   │   │   ├── passwords/     # Password vault
│   │   │   ├── profile/       # User profile
│   │   │   └── shopping-lists/ # Shopping lists
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── main-sidebar.tsx  # Navigation sidebar
│   │   ├── theme-provider.tsx # Theme management
│   │   └── theme-toggle.tsx  # Theme switcher
│   ├── hooks/                # Custom React hooks
│   │   └── use-toast.ts      # Toast notifications
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── db.ts             # Database configuration
│   │   └── utils.ts          # General utilities
│   └── middleware.ts         # Next.js middleware
├── docs/                     # Documentation
│   ├── AUTHENTICATION.md     # Auth system docs
│   ├── DASHBOARD.md          # Dashboard features
│   └── TECHNICAL_ARCHITECTURE.md # This file
├── components.json           # Shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Configuration Files

### Next.js Configuration (`next.config.ts`)

```typescript
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // For development flexibility
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip linting during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration (`tailwind.config.ts`)

```typescript
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        // Custom color system with CSS variables
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... extensive color palette
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

### Shadcn/ui Configuration (`components.json`)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Database Architecture

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Passwords Table
```sql
CREATE TABLE passwords (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  username VARCHAR(255) NOT NULL,
  password_encrypted TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'Other',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Notes Table
```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'Personal',
  is_pinned BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Shopping Lists Tables
```sql
CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shopping_items (
  id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES shopping_lists(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  quantity VARCHAR(100),
  notes TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Indexes

```sql
-- Performance indexes
CREATE INDEX idx_passwords_user_id ON passwords(user_id);
CREATE INDEX idx_passwords_category ON passwords(category);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_category ON notes(category);
CREATE INDEX idx_notes_pinned ON notes(is_pinned);
CREATE INDEX idx_shopping_lists_user_id ON shopping_lists(user_id);
CREATE INDEX idx_shopping_items_list_id ON shopping_items(list_id);
CREATE INDEX idx_shopping_items_completed ON shopping_items(is_completed);

-- Full-text search indexes
CREATE INDEX idx_notes_content_search ON notes USING gin(to_tsvector('english', content));
CREATE INDEX idx_passwords_title_search ON passwords USING gin(to_tsvector('english', title));
```

## API Architecture

### API Route Structure

```
/api/
├── auth/
│   ├── login/route.ts         # POST: User authentication
│   ├── register/route.ts      # POST: User registration
│   └── logout/route.ts        # POST: User logout
├── passwords/
│   └── route.ts               # GET, POST, PUT, DELETE
├── notes/
│   └── route.ts               # GET, POST, PUT, DELETE
├── shopping-lists/
│   └── route.ts               # GET, POST, DELETE
└── shopping-items/
    └── route.ts               # GET, POST, PUT, DELETE
```

### API Response Format

```typescript
// Success Response
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error Response
interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}

// Paginated Response
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Middleware Architecture

#### Authentication Middleware (`src/middleware.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

const protectedRoutes = ['/dashboard', '/passwords', '/notes', '/shopping'];
const publicRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser(request);
  
  // Protect authenticated routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Redirect authenticated users from public routes
  if (publicRoutes.includes(pathname)) {
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## Security Architecture

### Authentication Flow

1. **User Registration**
   - Input validation with Zod
   - Password hashing with bcrypt
   - User creation in database
   - JWT token generation
   - Secure cookie setting

2. **User Login**
   - Credential validation
   - Password verification
   - JWT token generation
   - Session establishment

3. **Route Protection**
   - Middleware token verification
   - User session validation
   - Automatic redirects

### Data Encryption

```typescript
// Password encryption example
import bcrypt from 'bcrypt';

const saltRounds = 12;

// Hash password during registration
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

// Verify password during login
const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
```

### Input Validation

```typescript
import { z } from 'zod';

// User registration schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
});

// Password creation schema
const passwordSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  category: z.enum(['Personal', 'Work', 'Banking', 'Social', 'Other']),
  website: z.string().url().optional(),
  notes: z.string().optional(),
});
```

## Performance Optimization

### Frontend Optimization

#### Code Splitting
```typescript
// Dynamic imports for route-based splitting
const DashboardPage = dynamic(() => import('./dashboard/page'), {
  loading: () => <LoadingSpinner />,
});

// Component-level splitting
const HeavyChart = dynamic(() => import('./components/HeavyChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
```

#### Image Optimization
```typescript
import Image from 'next/image';

// Optimized image loading
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

#### Caching Strategy
```typescript
// API route caching
export async function GET() {
  const data = await fetchData();
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

### Backend Optimization

#### Database Connection Pooling
```typescript
import { neon } from '@neondatabase/serverless';

// Connection pooling configuration
const sql = neon(process.env.DATABASE_URL!, {
  poolQueryViaFetch: true,
  fetchConnectionCache: true,
});
```

#### Query Optimization
```sql
-- Efficient queries with proper indexing
SELECT p.id, p.title, p.username, p.category, p.created_at
FROM passwords p
WHERE p.user_id = $1
  AND p.category = $2
ORDER BY p.created_at DESC
LIMIT 20 OFFSET $3;
```

## Deployment Architecture

### Firebase App Hosting Configuration

```yaml
# apphosting.yaml
runConfig:
  maxInstances: 1  # Scalable instance management
```

### Environment Variables

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Authentication
JWT_SECRET="your-super-secure-jwt-secret-key"

# Application
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Build Configuration

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

### Production Optimizations

1. **Bundle Analysis**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

2. **Compression**
   - Gzip compression enabled
   - Brotli compression for modern browsers
   - Image optimization with WebP/AVIF

3. **CDN Integration**
   - Static asset delivery
   - Global edge caching
   - Automatic image optimization

## Monitoring & Analytics

### Error Tracking

```typescript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

### Performance Monitoring

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Testing Architecture

### Testing Stack

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **MSW**: API mocking

### Test Structure

```
tests/
├── __mocks__/           # Mock implementations
├── components/          # Component tests
├── pages/              # Page tests
├── api/                # API route tests
├── e2e/                # End-to-end tests
└── utils/              # Test utilities
```

### Example Test Configuration

```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
```

## Scalability Considerations

### Horizontal Scaling

1. **Stateless Architecture**
   - JWT-based authentication
   - No server-side sessions
   - Database-backed state

2. **Database Scaling**
   - Read replicas for queries
   - Connection pooling
   - Query optimization

3. **CDN Integration**
   - Static asset distribution
   - Global edge caching
   - Reduced server load

### Vertical Scaling

1. **Resource Optimization**
   - Memory usage monitoring
   - CPU utilization tracking
   - Database query optimization

2. **Caching Strategies**
   - Redis for session storage
   - Application-level caching
   - Database query caching

## Security Best Practices

### Application Security

1. **Input Validation**
   - Zod schema validation
   - SQL injection prevention
   - XSS protection

2. **Authentication Security**
   - Strong password requirements
   - JWT token expiration
   - Secure cookie configuration

3. **Data Protection**
   - Encryption at rest
   - Encryption in transit
   - Secure key management

### Infrastructure Security

1. **HTTPS Enforcement**
   - TLS 1.3 support
   - HSTS headers
   - Secure cookie flags

2. **Security Headers**
   ```typescript
   const securityHeaders = {
     'X-Content-Type-Options': 'nosniff',
     'X-Frame-Options': 'DENY',
     'X-XSS-Protection': '1; mode=block',
     'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
     'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'",
   };
   ```

## Future Architecture Considerations

### Microservices Migration

1. **Service Decomposition**
   - Authentication service
   - Password management service
   - Notes service
   - Shopping lists service

2. **API Gateway**
   - Request routing
   - Rate limiting
   - Authentication
   - Monitoring

### Real-time Features

1. **WebSocket Integration**
   - Real-time collaboration
   - Live updates
   - Push notifications

2. **Event-Driven Architecture**
   - Message queues
   - Event sourcing
   - CQRS pattern

### Mobile Applications

1. **React Native**
   - Code sharing with web
   - Native performance
   - Platform-specific features

2. **API Optimization**
   - GraphQL implementation
   - Offline support
   - Sync mechanisms

---

**Note**: This technical architecture documentation reflects the current implementation and provides guidance for future development and scaling decisions.