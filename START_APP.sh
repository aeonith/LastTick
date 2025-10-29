#!/bin/bash

echo "🚀 Starting LastTick..."
echo ""

# Increase file limit
ulimit -n 65536

# Navigate to project
cd /Users/christianmorrow/LastTick

# Clear any previous Metro instances
pkill -f expo 2>/dev/null
pkill -f metro 2>/dev/null

echo "📦 Installing any missing packages..."
npm install --legacy-peer-deps

echo ""
echo "🔥 Starting Expo Dev Server..."
echo ""
echo "════════════════════════════════════════════════"
echo "  📱 TO SEE THE APP:"
echo "════════════════════════════════════════════════"
echo "  1. Download 'Expo Go' app on your iPhone/Android"
echo "  2. Scan the QR code that appears below"
echo "  3. The app will load on your phone!"
echo ""
echo "  OR press 'w' for web version"
echo "════════════════════════════════════════════════"
echo ""

# Start Expo
npx expo start
