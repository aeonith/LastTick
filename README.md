# LastTick - Time Awareness App

> A philosophical reflection tool for time awareness. Not medical advice—just mindful living.

LastTick provides an estimated countdown of your remaining life based on health factors and optional numerology/astrology inputs. Inspired by Stoic philosophy and the practice of "Memento Mori" (remember you must die), this app helps you live with greater intention and presence.

---

## 🎯 Features

- **Life Expectancy Estimation**: Based on age, health factors (smoking, exercise, sleep, diet, stress)
- **Real-Time Countdown**: Years, months, days, hours, minutes, seconds remaining
- **Circular Progress Visualization**: Beautiful animated ring showing % of estimated life passed
- **Daily Philosophical Quotes**: 60+ quotes with tone filtering (Soft / Realistic / Philosophical)
- **Three Stunning Themes**: Light, Dark, Void (high contrast)
- **Numerology & Astrology**: Optional Life Path Number and Sun Sign adjustments
- **Daily Notifications**: Customizable reminders with tone-specific content
- **Complete Privacy**: All data stored locally—no servers, no tracking
- **In-App Purchase**: Optional one-time purchase with 14-day trial

---

## 📱 Tech Stack

- **Framework**: React Native (Expo) + TypeScript
- **Router**: Expo Router (file-based routing)
- **Storage**: Expo SecureStore + AsyncStorage
- **Notifications**: Expo Notifications
- **In-App Purchases**: Expo In-App Purchases
- **Build Tool**: EAS (Expo Application Services)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Apple Developer Account (for iOS)
- Google Play Developer Account (for Android)

### Installation

```bash
# Clone the repository
cd LastTick

# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

---

## 🧪 Development

### Project Structure

```
LastTick/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Splash/router
│   ├── onboarding.tsx     # Onboarding flow
│   ├── dashboard.tsx      # Main countdown screen
│   ├── settings.tsx       # Settings
│   ├── purchase.tsx       # IAP screen
│   └── about.tsx          # About & Privacy
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── InputField.tsx
│   │   ├── QuoteCard.tsx
│   │   └── RingProgress.tsx
│   └── lib/              # Core logic
│       ├── estimate.ts   # Life expectancy calculations
│       ├── storage.ts    # Local storage wrapper
│       ├── quotes.ts     # Quote library
│       ├── theme.ts      # Theme definitions
│       ├── iap.ts        # In-app purchase logic
│       └── notifications.ts # Notification system
├── appstore/             # App Store assets
│   ├── AppStoreMetadata.md
│   ├── PrivacyPolicy.md
│   └── screenshots/
├── assets/               # Icons, images, fonts
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
└── package.json
```

### Key Configuration Files

#### `app.json`
Update these values before building:
- `expo.ios.bundleIdentifier`: Your iOS bundle ID (e.g., `com.yourcompany.lasttick`)
- `expo.android.package`: Your Android package name (must match iOS for IAP)
- `expo.extra.eas.projectId`: Your EAS project ID (get from `eas init`)

#### `src/lib/estimate.ts`
Adjust health factor weights:
```typescript
const HEALTH_WEIGHTS = {
  smoker: -7,              // Adjust as needed
  heavyDrinker: -3,
  exercise: { ... },
  // etc.
};
```

#### `src/lib/iap.ts`
Configure product IDs and monetization mode:
```typescript
export const PRODUCT_IDS = {
  LIFETIME: 'com.yourcompany.lasttick.lifetime',
};
export const TRIAL_DAYS = 14;
```

---

## 📦 Building for Production

### Step 1: Configure EAS

```bash
# Login to Expo
eas login

# Initialize EAS project
eas init

