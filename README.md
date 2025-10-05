# Portfolio CMS Frontend

A modern, high-performance portfolio website with an integrated Content Management System built with Next.js. Features smooth animations, SEO optimization, and a complete admin dashboard for managing portfolio content including projects, blogs, work experience, education, and personal information.

## 🔗 Important Links

### Demo credential
#### email: ash@ash.com
#### password: ash@ash.com

### Live Website
🌍 **Production URL**: [[Live Website URL](https://cms-portfolio-livid.vercel.app/)]

### Documentation
📚 **Frontend Documentation**: [[Frontend Docs URL](https://github.com/muhamash/cms-portfolio/blob/main/README.md)]  
📚 **Backend Documentation**: [[Backend API Docs URL](https://github.com/muhamash/cms-portfolio-backend/blob/main/Readme.md)]  
📚 **API Reference**: [[API Documentation URL](https://cms-portfolio-backend.vercel.app/)]

### Repositories
🔗 **Frontend Repository**: [[GitHub Frontend Repo URL](https://github.com/muhamash/cms-portfolio)]  
🔗 **Backend Repository**: [[GitHub Backend Repo URL](https://github.com/muhamash/cms-portfolio-backend)]


##  Features

### Content Management Dashboard
- **Personal Information Management**: Update profile details, bio, contact information, and profile images
- **Project Portfolio**: Create, read, update, and delete project showcases with multiple image uploads
- **Blog Management**: Full-featured blog system with rich content editor and image galleries
- **Work Experience**: Manage professional work history with detailed descriptions and timelines
- **Education History**: Add and update educational qualifications and achievements
- **Skills & Expertise**: Organize and display technical and soft skills with proficiency levels
- **Social Media Links**: Manage social media profiles and professional network links
- **Contact Information**: Update contact details and communication preferences

### Authentication & Authorization
- **NextAuth Integration**: Secure authentication system with JWT tokens
- **Protected Routes**: Role-based access control for admin dashboard
- **Session Management**: Persistent user sessions with automatic token refresh
- **Secure Login/Logout**: Encrypted credential handling and secure session termination

### Performance & Optimization
- **Static Site Generation (SSG)**: Pre-rendered pages for lightning-fast load times
- **Incremental Static Regeneration (ISR)**: Automatic page updates without full rebuilds
- **Server Actions**: Efficient form submissions and data mutations
- **Optimized Images**: Automatic image optimization with Next.js Image component
- **Code Splitting**: Dynamic imports for optimal bundle sizes

### User Experience
- **GSAP Animations**: Smooth, professional animations throughout the interface
- **Lenis Smooth Scroll**: Buttery-smooth scrolling experience across all pages
- **Responsive Design**: Fully responsive layout for all device sizes
- **Dark Mode Support**: Modern dark theme for comfortable viewing
- **Loading States**: Elegant loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and fallback UI

### SEO & Accessibility
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Dynamic Metadata**: Auto-generated meta tags for projects and blogs
- **Semantic HTML**: Proper HTML structure for better accessibility
- **Sitemap Generation**: Automatic sitemap for search engine crawling
- **Structured Data**: JSON-LD schema markup for rich search results
- **Fast Core Web Vitals**: Optimized for Google's performance metrics

### Data Management
- **Prisma ORM**: Type-safe database queries with PostgreSQL
- **Zod Validation**: Schema validation for forms and API requests
- **Server-Side Validation**: Double-layer validation for data integrity
- **Optimistic Updates**: Instant UI updates with background synchronization
- **Data Fetching**: Efficient server-side data fetching with caching

### Image Management
- **Multi-Image Upload**: Support for uploading multiple images per content item
- **Cloudinary Integration**: Cloud-based image storage with automatic optimization
- **Image Preview**: Real-time image preview before upload
- **Drag & Drop**: Intuitive drag-and-drop file upload interface
- **Image Compression**: Automatic compression for optimal web performance

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14+**: React framework with App Router
- **React 18+**: Latest React features with Server Components
- **TypeScript**: Type-safe development experience

### Styling & Animation
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Professional animation library
- **Lenis**: Smooth scroll implementation
- **Framer Motion**: Additional animation capabilities (optional)

### Authentication & Security
- **NextAuth.js**: Authentication solution for Next.js
- **JWT**: JSON Web Token for secure authentication
- **Bcrypt**: Password hashing for secure storage

### Data Management
- **Prisma**: Modern ORM for PostgreSQL
- **PostgreSQL**: Robust relational database
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Performant form management

### Development Tools
- **ESLint**: Code linting and quality checks
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

##  Prerequisites

Before setting up the project, ensure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- PostgreSQL database access
- Cloudinary account for image storage
- Backend API running (Portfolio CMS Backend)

##  Installation Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-cms-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Backend API
NEXT_PUBLIC_API_URL="http://localhost:5000"
API_URL="http://localhost:5000"

# Authentication Tokens
ACCESS_TOKEN_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Default Seed User Credentials (for initial setup)
SEED_USER_EMAIL="admin@example.com"
SEED_USER_PASSWORD="securepassword"
```

### 4. Database Setup

Initialize Prisma and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

The seed command will create a default admin user for initial login.

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
npm start
```

##  Project Structure

### Public Pages
- **Homepage**: Dynamic hero section with animations, featured skills, and statistics
- **Projects**: Showcase of portfolio projects with filtering and search
- **Project Detail**: Individual project pages with full descriptions and image galleries (SSG)
- **Blog**: List of blog posts with categories and tags
- **Blog Detail**: Individual blog post pages with rich content (SSG)
- **About**: Personal information, work experience, and education
- **Contact**: Contact form with validation and email integration

### Admin Dashboard
- **Dashboard Home**: Overview of content statistics and recent activity
- **Profile Management**: Update personal information and profile images
- **Project Management**: CRUD operations for projects with image uploads
- **Blog Management**: Create and manage blog posts with rich text editor
- **Experience Management**: Add and update work experience entries
- **Education Management**: Manage educational background and qualifications
- **Skills Management**: Update skill sets and proficiency levels
- **Social Links**: Manage social media profiles and links


##  Default Seed User

The application includes a default administrator account for initial setup:

**Email**: As configured in `SEED_USER_EMAIL`
**Password**: As configured in `SEED_USER_PASSWORD`

**Security Note**: Change these credentials immediately after first login in production environments.

## 🎭 Animation Features

### GSAP Animations
- Smooth page transitions between routes
- Scroll-triggered animations for content reveal
- Parallax effects on hero sections
- Staggered animations for lists and grids
- Hover animations for interactive elements
- Timeline-based complex animation sequences

### Lenis Smooth Scroll
- Hardware-accelerated smooth scrolling
- Custom scroll speed and easing
- Scroll-based animation triggers
- Touch-friendly mobile scrolling
- Anchor link smooth navigation

##  Performance Optimization

### Static Site Generation (SSG)
- Project detail pages are pre-rendered at build time
- Blog post pages are statically generated for SEO
- Automatic regeneration with ISR on content updates
- Optimal Time to First Byte (TTFB)

### Incremental Static Regeneration (ISR)
- Automatic page revalidation on data changes
- Background regeneration without downtime
- Configurable revalidation intervals
- On-demand revalidation with server actions

### Server Actions
- Form submissions without API routes
- Direct database mutations from server components
- Optimistic UI updates for instant feedback
- Built-in error handling and validation
- Type-safe actions with TypeScript

##  Authentication Flow

### Login Process
1. User enters credentials on login page
2. NextAuth validates credentials against database
3. JWT tokens are generated and stored securely
4. User is redirected to admin dashboard
5. Protected routes verify authentication status

### Authorization
- Middleware checks authentication on protected routes
- Session validation on every protected page load
- Automatic token refresh on expiration
- Role-based access control for admin features
- Secure logout with session cleanup

##  Form Validation

All forms implement dual-layer validation:

### Client-Side Validation
- Real-time input validation with Zod schemas
- Instant feedback on form errors
- Field-level error messages
- Disabled submit buttons on invalid input

### Server-Side Validation
- Revalidation of all data on submission
- Protection against malicious requests
- Type-safe data processing
- Database constraint validation

## SEO Implementation

### Meta Tags
- Dynamic page titles and descriptions
- Open Graph tags for social media sharing
- Twitter Card metadata
- Canonical URLs for duplicate content

### Structured Data
- JSON-LD schema for organization
- Article schema for blog posts
- Project schema for portfolio items
- BreadcrumbList for navigation

### Performance
- Optimized Core Web Vitals scores
- Lazy loading for images and components
- Minimized JavaScript bundles
- Efficient CSS delivery

##  Responsive Design

- Mobile-first approach
- Breakpoints for all device sizes
- Touch-optimized interface
- Adaptive layouts and navigation
- Responsive images and media
- Mobile-friendly forms and inputs


##  Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up automatic deployments from main branch
4. Configure custom domain (optional)
5. Enable ISR for dynamic content updates

### Environment Variables in Production
Ensure all environment variables are properly set in your deployment platform:
- Database connection strings
- API URLs (use production backend URL)
- NextAuth secrets and URLs
- Cloudinary credentials
- Any third-party API keys

### Post-Deployment Checklist
- Verify all environment variables are set correctly
- Test authentication flow
- Check image uploads and Cloudinary integration
- Validate form submissions
- Test ISR revalidation
- Verify SEO meta tags
- Check responsive design on multiple devices
- Test smooth scroll and animations
- Validate Core Web Vitals scores

##  Security Best Practices

- Never commit `.env` files to version control
- Use strong, unique secrets for authentication
- Implement rate limiting on forms
- Sanitize all user inputs
- Keep dependencies updated
- Use HTTPS in production
- Implement CSRF protection
- Secure API endpoints with authentication
- Regular security audits

## Troubleshooting

### Common Issues

**Authentication Errors**
- Verify NextAuth configuration
- Check database connection
- Ensure JWT secrets match between frontend and backend

**Image Upload Failures**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper image formats

**Database Connection Issues**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Run Prisma migrations

**Build Errors**
- Clear `.next` folder and rebuild
- Verify all environment variables
- Check TypeScript errors



##  Acknowledgments

- Next.js team for the amazing framework
- GSAP for powerful animations
- Lenis for smooth scrolling
- Prisma for excellent ORM
- Tailwind CSS for utility-first styling
- Cloudinary for image management

---

**Made with using Next.js, TypeScript, and modern web technologies**
