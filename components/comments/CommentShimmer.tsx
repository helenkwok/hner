import { StyleSheet, View } from "react-native";
import ShimmerPlaceholder from "@/components/common/ShimmerPlaceholder";

const CommentShimmer = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={styles.title} />
      <ShimmerPlaceholder style={styles.text} />
    </View>
  );
};

export default CommentShimmer;

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
  text: {
    height: 80,
    width: "100%",
    borderRadius: 4,
  },
});
