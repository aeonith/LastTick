/**
 * Life Expectancy Estimation Module
 * 
 * IMPORTANT: This is for philosophical reflection only.
 * NOT medical advice. Estimates are illustrative.
 * 
 * Adjust constants below to tune the estimation weights.
 */

export interface HealthInputs {
  birthdate: Date;
  smoker: boolean;
  heavyDrinker: boolean;
  exerciseFrequency: 'never' | 'sometimes' | 'regular';
  sleepHours: number;
  stressLevel: number; // 1-10
  dietQuality: 'poor' | 'average' | 'good';
}

export interface BeliefInputs {
  believesInNumerology: boolean;
  birthTime?: string; // HH:MM format
  birthPlace?: string;
}

export interface UserData extends HealthInputs, BeliefInputs {}

// ============================================================================
// CONSTANTS - Adjust these weights to tune the estimation
// ============================================================================

const BASE_LIFE_EXPECTANCY = 75; // years
const MIN_LIFE_EXPECTANCY = 40;
const MAX_LIFE_EXPECTANCY = 110;

// Health factor deltas (in years)
const HEALTH_WEIGHTS = {
  smoker: -7,
  heavyDrinker: -3,
  exercise: {
    never: 0,
    sometimes: 1,
    regular: 4,
  },
  sleep: {
    under6: -2,
    normal: 0, // 6-8 hours
    over8: 1,
  },
  diet: {
    poor: -2,
    average: 0,
    good: 2,
  },
  stress: {
    high: -2,    // >7
    medium: 0,   // 4-7
    low: 1,      // <4
  },
};

// Numerology: Life Path Number adjustments (0-9)
// These are illustrative and can be tuned
const LIFE_PATH_ADJUSTMENTS: Record<number, number> = {
  1: 2,   // Independent, pioneering
  2: 0,   // Cooperative
  3: 1,   // Creative, expressive
  4: 1,   // Stable, grounded
  5: -1,  // Adventurous, risk-taking
  6: 2,   // Nurturing, responsible
  7: 0,   // Introspective
  8: 1,   // Ambitious, resilient
  9: 2,   // Humanitarian, wise
  11: 3,  // Master number - heightened awareness
  22: 3,  // Master number - master builder
  33: 3,  // Master number - master teacher
};

// Astrology: Sun sign adjustments (illustrative, optional)
const SUN_SIGN_ADJUSTMENTS: Record<string, number> = {
  aries: 0,
  taurus: 1,
  gemini: 0,
  cancer: 1,
  leo: 1,
  virgo: 1,
  libra: 0,
  scorpio: 1,
  sagittarius: 0,
  capricorn: 2,
  aquarius: 0,
  pisces: 0,
};

// ============================================================================
// CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate Life Path Number from birthdate
 * https://en.wikipedia.org/wiki/Numerology
 */
export function calculateLifePathNumber(birthdate: Date): number {
  const year = birthdate.getFullYear();
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();

  const reduceToSingleDigit = (num: number): number => {
    // Check for master numbers before reducing
    if (num === 11 || num === 22 || num === 33) return num;
    
    while (num > 9) {
      num = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
      
      if (num === 11 || num === 22 || num === 33) return num;
    }
    return num;
  };

  const yearSum = reduceToSingleDigit(year);
  const monthSum = reduceToSingleDigit(month);
  const daySum = reduceToSingleDigit(day);

  const total = yearSum + monthSum + daySum;
  return reduceToSingleDigit(total);
}

/**
 * Get sun sign from birthdate
 */
export function getSunSign(birthdate: Date): string {
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}

/**
 * Calculate estimated life expectancy
 * Optionally includes real-time HealthKit data for dynamic adjustment
 */
export function calculateLifeExpectancy(
  userData: UserData,
  healthKitAdjustment?: number
): number {
  let estimate = BASE_LIFE_EXPECTANCY;

  // Apply health factors
  if (userData.smoker) {
    estimate += HEALTH_WEIGHTS.smoker;
  }

  if (userData.heavyDrinker) {
    estimate += HEALTH_WEIGHTS.heavyDrinker;
  }

  estimate += HEALTH_WEIGHTS.exercise[userData.exerciseFrequency];

  // Sleep adjustment
  if (userData.sleepHours < 6) {
    estimate += HEALTH_WEIGHTS.sleep.under6;
  } else if (userData.sleepHours > 8) {
    estimate += HEALTH_WEIGHTS.sleep.over8;
  } else {
    estimate += HEALTH_WEIGHTS.sleep.normal;
  }

  // Diet adjustment
  estimate += HEALTH_WEIGHTS.diet[userData.dietQuality];

  // Stress adjustment
  if (userData.stressLevel > 7) {
    estimate += HEALTH_WEIGHTS.stress.high;
  } else if (userData.stressLevel >= 4) {
    estimate += HEALTH_WEIGHTS.stress.medium;
  } else {
    estimate += HEALTH_WEIGHTS.stress.low;
  }

  // Numerology/Astrology adjustments (if user believes)
  if (userData.believesInNumerology) {
    const lifePathNumber = calculateLifePathNumber(userData.birthdate);
    const lifePathAdjustment = LIFE_PATH_ADJUSTMENTS[lifePathNumber] || 0;
    estimate += lifePathAdjustment;

    const sunSign = getSunSign(userData.birthdate);
    const sunSignAdjustment = SUN_SIGN_ADJUSTMENTS[sunSign] || 0;
    estimate += sunSignAdjustment;
  }

  // Apply real-time HealthKit adjustment if available
  if (healthKitAdjustment !== undefined) {
    estimate += healthKitAdjustment;
  }

  // Clamp to reasonable bounds
  return Math.max(MIN_LIFE_EXPECTANCY, Math.min(MAX_LIFE_EXPECTANCY, estimate));
}

/**
 * Calculate estimated end date
 * Optionally includes real-time HealthKit data for dynamic adjustment
 */
export function calculateEstimatedEndDate(
  userData: UserData,
  healthKitAdjustment?: number
): Date {
  const lifeExpectancy = calculateLifeExpectancy(userData, healthKitAdjustment);
  const endDate = new Date(userData.birthdate);
  endDate.setFullYear(endDate.getFullYear() + lifeExpectancy);
  return endDate;
}

/**
 * Calculate time remaining
 */
export interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  percentComplete: number;
}

export function calculateTimeRemaining(
  userData: UserData,
  healthKitAdjustment?: number
): TimeRemaining {
  const now = new Date();
  const endDate = calculateEstimatedEndDate(userData, healthKitAdjustment);
  const totalLifeMs = endDate.getTime() - userData.birthdate.getTime();
  const elapsedMs = now.getTime() - userData.birthdate.getTime();
  const remainingMs = Math.max(0, endDate.getTime() - now.getTime());

  const totalSeconds = Math.floor(remainingMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 30; // Approximate
  const totalMonths = Math.floor(totalDays / 30);
  const months = totalMonths % 12;
  const years = Math.floor(totalMonths / 12);

  const percentComplete = totalLifeMs > 0 ? (elapsedMs / totalLifeMs) * 100 : 0;

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    percentComplete: Math.min(100, Math.max(0, percentComplete)),
  };
}

/**
 * Get age in years
 */
export function getAge(birthdate: Date): number {
  const now = new Date();
  const age = now.getFullYear() - birthdate.getFullYear();
  const monthDiff = now.getMonth() - birthdate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdate.getDate())) {
    return age - 1;
  }
  
  return age;
}
