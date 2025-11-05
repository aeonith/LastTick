import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { loadTheme } from '../src/lib/storage';
import { getThemeColors } from '../src/lib/theme';
import GothicBackground from '../src/components/GothicBackground';

export default function About() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark' | 'void'>('dark');
  const [colors, setColors] = useState(getThemeColors('dark'));

  useEffect(() => {
    loadTheme().then((t) => {
      setTheme(t);
      setColors(getThemeColors(t));
    });
  }, []);

  return (
    <GothicBackground>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backButton, { color: colors.accent }]}>← Back</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>About LastTick</Text>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Purpose</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            LastTick is a philosophical tool designed to cultivate awareness of life's finite nature. It provides an estimated countdown of your remaining time based on health factors and optional numerological inputs.
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            The goal is not to induce fear or anxiety, but to inspire presence, intention, and gratitude for each moment. As the Stoics taught: "Memento mori"—remember you must die—so that you may truly live.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Not Medical Advice</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            This app is for philosophical reflection only. Life expectancy estimates are based on statistical averages and your inputs. They are illustrative and should not be considered medical advice or predictions.
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            For health concerns, please consult qualified healthcare professionals.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy Policy</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            Your privacy is paramount. All data you enter into LastTick is stored locally on your device only. We do not collect, transmit, or store any of your personal information on remote servers.
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            • All health inputs, birthdate, and preferences are stored locally using encrypted storage
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            • No analytics or tracking
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            • No third-party data sharing
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            • You can delete all data at any time from Settings
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>How It Works</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            LastTick calculates your estimated life expectancy by:
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            1. Starting with a base life expectancy of 75 years
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            2. Applying adjustments based on your health inputs (smoking, exercise, sleep, diet, stress)
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            3. Optionally incorporating numerology (Life Path Number) and astrology (Sun Sign)
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            4. Calculating the time remaining from your current age to estimated end date
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            The countdown updates every second to show years, months, days, hours, minutes, and seconds remaining.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Credits & Philosophy</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            Inspired by Stoic philosophy, particularly the works of Marcus Aurelius, Seneca, and Epictetus.
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            "You could leave life right now. Let that determine what you do and say and think." — Marcus Aurelius
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact & Support</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            For questions, feedback, or support, please email:
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@yourcompany.com')}>
            <Text style={[styles.link, { color: colors.accent }]}>support@yourcompany.com</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.version, { color: colors.textSecondary }]}>
          LastTick v1.0.0
        </Text>
      </ScrollView>
    </GothicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    fontSize: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
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
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  link: {
    fontSize: 16,
    marginTop: 8,
  },
  version: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});
