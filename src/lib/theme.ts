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
  primary: string;
  cardBg: string;
}

export const THEMES: Record<Theme, ThemeColors> = {
  light: {
    background: '#E8DCC4',
    surface: '#F5EFE3',
    text: '#1A2C3D',
    textSecondary: '#2D4857',
    accent: '#C8A76B',
    accentDim: '#B39559',
    border: '#D4C5A9',
    error: '#8B3A3A',
    success: '#4A7C59',
    progressRing: '#C8A76B',
    progressBackground: '#F5EFE3',
    primary: '#C8A76B',
    cardBg: '#F5EFE3',
  },
  dark: {
    background: '#0A1419',
    surface: '#1A2C3D',
    text: '#E8DCC4',
    textSecondary: '#6B9DB5',
    accent: '#6B9DB5',
    accentDim: '#4A7B94',
    border: '#2D4857',
    error: '#C85B5B',
    success: '#5B9C76',
    progressRing: '#6B9DB5',
    progressBackground: '#1A2C3D',
    primary: '#6B9DB5',
    cardBg: '#1A2C3D',
  },
  void: {
    background: '#000000',
    surface: '#0A1419',
    text: '#E8DCC4',
    textSecondary: '#6B9DB5',
    accent: '#C8A76B',
    accentDim: '#B39559',
    border: '#1A2C3D',
    error: '#8B3A3A',
    success: '#4A7C59',
    progressRing: '#C8A76B',
    progressBackground: '#0A1419',
    primary: '#C8A76B',
    cardBg: '#0A1419',
  },
};

export function getThemeColors(theme: Theme): ThemeColors {
  return THEMES[theme];
}
