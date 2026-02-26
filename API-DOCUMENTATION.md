# Wealthy Elephant Backend API Documentation

**Base URL:** `https://wealthy-elephant-backend.vercel.app`

**Version:** 1.0.0

---

## Table of Contents

1. [Authentication](#authentication)
2. [Public Endpoints](#public-endpoints)
3. [Admin Dashboard Endpoints](#admin-dashboard-endpoints)
4. [Admin Newsletter Management](#admin-newsletter-management)
5. [Database Schema](#database-schema)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)

---

## Authentication

### Admin Login
**POST** `/api/auth/login`

Login to admin dashboard.

**Request Body:**
```json
{
  "email": "wealthyelephant@gmail.com",
  "password": "admin@elephant"
}
```

**Response:**
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

### Verify Token
**GET** `/api/auth/verify`

Verify JWT token validity.

**Headers:**
```
Authorization: Bearer <token>
```


**Response:**
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

---

## Public Endpoints

### 1. Contact Form Submission
**POST** `/api/contact`

Submit a contact inquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "inquiryType": "general",
  "message": "I have a question about your services."
}
```

**Validation:**
- `name`: 2-100 characters
- `email`: Valid email format
- `inquiryType`: `general` | `support` | `partnership` | `other`
- `message`: 10-2000 characters

**Response:**
```json
{
  "success": true,
  "message": "Contact inquiry submitted successfully",
  "data": {
    "id": "uuid"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 2. Kaizen Project Request
**POST** `/api/kaizen/project`

Submit a construction/renovation project request.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "projectType": "residential",
  "projectScope": "medium",
  "budget": "$50k-$100k",
  "timeline": "3-6 months",
  "description": "Looking to renovate my kitchen and bathroom.",
  "location": "New York, NY"
}
```

**Validation:**
- `name`: 2-100 characters
- `email`: Valid email
- `phone`: 10-20 characters
- `projectType`: `residential` | `commercial` | `renovation` | `new-build` | `other`
- `projectScope`: `small` | `medium` | `large` | `enterprise`
- `budget`: 1-50 characters
- `timeline`: 1-50 characters
- `description`: 20-2000 characters
- `location`: Optional, max 200 characters

**Response:**
```json
{
  "success": true,
  "message": "Project request submitted successfully",
  "data": {
    "id": "uuid"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 3. Build Planner Submission
**POST** `/api/kaizen/buildplanner`

Submit a build planning request.

**Request Body:**
```json
{
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "phone": "5551234567",
  "projectType": "commercial",
  "propertySize": "5000 sqft",
  "budget": "$200k-$500k",
  "startDate": "2024-09-01",
  "features": "Open floor plan, modern design, energy efficient",
  "additionalNotes": "Need LEED certification"
}
```

**Validation:**
- `name`: 2-100 characters
- `email`: Valid email
- `phone`: 10-20 characters
- `projectType`: `residential` | `commercial` | `mixed-use` | `industrial`
- `propertySize`: 1-50 characters
- `budget`: 1-50 characters
- `startDate`: Optional string
- `features`: 10-2000 characters
- `additionalNotes`: Optional, max 1000 characters

**Response:**
```json
{
  "success": true,
  "message": "Build planner submission successful",
  "data": {
    "id": "uuid"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 4. Klin Rental Request
**POST** `/api/klin/request`

Submit a rental property request.

**Request Body:**
```json
{
  "name": "Alice Brown",
  "email": "alice@example.com",
  "phone": "5559876543",
  "propertyType": "apartment",
  "location": "Downtown Manhattan",
  "budget": "$2000-$3000/month",
  "moveInDate": "2024-08-01",
  "additionalNotes": "Pet-friendly preferred"
}
```

**Validation:**
- `name`: 2-100 characters
- `email`: Valid email
- `phone`: 10-20 characters
- `propertyType`: `apartment` | `house` | `condo` | `studio` | `other`
- `location`: 2-200 characters
- `budget`: 1-50 characters
- `moveInDate`: Optional string
- `additionalNotes`: Optional, max 1000 characters

**Response:**
```json
{
  "success": true,
  "message": "Rental request submitted successfully",
  "data": {
    "id": "uuid"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 5. Klin Intelligence Check
**POST** `/api/klin/intelligence`

Request background/credit check services.

**Request Body:**
```json
{
  "name": "David Wilson",
  "email": "david@example.com",
  "phone": "5551112222",
  "propertyAddress": "123 Main Street, New York, NY 10001",
  "checkType": "comprehensive",
  "urgency": "normal",
  "additionalInfo": "Need results within 48 hours"
}
```

**Validation:**
- `name`: 2-100 characters
- `email`: Valid email
- `phone`: 10-20 characters
- `propertyAddress`: 5-300 characters
- `checkType`: `background` | `credit` | `rental-history` | `comprehensive`
- `urgency`: `normal` | `urgent` | `asap` (default: `normal`)
- `additionalInfo`: Optional, max 1000 characters

**Response:**
```json
{
  "success": true,
  "message": "Intelligence check request submitted successfully",
  "data": {
    "id": "uuid"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 6. Klin Partnership Request
**POST** `/api/klin/partnership`

Submit a partnership inquiry.

**Request Body:**
```json
{
  "companyName": "ABC Properties LLC",
  "contactPerson": "Sarah Johnson",
  "email": "sarah@abcproperties.com",
  "phone": "5553334444",
  "partnershipType": "property-owner",
  "description": "We own 50+ rental properties and would like to explore partnership opportunities.",
  "website": "https://abcproperties.com"
}
```

**Validation:**
- `companyName`: 2-150 characters
- `contactPerson`: 2-100 characters
- `email`: Valid email
- `phone`: 10-20 characters
- `partnershipType`: `property-owner` | `agent` | `vendor` | `investor` | `other`
- `description`: 20-2000 characters
- `website`: Optional, valid URL or empty string

**Response:**
```json
{
  "success": true,
  "message": "Partnership request submitted successfully",
  "data": {
    "id": "uuid"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 7. Newsletter Subscription
**POST** `/api/newsletter`

Subscribe to the newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "name": "John Subscriber"
}
```

**Validation:**
- `email`: Valid email (required)
- `name`: 2-100 characters (optional)

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Rate Limit:** 10 requests per 15 minutes per IP

---

### 8. Newsletter Unsubscribe
**GET** `/api/newsletter/unsubscribe?id=<subscriber_id>`

Unsubscribe from newsletter (typically accessed via email link).

**Response:** HTML page confirming unsubscription

---

### 9. Newsletter Open Tracking
**GET** `/api/newsletter/track/open/:subscriberId?c=<campaign_id>`

Track email opens (1x1 transparent pixel).

**Response:** 1x1 GIF image

---

## Admin Dashboard Endpoints

All admin endpoints require JWT authentication.

**Headers Required:**
```
Authorization: Bearer <token>
```

### Dashboard Overview Stats
**GET** `/api/admin/stats`

Get overview statistics for the dashboard.

**Response:**
```json
{
  "success": true,
  "data": {
    "contacts": {
      "total": 150,
      "new": 12,
      "pending": 8
    },
    "klinRequests": {
      "total": 45,
      "pending": 5,
      "completed": 40
    },
    "kaizenProjects": {
      "total": 23,
      "pending": 3,
      "completed": 20
    },
    "newsletter": {
      "totalSubscribers": 2431,
      "activeSubscribers": 2380,
      "lastCampaign": {
        "subject": "Monthly Update",
        "sentDate": "2026-02-20T10:00:00Z",
        "openRate": 45.2,
        "clickRate": 12.8
      }
    }
  }
}
```

---

### Contact Management

#### Get All Contacts
**GET** `/api/admin/contacts?page=1&limit=20&status=new`

Get paginated list of contact inquiries.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status - `new` | `pending` | `completed` (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "inquiryType": "general",
        "message": "Question about services",
        "status": "new",
        "adminNotes": null,
        "createdAt": "2026-02-26T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 150,
      "page": 1,
      "pages": 8,
      "limit": 20
    }
  }
}
```

#### Update Contact
**PUT** `/api/admin/contacts/:id`

Update contact status and notes.

**Request Body:**
```json
{
  "status": "completed",
  "adminNotes": "Responded via email"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": { /* updated contact */ }
}
```

---

### Klin Request Management

#### Get Klin Requests
**GET** `/api/admin/klin/requests?page=1&limit=20&status=pending`

Get paginated list of rental requests.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "id": "uuid",
        "name": "Alice Brown",
        "email": "alice@example.com",
        "phone": "5559876543",
        "propertyType": "apartment",
        "location": "Downtown Manhattan",
        "budget": "$2000-$3000/month",
        "moveInDate": "2024-08-01",
        "additionalNotes": "Pet-friendly preferred",
        "status": "pending",
        "adminNotes": null,
        "createdAt": "2026-02-26T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 3,
      "limit": 20
    }
  }
}
```

#### Update Klin Request
**PUT** `/api/admin/klin/requests/:id`

Update request status and notes.

**Request Body:**
```json
{
  "status": "completed",
  "adminNotes": "Property found and lease signed"
}
```

---

#### Get Intelligence Checks
**GET** `/api/admin/klin/intelligence?page=1&limit=20&status=pending`

Get paginated list of intelligence check requests.

#### Get Partnerships
**GET** `/api/admin/klin/partnerships?page=1&limit=20&status=pending`

Get paginated list of partnership requests.

---

### Kaizen Project Management

#### Get Kaizen Projects
**GET** `/api/admin/kaizen/projects?page=1&limit=20&status=pending`

Get paginated list of construction projects.

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "uuid",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "1234567890",
        "projectType": "residential",
        "projectScope": "medium",
        "budget": "$50k-$100k",
        "timeline": "3-6 months",
        "description": "Kitchen and bathroom renovation",
        "location": "New York, NY",
        "status": "pending",
        "adminNotes": null,
        "createdAt": "2026-02-26T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 23,
      "page": 1,
      "pages": 2,
      "limit": 20
    }
  }
}
```

#### Update Kaizen Project
**PUT** `/api/admin/kaizen/projects/:id`

Update project status and notes.

**Request Body:**
```json
{
  "status": "completed",
  "adminNotes": "Project completed successfully"
}
```

#### Get Build Planner Submissions
**GET** `/api/admin/kaizen/buildplanner?page=1&limit=20&status=pending`

Get paginated list of build planner submissions.

---

## Admin Newsletter Management

### Newsletter Dashboard Stats
**GET** `/api/admin/newsletter/stats`

Get newsletter statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSubscribers": 2431,
    "activeSubscribers": 2380,
    "unsubscribed": 51,
    "lastCampaign": {
      "id": "uuid",
      "subject": "Monthly Update",
      "sentDate": "2026-02-20T10:00:00Z",
      "openRate": 45.2,
      "clickRate": 12.8,
      "totalSent": 2380
    }
  }
}
```

---

### Campaign Management

#### Get All Campaigns
**GET** `/api/admin/newsletter/campaigns?page=1&limit=20`

Get paginated list of newsletter campaigns.

**Response:**
```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": "uuid",
        "subject": "Monthly Update",
        "status": "sent",
        "sentDate": "2026-02-20T10:00:00Z",
        "createdAt": "2026-02-18T14:30:00Z",
        "openRate": 45.2,
        "clickRate": 12.8,
        "totalSent": 2380
      },
      {
        "id": "uuid",
        "subject": "New Features",
        "status": "scheduled",
        "scheduledDate": "2026-02-25T09:00:00Z",
        "createdAt": "2026-02-19T10:00:00Z",
        "openRate": 0,
        "clickRate": 0,
        "totalSent": 0
      },
      {
        "id": "uuid",
        "subject": "Draft Newsletter",
        "status": "draft",
        "createdAt": "2026-02-20T11:00:00Z",
        "openRate": 0,
        "clickRate": 0,
        "totalSent": 0
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 3,
      "limit": 20
    }
  }
}
```

**Campaign Status Values:**
- `draft`: Not yet sent
- `scheduled`: Scheduled for future sending
- `sending`: Currently being sent
- `sent`: Successfully sent
- `failed`: Failed to send

---

#### Get Single Campaign
**GET** `/api/admin/newsletter/campaigns/:id`

Get details of a specific campaign.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "subject": "Monthly Update",
    "previewText": "Check out what's new this month",
    "fromName": "Wealthy Elephant",
    "content": {
      "blocks": [
        {
          "type": "text",
          "content": "<p>Hello subscribers!</p>"
        },
        {
          "type": "image",
          "url": "https://example.com/image.jpg",
          "alt": "Feature image",
          "link": "https://example.com"
        },
        {
          "type": "button",
          "text": "Learn More",
          "link": "https://example.com/learn",
          "style": "primary"
        }
      ]
    },
    "status": "sent",
    "sentDate": "2026-02-20T10:00:00Z",
    "totalSent": 2380,
    "totalOpens": 1075,
    "totalClicks": 305,
    "unsubscribes": 5,
    "createdAt": "2026-02-18T14:30:00Z",
    "updatedAt": "2026-02-20T10:00:00Z"
  }
}
```

---

#### Create Campaign
**POST** `/api/admin/newsletter/campaigns`

Create a new newsletter campaign.

**Request Body:**
```json
{
  "subject": "Spring Newsletter 2026",
  "previewText": "Exciting updates for spring",
  "fromName": "Wealthy Elephant",
  "content": {
    "blocks": [
      {
        "type": "text",
        "content": "<h1>Spring Updates</h1><p>Welcome to our spring newsletter!</p>"
      },
      {
        "type": "image",
        "url": "https://example.com/spring.jpg",
        "alt": "Spring image"
      },
      {
        "type": "button",
        "text": "Read More",
        "link": "https://example.com/blog",
        "style": "primary"
      }
    ]
  },
  "status": "draft"
}
```

**Content Block Types:**
- `text`: HTML content
- `image`: Image with optional link
- `button`: Call-to-action button

**Response:**
```json
{
  "success": true,
  "message": "Campaign created successfully",
  "data": { /* campaign object */ }
}
```

---

#### Update Campaign
**PUT** `/api/admin/newsletter/campaigns/:id`

Update an existing campaign.

**Request Body:** Same as create campaign

**Response:**
```json
{
  "success": true,
  "message": "Campaign updated successfully",
  "data": { /* updated campaign */ }
}
```

---

#### Delete Campaign
**DELETE** `/api/admin/newsletter/campaigns/:id`

Delete a campaign.

**Response:**
```json
{
  "success": true,
  "message": "Campaign deleted successfully"
}
```

---

#### Duplicate Campaign
**POST** `/api/admin/newsletter/campaigns/:id/duplicate`

Create a copy of an existing campaign.

**Response:**
```json
{
  "success": true,
  "message": "Campaign duplicated successfully",
  "data": {
    "id": "new-uuid",
    "subject": "Copy of Monthly Update",
    "status": "draft"
  }
}
```

---

#### Send Test Email
**POST** `/api/admin/newsletter/campaigns/:id/test`

Send a test email to verify campaign appearance.

**Request Body:**
```json
{
  "email": "test@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Test email sent successfully"
}
```

---

#### Send Campaign
**POST** `/api/admin/newsletter/campaigns/:id/send`

Send campaign to all active subscribers.

**Request Body:**
```json
{
  "sendType": "now"
}
```

Or schedule for later:
```json
{
  "sendType": "scheduled",
  "scheduledDate": "2026-02-25T09:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Campaign is being sent"
}
```

Or for scheduled:
```json
{
  "success": true,
  "message": "Campaign scheduled successfully"
}
```

**Note:** Campaigns are sent in batches of 50 subscribers with 1-second delays between batches to avoid rate limits.

---

#### Get Campaign Analytics
**GET** `/api/admin/newsletter/campaigns/:id/analytics`

Get detailed analytics for a sent campaign.

**Response:**
```json
{
  "success": true,
  "data": {
    "subject": "Monthly Update",
    "sentDate": "2026-02-20T10:00:00Z",
    "totalSent": 2380,
    "openRate": 45.2,
    "clickRate": 12.8,
    "unsubscribes": 5,
    "topLinks": [
      {
        "url": "https://example.com/feature",
        "clicks": 245
      },
      {
        "url": "https://example.com/blog",
        "clicks": 189
      }
    ]
  }
}
```

---

### Subscriber Management

#### Get All Subscribers
**GET** `/api/admin/newsletter/subscribers?page=1&limit=50&status=active`

Get paginated list of newsletter subscribers.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)
- `status`: Filter by status - `active` | `inactive` (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "subscribers": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "name": "John Doe",
        "status": "active",
        "subscribedAt": "2026-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 2431,
      "page": 1,
      "pages": 49,
      "limit": 50
    }
  }
}
```

---

#### Search Subscribers
**GET** `/api/admin/newsletter/subscribers/search?q=john@example.com`

Search subscribers by email or name.

**Query Parameters:**
- `q`: Search query (required)

**Response:**
```json
{
  "success": true,
  "data": {
    "subscribers": [
      {
        "id": "uuid",
        "email": "john@example.com",
        "name": "John Doe",
        "status": "active",
        "subscribedAt": "2026-01-15T10:00:00Z"
      }
    ]
  }
}
```

**Limit:** Returns maximum 50 results

---

#### Export Subscribers
**GET** `/api/admin/newsletter/subscribers/export`

Export all active subscribers as CSV file.

**Response:** CSV file download
```csv
Email,Name,Subscribed At
user1@example.com,"John Doe",2026-01-15T10:00:00Z
user2@example.com,"Jane Smith",2026-01-20T14:30:00Z
```

**Headers:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename=subscribers.csv
```

