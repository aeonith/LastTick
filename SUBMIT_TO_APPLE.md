# 🍎 How to Submit LastTick to Apple App Store

## 📋 QUICK CHECKLIST

Before you start, you need:
- [ ] Apple Developer Account ($99/year) - [Sign up here](https://developer.apple.com/programs/enroll/)
- [ ] Mac computer (required for iOS builds)
- [ ] This app code (✅ you have it!)
- [ ] 30-60 minutes of time

---

## 🚀 STEP-BY-STEP GUIDE

### Step 1: Get Apple Developer Account (If You Don't Have One)

1. Go to: https://developer.apple.com/programs/enroll/
2. Click "Start Your Enrollment"
3. Sign in with your Apple ID
4. Pay $99/year
5. Wait 24-48 hours for approval

**Cost:** $99/year  
**Time:** 1-2 days for approval

---

### Step 2: Configure Your Bundle ID

1. **Open the file:** `app.json`

2. **Find this line (line 17):**
   ```json
   "bundleIdentifier": "com.yourcompany.lasttick",
   ```

3. **Change to YOUR company name:**
   ```json
   "bundleIdentifier": "com.YOURNAME.lasttick",
   ```
   
   Example: `com.johnsmith.lasttick` or `com.mycompany.lasttick`

4. **Also change line 29 (Android):**
   ```json
   "package": "com.YOURNAME.lasttick",
   ```

5. **Save the file**

**Why:** This unique ID identifies your app in the App Store

---

### Step 3: Add App Icons

You need a 1024x1024 pixel app icon.

**Option A: Hire a Designer**
- Fiverr: $10-50
- Upwork: $20-100
- Search: "app icon design"

**Option B: Make It Yourself**
- Use Canva (free): https://canva.com
- Use Figma (free): https://figma.com
- Make a simple ⏳ hourglass icon

**What to do:**
1. Create icon.png (1024x1024)
2. Save to: `assets/icon.png`
3. Also create: `assets/adaptive-icon.png` (Android)
4. Also create: `assets/splash.png` (splash screen)

**Quick tip:** Search "hourglass icon" and customize colors

---

### Step 4: Install EAS CLI

```bash
# Install EAS (Expo Application Services)
npm install -g eas-cli

# Login to Expo
eas login
# Enter your email and create account (free)

# Initialize EAS in your project
cd /Users/christianmorrow/LastTick
eas init
```

This will:
- Create an Expo account (free)
- Link your project to EAS
- Generate a project ID

**Copy the project ID** and paste it in `app.json`:
```json
"extra": {
  "eas": {
    "projectId": "PASTE-ID-HERE"
  }
}
```

**Time:** 5 minutes

---

### Step 5: Create App in App Store Connect

1. **Go to:** https://appstoreconnect.apple.com
2. **Click:** "My Apps" → "+" button → "New App"
3. **Fill in:**
   - Platform: iOS
   - Name: **LastTick**
   - Primary Language: English (U.S.)
   - Bundle ID: Select the one you created (com.yourname.lasttick)
   - SKU: `lasttick-001` (can be anything unique)
   - User Access: Full Access

4. **Click "Create"**

**Time:** 2 minutes

---

### Step 6: Create In-App Purchase Product

1. **In App Store Connect**, go to your LastTick app
2. **Click:** "Features" → "In-App Purchases"
3. **Click:** "+" button
4. **Select:** "Non-Consumable"
5. **Fill in:**
   - Product ID: `com.yourname.lasttick.lifetime` (match your bundle ID!)
   - Reference Name: `LastTick Lifetime Access`
   - Price: $4.99 USD
   
6. **Add Localization:**
   - Display Name: `Lifetime Access`
   - Description: `Unlock LastTick forever with a one-time purchase of $4.99. No recurring charges.`

7. **Add Screenshot** (can be same as app screenshot)

8. **Click "Save"**

**Time:** 5 minutes

---

### Step 7: Host Your Privacy Policy

1. **Get the privacy policy:** `appstore/PrivacyPolicy.md`
2. **Convert to HTML or host as is**

**Option A: Use GitHub Pages (FREE)**
```bash
# Copy privacy policy to a simple HTML file
# Upload to GitHub
# Enable GitHub Pages in repo settings
# URL will be: https://yourusername.github.io/LastTick/privacy.html
```

**Option B: Use Your Own Website**
- Upload to your website
- URL: https://yourwebsite.com/lasttick-privacy

**Option C: Use a Free Host**
- https://pages.github.com (free)
- https://netlify.com (free)
- https://vercel.com (free)

3. **Update app.json** with the URL:
```json
"privacyPolicyUrl": "https://yoursite.com/privacy"
```

**Time:** 10 minutes

---

### Step 8: Build the App with EAS

```bash
cd /Users/christianmorrow/LastTick

# Build for iOS
eas build --platform ios

# This will:
# - Ask you to configure credentials (press Enter to auto-generate)
# - Build your app in the cloud
# - Give you a download link
# 
# Wait 10-20 minutes for build to complete
```

**Time:** 15-20 minutes (mostly waiting)

---

### Step 9: Submit to TestFlight (Beta Testing)

```bash
# Submit the build to Apple
eas submit --platform ios

# OR manually:
# 1. Download the .ipa file from EAS
# 2. Use Apple Transporter app to upload
```

After upload:
1. Go to App Store Connect → TestFlight
2. Your build will appear (wait ~10 minutes for processing)
3. Add yourself as a tester
4. Install TestFlight app on your iPhone
5. Test the app!

**Time:** 20 minutes + testing time

---

### Step 10: Generate Screenshots

You need 5 screenshots for the App Store.

**Quick Method:**
```bash
# 1. Run on iPhone simulator
cd /Users/christianmorrow/LastTick
npx expo start

# Press 'i' for iOS simulator
# Navigate through the app
# Press Cmd+S to save screenshots
```

**Required Screenshots:**
1. **Dashboard** - Show countdown and progress ring
2. **Onboarding** - Show health inputs
3. **Quotes** - Show quote card
4. **Themes** - Show theme options
5. **Purchase** - Show pricing (2 months free + $4.99)

**Sizes Needed:**
- iPhone 6.7" Display: 1290 x 2796
- iPad Pro 12.9": 2048 x 2732

**Time:** 30 minutes

---

### Step 11: Fill Out App Store Information

1. **Go to App Store Connect** → Your App → "App Store" tab

2. **Screenshots:** Upload your 5 screenshots

3. **Description:** Copy from `appstore/AppStoreMetadata.md`

4. **Keywords:** 
   ```
   time,awareness,philosophy,stoic,memento mori,life,mindfulness,reflection,countdown
   ```

5. **Support URL:** Your website or email

6. **Privacy Policy URL:** The URL you hosted in Step 7

7. **Category:**
   - Primary: Health & Fitness
   - Secondary: Lifestyle

8. **Age Rating:** 4+

**Time:** 15 minutes

---

### Step 12: Add App Privacy Details

1. **Go to:** App Privacy section
2. **Click:** "Get Started"

3. **Answer these questions:**
   - **Do you collect data?** No (all data is local only)
   - **Do you use data for tracking?** No
   - **Do you share data?** No

4. **Click "Publish"**

**Time:** 5 minutes

---

### Step 13: Add Review Notes for Apple

1. **In App Store Connect**, scroll to "App Review Information"

2. **Add these notes:**
```
Hi Apple Review Team,

LastTick is a philosophical reflection app that helps users appreciate time.

IMPORTANT: This is NOT a medical app.
- Multiple disclaimers shown (welcome screen, onboarding, dashboard, about page)
- States clearly: "Not medical advice, for philosophical reflection only"

How it works:
1. User enters birthdate and health data (local storage only)
2. App estimates life expectancy using statistical averages
3. Shows countdown timer and progress ring
4. Displays daily philosophical quotes

Monetization:
- 2 months FREE trial (all features unlocked)
- Then $4.99 one-time purchase for lifetime access
- No subscriptions, no recurring charges

Privacy:
- All data stored locally on device
- No server uploads
- No tracking or analytics

Demo Account: NOT NEEDED (no login required)

To test: Just open app, complete onboarding with any birthdate, 
view dashboard with countdown timer.

Questions? Contact: [YOUR EMAIL]

Thank you!
```

3. **Add your contact email**

**Time:** 5 minutes

---

### Step 14: Submit for Review!

1. **Select your build** from TestFlight
2. **Check all required fields** are filled
3. **Click:** "Add for Review"
4. **Click:** "Submit to App Review"

**Wait:** 1-3 days for Apple review

---

## 🎯 QUICK VERSION (TL;DR)

```bash
# 1. Install EAS
npm install -g eas-cli
eas login

# 2. Change bundle ID in app.json (line 17 & 29)
# Replace: com.yourcompany.lasttick → com.YOURNAME.lasttick

# 3. Add icons to assets/ folder
# icon.png, adaptive-icon.png, splash.png

# 4. Build
cd /Users/christianmorrow/LastTick
eas build --platform ios

# 5. Submit
eas submit --platform ios

# 6. Go to App Store Connect and fill in:
# - Screenshots (5 images)
# - Description (copy from appstore/AppStoreMetadata.md)
# - Privacy policy URL
# - Create IAP product
# - Submit for review
```

**Total Time:** 2-3 hours (mostly waiting for builds)

---

## 💰 COSTS

- **Apple Developer Account:** $99/year (required)
- **App Icon Design:** $0-50 (optional, can make yourself)
- **EAS Builds:** FREE (limited builds per month, plenty for this)
- **Hosting Privacy Policy:** FREE (GitHub Pages)

**Total:** $99/year minimum

---

## 📞 NEED HELP?

If you get stuck:
1. Check `README.md` for detailed instructions
2. Check `APPLE_STORE_COMPLIANCE.md` for compliance questions
3. EAS docs: https://docs.expo.dev/submit/introduction/
4. App Store Connect help: https://developer.apple.com/app-store-connect/

---

## ✅ YOUR APP IS READY

Everything is coded and functional. You just need to:
1. Get Apple Developer account
2. Change bundle ID
3. Add icons
4. Build with EAS
5. Submit

**That's it!** 🚀
