import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const StoryListShimmer = ({ length }: { length: number }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, i) => i).map((item) => (
        <View key={item} style={styles.story}>
          <ShimmerPlaceholder style={styles.title} />
          <ShimmerPlaceholder style={styles.field} />
        </View>
      ))}
    </View>
  );
};

export default StoryListShimmer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  story: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    height: 32,
    width: "70%",
    borderRadius: 4,
  },
  field: {
    height: 20,
    width: "100%",
    borderRadius: 4,
  },
});
