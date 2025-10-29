import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

interface AnimatedHourglassProps {
  opacity?: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function AnimatedHourglass({ opacity = 0.15 }: AnimatedHourglassProps) {
  const sandFall = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Continuous sand falling animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sandFall, {
          toValue: 1,
          duration: 60000, // 60 seconds for full cycle
          useNativeDriver: false,
        }),
        Animated.timing(sandFall, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Subtle rotation every 2 minutes
    Animated.loop(
      Animated.sequence([
        Animated.delay(120000),
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const topSandHeight = sandFall.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 20],
  });

  const bottomSandHeight = sandFall.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 100],
  });

  const rotateZ = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg'],
  });

  return (
    <View style={[styles.container, { opacity }]} pointerEvents="none">
      <Animated.View style={{ transform: [{ rotate: rotateZ }] }}>
        <Svg width={width} height={height} viewBox="0 0 200 300">
          <Defs>
            <LinearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#D4A574" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="#C19A6B" stopOpacity="1" />
            </LinearGradient>
            <LinearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
            </LinearGradient>
          </Defs>

          {/* Hourglass glass outline */}
          <Path
            d="M 60 20 L 140 20 L 140 60 L 100 150 L 140 240 L 140 280 L 60 280 L 60 240 L 100 150 L 60 60 Z"
            stroke="url(#glassGradient)"
            strokeWidth="3"
            fill="none"
          />

          {/* Top sand (draining) */}
          <AnimatedRect
            x="65"
            y="25"
            width="70"
            height={topSandHeight}
            fill="url(#sandGradient)"
            rx="2"
          />

          {/* Falling sand stream */}
          <AnimatedRect
            x="98"
            y="145"
            width="4"
            height={sandFall.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 30],
            })}
            fill="#C19A6B"
            opacity={sandFall.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            })}
          />

          {/* Bottom sand (filling) */}
          <AnimatedRect
            x="65"
            y={bottomSandHeight.interpolate({
              inputRange: [20, 100],
              outputRange: [255, 175],
            })}
            width="70"
            height={bottomSandHeight}
            fill="url(#sandGradient)"
            rx="2"
          />

          {/* Center point highlight */}
          <Path
            d="M 95 150 Q 100 145, 105 150 Q 100 155, 95 150 Z"
            fill="#FFFFFF"
            opacity="0.3"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
});
