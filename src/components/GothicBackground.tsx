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
  opacity = 0.15,
  blur = 8 
}: GothicBackgroundProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/gothic-clock.jpeg')}
        style={styles.backgroundImage}
        imageStyle={[styles.backgroundImageStyle, { opacity }]}
        blurRadius={blur}
      >
        <View style={styles.overlay} />
      </ImageBackground>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 25, 0.7)',
  },
});