---

## Database Schema

### Required SQL Setup

Run the following SQL script in your Supabase SQL editor to create the necessary tables:

**File:** `prisma/admin-schema.sql`

Key tables created:
- `NewsletterCampaign`: Stores newsletter campaigns
- `CampaignAnalytics`: Tracks opens, clicks, and unsubscribes
- Adds `status` and `adminNotes` columns to existing tables
- Creates indexes for performance optimization

**Status Values:**
- Contact Inquiry: `new` | `pending` | `completed`
- Klin Requests: `pending` | `completed`
- Kaizen Projects: `pending` | `completed`
- Newsletter Campaigns: `draft` | `scheduled` | `sending` | `sent` | `failed`

---

## Error Handling

All endpoints return consistent error responses:

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

**Authentication Error (401):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

Rate limits are applied per IP address:

| Endpoint Type | Limit |
|--------------|-------|
| Form Submissions (Contact, Kaizen, Klin) | 5 requests per 15 minutes |
| Newsletter Subscription | 10 requests per 15 minutes |
| General API | 100 requests per 15 minutes |
| Admin Endpoints | No rate limit (JWT protected) |

**Rate Limit Response (429):**
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## CORS Configuration

The API supports CORS for the following origins:
- `https://www.wealthyelephant.com` (production)
- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:5174`

**Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers:** Content-Type, Authorization

**Credentials:** Supported

---

## Environment Variables

Required environment variables for deployment:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@wealthyelephant.com

# Frontend
FRONTEND_URL=https://www.wealthyelephant.com

# Server
NODE_ENV=production
PORT=5000
```

