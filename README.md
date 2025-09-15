# Sentinel Shield 🛡️

> **Enterprise Security Platform** - A comprehensive cybersecurity dashboard for monitoring and managing your digital infrastructure in real-time.

![Sentinel Shield](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🌟 Overview

Sentinel Shield is a modern, full-stack cybersecurity dashboard built with Next.js 15 and TypeScript. It provides organizations with a unified platform to monitor network traffic, manage user access, track security incidents, and generate detailed compliance reports.

### ✨ Key Features

- **🔐 Secure Authentication System** - JWT-based authentication with bcrypt password hashing
- **📊 Real-time Dashboard** - Live monitoring with interactive charts and metrics
- **🔑 Password Vault** - Encrypted password management with categorization
- **📝 Secure Notes** - Encrypted note-taking with favorites and categories
- **🛒 Shopping Lists** - Personal productivity features with item management
- **👤 User Profile Management** - Complete user account management
- **🌙 Dark/Light Theme** - Modern UI with theme switching
- **📱 Responsive Design** - Mobile-first responsive interface
- **🔒 Route Protection** - Middleware-based authentication guards
- **🎨 Modern UI Components** - Built with Radix UI and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **PostgreSQL** database (Neon DB recommended)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sentinel-shield.git
   cd sentinel-shield
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@host:port/database"
   
   # JWT Secret (Generate a secure random string)
   JWT_SECRET="your-super-secure-jwt-secret-key-here"
   
   # Next.js Configuration
   NEXTAUTH_URL="http://localhost:9002"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Database Setup**
   
   The application will automatically create the required tables on first run:
   ```bash
   npm run dev
   ```
   
   Or manually initialize the database:
   ```bash
   npm run db:init
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:9002](http://localhost:9002) in your browser.

## 📁 Project Structure

```
sentinel-shield/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── notes/         # Notes CRUD operations
│   │   │   ├── passwords/     # Password vault operations
│   │   │   ├── shopping-items/ # Shopping items management
│   │   │   ├── shopping-lists/ # Shopping lists management
│   │   │   └── users/         # User management
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   ├── notes/         # Notes management page
│   │   │   ├── passwords/     # Password vault page
│   │   │   ├── profile/       # User profile page
│   │   │   ├── settings/      # Application settings
│   │   │   └── shopping-lists/ # Shopping lists page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── favicon.ico        # Application favicon
│   │   ├── globals.css        # Global styles
│   │   ├── icon.svg          # App icon (SVG)
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── main-sidebar.tsx  # Dashboard sidebar
│   │   ├── theme-provider.tsx # Theme context provider
│   │   └── theme-toggle.tsx  # Dark/light mode toggle
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts          # Authentication utilities
│   │   ├── db.ts            # Database configuration
│   │   └── utils.ts         # General utilities
│   └── middleware.ts         # Route protection middleware
├── public/                   # Static assets
├── .env.local               # Environment variables
├── components.json          # Shadcn/ui configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔧 Technology Stack

### Frontend
- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[React 18.3.1](https://reactjs.org/)** - UI library
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Recharts](https://recharts.org/)** - Chart library for data visualization

### Backend & Database
- **[Neon Database](https://neon.tech/)** - Serverless PostgreSQL
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - JWT authentication
- **[Zod](https://zod.dev/)** - Schema validation

### Development Tools
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[date-fns](https://date-fns.org/)** - Date manipulation
- **[clsx](https://www.npmjs.com/package/clsx)** - Conditional class names
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component

## 🏗️ Architecture

### Authentication Flow
1. **Registration/Login** → User credentials validated
2. **JWT Token Generation** → Secure token created with user data
3. **Middleware Protection** → Routes protected by authentication middleware
4. **Session Management** → Token stored in HTTP-only cookies

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
  username VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  category VARCHAR(50) DEFAULT 'other',
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
  content TEXT,
  category VARCHAR(50) DEFAULT 'general',
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Shopping Lists & Items Tables
```sql
CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

## 🔐 Security Features

### Authentication & Authorization
- **JWT-based Authentication** - Stateless token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Route Protection** - Middleware-based access control
- **CSRF Protection** - Built-in Next.js CSRF protection
- **Secure Headers** - Security headers configured

### Data Protection
- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Parameterized queries
- **XSS Protection** - React's built-in XSS protection
- **Secure Cookies** - HTTP-only, secure cookie settings

## 📱 Features Deep Dive

### 🔑 Password Vault
- **Secure Storage** - Encrypted password storage
- **Categories** - Organize passwords by type
- **Search & Filter** - Quick password retrieval
- **Auto-generation** - Strong password generation
- **Import/Export** - Backup and restore capabilities

### 📝 Notes Management
- **Rich Text Editor** - Markdown support
- **Categories** - Organize notes by topic
- **Favorites** - Mark important notes
- **Search** - Full-text search capabilities
- **Sharing** - Secure note sharing options

### 🛒 Shopping Lists
- **Multiple Lists** - Create unlimited shopping lists
- **Item Management** - Add, edit, delete items
- **Price Tracking** - Track item prices
- **Categories** - Organize items by category
- **Completion Status** - Mark items as completed

### 📊 Dashboard Analytics
- **Security Metrics** - Real-time security statistics
- **Activity Monitoring** - User activity tracking
- **Threat Detection** - Automated threat identification
- **Compliance Reports** - Generate compliance reports
- **Data Visualization** - Interactive charts and graphs

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect Repository** to Vercel
2. **Configure Environment Variables**
3. **Deploy** - Automatic deployments on push

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-nextauth-secret"
NODE_ENV="production"
```

## 🧪 Testing

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 📝 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### POST `/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### POST `/api/auth/logout`
Clears authentication cookies.

### Protected Endpoints

#### GET `/api/passwords`
Retrieve user's passwords.

#### POST `/api/passwords`
```json
{
  "title": "Gmail Account",
  "website": "https://gmail.com",
  "username": "john@example.com",
  "password": "encryptedPassword",
  "category": "email",
  "notes": "Personal email account"
}
```

#### GET `/api/notes`
Retrieve user's notes.

#### POST `/api/notes`
```json
{
  "title": "Meeting Notes",
  "content": "Important meeting discussion points...",
  "category": "work",
  "is_favorite": false
}
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](https://github.com/your-username/sentinel-shield/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/sentinel-shield/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/sentinel-shield/discussions)

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Neon](https://neon.tech/) for serverless PostgreSQL

---

**Built with ❤️ by the Sentinel Shield Team**

*Protecting your digital assets, one shield at a time.* 🛡️
