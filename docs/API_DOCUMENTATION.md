# API Documentation

## Overview

Sentinel Shield provides a comprehensive REST API built with Next.js App Router, featuring JWT-based authentication, middleware protection, and PostgreSQL database integration via Neon serverless.

## Base URL

```
Local Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

### JWT Token System

The API uses JSON Web Tokens (JWT) for authentication with the following characteristics:

- **Algorithm**: HMAC SHA-256
- **Storage**: HTTP-only cookies (`auth-token`)
- **Expiration**: Configurable (default: 24 hours)
- **Secret**: Environment variable `JWT_SECRET`

### Token Structure

```json
{
  "userId": 123,
  "email": "user@example.com",
  "name": "John Doe",
  "exp": 1234567890
}
```

## Middleware Configuration

### Route Protection

The middleware (`src/middleware.ts`) handles:

- **Protected Routes**: `/dashboard`, `/passwords`, `/notes`, `/shopping`
- **Public Routes**: `/login`, `/register`
- **Excluded Paths**: `/api/*`, `/_next/static/*`, `/_next/image/*`, `/favicon.ico`

### Authentication Flow

1. Extract JWT token from `auth-token` cookie
2. Verify token signature using Web Crypto API
3. Check token expiration
4. Redirect unauthenticated users to login
5. Redirect authenticated users away from public routes

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login

Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### POST /api/auth/register

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/logout

Logout user and clear authentication cookie.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Password Management

#### GET /api/passwords

Retrieve all passwords for authenticated user.

**Headers:**
```
Cookie: auth-token=<jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "passwords": [
    {
      "id": 1,
      "title": "Gmail Account",
      "website": "https://gmail.com",
      "username": "user@gmail.com",
      "password": "encrypted_password",
      "category": "email",
      "notes": "Personal email account",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/passwords

Create a new password entry.

**Request Body:**
```json
{
  "title": "Gmail Account",
  "website": "https://gmail.com",
  "username": "user@gmail.com",
  "password": "secure_password",
  "category": "email",
  "notes": "Personal email account"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Password created successfully",
  "password": {
    "id": 1,
    "title": "Gmail Account",
    "website": "https://gmail.com",
    "username": "user@gmail.com",
    "category": "email",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT /api/passwords

Update an existing password entry.

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated Gmail Account",
  "website": "https://gmail.com",
  "username": "newemail@gmail.com",
  "password": "new_secure_password",
  "category": "email",
  "notes": "Updated personal email"
}
```

#### DELETE /api/passwords

Delete a password entry.

**Request Body:**
```json
{
  "id": 1
}
```

### Notes Management

#### GET /api/notes

Retrieve all notes for authenticated user.

**Response (200):**
```json
{
  "success": true,
  "notes": [
    {
      "id": 1,
      "title": "Meeting Notes",
      "content": "Important discussion points...",
      "category": "work",
      "is_favorite": false,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/notes

Create a new note.

**Request Body:**
```json
{
  "title": "Meeting Notes",
  "content": "Important discussion points...",
  "category": "work",
  "is_favorite": false
}
```

#### PUT /api/notes

Update an existing note.

#### DELETE /api/notes

Delete a note.

### Shopping Lists Management

#### GET /api/shopping-lists

Retrieve all shopping lists for authenticated user.

**Response (200):**
```json
{
  "success": true,
  "lists": [
    {
      "id": 1,
      "name": "Weekly Groceries",
      "description": "Regular grocery shopping",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/shopping-lists

Create a new shopping list.

**Request Body:**
```json
{
  "name": "Weekly Groceries",
  "description": "Regular grocery shopping"
}
```

#### PUT /api/shopping-lists

Update an existing shopping list.

### Shopping Items Management

#### GET /api/shopping-items

Retrieve items for a specific shopping list.

**Query Parameters:**
- `listId`: Shopping list ID

**Response (200):**
```json
{
  "success": true,
  "items": [
    {
      "id": 1,
      "name": "Milk",
      "quantity": 2,
      "price": 3.99,
      "category": "dairy",
      "is_completed": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/shopping-items

Add item to shopping list.

**Request Body:**
```json
{
  "listId": 1,
  "name": "Milk",
  "quantity": 2,
  "price": 3.99,
  "category": "dairy"
}
```

## Database Schema

### Users Table
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

### Passwords Table
```sql
CREATE TABLE passwords (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  category VARCHAR(50) DEFAULT 'other',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  category VARCHAR(50) DEFAULT 'general',
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Shopping Lists Table
```sql
CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Shopping Items Table
```sql
CREATE TABLE shopping_items (
  id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES shopping_lists(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10,2),
  category VARCHAR(50),
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Implementation

### Password Security
- **Hashing**: bcrypt with salt rounds (default: 12)
- **Validation**: Minimum 8 characters, complexity requirements
- **Storage**: Never store plain text passwords

### JWT Security
- **Secret Management**: Environment variable with strong entropy
- **Token Expiration**: Configurable expiration times
- **Signature Verification**: HMAC SHA-256 using Web Crypto API
- **Cookie Security**: HTTP-only, secure flags in production

### Database Security
- **Connection**: SSL-enabled Neon PostgreSQL
- **Queries**: Parameterized queries to prevent SQL injection
- **User Isolation**: Row-level security with user_id filtering
- **Cascade Deletion**: Automatic cleanup of related records

## Error Handling

### Standard Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": ["Email is required", "Password must be at least 8 characters"]
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Access denied"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute per IP
- **API endpoints**: 100 requests per minute per user
- **Implementation**: Next.js middleware with in-memory store

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Testing

### API Testing
- **Framework**: Jest with Supertest
- **Coverage**: Unit tests for all endpoints
- **Integration**: Database integration tests
- **Authentication**: Token-based test scenarios

### Example Test
```javascript
describe('/api/auth/login', () => {
  it('should authenticate valid user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.headers['set-cookie']).toBeDefined();
  });
});
```

## Deployment Considerations

### Production Security
- Enable HTTPS for all endpoints
- Set secure cookie flags
- Configure CORS policies
- Implement rate limiting
- Use strong JWT secrets
- Enable database SSL

### Performance Optimization
- Database connection pooling
- Query optimization with indexes
- Response caching for static data
- Compression middleware
- CDN for static assets

### Monitoring
- API response times
- Error rates and types
- Authentication failures
- Database performance
- Resource utilization

## API Versioning

Currently using implicit v1. Future versions will use URL versioning:
- `/api/v1/auth/login`
- `/api/v2/auth/login`

## Support

For API support and questions:
- Documentation: `/docs`
- Issues: GitHub repository
- Contact: development team