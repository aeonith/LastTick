import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { loadTheme, getDaysSinceInstall, hasPurchased } from '../src/lib/storage';
import { getThemeColors } from '../src/lib/theme';
import {
  getProducts,
  purchaseLifetime,
  restorePurchases,
  getTrialDaysRemaining,
  hasAccess,
  PURCHASE_CONFIG,
  SUPPORT_URL,
} from '../src/lib/iap';
import Button from '../src/components/Button';

export default function Purchase() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark' | 'void'>('dark');
  const [colors, setColors] = useState(getThemeColors('dark'));
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [daysSinceInstall, setDaysSinceInstall] = useState(0);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const currentTheme = await loadTheme();
    setTheme(currentTheme);
    setColors(getThemeColors(currentTheme));

    const days = await getDaysSinceInstall();
    setDaysSinceInstall(days);

    const isPurchased = await hasPurchased();
    setPurchased(isPurchased);

    if (!isPurchased) {
      const prods = await getProducts();
      setProducts(prods);
    }
  };

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const success = await purchaseLifetime();
      if (success) {
        setPurchased(true);
        alert('Purchase successful! You now have lifetime access. 🙏');
      }
    } catch (error) {
      alert('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const success = await restorePurchases();
      if (success) {
        setPurchased(true);
        alert('Purchase restored successfully!');
      } else {
        alert('No previous purchases found.');
      }
    } catch (error) {
      alert('Restore failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWebSupport = () => {
    Linking.openURL(SUPPORT_URL);
  };

  const trialDaysLeft = getTrialDaysRemaining(daysSinceInstall);
  const inTrial = trialDaysLeft > 0;

  if (purchased) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backButton, { color: colors.accent }]}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.centerContent}>
            <Text style={styles.emoji}>✨</Text>
            <Text style={[styles.title, { color: colors.text }]}>Active Subscriber</Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              Thank you for your purchase! You now have lifetime access. You're supporting independent philosophical tools and keeping LastTick ad-free forever.
            </Text>
            <Text style={[styles.message, { color: colors.textSecondary, marginTop: 16, fontWeight: '600' }]}>
              One-time purchase: $4.99 (paid once, yours forever)
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backButton, { color: colors.accent }]}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.centerContent}>
          <Text style={styles.emoji}>🙏</Text>
          <Text style={[styles.title, { color: colors.text }]}>Support LastTick</Text>

          {inTrial ? (
            <View style={[styles.trialBox, { backgroundColor: colors.accent + '20', borderColor: colors.accent }]}>
              <Text style={[styles.trialText, { color: colors.text }]}>
                🎉 FREE TRIAL ACTIVE
              </Text>
              <Text style={[styles.trialDays, { color: colors.text }]}>
                {trialDaysLeft} days remaining
              </Text>
              <Text style={[styles.trialSubtext, { color: colors.textSecondary }]}>
                Out of {PURCHASE_CONFIG.freeTrialDays} days (2 months)
              </Text>
            </View>
          ) : (
            <View style={[styles.trialBox, { backgroundColor: colors.error + '15', borderColor: colors.error }]}>
              <Text style={[styles.message, { color: colors.error }]}>
                Your 2-month free trial has ended. Subscribe to continue.
              </Text>
            </View>
          )}

          <Text style={[styles.message, { color: colors.textSecondary }]}>
            LastTick is an independent philosophical tool. Your one-time purchase supports continued development and keeps the app ad-free forever.
          </Text>

          <View style={[styles.featureBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>What You Get:</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ 2 months FREE trial (full access)</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ Then $4.99 ONE-TIME purchase</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ LIFETIME access - pay once, use forever</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ All themes (Light, Dark, Void)</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ 60+ philosophical quotes</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ Custom daily reminders</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ Zero ads, forever</Text>
            <Text style={[styles.feature, { color: colors.textSecondary }]}>✓ NO recurring charges</Text>
          </View>

          {products.length > 0 && (
            <View style={[styles.priceBox, { backgroundColor: colors.accent + '20', borderColor: colors.accent }]}>
              <Text style={[styles.freeTrialText, { color: colors.accent }]}>
                FREE for 2 months
              </Text>
              <Text style={[styles.priceText, { color: colors.text }]}>
                ${PURCHASE_CONFIG.price}
              </Text>
              <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>one-time • lifetime access</Text>
            </View>
          )}

          <Button
            title="Purchase Lifetime Access"
            onPress={handlePurchase}
            colors={colors}
            variant="primary"
            loading={loading}
            disabled={loading}
          />

          <View style={{ height: 12 }} />

          <Button
            title="Restore Previous Purchase"
            onPress={handleRestore}
            colors={colors}
            variant="outline"
            disabled={loading}
          />

          <TouchableOpacity onPress={handleWebSupport} style={styles.webLink}>
            <Text style={[styles.webLinkText, { color: colors.textSecondary }]}>
              Or support via web checkout →
            </Text>
          </TouchableOpacity>

          <Text style={[styles.disclaimer, { color: colors.textSecondary }]}>
            One-time purchase. Payment charged to App Store account at confirmation. 
            No recurring charges. Lifetime access - pay once, use forever.
          </Text>
          
          <Text style={[styles.disclaimer, { color: colors.textSecondary, marginTop: 8 }]}>
            App is fully functional during 2-month free trial. Purchase after trial for lifetime access. This is a philosophical tool for reflection.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    fontSize: 16,
    marginBottom: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 500,
    alignSelf: 'center',
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  featureBox: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  feature: {
    fontSize: 16,
    lineHeight: 28,
  },
  priceBox: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 3,
    alignItems: 'center',
    marginBottom: 24,
  },
  freeTrialText: {
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  priceText: {
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  trialBox: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 24,
  },
  trialText: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  trialDays: {
    fontSize: 36,
    fontWeight: '900',
  },
  trialSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  webLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  webLinkText: {
    fontSize: 14,
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});
