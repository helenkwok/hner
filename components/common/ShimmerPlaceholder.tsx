import { StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const StoryListShimmer = ({ style }: { style: StyleProp<ViewStyle> }) => {
  return <ShimmerPlaceholder style={[style]} />;
};

export default StoryListShimmer;
