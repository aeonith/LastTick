/**
 * HealthKit Integration Module
 * 
 * Connects to Apple Health to fetch real-time health metrics
 * and dynamically adjust life expectancy estimates.
 * 
 * PRIVACY: All data stays local. Never transmitted to servers.
 */

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import { Platform } from 'react-native';

export interface HealthMetrics {
  heartRate: number[];
  restingHeartRate: number;
  heartRateVariability?: number;
  bloodOxygen: number[];
  sleepHours: number[];
  sleepQuality?: string[];
  steps: number[];
  activeEnergyBurned?: number[];
  mindfulnessMinutes?: number[];
  stressLevel?: number[];
  timestamps: Date[];
  lastUpdated: Date;
}

export interface HealthInsight {
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  impactYears: number;
  category: 'heart' | 'sleep' | 'activity' | 'stress' | 'oxygen';
}

const PERMISSIONS: HealthKitPermissions = {
  permissions: {
    read: [
      'HeartRate' as any,
      'RestingHeartRate' as any,
      'HeartRateVariability' as any,
      'OxygenSaturation' as any,
      'SleepAnalysis' as any,
      'StepCount' as any,
      'ActiveEnergyBurned' as any,
      'MindfulSession' as any,
    ],
    write: [],
  },
};

/**
 * Initialize HealthKit and request permissions
 */
export async function initializeHealthKit(): Promise<boolean> {
  if (Platform.OS !== 'ios') {
    console.log('HealthKit only available on iOS');
    return false;
  }

  return new Promise((resolve) => {
    AppleHealthKit.initHealthKit(PERMISSIONS, (error) => {
      if (error) {
        console.error('HealthKit initialization failed:', error);
        resolve(false);
      } else {
        console.log('HealthKit initialized successfully');
        resolve(true);
      }
    });
  });
}

/**
 * Check if HealthKit is available and authorized
 */
export async function isHealthKitAvailable(): Promise<boolean> {
  if (Platform.OS !== 'ios') return false;
  
  return new Promise((resolve) => {
    AppleHealthKit.isAvailable((err, available) => {
      resolve(available === true);
    });
  });
}

/**
 * Fetch heart rate data (last 7 days)
 */
async function fetchHeartRate(): Promise<number[]> {
  return new Promise((resolve) => {
    const options = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
      ascending: false,
      limit: 100,
    };

    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err || !results) {
        resolve([]);
      } else {
        resolve(results.map((r: HealthValue) => r.value));
      }
    });
  });
}

/**
 * Fetch resting heart rate (average of last 7 days)
 */
async function fetchRestingHeartRate(): Promise<number> {
  return new Promise((resolve) => {
    const options = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getRestingHeartRate(options, (err, results: any) => {
      if (err || !results || !Array.isArray(results) || results.length === 0) {
        resolve(70);
      } else {
        const avg = results.reduce((sum: number, r: any) => sum + r.value, 0) / results.length;
        resolve(avg);
      }
    });
  });
}

/**
 * Fetch blood oxygen levels (last 7 days)
 */
async function fetchBloodOxygen(): Promise<number[]> {
  return new Promise((resolve) => {
    const options = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
      ascending: false,
      limit: 50,
    };

    AppleHealthKit.getOxygenSaturationSamples(options, (err, results) => {
      if (err || !results) {
        resolve([]);
      } else {
        resolve(results.map((r: HealthValue) => r.value * 100));
      }
    });
  });
}

/**
 * Fetch sleep data (last 7 days)
 */
async function fetchSleep(): Promise<{ hours: number[]; quality: string[] }> {
  return new Promise((resolve) => {
    const options = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getSleepSamples(options, (err, results) => {
      if (err || !results) {
        resolve({ hours: [], quality: [] });
      } else {
        const hours = results.map((r: any) => {
          const start = new Date(r.startDate).getTime();
          const end = new Date(r.endDate).getTime();
          return (end - start) / (1000 * 60 * 60);
        });
        const quality = results.map((r: any) => r.value || 'UNKNOWN');
        resolve({ hours, quality });
      }
    });
  });
}

/**
 * Fetch steps (last 7 days)
 */
async function fetchSteps(): Promise<number[]> {
  return new Promise((resolve) => {
    const options = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
      ascending: false,
    };

    AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
      if (err || !results) {
        resolve([]);
      } else {
        resolve(results.map((r: HealthValue) => r.value));
      }
    });
  });
}

/**
 * Fetch active energy burned (last 7 days)
 */
async function fetchActiveEnergy(): Promise<number[]> {
  return new Promise((resolve) => {
    const options = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      if (err || !results) {
        resolve([]);
      } else {
        resolve(results.map((r: HealthValue) => r.value));
      }
    });
  });
}

/**
 * Fetch mindfulness sessions (last 7 days)
 */
async function fetchMindfulness(): Promise<number[]> {
  return new Promise((resolve) => {
    const options = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getMindfulSession(options, (err, results) => {
      if (err || !results) {
        resolve([]);
      } else {
        resolve(
          results.map((r: any) => {
            const start = new Date(r.startDate).getTime();
            const end = new Date(r.endDate).getTime();
            return (end - start) / (1000 * 60);
          })
        );
      }
    });
  });
}

/**
 * Fetch all health metrics
 */
