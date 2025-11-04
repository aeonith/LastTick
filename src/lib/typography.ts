/**
 * Typography System - Gothic/Eerie Design
 * Inspired by ornate Victorian clock imagery
 */

export const FONT_FAMILIES = {
  // System fallbacks for eerie feel
  display: 'Georgia, serif', // Elegant serif for headers
  body: 'Palatino, serif', // Classic serif for body
  mono: 'Courier New, monospace', // Typewriter-style for numbers
};

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 24,
  xxl: 32,
  huge: 48,
  massive: 72,
};

export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 1,
  wider: 2,
  widest: 4,
};

/**
 * Convert numbers to Roman numerals (for clock-like display)
 */
export function toRomanNumeral(num: number): string {
  if (num === 0) return '∅'; // Void symbol for zero
  if (num < 0) return '-' + toRomanNumeral(Math.abs(num));
  
  const romanMap: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let result = '';
  let remaining = num;

  for (const [value, numeral] of romanMap) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}

/**
 * Get text shadow for eerie glow effect
 */
export function getEerieGlow(color: string, intensity: 'subtle' | 'medium' | 'strong' = 'medium'): object {
  const shadows = {
    subtle: [
      { textShadowColor: color, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 4 },
    ],
    medium: [
      { textShadowColor: color, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 },
      { textShadowColor: color, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 16 },
    ],
    strong: [
      { textShadowColor: color, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 12 },
      { textShadowColor: color, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 24 },
      { textShadowColor: color, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 36 },
    ],
  };

  // React Native only supports one shadow, so we'll use the first one
  return shadows[intensity][0];
}
