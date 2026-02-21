# 🚀 Vercel Quick Start - 5 Minutes to Deploy

Deploy your Wealthy Elephant Backend API to Vercel in 5 simple steps.

## Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/wealthy-elephant-backend.git

# Push
git push -u origin main
```

## Step 2: Import to Vercel (1 minute)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository
4. Click "Import"

## Step 3: Configure Environment Variables (1 minute)

Click "Environment Variables" and add these:

```
SUPABASE_URL=https://wwmhtdwjdlogeyrcpawy.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:e%2Fp_%23ggd4Wci%25iY@wwmhtdwjdlogeyrcpawy.supabase.co:5432/postgres?schema=public&sslmode=require
JWT_SECRET=w8H4f9vG2xR7KpYqLz6BvN1sJmC0tQeU5aD9kR3yXoF1hLwZpV4uE7bS8nT2cM
RESEND_API_KEY=re_18HoaviK_3XL8HKU8AuoLcQZjpkoHQ1rV
FROM_EMAIL=Wealthy Elephant <noreply@wealthyelephant.com>
FRONTEND_URL=https://www.wealthyelephant.com
NODE_ENV=production
PORT=5000
```

**Important:** Add for all environments (Production, Preview, Development)

## Step 4: Deploy (30 seconds)

Click "Deploy" button and wait for build to complete.

## Step 5: Test Your API (30 seconds)

Visit your deployment URL:
```
https://your-project.vercel.app/health
```

You should see:
```json
{
  "success": true,
  "message": "Wealthy Elephant API is running",
  "timestamp": "2026-02-20T12:00:00.000Z"
}
```

## ✅ Done!

Your API is now live at: `https://your-project.vercel.app`

### Next Steps:

1. **Create Admin User:**
```bash
npm run create-admin
```

2. **Test Login:**
```bash
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wealthyelephant@gmail.com","password":"admin@elephant"}'
```

3. **Update Frontend:**
Update your frontend API URL to: `https://your-project.vercel.app`

4. **Add Custom Domain (Optional):**
- Go to Vercel Dashboard → Settings → Domains
- Add: `api.wealthyelephant.com`
- Update DNS records as instructed

---

## 🎯 Your API Endpoints

All endpoints are now live:

- `GET /health` - Health check
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/contact` - Contact form
- `POST /api/klin/request` - Rental request
- `POST /api/klin/intelligence` - Intelligence check
- `POST /api/klin/partnership` - Partnership request
- `POST /api/kaizen/project` - Project request
- `POST /api/kaizen/buildplanner` - Build planner
- `POST /api/newsletter` - Newsletter subscription

---

## 🔄 Auto-Deploy

Every time you push to `main` branch, Vercel automatically deploys:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel deploys automatically!
```

---

## 📞 Need Help?

- Full Guide: [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)
- Checklist: [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
- Support: wealthyelephant@gmail.com

---

**🎉 Congratulations! Your API is live on Vercel!**
