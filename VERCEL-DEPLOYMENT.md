# Vercel Deployment Guide

Complete guide to deploy the Wealthy Elephant Backend API to Vercel.

## 📋 Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. GitHub/GitLab/Bitbucket repository with your code
3. Supabase database already set up
4. Resend API key for emails

---

## 🚀 Deployment Steps

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Push Code to Git Repository

```bash
git init
git add .
git commit -m "Initial commit - Ready for Vercel deployment"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 3: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure project settings:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** dist
   - **Install Command:** `npm install`

### Step 4: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```env
# Supabase Configuration
SUPABASE_URL=https://wwmhtdwjdlogeyrcpawy.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://postgres:password@host:5432/postgres?schema=public&sslmode=require

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here

# Resend Email Service
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=Wealthy Elephant <noreply@wealthyelephant.com>

# Frontend URL
FRONTEND_URL=https://www.wealthyelephant.com

# Server Configuration
NODE_ENV=production
PORT=5000
```

**Important:** Add these variables for all environments (Production, Preview, Development)

### Step 5: Deploy

Click "Deploy" button in Vercel dashboard.

Vercel will:
1. Clone your repository
2. Install dependencies
3. Build the project
4. Deploy to serverless functions

---

## 🔧 Post-Deployment Setup

### 1. Create Admin User

After first deployment, create the admin user:

**Option A: Using Vercel CLI**
```bash
vercel env pull .env.local
npm run create-admin
```

**Option B: Run Script Locally**
```bash
# Use your production DATABASE_URL
ts-node scripts/create-admin.ts
```

### 2. Update CORS Settings

Update `src/config/cors.ts` if needed to allow your Vercel domain:

```typescript
const allowedOrigins = [
  'https://www.wealthyelephant.com',
  'https://wealthyelephant.com',
  'https://your-vercel-domain.vercel.app', // Add your Vercel domain
];
```

### 3. Test Your Deployment

Visit your Vercel URL:
```
https://your-project.vercel.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "Wealthy Elephant API is running",
  "timestamp": "2026-02-20T12:00:00.000Z"
}
```

---

## 📡 API Endpoints

Your API will be available at:

```
https://your-project.vercel.app/api/auth/login
https://your-project.vercel.app/api/contact
https://your-project.vercel.app/api/klin/request
https://your-project.vercel.app/api/klin/intelligence
https://your-project.vercel.app/api/klin/partnership
https://your-project.vercel.app/api/kaizen/project
https://your-project.vercel.app/api/kaizen/buildplanner
https://your-project.vercel.app/api/newsletter
```

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your repository:

- **Production:** Pushes to `main` branch
- **Preview:** Pull requests and other branches

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys
```

---

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your custom domain: `api.wealthyelephant.com`
3. Follow DNS configuration instructions

### 2. Update DNS Records

Add these records to your domain provider:

**For subdomain (api.wealthyelephant.com):**
```
Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

**For root domain (wealthyelephant.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

### 3. Update Environment Variables

Update `FRONTEND_URL` if needed to match your production domain.

---

## 🐛 Troubleshooting

### Build Fails

**Error:** TypeScript compilation errors

**Solution:**
```bash
# Test build locally first
npm run build

# Fix any TypeScript errors
# Then commit and push
```

### Environment Variables Not Working

**Solution:**
1. Check variable names match exactly (case-sensitive)
2. Redeploy after adding variables
3. Check variables are set for correct environment

### Database Connection Issues

**Error:** "Missing Supabase environment variables"

**Solution:**
1. Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
2. Check `DATABASE_URL` includes `?schema=public&sslmode=require`
3. Test connection from local environment first

### CORS Errors

**Error:** "CORS policy blocked"

**Solution:**
1. Add your frontend domain to `src/config/cors.ts`
2. Redeploy the API
3. Clear browser cache

### Rate Limiting Issues

If rate limits are too strict for production:

Edit `src/middleware/rateLimiter.ts`:
```typescript
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // Increase from 100
  // ...
});
```

---

## 📊 Monitoring

### View Logs

1. Go to Vercel Dashboard → Your Project
2. Click "Deployments"
3. Select a deployment
4. Click "View Function Logs"

### Monitor Performance

Vercel provides:
- Request analytics
- Error tracking
- Performance metrics
- Bandwidth usage

Access via: Project → Analytics

---

## 🔐 Security Checklist

Before going live:

- [ ] All environment variables are set
- [ ] `JWT_SECRET` is strong and unique
- [ ] Admin password has been changed from default
- [ ] CORS is configured for production domain only
- [ ] Rate limiting is enabled
- [ ] Database RLS policies are active
- [ ] HTTPS is enforced (automatic on Vercel)
- [ ] API keys are not exposed in code

---

## 💰 Vercel Pricing

**Hobby Plan (Free):**
- 100 GB bandwidth/month
- Serverless function execution
- Automatic HTTPS
- Perfect for this API

**Pro Plan ($20/month):**
- 1 TB bandwidth
- Advanced analytics
- Team collaboration

---

## 🔄 Rollback Deployment

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

Or via CLI:
```bash
vercel rollback
```

---

## 📝 Environment-Specific Configs

### Development
```bash
vercel env add SUPABASE_URL development
```

### Preview
```bash
vercel env add SUPABASE_URL preview
```

### Production
```bash
vercel env add SUPABASE_URL production
```

---

## 🚀 Quick Deploy Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs <deployment-url>

# Pull environment variables
vercel env pull
```

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Project Issues:** wealthyelephant@gmail.com

---

## ✅ Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] Project imported to Vercel
- [ ] All environment variables configured
- [ ] First deployment successful
- [ ] Health check endpoint working
- [ ] Admin user created
- [ ] Test all API endpoints
- [ ] CORS configured correctly
- [ ] Custom domain added (optional)
- [ ] DNS records updated (if custom domain)
- [ ] Frontend updated with API URL
- [ ] Email service tested
- [ ] Rate limiting verified
- [ ] Error monitoring set up

---

**Your API is now live on Vercel! 🎉**

Access it at: `https://your-project.vercel.app`
