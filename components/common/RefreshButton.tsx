import { StyleSheet, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface RefreshButtonProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const RefreshButton = ({ refreshing, onRefresh }: RefreshButtonProps) => {
  const sv = useSharedValue<number>(0);

  useEffect(() => {
    if (refreshing) {
      sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
    } else {
      sv.value = 0;
    }
  }, [refreshing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
      <TouchableOpacity onPressIn={onRefresh}>
        <Ionicons name="refresh" size={24} color="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RefreshButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
