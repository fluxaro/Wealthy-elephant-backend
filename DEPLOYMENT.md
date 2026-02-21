# 🚀 Wealthy Elephant Backend - Deployment Guide

## Step-by-Step Deployment Instructions

### 1️⃣ Setup Supabase Database

1. **Login to Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Navigate to your project: `wwmhtdwjdlogeyrcpawy`

2. **Run the SQL Schema**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"
   - Copy the entire contents of `prisma/schema.sql`
   - Paste into the SQL editor
   - Click "Run" or press `Ctrl+Enter`
   - Wait for success message (should see ✅ completion message)

3. **Verify Tables Created**
   - Click on "Table Editor" in the left sidebar
   - You should see all 8 tables:
     - ContactInquiry
     - KlinRequest
     - KlinIntelligenceCheck
     - KlinPartnership
     - KaizenProject
     - BuildPlannerSubmission
     - NewsletterSubscriber
     - AdminUsers

### 2️⃣ Configure Resend Email

1. **Verify Your Domain** (Important!)
   - Login to https://resend.com/domains
   - Add your domain: `wealthyelephant.com`
   - Add the DNS records provided by Resend
   - Wait for verification (usually 5-10 minutes)

2. **Update Email Configuration**
   - Open `src/utils/emailService.ts`
   - Change line 5 from:
     ```typescript
     const FROM_EMAIL = 'Wealthy Elephant <onboarding@resend.dev>';
     ```
   - To:
     ```typescript
     const FROM_EMAIL = 'Wealthy Elephant <noreply@wealthyelephant.com>';
     ```

### 3️⃣ Environment Variables

Your `.env` file is already configured with:
```env
SUPABASE_URL=https://wwmhtdwjdlogeyrcpawy.supabase.co
DATABASE_URL="postgresql://postgres:e%2Fp_%23ggd4Wci%25iY@wwmhtdwjdlogeyrcpawy.supabase.co:5432/postgres"
RESEND_API_KEY=re_18HoaviK_3XL8HKU8AuoLcQZjpkoHQ1rV
ADMIN_EMAIL=wealthyelephant@gmail.com
FRONTEND_URL=https://www.wealthyelephant.com
JWT_SECRET=1ZL5eH3BV1SB/Ny76tfROY7vNGbsdqZb1oH9O3e4HmkDMB46qLFdX5Nrm/3U1urnGncy3WXa8AmXuh3jw0r/zg==
NODE_ENV=production
PORT=5000
```

✅ No changes needed unless you want to modify settings.

### 4️⃣ Install Dependencies & Build

```bash
# Install all dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Build TypeScript to JavaScript
npm run build
```

### 5️⃣ Test Locally

```bash
# Start development server
npm run dev
```

The server should start on http://localhost:5000

**Test the health endpoint:**
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Wealthy Elephant API is running",
  "timestamp": "2024-02-20T..."
}
```

### 6️⃣ Test API Endpoints

Use Postman, Insomnia, or curl to test:

**Test Contact Form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "inquiryType": "general",
    "message": "This is a test message for the contact form"
  }'
```

**Test Newsletter Subscription:**
```bash
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com",
    "name": "Test Subscriber"
  }'
```

**Test Klin Request:**
```bash
curl -X POST http://localhost:5000/api/klin/request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "propertyType": "apartment",
    "location": "Nairobi, Kenya",
    "budget": "$500-$1000",
    "moveInDate": "2024-03-01"
  }'
```

### 7️⃣ Deploy to Production

#### Option A: Deploy to Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Add environment variables in Railway dashboard

#### Option B: Deploy to Render

1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variables from `.env`

#### Option C: Deploy to DigitalOcean/AWS/VPS

1. SSH into your server
2. Install Node.js 18+
3. Clone repository
4. Install PM2:
```bash
npm install -g pm2
```

5. Start application:
```bash
npm install
npm run build
pm2 start dist/server.js --name wealthy-elephant-api
pm2 save
pm2 startup
```

6. Setup Nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name api.wealthyelephant.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8️⃣ Update Frontend

Update your frontend to point to the API:

**Development:**
```javascript
const API_URL = 'http://localhost:5000/api';
```

**Production:**
```javascript
const API_URL = 'https://api.wealthyelephant.com/api';
// or
const API_URL = 'https://your-backend-url.com/api';
```

### 9️⃣ Monitor & Maintain

1. **Check Supabase Dashboard**
   - Monitor database usage
   - View submitted data in Table Editor
   - Check logs for errors

2. **Check Resend Dashboard**
   - Monitor email delivery
   - Check bounce rates
   - View email logs

3. **Monitor Server Logs**
```bash
# If using PM2
pm2 logs wealthy-elephant-api

# If using Railway/Render
# Check logs in their dashboard
```

### 🔟 Security Checklist

- ✅ RLS policies enabled on all tables
- ✅ Rate limiting configured (10 submissions/hour)
- ✅ CORS restricted to frontend URL
- ✅ Input validation with Zod
- ✅ Email validation in database
- ✅ Environment variables secured
- ✅ JWT secret is strong
- ✅ Service role key used for backend

### 📊 Database Schema Features

✅ **8 Tables Created:**
- ContactInquiry
- KlinRequest
- KlinIntelligenceCheck
- KlinPartnership
- KaizenProject
- BuildPlannerSubmission
- NewsletterSubscriber
- AdminUsers (for future dashboard)

✅ **Security Features:**
- Row Level Security (RLS) enabled
- Service role has full access
- Authenticated users can insert
- Email validation constraints
- Length validation on all fields
- Enum validation for specific fields

✅ **Performance Features:**
- Indexes on email, status, createdAt
- Optimized for queries
- Auto-updating timestamps

✅ **Business Logic:**
- Auto-update triggers
- Email validation function
- Submission count tracking
- Analytics view

### 🆘 Troubleshooting

**Issue: Database connection fails**
- Check if DATABASE_URL is properly URL-encoded
- Verify Supabase project is active
- Check network connectivity

**Issue: Emails not sending**
- Verify Resend API key is valid
- Check if domain is verified in Resend
- Update FROM_EMAIL with verified domain

**Issue: CORS errors**
- Add your frontend URL to FRONTEND_URL in .env
- Check corsOptions in src/config/cors.ts

**Issue: Rate limiting too strict**
- Adjust limits in src/middleware/rateLimiter.ts

### 📞 Support

For issues or questions:
- Email: wealthyelephant@gmail.com
- Check logs in Supabase Dashboard
- Check server logs with `pm2 logs` or platform dashboard

---

## 🎉 You're All Set!

Your backend is now production-ready with:
- ✅ Secure database with RLS
- ✅ Email notifications
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ CORS protection

Start accepting submissions from your frontend! 🚀
