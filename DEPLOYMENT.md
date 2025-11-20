# TrueTenant Frontend - Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Prepare for Deployment

Your frontend is already configured to connect to:
**Backend API**: `https://truetenant-backend.onrender.com/api`

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
2. Click "New Project"
3. Import from GitHub: `devworkkunalp/TrueTenant-Frontend`
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variable:**
   - Name: `VITE_API_URL`
   - Value: `https://truetenant-backend.onrender.com/api`

6. Click "Deploy"
7. Wait 2-3 minutes for deployment

### Step 3: Update Backend CORS

After getting your Vercel URL (e.g., `https://truetenant.vercel.app`):

1. Update `Server/Program.cs` in backend repository
2. Add your Vercel URL to CORS:
   ```csharp
   policy.WithOrigins(
       "http://localhost:5174",
       "https://your-app.vercel.app"  // Your actual Vercel URL
   )
   ```
3. Commit and push to trigger backend redeploy

---

## 🎯 Alternative: Deploy to Netlify

### Step 1: Deploy

1. **Go to [Netlify](https://netlify.com)**
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub: `devworkkunalp/TrueTenant-Frontend`
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)

5. **Environment Variables:**
   - `VITE_API_URL` = `https://truetenant-backend.onrender.com/api`

6. Click "Deploy site"

---

## 🧪 Test Your Deployed App

1. Visit your deployed URL
2. Register a new account
3. Test KYC verification:
   - Aadhaar: `123456789012`
   - OTP: `123456`
4. Test all features:
   - Owner: Add property, view dashboard
   - Tenant: Submit request, make payment

---

## 🔧 Local Development

```bash
# Clone repository
git clone https://github.com/devworkkunalp/TrueTenant-Frontend.git
cd TrueTenant-Frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will use the production backend by default.

To use local backend, create `.env.local`:
```
VITE_API_URL=http://localhost:5170/api
```

---

## 📝 Environment Variables

### Production (.env.production)
```
VITE_API_URL=https://truetenant-backend.onrender.com/api
```

### Development (.env.development)
```
VITE_API_URL=http://localhost:5170/api
```

### Hosting Platform (Vercel/Netlify)
Set in dashboard:
```
VITE_API_URL=https://truetenant-backend.onrender.com/api
```

---

## ✅ Deployment Checklist

- [x] Backend deployed on Render
- [x] Environment files created
- [x] API service updated to use env variables
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Environment variable set in hosting platform
- [ ] Backend CORS updated with frontend URL
- [ ] Full flow tested

---

## 🆘 Troubleshooting

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check backend is running: https://truetenant-backend.onrender.com/api
- Check browser console for errors

### CORS Errors
- Update backend CORS with your frontend URL
- Wait for backend to redeploy
- Clear browser cache

### Build Failures
- Check Node.js version (18+)
- Run `npm install` to update dependencies
- Check build logs in Vercel/Netlify

---

## 💰 Cost

**Vercel/Netlify**: Free (Hobby/Starter plan)

---

## 🔗 Links

- **Backend**: https://truetenant-backend.onrender.com
- **Backend Repo**: https://github.com/devworkkunalp/TrueTenant-Backend
- **Frontend Repo**: https://github.com/devworkkunalp/TrueTenant-Frontend

---

## 🎉 Ready to Deploy!

Your frontend is configured and ready to deploy to Vercel or Netlify!
