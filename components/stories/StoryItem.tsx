import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Story } from "@/utils/types";
import { Link } from "expo-router";
import { formatDistanceToNow } from "date-fns";

interface StoryItemProps {
  story: Story;
}

const StoryItem = ({ story }: StoryItemProps) => {
  return (
    <Link href={`/(app)/(tabs)/(stories)/${story.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>{story.title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
            gap: 8,
          }}
        >
          <Text style={styles.field}>{story.by}</Text>
          <Text style={styles.field}>
            {formatDistanceToNow(new Date(story.time * 1000), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default StoryItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  field: {
    fontSize: 16,
    color: "#555",
  },
});
