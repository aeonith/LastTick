import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { hasCompletedOnboarding } from '../src/lib/storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkOnboarding();
  }, []);

  async function checkOnboarding() {
    // NO LOGIN REQUIRED - just check onboarding
    const completed = await hasCompletedOnboarding();
    
    if (completed) {
      router.replace('/dashboard');
    } else {
      router.replace('/onboarding');
    }
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#818CF8" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
