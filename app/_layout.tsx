import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { hasCompletedOnboarding } from '../src/lib/storage';
import { initializeIAP } from '../src/lib/iap';

export default function RootLayout() {
  useEffect(() => {
    initializeIAP();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="purchase" />
        <Stack.Screen name="about" />
      </Stack>
    </>
  );
}
