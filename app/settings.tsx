import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  loadTheme,
  saveTheme,
  loadTone,
  saveTone,
  loadUserData,
  saveUserData,
  clearAllData,
  Theme,
  Tone,
  loadNotificationTime,
  saveNotificationTime,
} from '../src/lib/storage';

import { getThemeColors } from '../src/lib/theme';
import { requestNotificationPermissions, scheduleDailyNotification, cancelAllNotifications } from '../src/lib/notifications';
import Button from '../src/components/Button';

export default function Settings() {
  const router = useRouter();
  const [theme, setThemeState] = useState<Theme>('dark');
  const [tone, setToneState] = useState<Tone>('philosophical');
  const [colors, setColors] = useState(getThemeColors('dark'));
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationHour, setNotificationHour] = useState(9);
  const [notificationMinute, setNotificationMinute] = useState(0);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const currentTheme = await loadTheme();
    const currentTone = await loadTone();
    const notifTime = await loadNotificationTime();

    setThemeState(currentTheme);
    setToneState(currentTone);
    setColors(getThemeColors(currentTheme));

    if (notifTime) {
      setNotificationsEnabled(true);
      setNotificationHour(notifTime.hour);
      setNotificationMinute(notifTime.minute);
    }
  };

  const handleThemeChange = async (newTheme: Theme) => {
    setThemeState(newTheme);
    setColors(getThemeColors(newTheme));
    await saveTheme(newTheme);
  };

  const handleToneChange = async (newTone: Tone) => {
    setToneState(newTone);
    await saveTone(newTone);
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermissions();
      if (granted) {
        await scheduleDailyNotification(notificationHour, notificationMinute, tone);
        await saveNotificationTime(notificationHour, notificationMinute);
        setNotificationsEnabled(true);
      } else {
        Alert.alert('Permission Denied', 'Please enable notifications in Settings');
      }
    } else {
      await cancelAllNotifications();
      setNotificationsEnabled(false);
    }
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Do you want to update your health inputs and beliefs?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Edit',
          onPress: async () => {
            await clearAllData();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'This will delete all your data and restart onboarding. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backButton, { color: colors.accent }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          
          <Text style={[styles.label, { color: colors.textSecondary }]}>Theme</Text>
          <View style={styles.themeButtons}>
            {(['light', 'dark', 'void'] as Theme[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.themeButton,
                  theme === t && { backgroundColor: colors.accent },
                  { borderColor: colors.border },
                ]}
                onPress={() => handleThemeChange(t)}
              >
                <Text style={[styles.themeButtonText, { color: theme === t ? '#FFF' : colors.text }]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quote Tone</Text>
          
          <View style={styles.themeButtons}>
            {(['soft', 'realistic', 'philosophical'] as Tone[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.themeButton,
                  tone === t && { backgroundColor: colors.accent },
                  { borderColor: colors.border },
                ]}
                onPress={() => handleToneChange(t)}
              >
                <Text style={[styles.themeButtonText, { color: tone === t ? '#FFF' : colors.text }]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          
          <View style={styles.switchRow}>
            <Text style={[styles.label, { color: colors.text }]}>Daily reminders</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.border, true: colors.accent }}
            />
          </View>

          {notificationsEnabled && (
            <Text style={[styles.helpText, { color: colors.textSecondary }]}>
              Notification at {notificationHour.toString().padStart(2, '0')}:
              {notificationMinute.toString().padStart(2, '0')}
            </Text>
          )}
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile</Text>
          
          <Button
            title="Edit Health Inputs"
            onPress={handleEditProfile}
            colors={colors}
            variant="outline"
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          <Button
            title="Support the Creator"
            onPress={() => router.push('/purchase')}
            colors={colors}
            variant="secondary"
          />
        </View>

        <View style={styles.dangerZone}>
          <Button
            title="Reset App"
            onPress={handleResetApp}
            colors={{ ...colors, accent: colors.error }}
            variant="outline"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    fontSize: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpText: {
    fontSize: 12,
    marginTop: 8,
  },
  dangerZone: {
    marginTop: 32,
    marginBottom: 32,
  },
});
