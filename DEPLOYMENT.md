# Deployment Guide - Wealthy Elephant Backend

Complete deployment guide for the Wealthy Elephant Backend API.

## 🎯 Deployment Options

1. **Vercel (Recommended)** - Serverless, automatic scaling, free tier
2. **Railway** - Container-based, simple setup
3. **Render** - Free tier available, easy deployment
4. **DigitalOcean** - VPS hosting, full control
5. **AWS/Azure/GCP** - Enterprise solutions

---

## 🚀 Vercel Deployment (Recommended)

### Why Vercel?
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS
- ✅ Serverless functions
- ✅ Automatic deployments from Git
- ✅ Built-in CDN
- ✅ Zero configuration needed

### Quick Start

1. **Push to Git**
```bash
git init
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
- Go to https://vercel.com
- Click "Add New Project"
- Import your repository
- Configure environment variables
- Click "Deploy"

3. **Set Environment Variables**

In Vercel Dashboard → Settings → Environment Variables:

```env
SUPABASE_URL=https://wwmhtdwjdlogeyrcpawy.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:password@host:5432/postgres?schema=public&sslmode=require
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=Wealthy Elephant <noreply@wealthyelephant.com>
FRONTEND_URL=https://www.wealthyelephant.com
NODE_ENV=production
PORT=5000
```

4. **Create Admin User**
```bash
npm run create-admin
```

5. **Test Deployment**
```
https://your-project.vercel.app/health
```

### Detailed Guide
See [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md) for complete instructions.

---

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t wealthy-elephant-api .

# Run container
docker run -p 5000:5000 --env-file .env wealthy-elephant-api
```

---

## 🚂 Railway Deployment

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login and Initialize**
```bash
railway login
railway init
```

3. **Add Environment Variables**
```bash
railway variables set SUPABASE_URL=your_url
railway variables set JWT_SECRET=your_secret
# ... add all variables
```

4. **Deploy**
```bash
railway up
```

---

## 🎨 Render Deployment

1. **Create render.yaml**
```yaml
services:
  - type: web
    name: wealthy-elephant-api
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

2. **Connect Repository**
- Go to https://render.com
- New → Web Service
- Connect your Git repository
- Add environment variables
- Deploy

---

## 🌊 DigitalOcean Deployment

### Using App Platform

1. **Create App**
- Go to DigitalOcean Dashboard
- Apps → Create App
- Connect GitHub repository

2. **Configure**
- Build Command: `npm run build`
- Run Command: `npm start`
- Add environment variables

3. **Deploy**
- Click "Create Resources"
- Wait for deployment

### Using Droplet (VPS)

```bash
# SSH into droplet
ssh root@your_droplet_ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Clone repository
git clone your_repo_url
cd wealthy-elephant-backend

# Install dependencies
npm install

# Build
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start dist/server.js --name wealthy-elephant-api
pm2 save
pm2 startup
```

---

## ☁️ AWS Deployment

### Using Elastic Beanstalk

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize**
```bash
eb init -p node.js wealthy-elephant-api
```

3. **Create Environment**
```bash
eb create production
```

4. **Set Environment Variables**
```bash
eb setenv SUPABASE_URL=your_url JWT_SECRET=your_secret
```

5. **Deploy**
```bash
eb deploy
```

---

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJhbGc...` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `JWT_SECRET` | Secret for JWT tokens | Random 64+ char string |
| `RESEND_API_KEY` | Resend email API key | `re_xxx` |
| `FROM_EMAIL` | Email sender address | `noreply@domain.com` |
| `FRONTEND_URL` | Frontend application URL | `https://domain.com` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change admin password from default
- [ ] Use strong JWT secret (64+ characters)
- [ ] Enable HTTPS only
- [ ] Configure CORS for production domain
- [ ] Set up rate limiting
- [ ] Enable database RLS policies
- [ ] Remove console.log statements
- [ ] Set NODE_ENV=production
- [ ] Secure environment variables
- [ ] Enable error monitoring

---

## 📊 Post-Deployment

### 1. Create Admin User
```bash
npm run create-admin
```

### 2. Test All Endpoints
```bash
# Health check
curl https://your-api-url.com/health

# Login
curl -X POST https://your-api-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wealthyelephant@gmail.com","password":"admin@elephant"}'
```

### 3. Monitor Logs
- Check deployment platform logs
- Monitor error rates
- Track API performance

### 4. Update Frontend
Update your frontend with the new API URL:
```javascript
const API_URL = 'https://your-api-url.com';
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Test build locally
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Database Connection Issues
- Verify DATABASE_URL includes `?schema=public&sslmode=require`
- Check Supabase service role key is correct
- Ensure database is accessible from deployment platform

### CORS Errors
- Add deployment URL to CORS whitelist in `src/config/cors.ts`
- Redeploy after changes

### Email Not Sending
- Verify RESEND_API_KEY is correct
- Check FROM_EMAIL domain is verified in Resend
- Review Resend dashboard for errors

---

## 📈 Scaling

### Vercel
- Automatically scales with traffic
- No configuration needed
- Monitor usage in dashboard

### Traditional Hosting
- Use PM2 cluster mode
- Set up load balancer
- Add more server instances

```bash
# PM2 cluster mode
pm2 start dist/server.js -i max
```

---

## 💾 Backup Strategy

### Database Backups
- Supabase provides automatic backups
- Set up additional backup schedule
- Test restore procedures

### Code Backups
- Git repository is primary backup
- Tag releases: `git tag v1.0.0`
- Keep deployment history

---

## 📞 Support

- **Deployment Issues:** Check platform-specific documentation
- **API Issues:** wealthyelephant@gmail.com
- **Emergency:** Use rollback procedures

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)

---

**Ready to deploy? Follow the [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)!**
