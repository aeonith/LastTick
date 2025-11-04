# Health Tracking Feature - Implementation Guide

## Overview

The Health Tracking feature integrates Apple HealthKit to provide real-time, dynamic life expectancy estimates based on actual health metrics from Apple Watch and iPhone.

## Features

### Data Collected (Read-Only)
- **Heart Rate**: Average and resting heart rate
- **Heart Rate Variability**: HRV metrics
- **Blood Oxygen (SpO₂)**: Oxygen saturation levels
- **Sleep Analysis**: Hours and quality of sleep
- **Steps**: Daily step count
- **Active Energy**: Calories burned through activity
- **Mindfulness**: Minutes spent in mindfulness/meditation

### Privacy & Security
- ✅ All data stays on device
- ✅ Read-only access (no writes to HealthKit)
- ✅ Encrypted local storage
- ✅ Never transmitted to servers
- ✅ User can disable anytime
- ✅ Fully Apple compliant

## How It Works

### 1. User Enables Health Tracking
- Navigate to Health Dashboard via Dashboard → 📊 Health button
- Tap "Enable Health Tracking"
- iOS prompts for HealthKit permissions
- App fetches last 7 days of health data

### 2. Health Metrics Analysis
The app analyzes health data and generates:

**Positive Adjustments (Add Years)**
- Excellent heart health (RHR < 60 bpm): +1.5 years
- Optimal sleep (7-9 hours): +2 years
- High blood oxygen (≥97%): +0.5 years
- Active lifestyle (≥10,000 steps/day): +2 years
- Regular mindfulness (≥70 min/week): +1 year

**Negative Adjustments (Subtract Years)**
- Elevated heart rate (>90 bpm): -1.5 years
- Sleep deficit (<6 hours): -2 years
- Low blood oxygen (<95%): -1 year
- Low activity (<5,000 steps/day): -1.5 years

### 3. Real-Time Updates
- Dashboard countdown updates every second with health-adjusted estimate
- Health data refreshes when user pulls to refresh on Health screen
- Cached locally for performance

## Files & Components

### Core Logic
- **`src/lib/healthkit.ts`**: HealthKit integration, permissions, data fetching
- **`src/lib/estimate.ts`**: Updated to accept health adjustments
- **`src/lib/storage.ts`**: Health metrics storage functions

### UI Components
- **`app/health.tsx`**: Health Dashboard screen
- **`app/dashboard.tsx`**: Updated to show health button and use health data

### Configuration
- **`app.json`**: HealthKit permissions and plugin configuration
- **`appstore/PrivacyPolicy.md`**: Updated privacy policy

## Apple Compliance

### Info.plist Permissions
```xml
<key>NSHealthShareUsageDescription</key>
<string>LastTick uses your health data to provide a more accurate life expectancy estimate based on your actual heart rate, sleep, activity, and wellness metrics. All data stays on your device and is never transmitted to servers.</string>

<key>NSHealthUpdateUsageDescription</key>
<string>LastTick does not write any health data.</string>
```

### Required App Store Settings
1. **App Privacy Details**:
   - Health & Fitness: Yes, collected for Analytics only
   - Data linked to user: None
   - Data used to track user: None
   - Check "Data Not Collected"

2. **HealthKit Capability**:
   - Enabled in Xcode project
   - Read-only permissions specified

3. **Privacy Policy**:
   - Must be hosted on public URL
   - Updated to include HealthKit usage
   - Link in App Store Connect

## Testing

### Manual Testing Checklist
- [ ] Enable health tracking prompts for permissions
- [ ] Health data fetches successfully
- [ ] Insights generate based on metrics
- [ ] Life expectancy adjusts dynamically
- [ ] Pull-to-refresh updates data
- [ ] Disable health tracking works
- [ ] Data persists after app restart
- [ ] Works without HealthKit data (graceful degradation)

### Test Data Scenarios
1. **Healthy User**: Good sleep, low heart rate, high steps → Positive adjustment
2. **Unhealthy User**: Poor sleep, high heart rate, low steps → Negative adjustment
3. **No Data**: No HealthKit data available → No adjustment applied
4. **Partial Data**: Only some metrics available → Partial adjustment

## Deployment

### Before Submitting to App Store
1. ✅ Privacy policy updated and hosted
2. ✅ Info.plist permissions added
3. ✅ HealthKit entitlement enabled in Xcode
4. ✅ Test on physical device with actual HealthKit data
5. ✅ App Store Connect privacy details filled
6. ✅ Screenshots include Health Dashboard

### Build Commands
```bash
# Development build with HealthKit
eas build --profile development --platform ios

# Production build
eas build --profile production --platform ios

# Submit to TestFlight
eas submit --platform ios
```

## Troubleshooting

### Common Issues

**HealthKit not available**
- Only works on iOS devices (not simulator without setup)
- Check device supports HealthKit
- Verify permissions granted in Settings → Health → Data Access & Devices

**No data showing**
- User may not have HealthKit data recorded
- Check date range (last 7 days)
- Verify Apple Watch is paired and syncing

**TypeScript errors**
- Install `react-native-health` types if available
- Use `any` type casts for HealthKit API responses (documented in code)

**Build errors**
- Run `npx pod-install` (iOS)
- Ensure `react-native-health` plugin configured in app.json
- Check HealthKit entitlement in Xcode

## Future Enhancements

- [ ] Weekly/monthly trend graphs
- [ ] Export health reports
- [ ] Apple Watch complication
- [ ] Health insights notifications
- [ ] Integration with other health metrics (weight, BMI, etc.)
- [ ] Comparison with population averages
- [ ] Health goals and recommendations

## Support

For issues or questions:
- Review privacy policy at hosted URL
- Contact: support@yourcompany.com
- GitHub Issues: [Your Repo URL]

---

**Remember**: This is a philosophical tool for reflection, NOT medical advice. Always consult healthcare professionals for medical decisions.