export async function fetchHealthMetrics(): Promise<HealthMetrics | null> {
  const available = await isHealthKitAvailable();
  if (!available) {
    console.log('HealthKit not available');
    return null;
  }

  try {
    const [
      heartRate,
      restingHeartRate,
      bloodOxygen,
      sleep,
      steps,
      activeEnergy,
      mindfulness,
    ] = await Promise.all([
      fetchHeartRate(),
      fetchRestingHeartRate(),
      fetchBloodOxygen(),
      fetchSleep(),
      fetchSteps(),
      fetchActiveEnergy(),
      fetchMindfulness(),
    ]);

    const maxLength = Math.max(
      heartRate.length,
      bloodOxygen.length,
      sleep.hours.length,
      steps.length
    );

    const timestamps = Array.from({ length: maxLength }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    });

    return {
      heartRate,
      restingHeartRate,
      bloodOxygen,
      sleepHours: sleep.hours,
      sleepQuality: sleep.quality,
      steps,
      activeEnergyBurned: activeEnergy,
      mindfulnessMinutes: mindfulness,
      timestamps,
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Failed to fetch health metrics:', error);
    return null;
  }
}

/**
 * Calculate average from array
 */
function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Calculate sum from array
 */
function sum(arr: number[]): number {
  return arr.reduce((sum, val) => sum + val, 0);
}

/**
 * Generate health insights based on metrics
 */
export function generateHealthInsights(metrics: HealthMetrics): HealthInsight[] {
  const insights: HealthInsight[] = [];

  const avgHeartRate = average(metrics.heartRate);
  if (avgHeartRate > 90) {
    insights.push({
      title: 'Elevated Heart Rate',
      message: `Your average heart rate is ${avgHeartRate.toFixed(0)} bpm. Light exercise or relaxation techniques may help improve cardiovascular health.`,
      priority: 'medium',
      impactYears: -1.5,
      category: 'heart',
    });
  } else if (avgHeartRate < 60 && avgHeartRate > 40) {
    insights.push({
      title: 'Excellent Heart Health',
      message: `Your resting heart rate of ${avgHeartRate.toFixed(0)} bpm indicates strong cardiovascular fitness.`,
      priority: 'low',
      impactYears: 1.5,
      category: 'heart',
    });
  }

  const avgSleep = average(metrics.sleepHours);
  if (avgSleep < 6) {
    insights.push({
      title: 'Sleep Deficit',
      message: `You're averaging ${avgSleep.toFixed(1)} hours per night. Aim for 7-9 hours to improve recovery and longevity.`,
      priority: 'high',
      impactYears: -2,
      category: 'sleep',
    });
  } else if (avgSleep >= 7 && avgSleep <= 9) {
    insights.push({
      title: 'Optimal Sleep',
      message: `Your sleep duration of ${avgSleep.toFixed(1)} hours is in the healthy range.`,
      priority: 'low',
      impactYears: 2,
      category: 'sleep',
    });
  }

  const avgOxygen = average(metrics.bloodOxygen);
  if (avgOxygen > 0 && avgOxygen < 95) {
    insights.push({
      title: 'Low Blood Oxygen',
      message: `Your SpO₂ is ${avgOxygen.toFixed(0)}%. Deep breathing exercises or light activity can help improve oxygenation.`,
      priority: 'high',
      impactYears: -1,
      category: 'oxygen',
    });
  } else if (avgOxygen >= 97) {
    insights.push({
      title: 'Excellent Oxygenation',
      message: `Your blood oxygen level of ${avgOxygen.toFixed(0)}% is optimal.`,
      priority: 'low',
      impactYears: 0.5,
      category: 'oxygen',
    });
  }

  const totalStepsWeekly = sum(metrics.steps);
  const avgStepsDaily = totalStepsWeekly / metrics.steps.length;
  if (avgStepsDaily < 5000) {
    insights.push({
      title: 'Low Daily Activity',
      message: `You're averaging ${avgStepsDaily.toFixed(0)} steps/day. Try increasing to 7,500+ for better health outcomes.`,
      priority: 'medium',
      impactYears: -1.5,
      category: 'activity',
    });
  } else if (avgStepsDaily >= 10000) {
    insights.push({
      title: 'Excellent Activity Level',
      message: `Your ${avgStepsDaily.toFixed(0)} daily steps show strong commitment to physical health.`,
      priority: 'low',
      impactYears: 2,
      category: 'activity',
    });
  }

  const totalMindfulness = sum(metrics.mindfulnessMinutes || []);
  if (totalMindfulness >= 70) {
    insights.push({
      title: 'Strong Mindfulness Practice',
      message: `${totalMindfulness.toFixed(0)} minutes of mindfulness this week helps reduce stress and improve mental clarity.`,
      priority: 'low',
      impactYears: 1,
      category: 'stress',
    });
  }

  return insights;
}

/**
 * Calculate health-based life expectancy adjustment
 * Returns years to add/subtract from base estimate
 */
export function calculateHealthBasedAdjustment(metrics: HealthMetrics): number {
  let adjustment = 0;

  const avgHeartRate = average(metrics.heartRate);
  if (avgHeartRate > 90) {
    adjustment -= 1.5;
  } else if (avgHeartRate < 60 && avgHeartRate > 40) {
    adjustment += 1.5;
  }

  const avgSleep = average(metrics.sleepHours);
  if (avgSleep < 6) {
    adjustment -= 2;
  } else if (avgSleep >= 7 && avgSleep <= 9) {
    adjustment += 2;
  }

  const avgOxygen = average(metrics.bloodOxygen);
  if (avgOxygen > 0 && avgOxygen < 95) {
    adjustment -= 1;
  } else if (avgOxygen >= 97) {
    adjustment += 0.5;
  }

  const avgStepsDaily = sum(metrics.steps) / metrics.steps.length;
  if (avgStepsDaily < 5000) {
    adjustment -= 1.5;
  } else if (avgStepsDaily >= 10000) {
    adjustment += 2;
  }

  const totalMindfulness = sum(metrics.mindfulnessMinutes || []);
  if (totalMindfulness >= 70) {
    adjustment += 1;
  }

  return Math.round(adjustment * 10) / 10;
}
