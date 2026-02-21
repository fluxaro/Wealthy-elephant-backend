# 🚀 Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment

### Code Preparation
- [ ] All code is committed to Git
- [ ] `.env` file is NOT committed (check .gitignore)
- [ ] Build runs successfully locally (`npm run build`)
- [ ] All tests pass locally
- [ ] No TypeScript errors
- [ ] Dependencies are up to date

### Environment Setup
- [ ] Supabase database is set up and accessible
- [ ] All database tables are created (run schema.sql)
- [ ] Resend email service is configured
- [ ] Domain is verified in Resend
- [ ] JWT secret is generated and secure

### Repository
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is accessible
- [ ] Main branch is up to date

---

## Vercel Configuration

### Project Setup
- [ ] Vercel account created
- [ ] Project imported from Git repository
- [ ] Framework preset: Other
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Install command: `npm install`

### Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

#### Required Variables
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `DATABASE_URL`
- [ ] `JWT_SECRET`
- [ ] `RESEND_API_KEY`
- [ ] `FROM_EMAIL`
- [ ] `FRONTEND_URL`
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`

#### Environment Scope
- [ ] Variables added for Production
- [ ] Variables added for Preview
- [ ] Variables added for Development

---

## First Deployment

### Deploy
- [ ] Click "Deploy" in Vercel dashboard
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors
- [ ] Deployment successful (green checkmark)

### Verify Deployment
- [ ] Health check endpoint works: `https://your-project.vercel.app/health`
- [ ] Returns correct JSON response
- [ ] No 500 errors in logs

---

## Post-Deployment Setup

### Admin User
- [ ] Run `npm run create-admin` script
- [ ] Admin user created in database
- [ ] Login credentials saved securely
- [ ] Test admin login: POST `/api/auth/login`

### API Testing
Test all endpoints:
- [ ] `GET /health` - Health check
- [ ] `POST /api/auth/login` - Admin login
- [ ] `GET /api/auth/verify` - Token verification
- [ ] `POST /api/contact` - Contact form
- [ ] `POST /api/klin/request` - Klin rental request
- [ ] `POST /api/klin/intelligence` - Intelligence check
- [ ] `POST /api/klin/partnership` - Partnership request
- [ ] `POST /api/kaizen/project` - Kaizen project
- [ ] `POST /api/kaizen/buildplanner` - Build planner
- [ ] `POST /api/newsletter` - Newsletter subscription

### Email Testing
- [ ] Contact form sends email
- [ ] Klin request sends email
- [ ] Klin intelligence sends email
- [ ] Klin partnership sends email
- [ ] Kaizen project sends email
- [ ] Build planner sends email
- [ ] Newsletter sends email
- [ ] All emails have correct branding
- [ ] All social links work

### Security Verification
- [ ] CORS is configured correctly
- [ ] Only allowed origins can access API
- [ ] Rate limiting is working
- [ ] JWT authentication works
- [ ] Admin routes are protected
- [ ] Database RLS policies are active
- [ ] No sensitive data in logs

---

## Custom Domain (Optional)

### Domain Configuration
- [ ] Custom domain added in Vercel
- [ ] DNS records updated
- [ ] SSL certificate issued
- [ ] Domain is accessible
- [ ] HTTPS is enforced

### Update References
- [ ] Frontend updated with new API URL
- [ ] CORS updated with custom domain
- [ ] Environment variables updated if needed

---

## Frontend Integration

### Update Frontend
- [ ] API base URL updated to Vercel URL
- [ ] All API calls tested from frontend
- [ ] CORS errors resolved
- [ ] Authentication flow works
- [ ] Form submissions work
- [ ] Error handling works

---

## Monitoring & Maintenance

### Set Up Monitoring
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured
- [ ] Log monitoring set up
- [ ] Performance metrics reviewed

### Documentation
- [ ] API documentation updated with production URL
- [ ] Team members have access to Vercel project
- [ ] Environment variables documented
- [ ] Deployment process documented

---

## Final Checks

### Production Readiness
- [ ] All endpoints return correct responses
- [ ] No console errors in browser
- [ ] No server errors in Vercel logs
- [ ] Email notifications working
- [ ] Database operations successful
- [ ] Rate limiting tested
- [ ] Load testing completed (if needed)

### Security Audit
- [ ] Admin password changed from default
- [ ] JWT secret is strong and unique
- [ ] No API keys exposed in frontend
- [ ] HTTPS only (no HTTP)
- [ ] Security headers configured
- [ ] Input validation working

### Performance
- [ ] API response times acceptable
- [ ] Database queries optimized
- [ ] No memory leaks
- [ ] Serverless functions cold start acceptable

---

## Rollback Plan

### If Deployment Fails
- [ ] Previous deployment URL saved
- [ ] Rollback procedure documented
- [ ] Database backup available
- [ ] Team notified of issues

### Rollback Steps
1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Verify rollback successful
5. Investigate and fix issues
6. Redeploy when ready

---

## Post-Launch

### Week 1
- [ ] Monitor error logs daily
- [ ] Check API performance
- [ ] Review user feedback
- [ ] Fix any critical bugs

### Ongoing
- [ ] Regular security updates
- [ ] Dependency updates
- [ ] Performance optimization
- [ ] Feature enhancements

---

## Emergency Contacts

- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support
- **Resend Support:** https://resend.com/support
- **Team Lead:** wealthyelephant@gmail.com

---

## Notes

Add any deployment-specific notes here:

```
Deployment Date: _______________
Deployed By: _______________
Vercel URL: _______________
Custom Domain: _______________
Issues Encountered: _______________
Resolution: _______________
```

---

**✅ Deployment Complete!**

Your Wealthy Elephant Backend API is now live on Vercel! 🎉
