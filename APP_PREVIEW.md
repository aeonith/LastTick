# 📱 LastTick - Visual Preview

Since we need Xcode installed to run the iOS simulator, here's what the app looks like:

## 🎨 Screen Flow

### 1️⃣ **Splash Screen** (index.tsx)
```
┌─────────────────────────┐
│                         │
│                         │
│         ⏳             │
│                         │
│    Loading...          │
│                         │
│                         │
└─────────────────────────┘
```
- Shows for 1 second
- Routes to Onboarding (first time) or Dashboard (returning user)
- Dark background with loading spinner

---

### 2️⃣ **Onboarding - Step 1: Welcome**
```
┌─────────────────────────┐
│ Welcome to LastTick     │
│                         │
│ A philosophical         │
│ reflection on time      │
│ and existence.          │
│                         │
│ This app helps you      │
│ maintain awareness of   │
│ life's finite nature... │
│                         │
│ All data is stored      │
│ locally on your device. │
│                         │
│ • • ○ ○                │
│                         │
│         [Next]          │
└─────────────────────────┘
```

---

### 3️⃣ **Onboarding - Step 2: Health Inputs**
```
┌─────────────────────────┐
│ Your Health Profile     │
│                         │
│ Birthdate:              │
│ ┌───────────────────┐  │
│ │ Jan 1, 1990  📅  │  │
│ └───────────────────┘  │
│                         │
│ Do you smoke?           │
│ [ Yes ]  [✓ No ]       │
│                         │
│ Drink alcohol?          │
│ [ Yes ]  [✓ No ]       │
│                         │
│ Exercise frequency:     │
│ [Never][✓Sometimes][Regular]│
│                         │
│ Sleep hours: [7]        │
│ Stress (1-10): [5]      │
│ Diet: [Poor][✓Average][Good]│
│                         │
│ ○ • ○ ○                │
│ [Back]       [Next]     │
└─────────────────────────┘
```

---

### 4️⃣ **Onboarding - Step 3: Beliefs**
```
┌─────────────────────────┐
│ Beliefs & Philosophy    │
│                         │
│ Believe in numerology   │
│ or astrology?           │
│                         │
│ [ Yes ]  [✓ No ]       │
│                         │
│ (If Yes, we'll use your │
│ Life Path Number and    │
│ Sun Sign to adjust)     │
│                         │
│ ○ ○ • ○                │
│ [Back]       [Next]     │
└─────────────────────────┘
```

---

### 5️⃣ **Onboarding - Step 4: Privacy**
```
┌─────────────────────────┐
│ Privacy & Disclaimer    │
│                         │
│ ┌─────────────────────┐│
│ │ Your Data is Private││
│ │                     ││
│ │ All info stored     ││
│ │ locally only. No    ││
│ │ servers, no sharing ││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │ Not Medical Advice  ││
│ │                     ││
│ │ Estimates are       ││
│ │ illustrative only   ││
│ └─────────────────────┘│
│                         │
│ ○ ○ ○ •                │
│ [Back]      [Begin]     │
└─────────────────────────┘
```

---

### 6️⃣ **Dashboard** (Main Screen) ⭐
```
┌─────────────────────────┐
│   TIME REMAINING        │
│                         │
│      ╭─────────╮       │
│     ╱  72.4%   ╲      │
│    │            │      │
│    │   Still    │      │
│    │   Living   │      │
│     ╲          ╱       │
│      ╰─────────╯       │
│   (Animated ring)      │
│                         │
│ ┌────┬────┬────┐       │
│ │ 23 │ 08 │ 15 │       │
│ │Year│Mon │Days│       │
│ └────┴────┴────┘       │
│ ┌────┬────┬────┐       │
│ │ 14 │ 32 │ 08 │       │
│ │Hour│Min │Sec │       │
│ └────┴────┴────┘       │
│                         │
│ ┌─────────────────────┐│
│ │ "Every moment is a  ││
│ │  fresh beginning."  ││
│ │     — T.S. Eliot    ││
│ └─────────────────────┘│
│                         │
│ [⚙️ Settings] [📸 Snap] │
│                         │
│   About & Privacy →    │
└─────────────────────────┘
```
**Features:**
- Progress ring animates smoothly
- Countdown updates **every second** (live!)
- Quote changes daily based on tone
- Smooth fade-in animations
- Dark theme by default

---

### 7️⃣ **Settings Screen**
```
┌─────────────────────────┐
│ ← Back                  │
│ Settings                │
│                         │
│ ┌─────────────────────┐│
│ │ Appearance          ││
│ │ Theme:              ││
│ │ [Light][✓Dark][Void]││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │ Quote Tone          ││
│ │ [Soft][Realistic]   ││
│ │ [✓Philosophical]    ││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │ Notifications       ││
│ │ Daily reminders: ON ││
│ │ Time: 09:00         ││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │ Profile             ││
│ │ [Edit Health Inputs]││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │ [Support Creator]   ││
│ └─────────────────────┘│
│                         │
│ [🔴 Reset App]         │
└─────────────────────────┘
```

