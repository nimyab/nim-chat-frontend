import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export function LoadingDots() {
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        dot1Opacity.setValue(0.3);
        dot2Opacity.setValue(0.3);
        dot3Opacity.setValue(0.3);
        animate();
      });
    };

    animate();
  }, []);

  return (
    <View className="flex-row gap-1">
      <Animated.View
        className="w-2 h-2 rounded-full bg-white"
        style={{ opacity: dot1Opacity }}
      />
      <Animated.View
        className="w-2 h-2 rounded-full bg-white"
        style={{ opacity: dot2Opacity }}
      />
      <Animated.View
        className="w-2 h-2 rounded-full bg-white"
        style={{ opacity: dot3Opacity }}
      />
    </View>
  );
}
