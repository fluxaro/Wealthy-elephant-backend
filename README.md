# Wealthy Elephant Backend API

Production-ready backend system for the Wealthy Elephant website ecosystem, integrating Supabase, Resend email service, and JWT authentication.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Create admin user
npm run create-admin

# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Table of Contents

- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Contact Form](#contact-form)
  - [Klin Konnect](#klin-konnect)
  - [Kaizen Kora](#kaizen-kora)
  - [Newsletter](#newsletter)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Email Templates](#email-templates)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=https://wwmhtdwjdlogeyrcpawy.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:password@host:5432/postgres?schema=public&sslmode=require

# JWT Authentication
JWT_SECRET=your_jwt_secret_key

# Resend Email Service
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=Wealthy Elephant <noreply@wealthyelephant.com>

# Frontend
FRONTEND_URL=https://www.wealthyelephant.com

# Server
NODE_ENV=production
PORT=5000
```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000` (development) or your production URL

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "success": true,
  "message": "Wealthy Elephant API is running",
  "timestamp": "2026-02-20T12:00:00.000Z"
}
```

---

## 🔑 Authentication

### Login

**POST** `/api/auth/login`

Authenticate admin user and receive JWT token.

**Request Body:**
```json
{
  "email": "wealthyelephant@gmail.com",
  "password": "admin@elephant"
}
```

**Field Validation:**
- `email` (required): Valid email format
- `password` (required): Minimum 1 character

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "wealthyelephant@gmail.com",
      "name": "Admin",
      "role": "admin"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Verify Token

**GET** `/api/auth/verify`

Verify JWT token and get current user data.

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "wealthyelephant@gmail.com",
      "name": "Admin",
      "role": "admin"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## 📧 Contact Form

### Submit Contact Inquiry

**POST** `/api/contact`

Submit a general contact inquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "inquiryType": "general",
  "message": "I would like to know more about your services."
}
```

**Field Validation:**
- `name` (required): 2-100 characters
- `email` (required): Valid email format
- `inquiryType` (required): One of: `general`, `support`, `partnership`, `other`
- `message` (required): 10-2000 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contact inquiry submitted successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "inquiryType": "general",
    "message": "I would like to know more about your services.",
    "status": "new",
    "createdAt": "2026-02-20T12:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour per IP

---

## 🏠 Klin Konnect

### Submit Rental Request

**POST** `/api/klin/request`

Submit a property rental request.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "propertyType": "apartment",
  "location": "Downtown Lagos",
  "budget": "$1000-$1500/month",
  "moveInDate": "2026-03-01",
  "additionalNotes": "Looking for 2 bedrooms with parking"
}
```

**Field Validation:**
- `name` (required): 2-100 characters
- `email` (required): Valid email format
- `phone` (required): 10-20 characters
- `propertyType` (required): One of: `apartment`, `house`, `condo`, `studio`, `other`
- `location` (required): 2-200 characters
- `budget` (required): 1-50 characters
- `moveInDate` (optional): String date
- `additionalNotes` (optional): Max 1000 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Rental request submitted successfully",
  "data": {
    "id": "uuid",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "propertyType": "apartment",
    "location": "Downtown Lagos",
    "budget": "$1000-$1500/month",
    "moveInDate": "2026-03-01",
    "additionalNotes": "Looking for 2 bedrooms with parking",
    "status": "pending",
    "createdAt": "2026-02-20T12:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour per IP

---

### Submit Intelligence Check

**POST** `/api/klin/intelligence`

Request housing intelligence/background check.

**Request Body:**
```json
{
  "name": "Michael Johnson",
  "email": "michael@example.com",
  "phone": "+1234567890",
  "propertyAddress": "123 Main Street, Lagos",
  "checkType": "comprehensive",
  "urgency": "normal",
  "additionalInfo": "Need full background and credit check"
}
```

**Field Validation:**
- `name` (required): 2-100 characters
- `email` (required): Valid email format
- `phone` (required): 10-20 characters
- `propertyAddress` (required): 5-300 characters
- `checkType` (required): One of: `background`, `credit`, `rental-history`, `comprehensive`
- `urgency` (optional): One of: `normal`, `urgent`, `asap` (default: `normal`)
- `additionalInfo` (optional): Max 1000 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Intelligence check request submitted successfully",
  "data": {
    "id": "uuid",
    "name": "Michael Johnson",
    "email": "michael@example.com",
    "phone": "+1234567890",
    "propertyAddress": "123 Main Street, Lagos",
    "checkType": "comprehensive",
    "urgency": "normal",
    "additionalInfo": "Need full background and credit check",
    "status": "pending",
    "createdAt": "2026-02-20T12:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour per IP

---

### Submit Partnership Request

**POST** `/api/klin/partnership`

Submit a partnership inquiry for Klin Konnect.

**Request Body:**
```json
{
  "companyName": "ABC Properties Ltd",
  "contactPerson": "Sarah Williams",
  "email": "sarah@abcproperties.com",
  "phone": "+1234567890",
  "partnershipType": "property-owner",
  "description": "We own 50+ properties and would like to partner with Klin Konnect for property management.",
  "website": "https://www.abcproperties.com"
}
```

**Field Validation:**
- `companyName` (required): 2-150 characters
- `contactPerson` (required): 2-100 characters
- `email` (required): Valid email format
- `phone` (required): 10-20 characters
- `partnershipType` (required): One of: `property-owner`, `agent`, `vendor`, `investor`, `other`
- `description` (required): 20-2000 characters
- `website` (optional): Valid URL or empty string

**Success Response (201):**
```json
{
  "success": true,
  "message": "Partnership request submitted successfully",
  "data": {
    "id": "uuid",
    "companyName": "ABC Properties Ltd",
    "contactPerson": "Sarah Williams",
    "email": "sarah@abcproperties.com",
    "phone": "+1234567890",
    "partnershipType": "property-owner",
    "description": "We own 50+ properties...",
    "website": "https://www.abcproperties.com",
    "status": "pending",
    "createdAt": "2026-02-20T12:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour per IP

---

## 🏗️ Kaizen Kora

### Submit Project Request

**POST** `/api/kaizen/project`

Submit a construction project request.

**Request Body:**
```json
{
  "name": "David Brown",
  "email": "david@example.com",
  "phone": "+1234567890",
  "projectType": "residential",
  "projectScope": "medium",
  "budget": "$50,000-$100,000",
  "timeline": "6-9 months",
  "description": "Building a 3-bedroom house with modern amenities",
  "location": "Lekki, Lagos"
}
```

**Field Validation:**
- `name` (required): 2-100 characters
- `email` (required): Valid email format
- `phone` (required): 10-20 characters
- `projectType` (required): One of: `residential`, `commercial`, `renovation`, `new-build`, `other`
- `projectScope` (required): One of: `small`, `medium`, `large`, `enterprise`
- `budget` (required): 1-50 characters
- `timeline` (required): 1-50 characters
- `description` (required): 20-2000 characters
- `location` (optional): Max 200 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Project request submitted successfully",
  "data": {
    "id": "uuid",
    "name": "David Brown",
    "email": "david@example.com",
    "phone": "+1234567890",
    "projectType": "residential",
    "projectScope": "medium",
    "budget": "$50,000-$100,000",
    "timeline": "6-9 months",
    "description": "Building a 3-bedroom house with modern amenities",
    "location": "Lekki, Lagos",
    "status": "pending",
    "createdAt": "2026-02-20T12:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour per IP

---

### Submit Build Planner

**POST** `/api/kaizen/buildplanner`

Submit a detailed build planning request.

**Request Body:**
```json
{
  "name": "Emily Davis",
  "email": "emily@example.com",
  "phone": "+1234567890",
  "projectType": "commercial",
  "propertySize": "5000 sq ft",
  "budget": "$200,000-$300,000",
  "startDate": "2026-04-01",
  "features": "Office space with conference rooms, kitchen, and parking lot",
  "additionalNotes": "Need eco-friendly materials"
}
```

**Field Validation:**
- `name` (required): 2-100 characters
- `email` (required): Valid email format
- `phone` (required): 10-20 characters
- `projectType` (required): One of: `residential`, `commercial`, `mixed-use`, `industrial`
- `propertySize` (required): 1-50 characters
- `budget` (required): 1-50 characters
- `startDate` (optional): String date
- `features` (required): 10-2000 characters
- `additionalNotes` (optional): Max 1000 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Build planner submission successful",
  "data": {
    "id": "uuid",
    "name": "Emily Davis",
    "email": "emily@example.com",
    "phone": "+1234567890",
    "projectType": "commercial",
    "propertySize": "5000 sq ft",
    "budget": "$200,000-$300,000",
    "startDate": "2026-04-01",
    "features": "Office space with conference rooms...",
    "additionalNotes": "Need eco-friendly materials",
    "status": "pending",
    "createdAt": "2026-02-20T12:00:00.000Z"
  }
}
```

**Rate Limit:** 10 requests per hour per IP

---

## 📰 Newsletter

### Subscribe to Newsletter

**POST** `/api/newsletter`

Subscribe to the Wealthy Elephant newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "name": "Alex Johnson"
}
```

**Field Validation:**
- `email` (required): Valid email format
- `name` (optional): 2-100 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": {
    "id": "uuid",
    "email": "subscriber@example.com",
    "name": "Alex Johnson",
    "status": "active",
    "subscribedAt": "2026-02-20T12:00:00.000Z"
  }
}
```

**Already Subscribed Response (200):**
```json
{
  "success": true,
  "message": "Email already subscribed",
  "data": {
    "id": "uuid",
    "email": "subscriber@example.com",
    "name": "Alex Johnson",
    "status": "active",
    "subscribedAt": "2026-01-15T10:00:00.000Z"
  }
}
```

**Rate Limit:** 5 requests per day per IP

---

## 🚦 Rate Limiting

The API implements three tiers of rate limiting:

### General Rate Limit
- **Limit:** 100 requests per 15 minutes
- **Applies to:** All endpoints
- **Headers:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets

### Form Submission Rate Limit
- **Limit:** 10 requests per hour
- **Applies to:** All POST endpoints (contact, klin, kaizen)

### Newsletter Rate Limit
- **Limit:** 5 requests per day
- **Applies to:** Newsletter subscription endpoint

**Rate Limit Exceeded Response (429):**
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## ⚠️ Error Handling

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "name",
      "message": "Name must be at least 2 characters"
    }
  ]
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (only in development)"
}
```

### Not Found (404)

```json
{
  "success": false,
  "message": "Route not found"
}
```

---

## 📧 Email Templates

All form submissions trigger automated email confirmations sent to the user. Emails feature:

- **Professional Design:** High-end styling with gradients and textures
- **Responsive Layout:** Mobile-friendly design
- **Brand Identity:** Wealthy Elephant logo and venture badges
- **Social Links:** 
  - Wealthy Elephant: LinkedIn, Instagram, TikTok
  - Klin Konnect: Instagram, TikTok
  - Kaizen Kora: Instagram

**Email Sender:** `Wealthy Elephant <noreply@wealthyelephant.com>`

---

## 🗄️ Database Tables

### ContactInquiry
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String)
- `inquiryType` (Enum)
- `message` (Text)
- `status` (String, default: 'new')
- `createdAt` (Timestamp)

### KlinRequest
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String)
- `propertyType` (Enum)
- `location` (String)
- `budget` (String)
- `moveInDate` (String, nullable)
- `additionalNotes` (Text, nullable)
- `status` (String, default: 'pending')
- `createdAt` (Timestamp)

