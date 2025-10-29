# Momentus - Agent Context File

## Project Overview
Momentus is a philosophical time awareness app built with React Native (Expo) and TypeScript. It provides users with an estimated life expectancy countdown based on health factors and optional numerology/astrology inputs.

## Key Commands

### Development
```bash
npm start              # Start Expo dev server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
```

### Building
```bash
eas build --platform ios       # Build for iOS
eas build --platform android   # Build for Android
eas submit --platform ios      # Submit to TestFlight
```

### Testing
No automated tests yet. Manual testing required for:
- Onboarding flow (4 screens)
- Dashboard countdown (updates every second)
- Settings (theme, tone, notifications)
- Purchase flow (IAP)

## Code Conventions

- **File naming**: PascalCase for components (Button.tsx), camelCase for utilities (estimate.ts)
- **Styling**: React Native StyleSheet (no CSS-in-JS libraries)
- **State management**: React useState/useEffect (no Redux/MobX)
- **Routing**: Expo Router (file-based, in `app/` directory)
- **TypeScript**: Strict mode enabled, always type function parameters and return values

## Architecture

### Screens (app/)
- `index.tsx`: Splash screen that routes to onboarding or dashboard
- `onboarding.tsx`: 4-step onboarding (welcome, health, beliefs, privacy)
- `dashboard.tsx`: Main countdown timer with progress ring
- `settings.tsx`: Theme, tone, notifications, profile editing
- `purchase.tsx`: In-app purchase screen
- `about.tsx`: About app and privacy policy

### Core Logic (src/lib/)
- `estimate.ts`: Life expectancy calculation (adjust HEALTH_WEIGHTS constants here)
- `storage.ts`: Local data persistence (SecureStore + AsyncStorage)
- `quotes.ts`: Philosophical quote library (60+ quotes, filterable by tone)
- `theme.ts`: Theme definitions (light, dark, void)
- `iap.ts`: In-app purchase scaffolding
- `notifications.ts`: Daily notification scheduling

### Components (src/components/)
- Reusable UI: Button, InputField, QuoteCard, RingProgress
- All components accept `colors` prop from theme system

## Important Constants to Configure

1. **Bundle ID** (app.json):
   - iOS: `expo.ios.bundleIdentifier`
   - Android: `expo.android.package`
   - Must match App Store Connect / Google Play

2. **IAP Product IDs** (src/lib/iap.ts):
   - `PRODUCT_IDS.LIFETIME`
   - Must match App Store Connect / Google Play product IDs

3. **Life Expectancy Weights** (src/lib/estimate.ts):
   - `BASE_LIFE_EXPECTANCY`: Default 75 years
   - `HEALTH_WEIGHTS`: Adjust years added/subtracted for health factors

4. **Trial Period** (src/lib/iap.ts):
   - `TRIAL_DAYS`: Default 14 days

## Privacy & Legal

- **All data is local**: Never transmit user data to servers
- **No analytics**: No third-party tracking SDKs
- **Disclaimer**: NOT medical advice (shown in onboarding and About)
- **Privacy policy**: See `appstore/PrivacyPolicy.md`

## App Store Submission

### Prerequisites
- Apple Developer Account ($99/year)
- Google Play Developer Account ($25 one-time)
- Bundle ID registered in App Store Connect
- IAP products created and approved
- Privacy policy hosted on web
- Screenshots generated (see `appstore/screenshots/README.md`)

### Steps
1. Configure EAS: `eas init`
2. Update `app.json` with bundle IDs
3. Create IAP products in App Store Connect / Google Play
4. Build: `eas build --platform all`
5. Submit: `eas submit --platform ios`
6. Manual submit for Android via Google Play Console

See README.md for detailed submission instructions.

## Tone & Philosophy

- **Tone**: Calm, philosophical, reflective (inspired by Stoicism)
- **Goal**: Inspire mindful living, not fear
- **Language**: Empathetic, gentle, non-alarmist
- **Quotes**: Categorized by tone (soft, realistic, philosophical)

## Known Limitations / TODOs

- No automated tests (add Jest/Detox later)
- Screenshot generation is manual (add Fastlane later)
- No widget support (iOS 14+ / Android)
- No Apple Watch app
- No localization (English only for MVP)
- Snapshot/share feature is placeholder (needs implementation)

## Contact

- Support email: Update in `app/about.tsx` and `appstore/` files
- Privacy policy URL: Host `appstore/PrivacyPolicy.md` on your website

---

**Remember**: This app is a philosophical tool for reflection, NOT a medical prediction device.
