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
  opacity = 0.5,
  blur = 2 
}: GothicBackgroundProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/gothic-clock.jpeg')}
        style={styles.backgroundImage}
        imageStyle={{ opacity }}
        blurRadius={blur}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 20, 25, 0.4)',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
