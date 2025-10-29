/**
 * Local Storage Wrapper
 * Uses SecureStore for sensitive data, AsyncStorage for preferences
 */

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from './estimate';

const KEYS = {
  USER_DATA: 'lasttick_user_data',
  THEME: 'lasttick_theme',
  TONE: 'lasttick_tone',
  HAS_COMPLETED_ONBOARDING: 'lasttick_onboarding_complete',
  NOTIFICATION_TIME: 'lasttick_notification_time',
  INSTALL_DATE: 'lasttick_install_date',
  HAS_PURCHASED: 'lasttick_has_purchased',
};

export type Theme = 'light' | 'dark' | 'void';
export type Tone = 'soft' | 'realistic' | 'philosophical';

/**
 * Store user data securely
 */
export async function saveUserData(data: UserData): Promise<void> {
  try {
    const jsonData = JSON.stringify({
      ...data,
      birthdate: data.birthdate.toISOString(),
    });
    await SecureStore.setItemAsync(KEYS.USER_DATA, jsonData);
  } catch (error) {
    console.error('Failed to save user data:', error);
    throw error;
  }
}

/**
 * Load user data
 */
export async function loadUserData(): Promise<UserData | null> {
  try {
    const jsonData = await SecureStore.getItemAsync(KEYS.USER_DATA);
    if (!jsonData) return null;

    const parsed = JSON.parse(jsonData);
    return {
      ...parsed,
      birthdate: new Date(parsed.birthdate),
    };
  } catch (error) {
    console.error('Failed to load user data:', error);
    return null;
  }
}

/**
 * Theme preferences
 */
export async function saveTheme(theme: Theme): Promise<void> {
  await AsyncStorage.setItem(KEYS.THEME, theme);
}

export async function loadTheme(): Promise<Theme> {
  const theme = await AsyncStorage.getItem(KEYS.THEME);
  return (theme as Theme) || 'dark';
}

/**
 * Tone preferences
 */
export async function saveTone(tone: Tone): Promise<void> {
  await AsyncStorage.setItem(KEYS.TONE, tone);
}

export async function loadTone(): Promise<Tone> {
  const tone = await AsyncStorage.getItem(KEYS.TONE);
  return (tone as Tone) || 'philosophical';
}

/**
 * Onboarding status
 */
export async function setOnboardingComplete(complete: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.HAS_COMPLETED_ONBOARDING, complete.toString());
}

export async function hasCompletedOnboarding(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEYS.HAS_COMPLETED_ONBOARDING);
  return value === 'true';
}

/**
 * Notification time preference
 */
export async function saveNotificationTime(hour: number, minute: number): Promise<void> {
  await AsyncStorage.setItem(KEYS.NOTIFICATION_TIME, JSON.stringify({ hour, minute }));
}

export async function loadNotificationTime(): Promise<{ hour: number; minute: number } | null> {
  const value = await AsyncStorage.getItem(KEYS.NOTIFICATION_TIME);
  return value ? JSON.parse(value) : null;
}

/**
 * Install date tracking (for trial period)
 */
export async function getInstallDate(): Promise<Date> {
  let dateStr = await AsyncStorage.getItem(KEYS.INSTALL_DATE);
  
  if (!dateStr) {
    const now = new Date();
    dateStr = now.toISOString();
    await AsyncStorage.setItem(KEYS.INSTALL_DATE, dateStr);
  }
  
  return new Date(dateStr);
}

export async function getDaysSinceInstall(): Promise<number> {
  const installDate = await getInstallDate();
  const now = new Date();
  const diffMs = now.getTime() - installDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Purchase status
 */
export async function setPurchased(purchased: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.HAS_PURCHASED, purchased.toString());
}

export async function hasPurchased(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEYS.HAS_PURCHASED);
  return value === 'true';
}

/**
 * Clear all data (for testing or account reset)
 */
export async function clearAllData(): Promise<void> {
  await SecureStore.deleteItemAsync(KEYS.USER_DATA);
  await AsyncStorage.multiRemove([
    KEYS.THEME,
    KEYS.TONE,
    KEYS.HAS_COMPLETED_ONBOARDING,
    KEYS.NOTIFICATION_TIME,
    KEYS.HAS_PURCHASED,
  ]);
}
