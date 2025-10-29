# App Store Screenshots

## Requirements

### iPhone Screenshots
- **6.7" Display** (iPhone 14 Pro Max, 15 Pro Max): 1290 x 2796 pixels
- **6.5" Display** (iPhone 11 Pro Max, XS Max): 1242 x 2688 pixels  
- **5.5" Display** (iPhone 8 Plus): 1242 x 2208 pixels

### iPad Screenshots
- **12.9" Display** (iPad Pro): 2048 x 2732 pixels (portrait)

## Suggested Screenshots (in order)

1. **Dashboard - Main Screen**
   - Show countdown timer with years, months, days, hours, minutes, seconds
   - Display circular progress ring
   - Use dark or void theme for dramatic effect
   - Caption: "Your Time, Visualized"

2. **Progress Ring Close-up**
   - Focus on the beautiful progress visualization
   - Show percentage of life passed
   - Caption: "Beautiful Progress Tracking"

3. **Quote Card**
   - Display a powerful philosophical quote
   - Show clean, minimal design
   - Caption: "Daily Philosophical Inspiration"

4. **Themes Showcase**
   - Show all three themes side-by-side or in sequence
   - Light, Dark, Void
   - Caption: "Personalize Your Experience"

5. **Settings Screen**
   - Show tone options (Soft, Realistic, Philosophical)
   - Theme toggles
   - Caption: "Customize to Your Preferences"

## How to Generate Screenshots

### Option 1: Manual (Recommended for MVP)
1. Run the app on iOS Simulator with different device sizes
2. Navigate to each key screen
3. Use `Cmd + S` to save screenshots
4. Screenshots save to Desktop by default

### Option 2: Automated (Future Enhancement)
- Use Fastlane's `snapshot` tool
- Requires screenshot automation setup
- See: https://docs.fastlane.tools/getting-started/ios/screenshots/

## Design Tips

- Use **dark or void theme** for screenshots (more dramatic, stands out in App Store)
- Show **real countdown numbers** that look impressive
- Add **text overlays** with key features (use Figma, Canva, or Sketch)
- Ensure **high contrast** and **readability**
- Keep screenshots **simple and focused**—one feature per screenshot

## Tools for Adding Text/Overlays

- **Figma** (free): https://figma.com
- **Canva** (free): https://canva.com
- **Sketch** (Mac, paid): https://sketch.com
- **Apple Keynote** (Mac, free): Export slides as images

## TODO

- [ ] Generate iPhone 6.7" screenshots
- [ ] Generate iPhone 6.5" screenshots  
- [ ] Generate iPhone 5.5" screenshots
- [ ] Generate iPad Pro screenshots
- [ ] Add text overlays with feature callouts
- [ ] Review screenshots on different App Store themes (light/dark)
- [ ] Upload to App Store Connect

## Notes

Place final screenshots in this directory:
```
appstore/screenshots/
  ├── iphone-6.7/
  │   ├── 01-dashboard.png
  │   ├── 02-progress.png
  │   ├── 03-quote.png
  │   ├── 04-themes.png
  │   └── 05-settings.png
  ├── iphone-6.5/
  ├── iphone-5.5/
  └── ipad-12.9/
```
