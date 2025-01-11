import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const StoryShimmer = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={styles.title} />
      <ShimmerPlaceholder style={styles.field} />
      <ShimmerPlaceholder style={styles.text} />
      <ShimmerPlaceholder style={styles.field} />
    </View>
  );
};

export default StoryShimmer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    height: 28,
    width: "70%",
    borderRadius: 4,
  },
  field: {
    height: 20,
    width: "100%",
    borderRadius: 4,
  },
  text: {
    height: 200,
    width: "100%",
    borderRadius: 4,
  },
});
