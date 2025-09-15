# Authentication System Documentation 🔐

## Overview

Sentinel Shield implements a robust JWT-based authentication system with secure password hashing, route protection, and session management. The system is built with security best practices and provides a seamless user experience.

## Architecture

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant Frontend
    participant API
    participant Database
    participant Middleware

    Client->>Frontend: Access protected route
    Frontend->>Middleware: Request with cookies
    Middleware->>API: Verify JWT token
    API->>Database: Validate user session
    Database-->>API: User data
    API-->>Middleware: User object
    Middleware-->>Frontend: Allow/Redirect
    Frontend-->>Client: Render page/Login form
```

## Core Components

### 1. Authentication Library (`src/lib/auth.ts`)

#### JWT Token Management

```typescript
// JWT Secret Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// User Interface
export interface User {
  userId: number;
  email: string;
  name: string;
}
```

#### Key Functions

**`verifyToken(token: string): Promise<User | null>`**
- Verifies JWT token signature using Web Crypto API
- Checks token expiration
- Returns user data or null if invalid

**`getCurrentUser(request: NextRequest): Promise<User | null>`**
- Extracts JWT token from HTTP-only cookies
- Verifies token and returns user data
- Used by middleware for route protection

**`requireAuth(request: NextRequest): Promise<User>`**
- Throws error if user is not authenticated
- Used in API routes that require authentication

### 2. Middleware Protection (`src/middleware.ts`)

#### Route Configuration

```typescript
// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/passwords', '/notes', '/shopping'];

// Public routes that should redirect to dashboard if authenticated
const publicRoutes = ['/login', '/register'];
```

#### Protection Logic

1. **Protected Route Access**: Redirects to login if not authenticated
2. **Public Route Access**: Redirects to dashboard if already authenticated
3. **Landing Page**: Accessible to everyone
4. **API Routes**: Excluded from middleware (handled individually)

### 3. Database Schema

#### Users Table Structure

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

#### Password Security
- **Hashing Algorithm**: bcrypt with salt rounds
- **Storage**: Only password hashes stored, never plain text
- **Validation**: Secure comparison using bcrypt.compare()

## API Endpoints

### Registration Endpoint

**POST** `/api/auth/register`

```typescript
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

// Response (Success)
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}

// Response (Error)
{
  "success": false,
  "message": "Email already exists"
}
```

**Security Features:**
- Email uniqueness validation
- Password strength requirements
- Input sanitization
- bcrypt password hashing

### Login Endpoint

**POST** `/api/auth/login`

```typescript
// Request Body
{
  "email": "john@example.com",
  "password": "securePassword123"
}

// Response (Success)
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}

// Response (Error)
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Security Features:**
- Secure password comparison
- JWT token generation
- HTTP-only cookie setting
- Rate limiting (recommended)

### Logout Endpoint

**POST** `/api/auth/logout`

```typescript
// Response
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Security Features:**
- Clears authentication cookies
- Invalidates client-side session

## Security Implementation

### JWT Token Security

#### Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "iat": 1640995200,
    "exp": 1641081600
  }
}
```

#### Security Features
- **HMAC SHA-256 Signature**: Prevents token tampering
- **Expiration Time**: Tokens expire after 24 hours
- **Secure Storage**: HTTP-only cookies prevent XSS attacks
- **Domain Restriction**: Cookies limited to application domain

### Password Security

#### Hashing Process
```typescript
// Registration
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Login Verification
const isValid = await bcrypt.compare(password, hashedPassword);
```

#### Security Features
- **Salt Rounds**: 12 rounds for optimal security/performance balance
- **Unique Salts**: Each password gets a unique salt
- **Timing Attack Protection**: Constant-time comparison

### Cookie Security

```typescript
// Cookie Configuration
const cookieOptions = {
  httpOnly: true,        // Prevents XSS attacks
  secure: true,          // HTTPS only in production
  sameSite: 'strict',    // CSRF protection
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: '/'              // Available site-wide
};
```

## Frontend Integration

### Login Form Implementation

```typescript
// Login Form Handler
const handleSubmit = async (data: LoginFormData) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      // Show error message
      setError(result.message);
    }
  } catch (error) {
    setError('Login failed. Please try again.');
  }
};
```

### Registration Form Implementation

```typescript
// Registration Form Handler
const handleSubmit = async (data: RegisterFormData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      // Show error message
      setError(result.message);
    }
  } catch (error) {
    setError('Registration failed. Please try again.');
  }
};
```

## Error Handling

### Common Error Scenarios

1. **Invalid Credentials**
   - Status: 401 Unauthorized
   - Message: "Invalid email or password"

2. **Email Already Exists**
   - Status: 409 Conflict
   - Message: "Email already registered"

3. **Token Expired**
   - Status: 401 Unauthorized
   - Action: Redirect to login

4. **Invalid Token**
   - Status: 401 Unauthorized
   - Action: Clear cookies and redirect

5. **Missing Required Fields**
   - Status: 400 Bad Request
   - Message: Field-specific validation errors

### Error Response Format

```typescript
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": "Field-specific error message"
  }
}
```

## Testing Authentication

### Manual Testing Checklist

- [ ] **Registration Flow**
  - [ ] Valid registration creates user
  - [ ] Duplicate email shows error
  - [ ] Weak password shows validation error
  - [ ] Successful registration redirects to dashboard

- [ ] **Login Flow**
  - [ ] Valid credentials log in successfully
  - [ ] Invalid credentials show error
  - [ ] Successful login redirects to dashboard
  - [ ] Login sets authentication cookie

- [ ] **Route Protection**
  - [ ] Protected routes redirect to login when not authenticated
  - [ ] Public routes redirect to dashboard when authenticated
  - [ ] Middleware correctly identifies authenticated users

- [ ] **Logout Flow**
  - [ ] Logout clears authentication cookies
  - [ ] Logout redirects to landing page
  - [ ] Protected routes inaccessible after logout

### Automated Testing

```typescript
// Example test for login endpoint
describe('POST /api/auth/login', () => {
  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'validPassword123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.headers['set-cookie']).toBeDefined();
  });
  
  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongPassword'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
```

## Security Best Practices

### Environment Variables

```env
# Strong JWT secret (minimum 32 characters)
JWT_SECRET="your-super-secure-jwt-secret-key-minimum-32-chars"

# Database connection with SSL
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"

# Production settings
NODE_ENV="production"
NEXTAUTH_URL="https://yourdomain.com"
```

### Production Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **Strong Secrets**: Use cryptographically secure random secrets
3. **Rate Limiting**: Implement rate limiting on auth endpoints
4. **Account Lockout**: Consider implementing account lockout after failed attempts
5. **Password Policies**: Enforce strong password requirements
6. **Session Management**: Consider implementing session invalidation
7. **Audit Logging**: Log authentication events for security monitoring

### Security Headers

```typescript
// Recommended security headers
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'"
};
```

## Troubleshooting

### Common Issues

1. **"JWT Secret not defined" Error**
   - Ensure `JWT_SECRET` is set in environment variables
   - Use a strong, unique secret for production

2. **Cookie Not Set**
   - Check HTTPS configuration in production
   - Verify cookie domain settings
   - Ensure `sameSite` policy compatibility

3. **Middleware Redirect Loop**
   - Check route configuration in middleware
   - Verify token verification logic
   - Ensure proper error handling

4. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check database server connectivity
   - Ensure SSL configuration if required

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=auth:*
```

This will log authentication-related events for troubleshooting.

---

**Security Note**: Always keep authentication libraries and dependencies up to date, regularly review security practices, and consider professional security audits for production applications.