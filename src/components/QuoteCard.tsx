import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Quote } from '../lib/quotes';
import { ThemeColors } from '../lib/theme';

interface QuoteCardProps {
  quote: Quote;
  colors: ThemeColors;
}

export default function QuoteCard({ quote, colors }: QuoteCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.quoteText, { color: colors.text }]}>
        "{quote.text}"
      </Text>
      {quote.author && (
        <Text style={[styles.author, { color: colors.textSecondary }]}>
          — {quote.author}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  quoteText: {
    fontSize: 17,
    lineHeight: 26,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  author: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    opacity: 0.8,
  },
});