### KlinIntelligenceCheck
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String)
- `propertyAddress` (String)
- `checkType` (Enum)
- `urgency` (Enum, default: 'normal')
- `additionalInfo` (Text, nullable)
- `status` (String, default: 'pending')
- `createdAt` (Timestamp)

### KlinPartnership
- `id` (UUID, Primary Key)
- `companyName` (String)
- `contactPerson` (String)
- `email` (String)
- `phone` (String)
- `partnershipType` (Enum)
- `description` (Text)
- `website` (String, nullable)
- `status` (String, default: 'pending')
- `createdAt` (Timestamp)

### KaizenProject
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String)
- `projectType` (Enum)
- `projectScope` (Enum)
- `budget` (String)
- `timeline` (String)
- `description` (Text)
- `location` (String, nullable)
- `status` (String, default: 'pending')
- `createdAt` (Timestamp)

### BuildPlannerSubmission
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String)
- `projectType` (Enum)
- `propertySize` (String)
- `budget` (String)
- `startDate` (String, nullable)
- `features` (Text)
- `additionalNotes` (Text, nullable)
- `status` (String, default: 'pending')
- `createdAt` (Timestamp)

### NewsletterSubscriber
- `id` (UUID, Primary Key)
- `email` (String, unique)
- `name` (String, nullable)
- `status` (String, default: 'active')
- `subscribedAt` (Timestamp)
- `unsubscribedAt` (Timestamp, nullable)

