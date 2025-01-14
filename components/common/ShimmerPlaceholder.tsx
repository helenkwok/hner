import { StyleProp, useColorScheme, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const DefaultShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerPlaceholder = ({ style }: { style: StyleProp<ViewStyle> }) => {
  const theme = useColorScheme();
  return (
    <DefaultShimmerPlaceholder
      style={[style]}
      shimmerColors={
        theme === "dark"
          ? ["#444", "#555", "#444"]
          : ["#ebebeb", "#c5c5c5", "#ebebeb"]
      }
    />
  );
};

export default ShimmerPlaceholder;
