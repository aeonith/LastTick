# 🍎 Get LastTick on the App Store - Step-by-Step

## ⏱️ Time Required: 2-4 hours + 1-3 days review wait

---

## STEP 1: Get Apple Developer Account (30 min)

### What you need:
- Apple ID
- $99/year payment
- Business/personal info

### How to do it:
1. Go to: **https://developer.apple.com/programs/enroll/**
2. Click **"Start Your Enrollment"**
3. Sign in with your Apple ID
4. Choose **Individual** or **Organization**
5. Fill out the form
6. Pay **$99** (annual fee)
7. **Wait 24-48 hours** for approval email

**⏸️ STOP HERE until you get approval email from Apple**

---

## STEP 2: Change Your Bundle ID (2 min)

### What to do:
1. Open file: `app.json`
2. Find line 17: `"bundleIdentifier": "com.yourcompany.lasttick"`
3. Change to: `"bundleIdentifier": "com.YOURNAME.lasttick"`
   - Example: `"com.johnsmith.lasttick"`
   - Use your name or company
4. Also change line 29 (Android): `"package": "com.YOURNAME.lasttick"`
5. Save the file

**Important:** Use lowercase, no spaces, no special characters

---

## STEP 3: Get App Icons (30 min - 2 hours)

You need a 1024x1024 pixel icon.

### Option A: Hire Designer (Recommended, $20-50)
- **Fiverr**: https://fiverr.com (search "app icon design")
- **Upwork**: https://upwork.com
- Tell them: "I need a minimalist hourglass icon for a philosophical time app called LastTick. 1024x1024 PNG."

### Option B: Make It Yourself (Free)
1. Go to **Canva**: https://canva.com
2. Create 1024x1024 design
3. Use hourglass emoji ⏳ or draw simple hourglass
4. Add dark background
5. Download as PNG

### What to do with icons:
```bash
cd /Users/christianmorrow/LastTick

# Add these files:
assets/icon.png           (1024x1024)
assets/splash.png         (1284x2778 - can be simple logo on black)
assets/adaptive-icon.png  (1024x1024 - same as icon.png)
```

**Quick hack:** Just put the same 1024x1024 icon for all three files to start

---

## STEP 4: Install EAS CLI (5 min)

### What to do:
```bash
# Install EAS globally
npm install -g eas-cli

# Login to Expo (create free account)
eas login
# Enter email and password (you'll create an account)

# Initialize EAS in your project
cd /Users/christianmorrow/LastTick
eas init
```

This will:
- Create Expo account (free)
- Generate project ID
- Link your app to EAS build service

**Copy the project ID** it gives you and add to `app.json`:
```json
"extra": {
  "eas": {
    "projectId": "PASTE-YOUR-PROJECT-ID-HERE"
  }
}
```

---

## STEP 5: Create Firebase Project (15 min)

### What to do:
1. Go to: **https://console.firebase.google.com**
2. Click **"Add project"**
3. Name it: **LastTick**
4. Disable Google Analytics (not needed)
5. Click **"Create project"**

### Add Web App:
1. Click **"Web"** icon (</>)
2. Name it: **LastTick Web**
3. Copy the config values

### Enable Authentication:
1. Go to **Build** → **Authentication**
2. Click **"Get Started"**
3. Click **"Email/Password"**
4. Toggle **Enable**
5. Click **Save**

### Update your code:
Open `src/lib/firebaseConfig.ts` and replace:
```typescript
const firebaseConfig = {
  apiKey: "PASTE-FROM-FIREBASE",
  authDomain: "PASTE-FROM-FIREBASE",
  projectId: "PASTE-FROM-FIREBASE",
  storageBucket: "PASTE-FROM-FIREBASE",
  messagingSenderId: "PASTE-FROM-FIREBASE",
  appId: "PASTE-FROM-FIREBASE"
};
```

**Save the file**

---

## STEP 6: Create App in App Store Connect (10 min)

### What to do:
1. Go to: **https://appstoreconnect.apple.com**
2. Click **"My Apps"** → **"+"** → **"New App"**
3. Fill in:
   - **Platform:** iOS
   - **Name:** LastTick
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** Select `com.yourname.lasttick` (the one you set in Step 2)
   - **SKU:** `lasttick-001`
4. Click **"Create"**

---

## STEP 7: Create In-App Purchase (10 min)

### In App Store Connect:
1. Go to your LastTick app
2. Click **"Features"** → **"In-App Purchases"**
3. Click **"+"** button
4. Select **"Non-Consumable"**
5. Fill in:
   - **Product ID:** `com.yourname.lasttick.lifetime` (match your bundle!)
   - **Reference Name:** `Lifetime Access`
   - **Price:** Click and select **$4.99 USD (Tier 5)**

6. **Add Localization** (English):
   - **Display Name:** `Lifetime Access`
   - **Description:** `Unlock LastTick forever. One-time purchase of $4.99 for lifetime access. No recurring charges.`

7. **Review Information:**
   - Upload a screenshot (can be placeholder for now)

8. Click **"Save"**

**Update your code:**
Open `src/lib/iap.ts` line 31 and make sure it matches:
```typescript
ios: 'com.YOURNAME.lasttick.lifetime',
```

---

## STEP 8: Build Your App (20 min)

### What to do:
```bash
cd /Users/christianmorrow/LastTick

# Build for iOS
eas build --platform ios

# EAS will ask:
# "Generate a new Apple Distribution Certificate?" → YES
# "Generate a new Apple Provisioning Profile?" → YES

# Wait 15-20 minutes...
# You'll get a download link when done
```