# Update eas.json with your project ID
```

### Step 2: Configure App Store Connect (iOS)

1. **Create App in App Store Connect**
   - Go to https://appstoreconnect.apple.com
   - Click "+" → "New App"
   - Bundle ID: `com.yourcompany.lasttick` (must match app.json)
   - Name: "LastTick"

2. **Create In-App Purchase**
   - Go to your app → Features → In-App Purchases
   - Click "+" → Non-Consumable
   - Product ID: `com.yourcompany.lasttick.lifetime`
   - Reference Name: "Lifetime Access"
   - Set pricing tier (e.g., $4.99)
   - Add localizations
   - Submit for review with app

3. **Add App Privacy Details**
   - App Store Connect → App Privacy
   - Select "No, we do not collect data from this app"
   - (All data is local only)

4. **Upload Screenshots**
   - See `appstore/screenshots/README.md`
   - Generate screenshots for required device sizes
   - Upload in App Store Connect

5. **Fill Metadata**
   - Copy content from `appstore/AppStoreMetadata.md`
   - Add description, keywords, screenshots
   - Add privacy policy URL (host `appstore/PrivacyPolicy.md` on your website)

### Step 3: Configure Google Play Console (Android)

1. **Create App in Google Play Console**
   - Go to https://play.google.com/console
   - Create app → Fill in details
   - Package name: `com.yourcompany.lasttick` (must match iOS)

2. **Create In-App Product**
   - Monetize → Products → In-app products
   - Create product
   - Product ID: `com.yourcompany.lasttick.lifetime` (match iOS)
   - Type: One-time
   - Set pricing

3. **Add Store Listing**
   - Use metadata from `appstore/AppStoreMetadata.md`
   - Upload screenshots (landscape + portrait)
   - Add privacy policy

### Step 4: Build with EAS

```bash
# Build for iOS (TestFlight)
eas build --platform ios

# Build for Android (Internal Testing)
eas build --platform android

# Build for both
eas build --platform all
```

This will:
- Build your app in the cloud
- Generate `.ipa` (iOS) and `.aab` (Android) files
- Provide download links

### Step 5: Submit to TestFlight

```bash
# Submit iOS build to TestFlight
eas submit --platform ios
```

Or manually:
1. Download `.ipa` from EAS build
2. Upload to App Store Connect via Transporter app
3. Go to TestFlight → Select build → Add to testers

### Step 6: Submit for Review

**iOS (App Store Connect):**
1. Go to App Store Connect → Your App → Version
2. Add build from TestFlight
3. Fill all required metadata
4. Submit for review
5. Wait 1-3 days for approval

**Android (Google Play):**
1. Upload `.aab` to Internal Testing track
2. Test with internal testers
3. Promote to Production
4. Submit for review

---

## 🔐 Privacy & Security

**All data is stored locally. Nothing is transmitted to servers.**

- Birthdate & health inputs: Stored in Expo SecureStore (encrypted)
- Preferences: Stored in AsyncStorage
- No analytics, no tracking, no third-party SDKs (except Apple/Google IAP)

Users can delete all data via Settings → Reset App.

---

## ⚖️ Legal & Disclaimers

### Medical Disclaimer
This app is **NOT medical advice**. Life expectancy estimates are illustrative only and based on statistical averages. Users should consult healthcare professionals for medical concerns.

### Data Privacy
See `appstore/PrivacyPolicy.md` for full privacy policy.

### App Store Review Notes
See `appstore/AppStoreMetadata.md` → "App Review Notes" section for what to tell Apple/Google reviewers.

---

## 🎨 Customization

### Adjust Life Expectancy Weights

Edit `src/lib/estimate.ts`:
```typescript
const BASE_LIFE_EXPECTANCY = 75; // Change base age

const HEALTH_WEIGHTS = {
  smoker: -7,              // Years subtracted for smoking
  heavyDrinker: -3,        // Years subtracted for heavy drinking
  exercise: {
    never: 0,
    sometimes: 1,
    regular: 4,            // Years added for regular exercise
  },
  // ... adjust as needed
};
```

### Add More Quotes

Edit `src/lib/quotes.ts`:
```typescript
export const QUOTES: Quote[] = [
  { 
    text: "Your new quote here", 
    author: "Author Name", 
    tones: ['philosophical'] 
  },
  // ... add more
];
```

### Change Themes

Edit `src/lib/theme.ts`:
```typescript
export const THEMES: Record<Theme, ThemeColors> = {
  dark: {
    background: '#0A0A0A',  // Change colors
    accent: '#818CF8',
    // ...
  },
};
```

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npx expo start --clear
```

