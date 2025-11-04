/**
 * Health Metrics Dashboard
 * 
 * Displays real-time health data from Apple Watch/HealthKit
 * and shows actionable insights to improve longevity
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  initializeHealthKit,
  fetchHealthMetrics,
  generateHealthInsights,
  calculateHealthBasedAdjustment,
  HealthMetrics,
  HealthInsight,
} from '../src/lib/healthkit';
import {
  saveHealthMetrics,
  loadHealthMetrics,
  setHealthTrackingEnabled,
  isHealthTrackingEnabled,
} from '../src/lib/storage';
import { loadTheme } from '../src/lib/storage';
import { getThemeColors } from '../src/lib/theme';

export default function HealthDashboard() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark' | 'void'>('dark');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [healthEnabled, setHealthEnabled] = useState(false);
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [adjustment, setAdjustment] = useState<number>(0);

  const colors = getThemeColors(theme);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const currentTheme = await loadTheme();
    setTheme(currentTheme);

    const enabled = await isHealthTrackingEnabled();
    setHealthEnabled(enabled);

    if (enabled) {
      const cachedMetrics = await loadHealthMetrics();
      if (cachedMetrics) {
        setMetrics(cachedMetrics);
        const healthInsights = generateHealthInsights(cachedMetrics);
        setInsights(healthInsights);
        const adj = calculateHealthBasedAdjustment(cachedMetrics);
        setAdjustment(adj);
      }
      await refreshHealthData();
    }

    setLoading(false);
  }

  async function refreshHealthData() {
    try {
      const newMetrics = await fetchHealthMetrics();
      if (newMetrics) {
        await saveHealthMetrics(newMetrics);
        setMetrics(newMetrics);
        const healthInsights = generateHealthInsights(newMetrics);
        setInsights(healthInsights);
        const adj = calculateHealthBasedAdjustment(newMetrics);
        setAdjustment(adj);
      }
    } catch (error) {
      console.error('Failed to refresh health data:', error);
    }
  }

  async function handleEnableHealth() {
    const initialized = await initializeHealthKit();
    if (initialized) {
      await setHealthTrackingEnabled(true);
      setHealthEnabled(true);
      await refreshHealthData();
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await refreshHealthData();
    setRefreshing(false);
  }

  function average(arr: number[]): number {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  }

  function sum(arr: number[]): number {
    return arr.reduce((sum, val) => sum + val, 0);
  }

  function getPriorityColor(priority: string): string {
    if (priority === 'high') return '#FF6B6B';
    if (priority === 'medium') return '#FFA500';
    return '#4ECDC4';
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!healthEnabled) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.title, { color: colors.text }]}>
            Health Tracking
          </Text>

          <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              📊 Real-Time Life Expectancy
            </Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              Enable health tracking to get a more accurate, dynamic countdown based on your Apple Watch data.
            </Text>
            <Text style={[styles.cardText, { color: colors.textSecondary, marginTop: 16 }]}>
              We analyze:
              {'\n'}• Heart rate & cardiovascular health
              {'\n'}• Sleep quality & duration
              {'\n'}• Blood oxygen levels
              {'\n'}• Daily activity & steps
              {'\n'}• Mindfulness practice
            </Text>
            <Text style={[styles.disclaimer, { color: colors.textSecondary }]}>
              All data stays on your device. Never transmitted to servers.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleEnableHealth}
          >
            <Text style={styles.buttonText}>Enable Health Tracking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonSecondary, { borderColor: colors.border }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonSecondaryText, { color: colors.text }]}>
              Maybe Later
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Health Insights
        </Text>

        {metrics && (
          <>
            <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                📈 Life Expectancy Adjustment
              </Text>
              <Text style={[styles.adjustmentText, { 
                color: adjustment >= 0 ? '#4ECDC4' : '#FF6B6B' 
              }]}>
                {adjustment >= 0 ? '+' : ''}{adjustment.toFixed(1)} years
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                Based on your current health metrics from the last 7 days
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Actionable Insights
            </Text>

            {insights.length === 0 ? (
              <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
                <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                  Great! No concerns detected. Keep up the healthy habits.
                </Text>
              </View>
            ) : (
              insights.map((insight, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.insightCard,
                    { 
                      backgroundColor: colors.cardBg,
                      borderLeftColor: getPriorityColor(insight.priority),
                    },
                  ]}
                >
                  <Text style={[styles.insightTitle, { color: colors.text }]}>
                    {insight.title}
                  </Text>
                  <Text style={[styles.insightMessage, { color: colors.textSecondary }]}>
                    {insight.message}
                  </Text>
                  <Text style={[styles.insightImpact, { 
                    color: insight.impactYears >= 0 ? '#4ECDC4' : '#FF6B6B' 
                  }]}>
                    Impact: {insight.impactYears >= 0 ? '+' : ''}{insight.impactYears} years
                  </Text>
                </View>
              ))
            )}

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Health Metrics
            </Text>

            <View style={[styles.metricsGrid, { backgroundColor: colors.cardBg }]}>
              {metrics.heartRate.length > 0 && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                    Avg Heart Rate
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {average(metrics.heartRate).toFixed(0)} bpm
                  </Text>
                </View>
              )}

              {metrics.sleepHours.length > 0 && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                    Avg Sleep
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {average(metrics.sleepHours).toFixed(1)} hrs
                  </Text>
                </View>
              )}

              {metrics.bloodOxygen.length > 0 && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                    Blood Oxygen
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {average(metrics.bloodOxygen).toFixed(0)}%
                  </Text>
                </View>
              )}

              {metrics.steps.length > 0 && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                    Daily Steps
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {(sum(metrics.steps) / metrics.steps.length).toFixed(0)}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
              Last updated: {new Date(metrics.lastUpdated).toLocaleString()}
            </Text>
          </>
        )}

        <TouchableOpacity
          style={[styles.buttonSecondary, { borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.buttonSecondaryText, { color: colors.text }]}>
            Back to Dashboard
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
  scrollContent: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
  disclaimer: {
    fontSize: 13,
    marginTop: 16,
    fontStyle: 'italic',
  },
  adjustmentText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  insightMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  insightImpact: {
    fontSize: 13,
    fontWeight: '600',
  },
  metricsGrid: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    marginBottom: 16,
  },
  metricLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lastUpdated: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
  },
  buttonSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