**What happens:**
- EAS builds your app in the cloud
- Generates signing certificates
- Creates `.ipa` file (iOS app file)
- Gives you download link

---

## STEP 9: Submit to App Store (30 min)

### Option A: Automatic (Easier)
```bash
eas submit --platform ios

# Select the build you just created
# EAS uploads it to App Store Connect
```

### Option B: Manual
1. Download `.ipa` from EAS
2. Download **Transporter** app from Mac App Store
3. Open Transporter
4. Drag `.ipa` file into Transporter
5. Click **"Deliver"**

**Wait 10-15 minutes for processing**

---

## STEP 10: Add App Information (45 min)

### In App Store Connect:

1. **App Information:**
   - **Subtitle:** "Philosophical Time Awareness"
   - **Category:** Health & Fitness
   - **Age Rating:** 4+

2. **Pricing:**
   - **Price:** Free (your IAP is the purchase)

3. **App Privacy:**
   - Click **"Get Started"**
   - **Do you collect data?** YES
   - **What data?**
     - Email Addresses (for account authentication)
     - Health data (stored locally, for app functionality)
   - **Used for tracking?** NO
   - **Shared with third parties?** NO

4. **Build:**
   - Select the build you uploaded
   - Wait for it to finish processing (green checkmark)

5. **Screenshots:**
   - Need 5 screenshots
   - Quick way: Run app, take screenshots with Cmd+S
   - Or hire designer on Fiverr ($20)

6. **Description:** 
   Copy from `appstore/AppStoreMetadata.md`

7. **Keywords:**
   ```
   time,awareness,philosophy,stoic,memento mori,life,mindfulness,reflection,countdown
   ```

8. **Support URL:** Your website or email

9. **Privacy Policy URL:**
   - Host the file `appstore/PrivacyPolicy.md` somewhere
   - GitHub Pages (free): https://pages.github.com
   - Or your own website

---

## STEP 11: Add Review Notes (5 min)

Scroll to **"App Review Information"**

**Notes for Reviewer:**
```
Hello Apple Review Team,

LastTick is a philosophical reflection app that estimates time remaining 
based on user health inputs. This helps users appreciate life's finite nature.

IMPORTANT: 
- NOT medical advice (disclaimers shown throughout app)
- Estimates are illustrative only
- For philosophical reflection

Test Instructions:
1. Create account (any email/password)
2. Complete onboarding (enter any birthdate and health info)
3. View dashboard with countdown timer
4. Check Settings to see themes

No demo account needed - just create one during review.

Monetization:
- 2 months free trial
- Then $4.99 one-time purchase for lifetime access

Contact: [YOUR EMAIL HERE]

Thank you!
```

---

## STEP 12: Submit for Review! (1 min)

1. Check all fields are filled
2. Click **"Add for Review"** button
3. Click **"Submit to App Review"**

**✅ DONE!**

**Wait 1-3 days for Apple to review**

---

## 📱 WHAT HAPPENS NEXT

### Day 1-3: Review
- Apple reviews your app
- Tests all features
- Checks compliance

### Possible Outcomes:

**✅ APPROVED:**
- You'll get email: "Your app is Ready for Sale"
- It appears in App Store immediately
- You can download it!

**❌ REJECTED:**
- You'll get email with reason
- Fix the issues
- Resubmit
- Usually approved on 2nd try

---

## 💰 Total Costs

- **Apple Developer:** $99/year (required)
- **App Icons:** $0-50 (optional, can use emoji)
- **Firebase:** $0 (free tier is plenty)
- **EAS Builds:** $0 (free tier: unlimited builds)
- **Hosting:** $0 (GitHub Pages for privacy policy)

**Minimum Total: $99/year**

---

## 🐛 Common Issues & Fixes

### "Bundle ID already exists"
- Change `com.yourname.lasttick` to something unique
- Try: `com.yourname.lasttickapp` or `com.yourfullname.lasttick`

### "Build failed"
- Check you added app icons
- Check bundle ID has no spaces
- Run: `eas build --platform ios` again

### "Screenshots missing"
- Need at least 1 screenshot
- Take from simulator: Cmd+S
- Or use placeholder image temporarily

### "Privacy policy URL required"
- Host `appstore/PrivacyPolicy.md` on GitHub Pages
- Or paste in a simple HTML page somewhere

---

## 🚀 QUICK SUMMARY

```bash
# 1. Get Apple Developer account ($99)
# → https://developer.apple.com/programs/enroll/

# 2. Change bundle ID in app.json (line 17)

# 3. Add icons to assets/ folder

# 4. Setup Firebase
# → https://console.firebase.google.com
# → Update src/lib/firebaseConfig.ts

# 5. Install EAS
npm install -g eas-cli
eas login
cd /Users/christianmorrow/LastTick
eas init

# 6. Build
eas build --platform ios

# 7. Submit
eas submit --platform ios

# 8. Fill in App Store Connect
# → Add screenshots, description, keywords

# 9. Submit for review

# 10. Wait 1-3 days

# 11. APPROVED! 🎉
```

---

## ✅ YOUR APP IS READY

Everything is coded and functional. You just need to:
1. Get Apple account
2. Change bundle ID
3. Add icons
4. Setup Firebase
5. Build & submit

**See you on the App Store!** 🚀
