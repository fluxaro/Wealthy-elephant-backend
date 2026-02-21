# Wealthy Elephant Backend API

Production-ready backend system for the Wealthy Elephant website ecosystem, integrating frontend forms with Supabase, Prisma, Resend email, and JWT authentication.

## Features

- ✅ TypeScript for type safety
- ✅ Express.js REST API
- ✅ Prisma ORM with PostgreSQL (Supabase)
- ✅ Resend email integration
- ✅ JWT authentication for admin routes
- ✅ Rate limiting to prevent spam
- ✅ Zod validation for all inputs
- ✅ CORS security
- ✅ Centralized error handling
- ✅ Production-ready architecture

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Email**: Resend
- **Validation**: Zod
- **Authentication**: JWT + bcrypt

## Project Structure

```
wealthy-elephant-backend/
├── src/
│   ├── api/              # API route handlers
│   │   ├── contact.ts
│   │   ├── klin.ts
│   │   ├── kaizen.ts
│   │   └── newsletter.ts
│   ├── config/           # Configuration files
│   │   ├── prisma.ts
│   │   ├── supabase.ts
│   │   ├── resend.ts
│   │   └── cors.ts
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.ts
│   │   ├── jwtAuth.ts
│   │   ├── rateLimiter.ts
│   │   └── validation.ts
│   ├── utils/            # Utility functions
│   │   ├── emailService.ts
│   │   └── emailTemplates.ts
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── .env                  # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file with the following variables (already configured):

```env
# Supabase
SUPABASE_URL=https://wwmhtdwjdlogeyrcpawy.supabase.co
DATABASE_URL=postgresql://postgres:e/p_#ggd4Wci%iY@wwmhtdwjdlogeyrcpawy.supabase.co:5432/postgres

# JWT
JWT_SECRET=your-secret-key

# Resend Email
RESEND_API_KEY=re_18HoaviK_3XL8HKU8AuoLcQZjpkoHQ1rV
ADMIN_EMAIL=wealthyelephant@gmail.com

# Frontend
FRONTEND_URL=https://www.wealthyelephant.com

# Server
NODE_ENV=production
PORT=5000
```

### 3. Initialize Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view data
npm run prisma:studio
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Contact Inquiry
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "inquiryType": "general",
    "message": "Your message here"
  }
  ```

### Klin Services
- `POST /api/klin/request` - Submit rental request
- `POST /api/klin/intelligence` - Submit intelligence check
- `POST /api/klin/partnership` - Submit partnership request

### Kaizen Services
- `POST /api/kaizen/project` - Submit project request
- `POST /api/kaizen/buildplanner` - Submit build planner

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
  ```json
  {
    "email": "user@example.com",
    "name": "Optional Name"
  }
  ```

## Security Features

1. **CORS Protection**: Only allows requests from configured frontend URL
2. **Rate Limiting**: Prevents spam and abuse
   - General: 100 requests per 15 minutes
   - Forms: 10 submissions per hour
   - Newsletter: 5 subscriptions per day
3. **Input Validation**: Zod schemas validate all inputs
4. **JWT Authentication**: Protects admin routes
5. **Environment Variables**: Sensitive data stored securely

## Email Flow

1. User submits form on frontend
2. Backend validates data with Zod
3. Data saved to Supabase via Prisma
4. Two emails sent via Resend:
   - Confirmation email to user
   - Notification email to admin
5. Success response returned to frontend

## Database Models

- `ContactInquiry` - Contact form submissions
- `KlinRequest` - Rental requests
- `KlinIntelligenceCheck` - Housing intelligence checks
- `KlinPartnership` - Partnership inquiries
- `KaizenProject` - Project requests
- `BuildPlannerSubmission` - Build planner submissions
- `NewsletterSubscriber` - Newsletter subscriptions

## Error Handling

All errors are caught and returned in a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // For validation errors
}
```

## Testing

Test endpoints using Postman or curl:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "inquiryType": "general",
    "message": "This is a test message"
  }'
```

## Deployment

1. Set `NODE_ENV=production` in environment
2. Update `FRONTEND_URL` to production domain
3. Run `npm run build`
4. Start with `npm start`
5. Use a process manager like PM2 for production:
   ```bash
   pm2 start dist/server.js --name wealthy-elephant-api
   ```

## Support

For issues or questions, contact: wealthyelephant@gmail.com

---

Built with ❤️ by the Wealthy Elephant Team
