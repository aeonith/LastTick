import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  loadUserData, 
  loadTheme, 
  loadTone,
  loadHealthMetrics,
  isHealthTrackingEnabled 
} from '../src/lib/storage';
import { calculateTimeRemaining, UserData } from '../src/lib/estimate';
import { calculateHealthBasedAdjustment } from '../src/lib/healthkit';
import { getThemeColors } from '../src/lib/theme';
import { getQuoteOfDay } from '../src/lib/quotes';
import RingProgress from '../src/components/RingProgress';
import QuoteCard from '../src/components/QuoteCard';
import Disclaimer from '../src/components/Disclaimer';
import AnimatedHourglass from '../src/components/AnimatedHourglass';

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<ReturnType<typeof calculateTimeRemaining> | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'void'>('dark');
  const [tone, setTone] = useState<'soft' | 'realistic' | 'philosophical'>('philosophical');
  const [colors, setColors] = useState(getThemeColors('dark'));
  const [quote, setQuote] = useState(getQuoteOfDay('philosophical'));
  const [healthAdjustment, setHealthAdjustment] = useState<number | undefined>(undefined);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadData();
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!userData) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(userData, healthAdjustment));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [userData, healthAdjustment]);

  const loadData = async () => {
    try {
      const data = await loadUserData();
      const currentTheme = await loadTheme();
      const currentTone = await loadTone();
      
      if (!data) {
        router.replace('/onboarding');
        return;
      }

      const healthEnabled = await isHealthTrackingEnabled();
      let adjustment: number | undefined = undefined;
      
      if (healthEnabled) {
        const metrics = await loadHealthMetrics();
        if (metrics) {
          adjustment = calculateHealthBasedAdjustment(metrics);
        }
      }

      setUserData(data);
      setTheme(currentTheme);
      setTone(currentTone);
      setColors(getThemeColors(currentTheme));
      setQuote(getQuoteOfDay(currentTone));
      setHealthAdjustment(adjustment);
      setTimeRemaining(calculateTimeRemaining(data, adjustment));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      router.replace('/onboarding');
    }
  };

  const formatNumber = (num: number, padYears: boolean = true): string => {
    if (!padYears && num >= 10) return num.toString();
    return num.toString().padStart(2, '0');
  };

  if (!userData || !timeRemaining) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ImageBackground
        source={require('../assets/gothic-clock.jpeg')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        blurRadius={8}
      >
        <View style={styles.overlay} />
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={[styles.headerTitle, { color: colors.textSecondary }]}>
            Time Remaining
          </Text>
        </Animated.View>

        <Animated.View style={[styles.ringContainer, { opacity: fadeAnim }]}>
          <RingProgress
            size={280}
            strokeWidth={20}
            progress={timeRemaining.percentComplete}
            color={colors.progressRing}
            backgroundColor={colors.progressBackground}
          />
          <View style={styles.ringCenter}>
            <Text style={[styles.percentText, { color: colors.text }]}>
              {timeRemaining.percentComplete.toFixed(1)}%
            </Text>
            <Text style={[styles.percentLabel, { color: colors.textSecondary }]}>
              of estimated life
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.countdownGrid, { opacity: fadeAnim }]}>
          {[
            { label: 'Years', value: timeRemaining.years, isYear: true },
            { label: 'Months', value: timeRemaining.months, isYear: false },
            { label: 'Days', value: timeRemaining.days, isYear: false },
            { label: 'Hours', value: timeRemaining.hours, isYear: false },
            { label: 'Minutes', value: timeRemaining.minutes, isYear: false },
            { label: 'Seconds', value: timeRemaining.seconds, isYear: false },
          ].map((item) => (
            <View
              key={item.label}
              style={[styles.countdownItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.countdownValue, { color: colors.text }]}>
                {item.isYear ? item.value.toString() : formatNumber(item.value)}
              </Text>
              <Text style={[styles.countdownLabel, { color: colors.textSecondary }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <QuoteCard quote={quote} colors={colors} />
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.disclaimerContainer}>
            <Text style={[styles.disclaimerText, { color: colors.textSecondary }]}>
              ⚠️ Estimate only. Not medical advice. For reflection, not prediction.
            </Text>
          </View>
        </Animated.View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push('/health')}
          >
            <Text style={[styles.actionButtonText, { color: colors.text }]}>
              📊 Health
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push('/settings')}
          >
            <Text style={[styles.actionButtonText, { color: colors.text }]}>
              ⚙️ Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push('/purchase')}
          >
            <Text style={[styles.actionButtonText, { color: colors.text }]}>
              💎 Support
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => router.push('/about')}
        >
          <Text style={[styles.aboutButtonText, { color: colors.textSecondary }]}>
            About & Privacy
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 25, 0.7)',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontFamily: 'Georgia',
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    textShadowColor: 'rgba(107, 157, 181, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  percentLabel: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Georgia',
    letterSpacing: 2,
  },
  countdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  countdownItem: {
    width: '31%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  countdownValue: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    fontFamily: 'Courier New',
    textShadowColor: 'rgba(107, 157, 181, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  countdownLabel: {
    fontSize: 11,
    marginTop: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.8,
    fontFamily: 'Georgia',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  aboutButton: {
    marginTop: 24,
    alignItems: 'center',
    padding: 12,
  },
  aboutButtonText: {
    fontSize: 14,
  },
  disclaimerContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
