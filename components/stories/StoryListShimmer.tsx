import { StyleSheet, useColorScheme, View } from "react-native";
import ShimmerPlaceholder from "@/components/common/ShimmerPlaceholder";

const StoryListShimmer = ({ length }: { length: number }) => {
  const theme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme === "dark" ? "#333" : "#ddd" },
      ]}
    >
      {Array.from({ length }, (_, i) => i).map((item) => (
        <View key={item} style={styles.story}>
          <ShimmerPlaceholder style={styles.title} />
          <ShimmerPlaceholder style={styles.field} />
          <View style={styles.preview}>
            <ShimmerPlaceholder style={styles.field} />
          </View>
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
  preview: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
  },
});
