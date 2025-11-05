/**
 * Gothic Background Component
 * Displays the ornate clock image as a blurred, darkened backdrop
 */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface GothicBackgroundProps {
  children: React.ReactNode;
  opacity?: number;
}

export default function GothicBackground({ 
  children, 
  opacity = 0.5
}: GothicBackgroundProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/gothic-clock.jpeg')}
        style={[styles.backgroundImage, { opacity }]}
        resizeMode="cover"
        blurRadius={2}
      />
      <View style={styles.contentWrapper}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1419',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    flex: 1,
  },
});
