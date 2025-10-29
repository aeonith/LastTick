/**
 * Notification System
 * Daily reminders based on user's preferred time and tone
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Tone } from './storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * Get notification content based on tone
 */
function getNotificationContent(tone: Tone): { title: string; body: string } {
  const contentByTone: Record<Tone, Array<{ title: string; body: string }>> = {
    soft: [
      { title: 'Another Beautiful Day', body: 'Every moment is a gift. Make today count.' },
      { title: 'Good Morning', body: 'Today is full of possibilities. Embrace them.' },
      { title: 'A New Beginning', body: 'Each day is a fresh start. What will you create?' },
      { title: 'Time is Precious', body: 'Cherish the moments that matter most to you.' },
      { title: 'Present Moment', body: 'The present is where life happens. Be here now.' },
    ],
    realistic: [
      { title: 'Time Passes', body: "Don't let today slip by without purpose." },
      { title: 'Make It Count', body: 'Your time is limited. Use it wisely.' },
      { title: 'Another Day', body: 'What will you do with the hours you have today?' },
      { title: 'Life Moves Forward', body: 'Each day brings you closer to your goals—or further away.' },
      { title: 'The Clock Ticks', body: "Time you enjoy isn't wasted. Everything else might be." },
    ],
    philosophical: [
      { title: 'Memento Mori', body: 'Remember: you will die. How does that change today?' },
      { title: 'Existential Reflection', body: 'We exist for a brief moment. What meaning will you create?' },
      { title: 'The Examined Life', body: 'Are you living, or merely existing?' },
      { title: 'Impermanence', body: 'All things pass. What legacy will remain?' },
      { title: 'Awareness', body: 'Death gives life meaning. Live with intention.' },
    ],
  };

  const options = contentByTone[tone];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % options.length;
  
  return options[index];
}

/**
 * Schedule daily notification
 */
export async function scheduleDailyNotification(hour: number, minute: number, tone: Tone): Promise<void> {
  // Cancel existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  const content = getNotificationContent(tone);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: content.title,
      body: content.body,
      sound: false,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
}

/**
 * Cancel all notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Get scheduled notifications (for debugging)
 */
export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  return await Notifications.getAllScheduledNotificationsAsync();
}
