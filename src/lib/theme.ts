/**
 * Theme System
 * Defines color palettes for Light, Dark, and Void themes
 */

import { Theme } from './storage';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentDim: string;
  border: string;
  error: string;
  success: string;
  progressRing: string;
  progressBackground: string;
}

export const THEMES: Record<Theme, ThemeColors> = {
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#0A0A0A',
    textSecondary: '#6B7280',
    accent: '#6366F1',
    accentDim: '#818CF8',
    border: '#E5E7EB',
    error: '#DC2626',
    success: '#059669',
    progressRing: '#6366F1',
    progressBackground: '#EEF2FF',
  },
  dark: {
    background: '#000000',
    surface: '#111111',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF',
    accent: '#818CF8',
    accentDim: '#A5B4FC',
    border: '#1F1F1F',
    error: '#F87171',
    success: '#34D399',
    progressRing: '#818CF8',
    progressBackground: '#1E1B4B',
  },
  void: {
    background: '#000000',
    surface: '#000000',
    text: '#FFFFFF',
    textSecondary: '#D1D5DB',
    accent: '#F3F4F6',
    accentDim: '#E5E7EB',
    border: '#27272A',
    error: '#FF6B6B',
    success: '#51CF66',
    progressRing: '#FFFFFF',
    progressBackground: '#18181B',
  },
};

export function getThemeColors(theme: Theme): ThemeColors {
  return THEMES[theme];
}