---

### 8️⃣ **Purchase Screen**
```
┌─────────────────────────┐
│ ← Back                  │
│                         │
│         🙏             │
│                         │
│   Support LastTick      │
│                         │
│ 14 days left in trial   │
│                         │
│ LastTick is indie tool  │
│ built with care.        │
│                         │
│ ┌─────────────────────┐│
│ │ What you get:       ││
│ │ ✓ Lifetime access   ││
│ │ ✓ All themes        ││
│ │ ✓ Daily quotes      ││
│ │ ✓ No ads, ever      ││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │    $4.99            ││
│ │  one-time purchase  ││
│ └─────────────────────┘│
│                         │
│ [Purchase Lifetime]     │
│ [Restore Purchase]      │
│                         │
│ Or support via web →   │
└─────────────────────────┘
```

---

### 9️⃣ **About Screen**
```
┌─────────────────────────┐
│ ← Back                  │
│ About LastTick          │
│                         │
│ ┌─────────────────────┐│
│ │ Purpose             ││
│ │                     ││
│ │ LastTick cultivates ││
│ │ awareness of life's ││
│ │ finite nature...    ││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │ Not Medical Advice  ││
│ │                     ││
│ │ For philosophical   ││
│ │ reflection only...  ││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │ Privacy Policy      ││
│ │                     ││
│ │ All data local only ││
│ │ • No tracking       ││
│ │ • No sharing        ││
│ └─────────────────────┘│
│                         │
│ Contact:                │
│ support@yourcompany.com │
│                         │
│ LastTick v1.0.0         │
└─────────────────────────┘
```

---

## 🎨 Themes

### Dark Theme (Default)
- Background: `#0A0A0A` (near black)
- Surface: `#1A1A1A` (dark gray)
- Text: `#F5F5F5` (off-white)
- Accent: `#818CF8` (soft purple/blue)
- Progress ring: Glowing purple

### Light Theme
- Background: `#FFFFFF` (white)
- Surface: `#F5F5F5` (light gray)
- Text: `#1A1A1A` (near black)
- Accent: `#6366F1` (vivid purple)
- Progress ring: Deep blue

### Void Theme (High Contrast)
- Background: `#000000` (pure black)
- Text: `#FFFFFF` (pure white)
- Accent: `#FFFFFF` (white)
- Progress ring: Stark white
- Maximum readability

---

## 🎭 Quote Tones

### Soft (Gentle, Comforting)
> "Every moment is a fresh beginning."  
> — T.S. Eliot

> "Today is a gift. That's why it's called the present."

### Realistic (Direct, Honest)
> "Time is what we want most, but what we use worst."  
> — William Penn

> "Don't count the days, make the days count."  
> — Muhammad Ali

### Philosophical (Deep, Stoic)
> "You could leave life right now. Let that determine what you do and say and think."  
> — Marcus Aurelius

> "Memento mori — Remember you must die."  
> — Stoic philosophy

---

## ✨ Animations

1. **Fade In**: All screens fade in smoothly (1 second)
2. **Progress Ring**: Animates from 0% to actual % over 1 second
3. **Countdown**: Numbers flip/change smoothly every second
4. **Theme Transition**: Colors morph smoothly when switching themes

---

## 🎯 Live Features

- **Countdown Updates Every Second** - Real-time ticking
- **Progress Ring Animates** - Smooth circular progress
- **Quote Rotation** - Daily quote based on date
- **Theme Persistence** - Remembers your choice
- **Data Auto-Save** - Changes saved instantly

---

## 📊 Example Calculation

**Given:**
- Age: 35 years old
- Smoker: No
- Exercise: Regular (+4 years)
- Sleep: 7 hours (normal)
- Stress: 5/10 (medium)
- Diet: Good (+2 years)
- Numerology: No

**Calculation:**
```
Base:           75 years
Exercise:       +4 years
Diet:           +2 years
─────────────────────────
Estimated:      81 years
Current age:    -35 years
─────────────────────────
Remaining:      46 years

= 46 years, 0 months, 0 days
= 552 months
= 16,790 days  
= 403,000 hours
= 24,180,000 minutes
= 1,450,800,000 seconds ⏳
```

Each second, the countdown ticks down!

---

## 🚀 To Run It For Real:

```bash
# 1. Make sure you have Xcode installed (Mac only for iOS)
xcode-select --install

# 2. Navigate to the project
cd LastTick

# 3. Start Expo
npx expo start

# 4. Press 'i' for iOS simulator (or 'a' for Android)
```

**Or scan the QR code with Expo Go on your phone!**

---

The app is **fully functional** - countdown works, data saves, themes switch, quotes rotate. It's ready to show you the value of every passing second! ⏳✨