### EAS build fails
- Check `eas.json` configuration
- Verify bundle identifier matches App Store Connect
- Check EAS build logs for specific errors

### IAP not working
- Ensure product IDs match exactly (iOS + Android)
- Products must be approved in App Store Connect before testing
- Use sandbox accounts for testing
- Android: Must upload to at least Internal Testing track

### Notifications not appearing
- Request permissions: check Settings screen
- iOS: Check device notification settings
- Android: Check channel settings

---

## 📸 Screenshots & Assets

### Required Assets

1. **App Icon**: `assets/icon.png` (1024x1024)
2. **Splash Screen**: `assets/splash.png` (1284x2778 recommended)
3. **Adaptive Icon** (Android): `assets/adaptive-icon.png` (1024x1024)
4. **Notification Icon** (Android): `assets/notification-icon.png` (96x96, monochrome)

### Generate Screenshots

See `appstore/screenshots/README.md` for detailed instructions.

Quick method:
1. Run app on iOS Simulator (different device sizes)
2. Navigate to key screens
3. `Cmd + S` to save screenshots
4. Add text overlays in Figma/Canva

---

## ✅ Pre-Launch Checklist

- [ ] Update `app.json` with your bundle ID and package name
- [ ] Replace placeholder support email in About screen
- [ ] Host privacy policy on your website
- [ ] Update privacy policy URL in `app.json`
- [ ] Configure IAP products in App Store Connect & Google Play
- [ ] Update IAP product IDs in `src/lib/iap.ts`
- [ ] Generate app icons and splash screens
- [ ] Test onboarding flow thoroughly
- [ ] Test IAP purchase and restore flows
- [ ] Test on multiple device sizes
- [ ] Generate and upload screenshots
- [ ] Fill in App Store metadata
- [ ] Test notification permissions and scheduling
- [ ] Verify all links work (support email, privacy policy)
- [ ] Run on physical devices (iOS + Android)
- [ ] Submit to TestFlight for beta testing
- [ ] Gather feedback from beta testers
- [ ] Submit for App Store review

---

## 🤝 Contributing

This is a personal philosophical project. If you'd like to fork and customize for your own use, feel free! Just remember:

- Keep the philosophical, reflective tone
- Maintain privacy-first principles (no data collection)
- Include proper disclaimers (not medical advice)

---

## 📄 License

MIT License - see LICENSE file

---

## 🙏 Credits & Inspiration

- **Philosophy**: Marcus Aurelius, Seneca, Epictetus (Stoicism)
- **Concept**: Memento Mori - "Remember you must die"
- **Design**: Minimalist, focused on essential information

---

## 📧 Support

For questions, issues, or feedback:
- **Email**: support@yourcompany.com
- **Website**: https://yourwebsite.com/lasttick

---

## 🎯 Roadmap (Future Enhancements)

- [ ] Apple Watch app with countdown complication
- [ ] Widget support (iOS 14+ / Android)
- [ ] Share countdown as image card
- [ ] Export data to JSON
- [ ] Multiple life scenarios (e.g., "If I quit smoking")
- [ ] Customizable countdown units
- [ ] More quote sources (Buddhism, Existentialism, etc.)
- [ ] Localization (Spanish, French, German, etc.)
- [ ] Dark mode automation (based on sunset)
- [ ] Haptic feedback for milestone moments

---

**Remember: This app is a philosophical tool, not a prediction. Use it to inspire presence, intention, and gratitude—not fear.**

*"You could leave life right now. Let that determine what you do and say and think." — Marcus Aurelius*