### AdminUsers
- `id` (UUID, Primary Key)
- `email` (String, unique)
- `passwordHash` (String)
- `name` (String)
- `role` (String, default: 'admin')
- `lastLogin` (Timestamp, nullable)
- `createdAt` (Timestamp)

---

## 🔧 Admin Setup

Create the admin user:

```bash
npm run create-admin
```

**Default Credentials:**
- Email: `wealthyelephant@gmail.com`
- Password: `admin@elephant`

⚠️ **Important:** Change the password after first login!

---

## 🛡️ Security Features

- **CORS:** Restricted to `https://www.wealthyelephant.com`
- **Rate Limiting:** Multiple tiers to prevent abuse
- **Input Validation:** Zod schemas for all inputs
- **SQL Injection Protection:** Parameterized queries via Supabase
- **XSS Protection:** Input sanitization
- **JWT Authentication:** Secure admin access
- **Password Hashing:** bcrypt with salt rounds
- **Row Level Security:** Enabled on all database tables

---

## 📝 Testing

Use the provided test files:

```bash
# Test all endpoints
powershell -File test-all-endpoints.ps1

# Test all email templates
powershell -File test-all-emails.ps1
```

Or use the `test-api.http` file with REST Client extension in VS Code.

---

## 🚀 Deployment

1. Set environment variables on your hosting platform
2. Build the project: `npm run build`
3. Start the server: `npm start`
4. Ensure database migrations are applied
5. Create admin user: `npm run create-admin`

---

## 📞 Support

For issues or questions, contact: **wealthyelephant@gmail.com**

---

## 📄 License

ISC © Wealthy Elephant

---

**Built with ❤️ by Wealthy Elephant Team**