---

## Admin Credentials

**Default Admin Account:**
- Email: `wealthyelephant@gmail.com`
- Password: `admin@elephant`

⚠️ **Important:** Change the password after first login!

To create/reset admin account, run:
```bash
npm run create-admin
```

---

## Testing Endpoints

### Test All Public Endpoints

Use the provided test scripts:

```bash
# Test all form endpoints
bash test-all-endpoints.sh

# Test admin login
bash test-login-api.sh
```

### Example cURL Commands

**Login:**
```bash
curl -X POST https://wealthy-elephant-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wealthyelephant@gmail.com","password":"admin@elephant"}'
```

**Get Dashboard Stats:**
```bash
curl -X GET https://wealthy-elephant-backend.vercel.app/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Submit Contact Form:**
```bash
curl -X POST https://wealthy-elephant-backend.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "inquiryType": "general",
    "message": "Test message from API"
  }'
```

---

## Feature Summary

### ✅ Implemented Features

**Public Features:**
- Contact form submission with email notifications
- Kaizen project requests (construction/renovation)
- Build planner submissions
- Klin rental requests
- Klin intelligence checks (background/credit)
- Klin partnership requests
- Newsletter subscription with welcome emails
- Newsletter unsubscribe functionality
- Email open tracking (pixel tracking)

**Admin Features:**
- JWT-based authentication
- Dashboard overview with statistics
- Contact inquiry management
- Klin request management (all types)
- Kaizen project management
- Newsletter campaign creation and editing
- Newsletter campaign scheduling
- Newsletter campaign sending (batch processing)
- Test email sending
- Campaign analytics (opens, clicks, top links)
- Subscriber management
- Subscriber search
- Subscriber export (CSV)
- Campaign duplication

**Technical Features:**
- Rate limiting on all public endpoints
- CORS configuration for multiple origins
- Input validation with Zod
- Error handling middleware
- Email service integration (Resend)
- Database integration (Supabase)
- Serverless deployment (Vercel)

---

## Support

For issues or questions:
- Email: wealthyelephant@gmail.com
- Repository: https://github.com/fluxaro/Wealthy-elephant-backend

---

**Last Updated:** February 26, 2026
**API Version:** 1.0.0
