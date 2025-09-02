# OAuth Setup Guide for PITCHLY

This guide walks you through setting up Google and Apple OAuth for your PITCHLY application.

## 🚀 Current Status
- ✅ Google OAuth provider enabled in NextAuth
- ✅ Apple OAuth provider enabled in NextAuth  
- ✅ Database tables created for OAuth accounts
- ✅ Sign-in page has Google/Apple buttons
- ⏳ Need real OAuth credentials

## 📝 Prerequisites
1. **Database setup**: Run the `create_oauth_tables.sql` script in your Supabase database
2. **Domain ownership**: You'll need a verified domain for production OAuth
3. **HTTPS**: OAuth providers require HTTPS in production

---

## 🔵 Google OAuth Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API** or **People API**

### Step 2: Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - **App name**: PITCHLY
   - **User support email**: your-email@domain.com
   - **Developer contact**: your-email@domain.com
   - **App domain**: https://yourdomain.com
   - **Authorized domains**: yourdomain.com

### Step 3: Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Select **Web application**
4. Configure:
   - **Name**: PITCHLY Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

### Step 4: Update Environment Variables
```bash
# .env.local
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 🍎 Apple Sign-In Setup

### Step 1: Apple Developer Account
- You need a paid Apple Developer account ($99/year)
- Go to [Apple Developer Portal](https://developer.apple.com/)

### Step 2: Create App ID
1. Go to **Certificates, Identifiers & Profiles**
2. Click **Identifiers** → **+** (Add)
3. Select **App IDs** → **App**
4. Configure:
   - **Description**: PITCHLY Web App
   - **Bundle ID**: `com.yourcompany.pitchly` (explicit)
   - **Capabilities**: Enable **Sign In with Apple**

### Step 3: Create Services ID
1. Go to **Identifiers** → **+** (Add)
2. Select **Services IDs**
3. Configure:
   - **Description**: PITCHLY Sign In Service
   - **Identifier**: `com.yourcompany.pitchly.signin`
   - Enable **Sign In with Apple**
   - Click **Configure** next to Sign In with Apple:
     - **Primary App ID**: Select the App ID created above
     - **Web Domain**: `yourdomain.com`
     - **Return URLs**: 
       - `http://localhost:3000/api/auth/callback/apple` (development)
       - `https://yourdomain.com/api/auth/callback/apple` (production)

### Step 4: Create Private Key
1. Go to **Keys** → **+** (Add)
2. Configure:
   - **Key Name**: PITCHLY Sign In Key
   - Enable **Sign In with Apple**
   - Click **Configure** → Select your App ID
3. **Download the key file** (you can only download once!)
4. Note the **Key ID** shown

### Step 5: Generate Client Secret
Apple requires a JWT token as the client secret. You have two options:

#### Option A: Use online generator (easier)
1. Go to a JWT generator like [jwt.io](https://jwt.io/) or use a library
2. Create JWT with these claims:
```json
{
  "iss": "YOUR_TEAM_ID",
  "iat": 1234567890,
  "exp": 1234567890,
  "aud": "https://appleid.apple.com",
  "sub": "com.yourcompany.pitchly.signin"
}
```

#### Option B: Generate programmatically
```javascript
// You'll need the jose library: npm install jose
const { SignJWT } = require('jose');
const fs = require('fs');

const privateKey = fs.readFileSync('path/to/AuthKey_KEYID.p8', 'utf8');
const teamId = 'YOUR_TEAM_ID'; // From Apple Developer account
const keyId = 'YOUR_KEY_ID'; // From the key you created
const serviceId = 'com.yourcompany.pitchly.signin';

const clientSecret = await new SignJWT({})
  .setProtectedHeader({ alg: 'ES256', kid: keyId })
  .setIssuedAt()
  .setIssuer(teamId)
  .setAudience('https://appleid.apple.com')
  .setSubject(serviceId)
  .setExpirationTime('6m') // Apple allows max 6 months
  .sign(privateKey);
```

### Step 6: Update Environment Variables
```bash
# .env.local
APPLE_ID=com.yourcompany.pitchly.signin
APPLE_SECRET=your-generated-jwt-token
```

---

## 🛠️ Testing & Troubleshooting

### Local Testing
1. Make sure your OAuth tables are created in Supabase
2. Set the development environment variables
3. Run `npm run dev`
4. Visit `http://localhost:3000/auth/signin`
5. Try the Google/Apple login buttons

### Common Issues

**Google OAuth**:
- ❌ "redirect_uri_mismatch": Check your authorized redirect URIs
- ❌ "invalid_client": Verify client ID and secret
- ❌ "access_denied": User cancelled or app not approved

**Apple Sign-In**:
- ❌ "invalid_client": Check your Services ID and client secret (JWT)
- ❌ "invalid_request": Verify your redirect URIs match exactly
- ❌ JWT expired: Regenerate the client secret (max 6 months)

**Database Issues**:
- ❌ "relation does not exist": Run the OAuth tables SQL script
- ❌ RLS policy issues: Make sure the service role can access NextAuth tables

### Production Checklist
- [ ] HTTPS enabled on your domain
- [ ] OAuth redirect URIs updated to production URLs
- [ ] Environment variables set in production
- [ ] Database permissions configured
- [ ] Test all OAuth flows in production

---

## 🎯 Next Steps After OAuth Setup

1. **Test thoroughly** with real users
2. **Add password authentication** as fallback option
3. **Set up Stripe** for payment processing  
4. **Implement email notifications** for better UX
5. **Add user profile linking** (merge accounts)

## 📞 Need Help?

If you run into issues:
1. Check the browser console for error messages
2. Look at your NextAuth debug logs
3. Verify all redirect URIs match exactly
4. Test with different browsers/devices
5. Check Apple/Google developer console logs

Remember: OAuth setup can be finicky, but once it works, it provides a much better user experience than email-only authentication!