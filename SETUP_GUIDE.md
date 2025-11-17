# Vishwashauryam Defence Club - Setup & Deployment Guide

## 📋 Prerequisites
- Google account for Firebase
- Basic knowledge of Firebase Console
- Web browser
- Text editor (VS Code, Sublime, etc.)

---

## 🔥 FIREBASE SETUP

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `vishwashauryam-defence-club` (or your choice)
4. Disable Google Analytics (optional, can enable later)
5. Click **"Create project"**
6. Wait for project creation, then click **"Continue"**

### Step 2: Register Web App

1. In Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Event Registration Website`
3. **Check** "Also set up Firebase Hosting" (for easy deployment)
4. Click **"Register app"**
5. **COPY** the Firebase configuration object shown (you'll need this!)
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
6. Click **"Continue to console"**

### Step 3: Configure Firestore Database

1. In Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll set rules next)
4. Choose a location closest to your users (e.g., `asia-south1` for India)
5. Click **"Enable"**

### Step 4: Set Firestore Security Rules

1. In Firestore Database, click the **"Rules"** tab
2. Replace the default rules with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow anonymous users to write to registrations collection
       match /registrations/{document=**} {
         allow read: if false; // No public reads
         allow write: if request.auth != null; // Only authenticated users (anonymous auth)
       }
     }
   }
   ```
3. Click **"Publish"**

### Step 5: Enable Anonymous Authentication

1. In Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"** (if first time)
3. Go to **"Sign-in method"** tab
4. Click on **"Anonymous"**
5. Toggle **"Enable"**
6. Click **"Save"**

### Step 6: Update Your Code

1. Open `app.js` in your text editor
2. Find the `firebaseConfig` object (around line 10)
3. **Replace** the placeholder values with your actual Firebase config from Step 2
4. Save the file

---

## 🚀 DEPLOYMENT OPTIONS

### Option A: Firebase Hosting (Recommended)

#### Install Firebase CLI
```bash
# Install Node.js first from https://nodejs.org/ (if not installed)

# Install Firebase CLI globally
npm install -g firebase-tools
```

#### Deploy Steps
```bash
# 1. Login to Firebase
firebase login

# 2. Navigate to your project folder
cd path/to/your/project

# 3. Initialize Firebase Hosting
firebase init hosting

# Follow the prompts:
# - Select your Firebase project
# - Set public directory: . (current directory)
# - Configure as single-page app: No
# - Set up automatic builds: No
# - Don't overwrite index.html if asked

# 4. Deploy to Firebase
firebase deploy --only hosting

# Your site will be live at: https://your-project-id.web.app
```

#### Update Deployment
```bash
# After making changes, redeploy with:
firebase deploy --only hosting
```

---

### Option B: Netlify (Alternative)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up/Login
3. Drag and drop your project folder (containing index.html, styles.css, app.js)
4. Your site will be live instantly at a Netlify URL
5. Can customize domain in site settings

---

### Option C: GitHub Pages

1. Create a GitHub repository
2. Upload your files (index.html, styles.css, app.js)
3. Go to repository **Settings** → **Pages**
4. Select branch (usually `main`) and root folder
5. Click **Save**
6. Your site will be live at: `https://username.github.io/repository-name`

---

### Option D: Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Import your repository or drag-drop files
5. Deploy - site goes live instantly

---

## 🧪 TESTING LOCALLY

### Simple HTTP Server (Python)
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## ✅ POST-DEPLOYMENT CHECKLIST

- [ ] Firebase config updated in `app.js`
- [ ] Firestore database created and rules set
- [ ] Anonymous authentication enabled
- [ ] Website deployed and accessible
- [ ] Test registration form submission
- [ ] Check Firestore for new registration entries
- [ ] Test on mobile devices
- [ ] Update contact information in footer

---

## 📊 VIEW REGISTRATIONS

### Firebase Console
1. Go to Firebase Console → Firestore Database
2. Click on `registrations` collection
3. View all submitted registrations with timestamps

### Export Data
1. In Firestore, select documents
2. Use Firebase CLI or third-party tools to export
3. Or manually copy data for small datasets

---

## 🔒 SECURITY NOTES

- Anonymous authentication is enabled for easy registration
- Firestore rules prevent public reads (data privacy)
- Only authenticated users can write (prevents spam to some extent)
- Consider adding reCAPTCHA for production use
- Monitor Firebase usage to stay within free tier limits

---

## 💰 FIREBASE FREE TIER LIMITS

- **Firestore**: 50K reads, 20K writes, 20K deletes per day
- **Hosting**: 10 GB storage, 360 MB/day transfer
- **Authentication**: Unlimited anonymous sign-ins

For most college events, free tier is sufficient!

---

## 🆘 TROUBLESHOOTING

### Registration not working?
- Check browser console for errors (F12)
- Verify Firebase config is correct in `app.js`
- Ensure anonymous auth is enabled
- Check Firestore rules are published

### Firebase errors?
- Clear browser cache
- Check Firebase project is active
- Verify billing account (even for free tier)

### Deployment issues?
- Ensure all files are in the same directory
- Check file names match exactly (case-sensitive)
- Verify Firebase CLI is logged in: `firebase login`

---

## 📞 SUPPORT

For Firebase issues: [Firebase Support](https://firebase.google.com/support)
For deployment help: Check respective platform documentation

---

## 🎉 YOU'RE DONE!

Your military-themed event registration website is now live and ready to accept registrations!

**Next Steps:**
1. Share the website URL with students
2. Monitor registrations in Firebase Console
3. Customize content as needed
4. Add more features (payment gateway, email confirmations, etc.)

Good luck with your event! 🎖️
