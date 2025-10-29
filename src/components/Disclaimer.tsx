import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '../lib/theme';

interface DisclaimerProps {
  colors: ThemeColors;
  variant?: 'warning' | 'legal' | 'info';
}

export default function Disclaimer({ colors, variant = 'warning' }: DisclaimerProps) {
  const getIcon = () => {
    switch (variant) {
      case 'warning': return '⚠️';
      case 'legal': return '⚖️';
      case 'info': return 'ℹ️';
    }
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: variant === 'warning' ? colors.error + '15' : colors.surface,
        borderColor: variant === 'warning' ? colors.error : colors.border 
      }
    ]}>
      <Text style={styles.icon}>{getIcon()}</Text>
      <View style={styles.content}>
        <Text style={[styles.title, { color: variant === 'warning' ? colors.error : colors.text }]}>
          IMPORTANT DISCLAIMER
        </Text>
        <Text style={[styles.text, { color: colors.textSecondary }]}>
          This app provides <Text style={{ fontWeight: 'bold' }}>illustrative estimates only</Text> based on statistical averages. These estimates are{' '}
          <Text style={{ fontWeight: 'bold' }}>NOT medical predictions</Text> and should not be used for medical, financial, or legal decisions.
        </Text>
        <Text style={[styles.text, { color: colors.textSecondary, marginTop: 8 }]}>
          No one can predict when you will die. This is a philosophical tool for reflection, not a fortune teller.
        </Text>
        <Text style={[styles.legal, { color: colors.textSecondary, marginTop: 8 }]}>
          By using this app, you acknowledge that the creators are not liable for any decisions made based on these estimates.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginVertical: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  legal: {
    fontSize: 11,
    lineHeight: 16,
    fontStyle: 'italic',
  },
});
