/**
 * Gothic Background Component
 * Displays the ornate clock image as a blurred, darkened backdrop
 */

import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

interface GothicBackgroundProps {
  children: React.ReactNode;
  opacity?: number;
  blur?: number;
}

export default function GothicBackground({ 
  children, 
  opacity = 0.6,
  blur = 1 
}: GothicBackgroundProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/gothic-clock.jpeg')}
        style={styles.backgroundImage}
        imageStyle={{ opacity }}
        blurRadius={blur}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 20, 25, 0.3)',
  },
});
