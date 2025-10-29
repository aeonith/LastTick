/**
 * In-App Purchase Scaffolding
 * 
 * SETUP REQUIRED:
 * 1. Apple App Store Connect:
 *    - Create In-App Purchase product
 *    - Type: Non-Consumable (one-time purchase)
 *    - Product ID: com.yourcompany.momentus.lifetime
 *    - Add pricing tiers
 *    - Submit for review with app
 * 
 * 2. Google Play Console:
 *    - Create In-App Product
 *    - Product ID: com.yourcompany.momentus.lifetime (match Apple)
 *    - Type: One-time purchase
 *    - Set pricing
 * 
 * 3. Configure expo-in-app-purchases in app.json plugins
 */

import { setPurchased, hasPurchased } from './storage';
import { Platform } from 'react-native';

// Conditionally import IAP only on native platforms
let InAppPurchases: any = null;
if (Platform.OS !== 'web') {
  InAppPurchases = require('expo-in-app-purchases');
}

// Product IDs - must match what's configured in App Store Connect & Google Play
export const PRODUCT_IDS = {
  LIFETIME: Platform.select({
    ios: 'com.yourcompany.lasttick.lifetime',
    android: 'com.yourcompany.lasttick.lifetime',
    default: 'com.yourcompany.lasttick.lifetime',
  }),
};

// Monetization mode - ONE-TIME PURCHASE
export type MonetizationMode = 'one_time_purchase';
export const MONETIZATION_MODE: MonetizationMode = 'one_time_purchase';

// Purchase details
export const PURCHASE_CONFIG = {
  price: 4.99, // $4.99 one-time
  currency: 'USD',
  freeTrialDays: 60, // 2 months free trial
  type: 'Non-Consumable', // One-time purchase, never expires
};

/**
 * Initialize IAP connection
 */
export async function initializeIAP(): Promise<void> {
  if (Platform.OS === 'web') {
    console.log('IAP not available on web');
    return;
  }
  
  try {
    await InAppPurchases.connectAsync();
    console.log('IAP initialized');
  } catch (error) {
    console.error('Failed to initialize IAP:', error);
  }
}

/**
 * Disconnect IAP
 */
export async function disconnectIAP(): Promise<void> {
  if (Platform.OS === 'web') return;
  
  try {
    await InAppPurchases.disconnectAsync();
  } catch (error) {
    console.error('Failed to disconnect IAP:', error);
  }
}

/**
 * Get available products
 */
export async function getProducts(): Promise<any[]> {
  if (Platform.OS === 'web') {
    // Return mock product for web testing
    return [{
      productId: PRODUCT_IDS.LIFETIME,
      price: '$4.99',
      priceAmount: 4.99,
      currency: 'USD',
      title: 'LastTick - Lifetime Access',
      description: '2 months free, then $4.99 one-time purchase for lifetime access',
      type: 'non-consumable',
    }];
  }
  
  try {
    const { results } = await InAppPurchases.getProductsAsync([PRODUCT_IDS.LIFETIME!]);
    return results || [];
  } catch (error) {
    console.error('Failed to get products:', error);
    return [];
  }
}

/**
 * Purchase lifetime access (one-time payment)
 */
export async function purchaseLifetime(): Promise<boolean> {
  if (Platform.OS === 'web') {
    alert('Purchases are only available on mobile. Download from App Store or Google Play.');
    return false;
  }
  
  try {
    // Purchase the lifetime product
    await InAppPurchases.purchaseItemAsync(PRODUCT_IDS.LIFETIME!);
    
    // Listen for purchase updates
    const purchaseListener = InAppPurchases.setPurchaseListener(async ({ responseCode, results }: any) => {
      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        for (const purchase of results || []) {
          if (purchase.productId === PRODUCT_IDS.LIFETIME) {
            // Acknowledge purchase
            await InAppPurchases.finishTransactionAsync(purchase, true);
            
            // Mark as purchased in storage (LIFETIME)
            await setPurchased(true);
            
            console.log('Purchase successful - Lifetime access granted!');
            return true;
          }
        }
      } else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
        console.log('Purchase canceled by user');
      } else {
        console.error('Purchase failed:', responseCode);
      }
      return false;
    });

    return true;
  } catch (error) {
    console.error('Purchase error:', error);
    return false;
  }
}

/**
 * Restore previous purchases
 */
export async function restorePurchases(): Promise<boolean> {
  if (Platform.OS === 'web') {
    alert('Restore is only available on mobile apps.');
    return false;
  }
  
  try {
    const { results } = await InAppPurchases.getPurchaseHistoryAsync();
    
    if (results) {
      for (const purchase of results) {
        if (purchase.productId === PRODUCT_IDS.LIFETIME) {
          await setPurchased(true);
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('Restore purchases error:', error);
    return false;
  }
}

/**
 * Check if user has access (purchased or still in trial)
 */
export async function hasAccess(daysSinceInstall: number): Promise<boolean> {
  const purchased = await hasPurchased();
  
  if (purchased) {
    return true; // Lifetime access after one-time purchase
  }
  
  // During 2-month free trial, grant full access
  if (daysSinceInstall < PURCHASE_CONFIG.freeTrialDays) {
    return true;
  }
  
  return false;
}

/**
 * Get days remaining in free trial
 */
export function getTrialDaysRemaining(daysSinceInstall: number): number {
  return Math.max(0, PURCHASE_CONFIG.freeTrialDays - daysSinceInstall);
}

/**
 * Web checkout fallback URL (for donation/support mode)
 * TODO: Replace with your actual Stripe checkout URL
 */
export const SUPPORT_URL = 'https://yourwebsite.com/support';
